# SPICES API SPECIFICATIONS

---

## Get Spice API

**Endpoint :** GET /api/spices/:id

**Response Success Body :**

```json
{
  "status": "success",
  "data": {
    "name": "Jahe Merah",
    "tags": ["Tag 1", "Tag 2", "Tag 3", ...another tag],
    "imageUrl": "https://storage.googleapis.com/lokajamu-bucket/jahe-merah.png",
    "decription": "Jahe merah adalah tanaman rimpang yang memiliki kulit luar berwarna merah tua dan daging berwarna merah muda kecokelatan. Jahe merah memiliki aroma yang kuat dan rasa yang lebih manis daripada jahe biasa.",
    "benefits": ["Manfaat 1", "Manfaat 2", "Manfaat 3", ...another benefits],
    "jamuList": ["Wedang Jahe Merah", "Jahe Merah Madu", ...another jamu]
  }
}
```

**Response Fail Body :**

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Spices not found"
}
```

---

## Get All / Search Spices API

**Endpoints :**

- GET /api/spices
- GET /api/spices?search=jahe

**Query Params**

- search : Search by name, tags, benefits using like. optional

**Response Success Body :**

```json
{
  "status": "success",
  "data": {
    "name": "Jahe Merah",
    "tags": ["Tag 1", "Tag 2", "Tag 3", ...another tag],
    "imageUrl": "https://storage.googleapis.com/lokajamu-bucket/jahe-merah.png",
  }
}
```

**Response Fail Body :**

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Spices not found"
}
```

---

## Add Spice API

**Endpoint :** POST /api/spices

**Headers :**

- Authorization : token

**Request Body :**

```json
{
  "name": "Jahe Merah",
  "tags": ["Tag 1", "Tag 2", "Tag 3", ...another tag],
  "description": "Jahe merah adalah tanaman rimpang yang memiliki kulit luar berwarna merah tua dan daging berwarna merah muda kecokelatan. Jahe merah memiliki aroma yang kuat dan rasa yang lebih manis daripada jahe biasa.",
  "benefits": "Jahe merah dapat membantu mengeluarkan racun, termasuk kolesterol jahat, dari tubuh.",
  "jamuList": ["Wedang Jahe Merah", "Jahe Merah Madu", ...another jamu]
}
```

**Response Success Body :**

- 201 : Created

```json
{
  "status": "success",
  "message": "Spice added successfully",
  "data": {
    "spiceId": 1
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
      "field": "imageUrl",
      "message": "Image required"
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
  "message": "Spice name already exist"
}
```

---

## Update Spice API

**Endpoint :** PUT /api/spices/:id

**Headers :**

- Authorization : token

**Request Body :**

```json
{
  "name": "Jahu Merah",
  "tags": ["Tag 1", ...another tag],
  "description": "Jahe merah adalah tanaman rimpang yang memiliki kulit luar berwarna merah tua dan daging berwarna merah muda kecokelatan.",
  "benefits": "Jahe merah dapat membantu mengeluarkan racun, termasuk kolesterol jahat, dari tubuh.",
  "jamuList": ["Wedang Jahe Merah", "Jahe Merah Madu", ...another jamu]
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Spice updated successfully",
  "data": {
    "spiceId": 1
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
      "field": "imageUrl",
      "message": "Image required"
    },
    {
      ...another error
    }
  ]
}
```

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to edit spices"
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Spice not found"
}
```

- 409 : Conflict

```json
{
  "status": "fail",
  "message": "Spice name already exist"
}
```

---

## Delete Spice API

**Endpoint :** DELETE /api/spices/:id

**Headers :**

- Authorization : token

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Spice deleted successfully"
}
```

**Response Fail Body :**

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to delete spices"
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Spice not found"
}
```