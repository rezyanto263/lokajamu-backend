# USERS API SPECIFICATION

---

## Get User Details API

**Endpoint :** GET /api/users/:id

**Headers :**
- Authorization : token

**Response Success Body :**

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

**Endpoint :** PUT /api/users/:id

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

```json
{
  "status": "success",
  "message": "Account updated successfully"
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
  "message": "Data not valid"
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

**Headers :**

- Authorization : token

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
  "message": "Data not valid"
}
```

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "Wrong Password"
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
  "message": "Data not valid"
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

## Logout User API

**Endpoint :** DELETE /api/users/:id

**Response Success Body :**

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