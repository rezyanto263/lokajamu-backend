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

- Content-Type : multipart/form-data

| Key                    | Value                                      |
|------------------------|--------------------------------------------|
| `title`                | Manfaat Jamu untuk Kesehatan               |
| `tags[0]`              | Kesehatan                                  |
| `tags[1]`              | Manfaat                                    |
| `tags[2]`              | Batuk                                      |
| `tags[n]`              | ...another tag                             |
| `image`                | article-image.png                          |
| `contents[0][type]`    | subtitle                                   |
| `contents[0][text]`    | 5 Manfaat Jamu bagi Kesehatan              |
| `contents[1][type]`    | paragraph                                  |
| `contents[1][text]`    | Isi paragraph 1                            |
| `contents[2][type]`    | paragraph                                  |
| `contents[2][text]`    | Isi paragraph 2                            |
| `contents[n][...]`     | ...another content                         |

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

**Endpoint :** PUT /api/articles/:id

**Request Body :**

- Content-Type : multipart/form-data

| Key                    | Value                                      |
|------------------------|--------------------------------------------|
| `title`                | Manfaat Jamu untuk Kesehatan               |
| `tags[0]`              | Kesehatan                                  |
| `tags[1]`              | Manfaat                                    |
| `tags[2]`              | Batuk                                      |
| `tags[n]`              | ...another tag                             |
| `image`                | article-image.png                          |
| `contents[0][type]`    | subtitle                                   |
| `contents[0][text]`    | 5 Manfaat Jamu bagi Kesehatan              |
| `contents[1][type]`    | paragraph                                  |
| `contents[1][text]`    | Isi paragraph 1                            |
| `contents[2][type]`    | paragraph                                  |
| `contents[2][text]`    | Isi paragraph 2                            |
| `contents[n][...]`     | ...another content                         |

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