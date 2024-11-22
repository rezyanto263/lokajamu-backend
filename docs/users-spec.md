# USERS API SPECIFICATION

---

## Get User Details API

**Endpoint :** GET /api/users/:id

**Headers :**
- Authorization : token

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "data": {
    "firstName": "Reza",
    "lastName": "Haryanto",
    "email": "example@gmail.com"
  }
}
```

**Response Fail Body :**

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Account not found"
}
```

---

## Update User API

**Endpoint :** PATCH /api/users/:id

**Headers :**

- Authorization : token

**Request Body :**

```json
{
  "firstName": "Reza",
  "lastName": "Haryanto V2",
  "email": "example2@gmail.com",
  "password": "new-secret-password",
  "updatedAt": "17 November 2024"
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Account updated successfully",
  "data": {
    "userId": 1
  }
}
```

**Response Fail Body :**

- 400 : Bad Request

```json
{
  "status": "fail",
  "message": "Data not valid",
  "errors": [
    {
      "field": "email",
      "message": "Email not valid"
    },
    {
      ...another error
    }
  ]
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Account not found"
}
```

---

## Login User API

**Endpoint :** POST /api/users/login

**Request Body :**

```json
{
  "email": "example@gmail.com",
  "password": "secret-password"
}
```

**Response Success Body :**

```json
{
  "status": "success",
  "data": {
    "token": "unique-token"
  }
}
```

**Response Fail Body :**

- 400 : Bad Request

```json
{
  "status": "fail",
  "message": "Data not valid",
  "errors": [
    {
      "field": "email",
      "message": "Email not valid"
    },
    {
      ...another error
    }
  ]
}
```

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "Wrong Email or Password"
}
```

---

## Register User API

**Endpoint :** POST /api/users

**Request Body :**

```json
{
  "firstName": "Reza",
  "lastName": "Haryanto",
  "email": "example@gmail.com",
  "password": "secret-password",
  "passwordConfirmation": "secret-password"
}
```

**Response Success Body :**

- 201 : Created

```json
{
  "status": "success",
  "message": "Account registered successfully",
  "data": {
    "userId": 1
  }
}
```

**Response Fail Body :**

- 400 : Bad Request

```json
{
  "status": "fail",
  "message": "Data not valid",
  "errors": [
    {
      "field": "email",
      "message": "Email not valid"
    },
    {
      ...another error
    }
  ]
}
```

- 409 : Conflict

```json
{
  "status": "fail",
  "message": "Account already registered"
}
```

---

## Forgot Password User API

**Endpoint :** PATCH /api/users/forgot-password

**Request Body :**

```json
{
  "email": "example@gmail.com"
}
```

**Response Succes Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Reset password token has been sent to the email"
}
```

**Response Fail Body :**


- 400 : Bad Request

```json
{
  "status": "fail",
  "message": "Data not valid",
  "errors": [
    {
      "field": "email",
      "message": "Email not valid"
    }
  ]
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Account not found"
}
```

---

## Verify Reset Token User API

**Endpoint :** PATCH /api/users/verify-reset-token

**Request Body :**

```json
{
  "email": "example@gmail.com",
  "resetCode": 401947,
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Reset token verified"
}
```

**Response Fail Body :**

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "Invalid token code, please provide a valid token"
}
```

---

## Reset Password API

**Endpoint :** PATCH /api/users

**Request Body**

```json
{
  "email": "example@gmail.com",
  "newPassword": "new-secret-password",
  "newPasswordConfirmation": "new-secret-password"
}
```
**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Password updated successfully"
}
```

**Response Fail Body :**

- 400 : Bad Request

```json
{
  "status": "fail",
  "message": "Password not valid",
  "errors": [
    {
      "field": "password",
      "message": "password at least minimum 8 characters"
    },
    {
      ...another error
    }
  ]
}
```

---

## Logout User API

**Endpoint :** DELETE /api/users/:id

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Logout Success"
}
```

**Response Fail Body :**

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "Unauthorized"
}
```

---