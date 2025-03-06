# Admin Login Page

This document outlines the design and implementation details for a dedicated admin login page in the Open Graph Generator application.

## Overview

Currently, the admin authentication functionality is integrated into the history page itself. This design proposes creating a dedicated admin login page to improve user experience, security, and maintainability.

## Requirements

1. Create a dedicated route `/admin/login` for admin authentication
2. Implement a secure login form with proper validation
3. Redirect to appropriate pages based on authentication status
4. Support token-based authentication using the existing backend API
5. Add logout functionality with cookie clearing
6. Apply consistent styling matching the application theme

## User Flow

1. User navigates to any admin page (e.g., `/history`)
2. If not authenticated, user is redirected to `/admin/login`
3. User enters admin token
4. On successful login:
   - Admin token is saved in a cookie
   - User is redirected to the originally requested page
5. On failed login:
   - Error message is displayed
   - User remains on login page
6. Authenticated user can log out, which clears the cookie and redirects to home

## Implementation Details

### Frontend Routes

Create a new Astro page at `src/pages/admin/login.astro`:

```
/src/pages/admin/login.astro  # The admin login page
/src/pages/admin/logout.astro # A simple logout page that clears cookies and redirects
```

### Authentication Flow

1. Implement authentication check in a shared module
2. Create middleware-like functionality to protect admin routes
3. Add client-side JavaScript for form submission and validation
4. Integrate with the existing `/api/admin/verify` endpoint

### Components

1. `AdminLoginForm` - A reusable component for the admin login form
2. `AdminHeader` - Header component with admin status indicator
3. `AdminNavigation` - Navigation component for admin pages
4. `AdminLayout` - Layout wrapper for admin pages

### Cookie Management

Implement secure cookie handling:

1. Set HttpOnly flag for security
2. Use SameSite attribute for CSRF protection
3. Set secure flag in production environments
4. Add reasonable expiration time (e.g., 24 hours)

### Security Considerations

1. Implement rate limiting for login attempts
2. Add CSRF protection
3. Add logging for authentication attempts
4. Regularly rotate admin tokens
5. Force re-authentication for sensitive operations

## UI Design

The login page should include:

1. Application logo/branding
2. Clear "Admin Login" heading
3. Token input field (password type for security)
4. Submit button
5. Error message area
6. Link back to public pages

### Mobile Considerations

1. Responsive layout that works well on all device sizes
2. Touch-friendly input elements
3. Clear error messages

## Next Steps

1. Create wireframes for the login page
2. Implement basic page structure and styling
3. Add authentication logic
4. Integrate with existing admin token verification
5. Test across browsers and devices
6. Add automated tests for authentication flows

## Related Documentation

- [Admin Access](./admin-access.md) - General admin access information
- [API Reference](../frontend_docs/api-reference.md) - Documentation for admin API endpoints
