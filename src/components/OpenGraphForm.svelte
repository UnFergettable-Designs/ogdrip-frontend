<script lang="ts">
  import { onMount } from "svelte";
  import {
    captureException,
    captureMessage,
    addBreadcrumb,
    setTag,
  } from "../utils/sentry";

  // Import types from shared directory or define them inline
  interface OpenGraphRequest {
    url?: string;
    title?: string;
    description?: string;
    type?: "website" | "article" | "product" | "profile";
    site?: string;
    targetUrl?: string;
    width?: number;
    height?: number;
    twitterCard?: "summary" | "summary_large_image";
    quality?: number;
    wait?: number;
    selector?: string;
    debug?: boolean;
    verbose?: boolean;
  }

  interface OpenGraphResponse {
    success: boolean;
    message: string;
    image_url?: string;
    meta_tags_url?: string;
    zip_url?: string;
    html_content?: string;
    id?: string;
    error?: string;
  }

  // Use traditional export let for compatibility - no $props() for now
  export let target: HTMLElement | null =
    typeof document !== "undefined" ? document.body : null;

  // Get API URL from environment or use default - avoid using process
  const API_URL =
    import.meta.env?.PUBLIC_BACKEND_URL ||
    // During development, these might be available
    import.meta.env?.BACKEND_URL ||
    // Fallback for safety
    "http://localhost:8888";

  // Log the API URL when in development
  // Instead of process.env checks, use this pattern for browser-safe code
  const isDevelopment = import.meta.env?.DEV === true;
  if (isDevelopment) {
    console.log("API URL:", API_URL);
    console.log("Environment:", import.meta.env);
  }

  // Form state variables - will be reactive in Svelte 5
  let formData = {
    url: "",
    title: "",
    description: "",
    type: "website",
    site: "",
    targetUrl: "",
    width: 1200,
    height: 630,
    twitterCard: "summary_large_image",
    quality: 90,
    wait: 2000,
    selector: "body",
    debug: false,
    verbose: false,
  };

  let loading = false;
  let result: OpenGraphResponse | null = null;
  let error: string | null = null;
  let activeTab: "preview" | "source" = "preview";

  // Status tracking variables
  let statusMessage = "";
  let statusType = ""; // Can be "info", "success", or "error"
  // Add API status tracking
  let apiStatus = "Unknown"; // Fix for undefined apiStatus

  // Function to set status messages
  function setStatus(
    message: string,
    type: "info" | "success" | "error" = "info"
  ) {
    statusMessage = message;
    statusType = type;
    console.log(`Status: [${type}] ${message}`);
  }

  // Clear status after 5 seconds
  function clearStatusAfterDelay() {
    setTimeout(() => {
      statusMessage = "";
      statusType = "";
    }, 5000);
  }

  // Switch between preview and source tabs
  function switchTab(tab: "preview" | "source") {
    activeTab = tab;
  }

  // Add this before the existing handleSubmit function
  onMount(() => {
    console.log("OpenGraphForm component mounted");
    console.log("Current API_URL:", API_URL);

    // Make sure we're in a browser environment before attempting network requests
    if (typeof window === "undefined" || typeof fetch === "undefined") {
      console.log("Not in browser environment, skipping connectivity tests");
      return;
    }

    // Try multiple methods to connect to the backend
    console.log("⏳ Testing backend connectivity with multiple methods...");

    // Method 1: Standard fetch
    fetch(`${API_URL}/api/health`)
      .then((response) => {
        console.log(
          "✅ Method 1: Standard fetch successful:",
          response.status,
          response.statusText
        );
        return response.json();
      })
      .then((data) => {
        console.log("Health check data:", data);
      })
      .catch((error) => {
        console.error("❌ Method 1 failed:", error);

        // Method 2: Try with mode: 'no-cors'
        console.log("Trying Method 2: fetch with no-cors...");
        return fetch(`${API_URL}/api/health`, {
          mode: "no-cors",
        });
      })
      .then((response) => {
        if (response) {
          console.log("✅ Method 2: no-cors fetch response received");
        }
      })
      .catch((error) => {
        console.error("❌ Method 2 failed:", error);

        // Method 3: Try with XMLHttpRequest
        console.log("Trying Method 3: XMLHttpRequest...");
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${API_URL}/api/health`);
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log("✅ Method 3: XMLHttpRequest successful:", xhr.status);
            console.log("Response:", xhr.responseText);
          } else {
            console.error("❌ Method 3 failed with status:", xhr.status);
          }
        };
        xhr.onerror = function () {
          console.error("❌ Method 3 failed with network error");
        };
        xhr.send();
      });
  });

  // Form submission handler
  async function handleSubmit(event: Event) {
    console.log("handleSubmit called", event);
    event.preventDefault();
    console.log("After preventDefault");
    error = "";
    loading = true;
    result = null;
    setStatus("Starting form submission...", "info");

    // Add breadcrumb for form submission
    addBreadcrumb({
      category: "form",
      message: "Open Graph generation form submitted",
      level: "info",
    });

    try {
      console.log(`Submitting form to API at: ${API_URL}/api/generate`);

      // Extract form data manually to ensure we have the right values
      const form = event.target as HTMLFormElement;
      if (!form) {
        throw new Error("Form element not found");
      }

      // Create a FormData object from the form
      const formData = new FormData(form);

      // Ensure boolean values are properly formatted
      // (checkboxes come as 'on' when checked or are missing when unchecked)
      if (
        form.elements.namedItem("debug") &&
        (form.elements.namedItem("debug") as HTMLInputElement).checked
      ) {
        formData.set("debug", "true");
      }

      if (
        form.elements.namedItem("verbose") &&
        (form.elements.namedItem("verbose") as HTMLInputElement).checked
      ) {
        formData.set("verbose", "true");
      }

      // Ensure URL has a protocol (http:// or https://)
      const urlValue = formData.get("url") as string;
      if (urlValue && !urlValue.match(/^https?:\/\//)) {
        formData.set("url", `http://${urlValue}`);
      }

      // Log the form data being sent
      console.log("Form data being submitted:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Add Sentry tag for debugging
      setTag("api_endpoint", `${API_URL}/api/generate`);

      // Make the API request using the standard fetch API
      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        body: formData,
        // Add headers to help with CORS and content negotiation
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // Add Sentry breadcrumb for failing requests
        addBreadcrumb({
          category: "api",
          message: `API request failed with status: ${response.status}`,
          level: "error",
          data: {
            status: response.status,
            statusText: response.statusText,
            url: `${API_URL}/api/generate`,
          },
        });

        const errorText = await response.text();
        const errorMessage = `API request failed: ${response.status} ${response.statusText}. ${errorText}`;
        console.error(errorMessage);
        setStatus(errorMessage, "error");
        error = errorMessage;

        // Capture the error in Sentry
        captureException(new Error(errorMessage), {
          status: response.status,
          statusText: response.statusText,
          responseText: errorText,
        });

        loading = false;
        return;
      }

      // Try to parse the response as JSON
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error("Failed to parse API response");
      }

      if (data.success) {
        result = data;
        console.log({ result });
        error = "";
      } else {
        error = data.message || "An unknown error occurred";
      }
    } catch (err: unknown) {
      // Capture any exceptions in Sentry
      captureException(err, {
        location: "handleSubmit",
        api_url: API_URL,
      });

      console.error("Error submitting form:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setStatus(`Error: ${errorMessage}`, "error");
      error = `Failed to submit the form: ${errorMessage}`;

      loading = false;
    }
  }

  // Test function to directly submit data to the API without form submission
  async function testDirectSubmit() {
    console.log("Test direct submit function called");

    // Update UI
    error = "";
    loading = true;
    result = null;
    setStatus("Starting direct test submission...", "info");

    try {
      // Super simple test for debugging
      const testUrl = `${API_URL}/api/health`;
      console.log(`SIMPLE TEST: Fetching health endpoint at: ${testUrl}`);

      // First try the health endpoint to verify general connectivity
      try {
        const healthResponse = await fetch(testUrl);
        console.log(
          "Health endpoint response:",
          healthResponse.status,
          healthResponse.statusText
        );
        const healthData = await healthResponse.json();
        console.log("Health data:", healthData);
        setStatus(`Health check success: ${healthResponse.status}`, "success");
      } catch (healthErr: unknown) {
        console.error("Health check failed:", healthErr);
        setStatus(
          `Health check failed: ${healthErr instanceof Error ? healthErr.message : String(healthErr)}`,
          "error"
        );
      }

      // Now try the actual generate endpoint with minimal data
      console.log(`Now testing generate API at: ${API_URL}/api/generate`);

      // Very simple form data with minimal fields
      const simpleForm = new FormData();
      simpleForm.append("title", "Basic Test");
      simpleForm.append("url", "https://example.com");

      // Simple raw fetch, minimal options
      const generateResponse = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        body: simpleForm,
      });

      console.log(
        "Generate response:",
        generateResponse.status,
        generateResponse.statusText
      );

      if (!generateResponse.ok) {
        const errorText = await generateResponse.text();
        console.error("Generate error body:", errorText);
        setStatus(`Generate API failed: ${generateResponse.status}`, "error");
        throw new Error(
          `API request failed with status: ${generateResponse.status}`
        );
      }

      // Process response
      const data = await generateResponse.json();
      console.log("Generate API response:", data);

      if (data.success) {
        result = data;
        setStatus("Generate API succeeded!", "success");
      } else {
        setStatus(`Generate API returned error: ${data.message}`, "error");
        error = data.message || "API returned an error";
      }
    } catch (err: unknown) {
      console.error("Error in direct test:", err);
      error =
        err instanceof Error ? err.message : "Failed to connect to the API";
      setStatus(`Test failed: ${error}`, "error");
    } finally {
      loading = false;
    }
  }

  // Add error tracking to check connection function
  async function checkConnection() {
    try {
      addBreadcrumb({
        category: "api",
        message: "Checking API connection",
        level: "info",
      });

      setStatus("Checking API connection...", "info");

      const response = await fetch(`${API_URL}/api/health`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorMessage = `API health check failed: ${response.status} ${response.statusText}`;

        captureException(new Error(errorMessage), {
          status: response.status,
          statusText: response.statusText,
          responseText: errorText,
        });

        setStatus(errorMessage, "error");
        apiStatus = "API not available";
        return false;
      }

      const data = await response.json();
      setStatus("API connection successful", "success");
      apiStatus = "Connected";

      // Log a message to Sentry for tracking
      captureMessage("API connection successful", "info");

      return true;
    } catch (err: unknown) {
      captureException(err, {
        location: "checkConnection",
        api_url: API_URL,
      });

      console.error("Error checking connection:", err);
      setStatus("Error connecting to API", "error");
      apiStatus = "Error connecting to API";
      return false;
    }
  }
