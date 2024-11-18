# NOTIFICATIONS API SPECIFICATIONS

---

## Get User All Notifications API

**Endpoint :** GET /api/users/:id/notifications

**Headers :**

- Authorization : token

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "data": {
    "notifications": [
      {
        "id": 1,
        "title": "Jangan lupa minum jamu ya!",
        "message": "Minum jamu setiap hari sampai mabuk, efektif menghilangkan stress dan penyakit",
        "createdAt": "18 Desember 2024"
      },
      {
        "id": 2,
        "title": "Jangan lupa minum jamu ya!",
        "message": "Minum jamu setiap hari sampai mabuk, efektif menghilangkan stress dan penyakit",
        "createdAt": "17 Desember 2024"
      },
      {
        ...another notification
      }
    ]
  }
}
```

**Response Fail Body :**

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "You don't have an access to view bookmarks"
}
```

---

## Add User Notification API

**Endpoint :** POST /api/users/:id/notifications

**Headers :**
- Authorization : token

**Request Body :**

```json
{
  "title": "Jangan lupa minum jamu!",
  "message": "Minum jamu setiap hari sampai mabuk, efektif menghilangkan stress dan penyakit"
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Notification added successfully"
}
```

**Response Fail Body :**

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "You don't have an access to add notifications"
}
```

---

## Add All Users Notification API

**Endpoint :** POST /api/notifications/broadcast

**Headers :**
- Authorization : token

**Request Body :**

```json
{
  "title": "Waktunya minum jamu!",
  "message": "Udah waktunya minum jamu nih, cuss check resepnya di Loka Jamu!",
}
```

**Response Success Body :**

- 201 : Created

```json
{
  "status": "success",
  "message": "Notification has sent to all users"
}
```

**Response Fail Body :**

- 401 : Unauthorized

```json
{
  "status": "fail",
  "message": "You don't have an access to add broadcast notifications"
}
```