# USERS API SPECIFICATION

---

## Get User Details API

**Endpoint :** GET /api/users/current

**Headers :**
- Authorization : Bearer Token

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "data": {
    "firstName": "Reza",
    "lastName": "Haryanto",
    "email": "example@gmail.com",
    "createdAt": "26-11-2024 19:50:47",
    "updatedAt": "26-11-2024 20:23:01"
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

**Endpoint :** PATCH /api/users/current

**Headers :**

- Authorization : Bearer Token

**Request Body :**

```json
{
  "firstName": "Reza",
  "lastName": "Haryanto V2", // optional
  "email": "example2@gmail.com",
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Account updated successfully",
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
    "token": "unique-jwt-token"
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

**Endpoint :** POST /api/users/register

**Request Body :**

```json
{
  "firstName": "Reza",
  "lastName": "Haryanto", // optional
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

**Endpoint :** POST /api/users/forgotpassword

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
  "message": "Reset password token has been sent to the email",
  "data": {
    "resetTokenExpire": "26-11-2024 20:23:01"
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

**Endpoint :** POST /api/users/resettoken

**Request Body :**

```json
{
  "resetToken": 401947,
  "email": "example@gmail.com",
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "The reset token has been verified",
  "data": {
      "token": "unique-jwt-token"
  }
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

## Change Password API

**Endpoint :** PATCH /api/users/changepassword

**Request Body**

```json
{
  "password": "new-secret-password",
  "passwordConfirmation": "new-secret-password"
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
      "message": "Password must contain one uppercase letter, one lowercase letter, and one number."
    },
    {
      ...another error
    }
  ]
}
```

---