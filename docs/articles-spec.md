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

**Endpoint :** GET /api/articles

**Request Body :**
```json
{
  "title": "Manfaat Jamu untuk Kesehatan",
  "tags": ["Kesehatan", "Manfaat", "Batuk", ...another tag],
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

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to add articles"
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

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to update articles"
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