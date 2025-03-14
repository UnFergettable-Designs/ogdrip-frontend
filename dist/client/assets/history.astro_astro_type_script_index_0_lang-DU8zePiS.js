(function(){try{var n=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},f=new n.Error().stack;f&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[f]="b185989e-2c42-4512-8cbc-42a9e9ec6ed1",n._sentryDebugIdIdentifier="sentry-dbid-b185989e-2c42-4512-8cbc-42a9e9ec6ed1")}catch{}})();document.addEventListener("DOMContentLoaded",()=>{const n="http://localhost:8888";let r=1,p=parseInt(document.querySelector("#page-info")?.textContent?.split("of")[1]?.trim()||"0"),m="all",v="newest",T=L("admin_token")||"";const s=document.getElementById("generations-container"),u=document.getElementById("prev-page"),g=document.getElementById("next-page"),w=document.getElementById("page-info"),h=document.getElementById("status-filter"),$=document.getElementById("sort-order"),d=document.getElementById("details-modal"),y=document.querySelector(".close-button"),E=document.getElementById("retry-button");function L(a){const t=a+"=",o=document.cookie.split(";");for(let i=0;i<o.length;i++){let e=o[i];for(;e.charAt(0)==" ";)e=e.substring(1,e.length);if(e.indexOf(t)==0)return e.substring(t.length,e.length)}return null}async function c(){try{const a=(r-1)*20,t=m!=="all"?`&status=${m}`:"",o=v==="oldest"?"&sort=asc":"",i={},e=await fetch(`${n}/api/history?limit=20&offset=${a}${t}${o}`,{headers:i});if(e.status===401){window.location.href=`/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`;return}if(!e.ok)throw new Error(`API error: ${e.status} ${e.statusText}`);const l=await e.json();if(!l.success)throw new Error(l.message||"Failed to fetch history");k(l.data.generations||[]),p=l.data.total||0,_()}catch(a){console.error("Error loading generations:",a),s&&a instanceof Error&&(s.innerHTML=`
          <div class="error-message">
            <p>Error: ${a.message}</p>
          </div>
        `)}}function k(a){if(a.length===0){s&&(s.innerHTML=`
          <div class="no-generations">
            <p>No generations found. Try generating some Open Graph images first!</p>
            <a href="/" class="button">Go to Generator</a>
          </div>
        `);return}s&&(s.innerHTML=a.map(t=>`
        <div class="generation-card" data-id="${t.id}" data-status="${t.status}">
          <div class="image-container">
            ${t.image_path?`<img src="${n}/api/download/${t.id}/image" alt="${t.title||"Generated Image"}" loading="lazy">`:'<div class="no-image">No image available</div>'}
            <div class="status-badge status-${t.status}">${t.status}</div>
          </div>
          <div class="generation-details">
            <h3>${t.title||"Untitled"}</h3>
            <p class="description">${t.description||"No description"}</p>
            <p class="created-date">
              Created: ${new Date(t.created_at).toLocaleString()}
            </p>
            <div class="generation-actions">
              ${t.status==="completed"?`<a href="${n}/api/download/${t.id}" class="download-button">Download</a>`:""}
              <button class="view-details-button" data-id="${t.id}">
                View Details
              </button>
            </div>
          </div>
        </div>
      `).join("")),document.querySelectorAll(".view-details-button").forEach(t=>{t.addEventListener("click",()=>{B(t.dataset.id)})})}function _(){const a=Math.ceil(p/20)||1;w&&(w.textContent=`Page ${r} of ${a}`),u&&(u.disabled=r<=1),g&&(g.disabled=r>=a)}async function B(a){try{const t={},o=await fetch(`${n}/api/history/${a}`,{headers:t});if(o.status===401){window.location.href=`/admin/login?redirect=${encodeURIComponent(window.location.pathname)}`;return}if(!o.ok)throw new Error(`API error: ${o.status} ${o.statusText}`);const i=await o.json();if(!i.success)throw new Error(i.message||"Failed to fetch generation details");const e=i.data,l=document.getElementById("modal-content");let b={};try{e.parameters&&(b=JSON.parse(e.parameters))}catch(S){console.error("Error parsing parameters:",S)}l&&(l.innerHTML=`
            <div class="details-grid">
              <div class="details-image">
              ${e.image_path?`<img src="${n}/api/download/${e.id}/image" alt="${e.title||"Generated Image"}">`:'<div class="no-image">No image available</div>'}
            </div>
            <div class="details-info">
              <h3>${e.title||"Untitled"}</h3>
              <p class="description">${e.description||"No description"}</p>
              <p><strong>Status:</strong> <span class="status-text status-${e.status}">${e.status}</span></p>
              <p><strong>Created:</strong> ${new Date(e.created_at).toLocaleString()}</p>
              <p><strong>Target URL:</strong> <a href="${e.target_url}" target="_blank">${e.target_url}</a></p>
              <p><strong>Downloads:</strong> ${e.download_count}</p>
              
              ${e.error_message?`<div class="error-box"><strong>Error:</strong> ${e.error_message}</div>`:""}
              
              <h4>Generation Parameters</h4>
              <div class="parameters">
                <pre>${JSON.stringify(b,null,2)}</pre>
              </div>
              
              ${e.status==="completed"?`<a href="${n}/api/download/${e.id}" class="download-button large">Download Files</a>`:""}
            </div>
          </div>
        `),d&&(d.style.display="block")}catch(t){t instanceof Error?(console.error("Error fetching details:",t.message),alert(`Error: ${t.message}`)):(console.error("Error fetching details:",t),alert("An unexpected error occurred"))}}u&&u.addEventListener("click",()=>{r>1&&(r--,c())}),g&&g.addEventListener("click",()=>{r<Math.ceil(p/20)&&(r++,c())}),h&&h.addEventListener("change",()=>{m=h.value,r=1,c()}),$&&$.addEventListener("change",()=>{v=$.value,r=1,c()}),y&&y.addEventListener("click",()=>{d&&(d.style.display="none")}),window.addEventListener("click",a=>{a.target===d&&d&&(d.style.display="none")}),E&&E.addEventListener("click",c),s&&s.children.length===0&&c()});
