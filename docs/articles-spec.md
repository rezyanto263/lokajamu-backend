# ARTICLES API SPECIFICATIONS

---

## Get Article Details API

**Endpoint :** GET /api/articles/:id

**Response Success Body :**

```json
{
  "status": "succes",
  "data": {
    "article": {
      "id": 1,
      "title": "Manfaat Jamu untuk Kesehatan",
      "tags": ["Kesehatan", "Manfaat", "Batuk", ...another tag],
      "imageUrl": "https://storage.googleapis.com/lokajamu-bucket/articleImage.png",
      "contents": [
        {
          "subtitle": "Rempah Pada Jamu",
          "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
        },
        {
          "subtitle": "",
          "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
        },
        {
          "subtitle": "",
          "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
        },
        {
          ...another content
        }
      ],
      "updatedAt": "Minggu, 17 Oktober 2024"
    }
  }
}
```

**Response Fail Body :**

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Article not found"
}
```

---

## Get All / Search Articles API

**Endpoints :** 

- GET /api/articles
- GET /api/articles?search=article

**Request Params :**
- search : Search by title and tags using like (optional)

**Response Success Body :**
```json
{
  "status": "succes",
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "Manfaat Jamu untuk Kesehatan",
        "tags": ["Kesehatan", "Manfaat", "Batuk", ...another tag],
        "imageUrl": "https://storage.googleapis.com/lokajamu-bucket/articleImage.png",
        "contents": [
          {
            "subtitle": "",
            "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
          },
          {
            "subtitle": "",
            "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
          },
          {
            "subtitle": "",
            "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
          },
          {
            ...another content
          }
        ],
        "updatedAt": "Minggu, 17 Oktober 2024"
      },
      {
        ...another article
      }
    ]
  }
}
```

**Response Fail Body :**

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Article not found"
}
```

---

## Add Article API

**Endpoint :** POST /api/articles

**Request Body :**
```json
{
  "title": "Manfaat Jamu untuk Kesehatan",
  "tags": ["Kesehatan", "Manfaat", "Batuk", ...another tag],
  "imageUrl": "https://storage.googleapis.com/lokajamu-bucket/articleImage.png",
  "contents": [
    {
      "subtitle": "",
      "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
    },
    {
      "subtitle": "Subtitle 1",
      "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
    },
    {
      "subtitle": "Subtitle 2",
      "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
    },
    {
      ...another content
    }
  ],
}
```

**Response Success Body :**

- 201 : Created

```json
{
  "status": "success",
  "data": {
    "articleId": 1,
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
      "field": "title",
      "message": "Article title already exist"
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
  "message": "You don't have an access to add articles"
}
```

- 409 : Conflict

```json
{
  "status": "fail",
  "message": "Article title already exist"
}
```

---

## Update Article API

**Endpoint :** PATCH /api/articles/:id

**Request Body :**

```json
{
  "title": "Manfaat Jamu untuk Kesehatan",
  "tags": ["Kesehatan", "Manfaat", "Batuk", ...another tag],
  "imageUrl": "https://storage.googleapis.com/lokajamu-bucket/articleImage.png",
  "contents": [
    {
      "subtitle": "",
      "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
    },
    {
      "subtitle": "5 Manfaat",
      "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
    },
    {
      "subtitle": "",
      "paragraph": ["Isi paragraf 1", "Isi paragraf 2", "Isi paragraf 3", ...another paragraph]
    },
    {
      ...another content
    }
  ],
  "updatedAt": "18 October 2024"
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Article updated successfully"
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
      "field": "title",
      "message": "Article title already exist"
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
  "message": "You don't have an access to update articles"
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Article not found"
}
```

- 409 : Conflict

```json
{
  "status": "fail",
  "message": "Article title already exist"
}
```

---

## Delete Article API

**Endpoint :** GET /api/articles/:id

**Headers :**
- Authorization : token

**Request Body :**
```json
{
  "id": 1
}
```

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Article deleted successfully"
}
```

**Response Fail Body :**

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to delete articles"
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Article not found"
}
```

---