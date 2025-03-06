---
title: Getting Started
description: Learn how to use the Open Graph Generator for your website
order: 1
updated: 2023-05-15
---

# Getting Started

The Open Graph Generator helps you create beautiful images and meta tags for social media sharing. Follow these steps to get started:

1. Enter your page title and description
2. Provide the URL you want to promote
3. Customize the appearance (optional)
4. Generate your Open Graph assets
5. Download and implement them on your website

## Generating Open Graph Images

Open Graph images are shown when your content is shared on social media platforms like Facebook, Twitter, and LinkedIn. Here's how to create effective images:

### Best Practices:

- Use a clear, concise title that accurately describes your content
- Keep descriptions informative but brief (under 200 characters)
- Use high-quality images when possible
- Follow the recommended dimensions for each platform

## Using Meta Tags

Meta tags tell social platforms how to display your content. After generating your Open Graph assets, you'll need to add these tags to the `<head>` section of your HTML:

```html
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your Description" />
<meta property="og:image" content="https://example.com/your-image.jpg" />
<meta property="og:url" content="https://example.com/your-page" />
<meta property="og:type" content="website" />
```

For Twitter, you might also want to include Twitter Card tags:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your Description" />
<meta name="twitter:image" content="https://example.com/your-image.jpg" />
```
