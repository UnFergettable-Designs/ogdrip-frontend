# Admin Access

The Open Graph Generator provides an administrative interface for monitoring and managing image generations. This interface is restricted to authorized administrators only.

## Configuration

Admin access is configured through environment variables:

- In the backend:
  - Set `ADMIN_TOKEN` in the `.env` file to a secure token value
  - Example: `ADMIN_TOKEN=a-secure-random-string`
- In the frontend:
  - Set `PUBLIC_ADMIN_AUTH_REQUIRED=true` in the `.env` file to enable admin authentication

If `ADMIN_TOKEN` is not set in the backend, admin authentication will be disabled and all users will have access to the history API.

## Accessing Admin Features

The history page at `/history` is restricted to administrators only when admin authentication is enabled.

When visiting the page, users will be presented with a login form requesting an admin token. This token must match the value of `ADMIN_TOKEN` set in the backend environment.

## API Authentication

Backend API endpoints for administrative features use Bearer token authentication. The token must be included in the `Authorization` header of the request:

```
Authorization: Bearer your-admin-token
```

### Protected Endpoints

The following API endpoints require admin authentication:

- `GET /api/history` - List of generation records
- `GET /api/history/:id` - Details of a specific generation record

### Verifying Admin Access

To verify that an admin token is valid, you can make a request to:

```
POST /api/admin/verify
```

With the header:

```
Authorization: Bearer your-admin-token
```

## Security Considerations

- Use a strong, random token for the `ADMIN_TOKEN` value
- In production, always use HTTPS to protect the admin token during transmission
- Consider implementing rate limiting for admin login attempts to prevent brute force attacks
- Regularly rotate the admin token for enhanced security

## Implementation Details

The admin authentication system is implemented through:

1. A middleware in the backend that validates the admin token for protected endpoints
2. A client-side validation in the frontend that stores the token in a cookie after verification
3. All API requests from the admin interface include the token in the `Authorization` header