</script>

<div class="form-container">
  <form on:submit={handleSubmit}>
    <div class="form-section">
      <h2>Source</h2>
      <div class="form-group">
        <label for="url">Webpage URL (Optional)</label>
        <input
          type="url"
          id="url"
          name="url"
          bind:value={formData.url}
          placeholder="https://example.com"
        />
        <p class="helper-text">
          If provided, metadata will be extracted from this page. Include the
          protocol (http:// or https://).
        </p>
      </div>

      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          bind:value={formData.title}
          placeholder="Your Page Title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          bind:value={formData.description}
          placeholder="A brief description of your content"
          rows="3"
        ></textarea>
      </div>
    </div>

    <div class="form-section">
      <h2>Open Graph Settings</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="type">Content Type</label>
          <select id="type" name="type" bind:value={formData.type}>
            <option value="website">Website</option>
            <option value="article">Article</option>
            <option value="product">Product</option>
            <option value="profile">Profile</option>
          </select>
        </div>

        <div class="form-group">
          <label for="site">Site Name</label>
          <input
            type="text"
            id="site"
            name="site"
            bind:value={formData.site}
            placeholder="Your Site Name"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="targetUrl">Target URL</label>
        <input
          type="url"
          id="targetUrl"
          name="targetUrl"
          bind:value={formData.targetUrl}
          placeholder="https://example.com/target-page"
        />
        <p class="helper-text">
          URL that will be shared (can be different from source URL)
        </p>
      </div>
    </div>

    <div class="form-section">
      <h2>Image Settings</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="width">Width (px)</label>
          <input
            type="number"
            id="width"
            name="width"
            bind:value={formData.width}
            min="600"
            max="2400"
          />
        </div>

        <div class="form-group">
          <label for="height">Height (px)</label>
          <input
            type="number"
            id="height"
            name="height"
            bind:value={formData.height}
            min="300"
            max="1600"
          />
        </div>

        <div class="form-group">
          <label for="twitterCard">Twitter Card</label>
          <select
            id="twitterCard"
            name="twitterCard"
            bind:value={formData.twitterCard}
          >
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary Large Image</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="quality">Image Quality (1-100)</label>
          <input
            type="number"
            id="quality"
            name="quality"
            bind:value={formData.quality}
            min="1"
            max="100"
          />
        </div>

        <div class="form-group">
          <label for="wait">Wait Time (ms)</label>
          <input
            type="number"
            id="wait"
            name="wait"
            bind:value={formData.wait}
            min="0"
            max="10000"
          />
          <p class="helper-text">Time to wait before capturing screenshot</p>
        </div>

        <div class="form-group">
          <label for="selector">CSS Selector</label>
          <input
            type="text"
            id="selector"
            name="selector"
            bind:value={formData.selector}
            placeholder="body"
          />
          <p class="helper-text">Element to wait for before capturing</p>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>
            <input type="checkbox" name="debug" bind:checked={formData.debug} />
            Enable Debug Mode
          </label>
        </div>

        <div class="form-group">
          <label>
            <input
              type="checkbox"
              name="verbose"
              bind:checked={formData.verbose}
            />
            Verbose Logging
          </label>
        </div>
      </div>
    </div>

    <button type="submit" class="generate-button" disabled={loading}>
      {loading ? "Generating..." : "Generate Open Graph Content"}
    </button>

    <!-- Test button for direct API submission -->
    <button
      type="button"
      class="test-button"
      on:click={(e) => {
        console.log("Test button clicked!", e);
        statusMessage = "Button clicked!";
        statusType = "info";
        // Call the actual function
        testDirectSubmit();
      }}
      disabled={loading}
    >
      Test Direct API Submit
    </button>
  </form>

  <!-- Debug panel for development -->
  {#if import.meta.env?.DEV}
    <div class="debug-panel">
      <h3>Debug Information</h3>
      <div class="debug-item">
        <strong>API URL:</strong>
        {API_URL}
      </div>
      <div class="debug-item">
        <strong>Development Mode:</strong>
        {isDevelopment ? "Yes" : "No"}
      </div>
      <div class="debug-item">
        <strong>Browser:</strong>
        {typeof window !== "undefined"
          ? window.navigator.userAgent
          : "SSR mode"}
      </div>
      <div class="debug-item">
        <strong>API Status:</strong>
        {apiStatus}
      </div>

      <!-- Status message area -->
      {#if statusMessage}
        <div class="status-message status-{statusType}">
          {statusMessage}
        </div>
      {/if}

      <div class="debug-item">
        <button
          class="debug-button"
          on:click={() => {
            console.log("Current form data:", formData);
            setStatus("Form data logged to console", "info");
          }}
        >
          Log Form Data
        </button>

        <button
          class="debug-button"
          on:click={async () => {
            try {
              setStatus("Testing health API...", "info");
              const r = await fetch(`${API_URL}/api/health`);
              const data = await r.json();
              console.log("Health check:", data);
              setStatus(`Health API: ${r.status} ${r.statusText}`, "success");
            } catch (err: unknown) {
              console.error("Health check failed:", err);
              setStatus(
                `Health API failed: ${err instanceof Error ? err.message : String(err)}`,
                "error"
              );
            }
          }}
        >
          Test Health API
        </button>

        <button
          class="debug-button"
          on:click={async () => {
            try {
              setStatus("Testing generate API with XMLHttpRequest...", "info");
              const xhr = new XMLHttpRequest();
              xhr.open("POST", `${API_URL}/api/generate`);
              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  setStatus(`XHR success: ${xhr.status}`, "success");
                  console.log("XHR response:", xhr.responseText);
                } else {
                  setStatus(`XHR error: ${xhr.status}`, "error");
                  console.error("XHR error:", xhr.responseText);
                }
              };
              xhr.onerror = (e) => {
                setStatus(`XHR network error: ${e.type}`, "error");
                console.error("XHR error event:", e);
              };

              // Create simple form data
              const fd = new FormData();
              fd.append("title", "XHR Test");
              fd.append("url", "https://example.com");

              xhr.send(fd);
            } catch (err: unknown) {
              console.error("XHR test failed:", err);
              setStatus(
                `XHR test error: ${err instanceof Error ? err.message : String(err)}`,
                "error"
              );
            }
          }}
        >
          Test with XHR
        </button>
      </div>
    </div>
  {/if}

  <!-- Result display section -->
  {#if result !== null}
    <div class="result-section">
      {#if result.success}
        <div class="success-message">
          <span>✅</span>
          {result.message}
        </div>

        {#if result.zip_url}
          <a href={result.zip_url} download class="download-all">
            <span class="icon">📦</span> Download All Files (ZIP)
          </a>
        {/if}

        {#if result.image_url}
          <div class="image-container">
            <div class="section-header">
              <h3>Open Graph Image Preview</h3>
              <a href={result.image_url} download class="download-link">
                <span class="icon">⬇️</span> Download Image
              </a>
            </div>
            <img
              src={result.image_url}
              alt="Generated Open Graph preview"
              class="preview-image"
            />
          </div>
        {/if}

        {#if result.html_content}
          <div class="meta-container">
            <div class="section-header">
              <h3>Meta Tags Preview</h3>
              {#if result.meta_tags_url}
                <a href={result.meta_tags_url} download class="download-link">
                  <span class="icon">⬇️</span> Download HTML
                </a>
              {/if}
            </div>

            <div class="tabs">
              <button
                class="tab-button"
                class:active={activeTab === "preview"}
                on:click={() => switchTab("preview")}
              >
                Preview
              </button>
              <button
                class="tab-button"
                class:active={activeTab === "source"}
                on:click={() => switchTab("source")}
              >
                Source
              </button>
            </div>

            <div class="tab-content">
              <div class="preview-tab" class:active={activeTab === "preview"}>
                <div class="html-preview">
                  {@html result.html_content}
                </div>
              </div>
              <div class="source-tab" class:active={activeTab === "source"}>
                <pre class="meta-code">{result.html_content}</pre>
              </div>
            </div>
          </div>
        {/if}
      {:else}
        <div class="error-message">
          <span>❌</span>
          {result.message ||
            "There was an error generating Open Graph content."}
        </div>
      {/if}
    </div>
  {/if}

  {#if error}
    <div class="error-message">
      <span>❌</span>
      {error}
    </div>
  {/if}
</div>

<style>
  .form-container {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }

  .form-section {
    margin-bottom: 24px;
    border-bottom: 1px solid var(--light-gray);
    padding-bottom: 16px;
  }

  .form-row {
    display: flex;
    gap: 16px;
  }

  .form-group {
    margin-bottom: 16px;
    flex: 1;
  }

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--medium-gray);
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .helper-text {
    font-size: 12px;
    color: var(--dark-gray);
    margin-top: 4px;
  }

  .generate-button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
  }

  .generate-button:hover {
    background: var(--primary-hover);
  }

  .generate-button:disabled {
    background: #a5a5a5;
    cursor: not-allowed;
  }

  .error-message {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background-color: #f8d7da;
    border-radius: 4px;
    color: #721c24;
  }

  .error-message span {
    margin-right: 0.5rem;
  }

  .result-section {
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .success-message {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0.75rem 1rem;
    background-color: #d4edda;
    border-radius: 4px;
    color: #155724;
  }

  .success-message span {
    margin-right: 0.5rem;
  }

  .download-all {
    display: inline-flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0.75rem 1.25rem;
    background-color: #4a6cf7;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .download-all:hover {
    background-color: #3a5bd9;
  }

  .download-all .icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }

  .download-link {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background-color: #e9ecef;
    color: #495057;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .download-link:hover {
    background-color: #dee2e6;
  }

  .download-link .icon {
    margin-right: 0.3rem;
  }

  .tabs {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid #dee2e6;
  }

  .tab-button {
    padding: 0.6rem 1rem;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: 500;
    color: #6c757d;
    transition:
      color 0.2s,
      border-color 0.2s;
  }

  .tab-button.active {
    color: #4a6cf7;
    border-bottom-color: #4a6cf7;
  }

  .tab-button:hover:not(.active) {
    color: #495057;
    border-bottom-color: #ced4da;
  }

  .tab-content {
    padding: 1rem;
    background-color: white;
    border-radius: 0 0 4px 4px;
    border: 1px solid #dee2e6;
    border-top: none;
  }

  .preview-tab,
  .source-tab {
    display: none;
  }

  .preview-tab.active,
  .source-tab.active {
    display: block;
  }

  .html-preview {
    background-color: white;
    padding: 1rem;
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
  }

  pre.meta-code {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 0.9rem;
    color: #212529;
    max-height: 300px;
    overflow-y: auto;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .section-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .image-container {
    margin-bottom: 2rem;
  }

  .meta-container {
    margin-bottom: 2rem;
  }

  .preview-image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .result-message {
    margin-bottom: 20px;
    padding: 12px;
    background-color: #f0f8ff;
    border-left: 4px solid var(--primary-color);
    border-radius: 4px;
  }

  .download-options {
    display: flex;
    margin-bottom: 24px;
    justify-content: center;
  }

  .download-button {
    display: inline-flex;
    align-items: center;
    background: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
  }

  .download-button:hover {
    background: var(--primary-hover);
  }

  .test-button {
    margin: 1rem 0;
    padding: 0.75rem 1.25rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .test-button:hover {
    background-color: #218838;
  }

  /* Debug panel styles */
  .debug-panel {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border: 1px dashed #6c757d;
    border-radius: 4px;
  }

  .debug-panel h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #6c757d;
  }

  .debug-item {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .debug-button {
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .debug-button:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
    }
  }

  /* Status message styles */
  .status-message {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .status-info {
    background-color: #cce5ff;
    color: #004085;
    border: 1px solid #b8daff;
  }

  .status-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .status-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
</style>
