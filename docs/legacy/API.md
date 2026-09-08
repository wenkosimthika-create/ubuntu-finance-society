# API Documentation - Ubuntu Finance Society

## Base URL
```
http://localhost:3001/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses follow this format:

### Success Response
```json
{
  "status": "success",
  "data": {},
  "message": "Operation completed"
}
```

### Error Response
```json
{
  "status": "error",
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword",
  "roleId": "role-uuid"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "Member"
    },
    "token": "jwt-token"
  }
}
```

#### POST /auth/login
Log in a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {...},
    "token": "jwt-token"
  }
}
```

#### POST /auth/logout
Log out the current user.

**Response:**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

### Groups

#### POST /groups
Create a new group.

**Required Role**: Admin

**Request Body:**
```json
{
  "name": "Soweto Stokvel",
  "description": "Monthly savings group",
  "type": "STOKVEL",
  "foundedDate": "2024-01-01"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "group-uuid",
    "name": "Soweto Stokvel",
    "type": "STOKVEL",
    "status": "ACTIVE",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### GET /groups/:id
Get group details.

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "group-uuid",
    "name": "Soweto Stokvel",
    "description": "Monthly savings group",
    "type": "STOKVEL",
    "status": "ACTIVE",
    "memberCount": 15,
    "totalBalance": 25000,
    "currency": "ZAR",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PATCH /groups/:id
Update group settings.

**Required Role**: Admin

**Request Body:**
```json
{
  "description": "Updated description",
  "settings": {
    "meetingFrequency": "MONTHLY",
    "contributionAmount": 500
  }
}
```

### Members

#### GET /groups/:id/members
List group members.

**Response:**
```json
{
  "status": "success",
  "data": {
    "members": [
      {
        "id": "member-uuid",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "status": "ACTIVE",
        "joinDate": "2024-01-15",
        "role": "Treasurer",
        "balance": 1500
      }
    ],
    "total": 1,
    "active": 1
  }
}
```

#### POST /groups/:id/members
Add a member to the group.

**Required Role**: Treasurer, Admin

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+27123456789"
}
```

### Contributions

#### POST /groups/:id/contributions
Record a contribution.

**Required Role**: Treasurer

**Request Body:**
```json
{
  "memberId": "member-uuid",
  "amount": 500,
  "description": "Monthly contribution",
  "date": "2024-09-06"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "contribution-uuid",
    "memberId": "member-uuid",
    "amount": 500,
    "currency": "ZAR",
    "status": "RECORDED",
    "date": "2024-09-06",
    "createdAt": "2024-09-06T10:00:00Z"
  }
}
```

#### GET /groups/:id/contributions
Get contribution ledger.

**Query Parameters:**
- `memberId` (optional) - Filter by member
- `startDate` (optional) - Filter from date
- `endDate` (optional) - Filter to date
- `page` (optional) - Pagination (default: 1)
- `limit` (optional) - Items per page (default: 20)

**Response:**
```json
{
  "status": "success",
  "data": {
    "contributions": [...],
    "total": 150,
    "page": 1,
    "limit": 20
  }
}
```

#### GET /groups/:id/members/:memberId/statement
Get member statement.

**Response:**
```json
{
  "status": "success",
  "data": {
    "memberId": "member-uuid",
    "name": "Jane Smith",
    "totalContributions": 5000,
    "totalWithdrawals": 1000,
    "balance": 4000,
    "currency": "ZAR",
    "currency": "ZAR",
    "asOfDate": "2024-09-06",
    "transactions": [...]
  }
}
```

### Reports

#### GET /groups/:id/reports/summary
Get monthly summary.

**Response:**
```json
{
  "status": "success",
  "data": {
    "groupId": "group-uuid",
    "period": "2024-09",
    "totalContributions": 7500,
    "totalWithdrawals": 2000,
    "netChange": 5500,
    "endBalance": 25500,
    "memberCount": 15,
    "activeMembers": 14
  }
}
```

#### GET /groups/:id/reports/treasurer
Get treasurer report.

#### GET /groups/:id/reports/audit
Get audit trail.

**Query Parameters:**
- `startDate` (optional) - Filter from date
- `endDate` (optional) - Filter to date
- `action` (optional) - Filter by action type
- `page` (optional) - Pagination
- `limit` (optional) - Items per page

## Error Codes

- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input
- `DUPLICATE_ENTRY` - Resource already exists
- `INTERNAL_ERROR` - Server error

## Rate Limiting

- 100 requests per 15 minutes per IP
- Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Compliance

All responses include a compliance header:
```
X-Compliance-Notice: Ubuntu Finance Society does not hold, manage, invest, lend or transfer funds. Ubuntu Finance Society is a record-keeping and governance platform.
```
