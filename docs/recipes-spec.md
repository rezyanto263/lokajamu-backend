# RECIPES API SPECIFICATIONS

---

## Get Recipe Details API

**Endpoint :** GET /api/recipes/:id

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "data": {
    "recipe": {
      "id": 1,
      "name": "Jamu Kunyit Asam",
      "tags": ["Asam", "Kunyit", ...another tag],
      "description": "Jamu yang terbuat dari kunyit, asam jawa, gula aren, garam, dan air. Jamu ini memiliki khasiat sebagai analgesik (pereda nyeri), antipiretik (mencegah dan menurunkan demam), dan anti inflamasi.",
      "imageUrl": "https://storage.googleapis.com/lokajamu/recipes/image.png",
      "ingredients": [
        {
          "name": "Kunyit segar",
          "quantity": "100 gram",
          "notes": "Kupas dan cuci bersih, lalu parut atau blender"
        },
        {
          ...another ingredient
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "instruction": "Kupas kulit kunyit, lalu cuci bersih dan parut atau blender hingga halus."
        },
        {
          ...another step
        },
      ],
      "prepTime": "10 menit",
      "cookTime": "30 menit",
      "totalTime": "40 menit",
      "servingSize": "4 cangkir",
      "tips": [
        "Jamu kunyit asam bisa disimpan dalam botol kaca di dalam kulkas selama 3-4 hari.",
        "Jika tidak ada kunyit segar, gunakan 1-2 sendok makan kunyit bubuk."
      ]
    }
  }
}
```

**Response Fail Body :**

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Recipe not found"
}
```

---

## Get All / Search Recipes API

**Endpoints :** 

- GET /api/recipes
- GET /api/recipes?search=jamu

**Request Query :**
- search : Search by name, ingredient, and tags using like (optional)

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "data": {
    "recipes": [
      {
        "id": 1,
        "name": "Jamu Kunyit Asam",
        "tags": ["Asam", "Kunyit", ...another tag],
        "imageUrl": "https://storage.googleapis.com/lokajamu/recipes/image.png",
        "prepTime": "10 menit",
        "cookTime": "30 menit",
        "totalTime": "40 menit",
        "servingSize": "4 cangkir",
      },
      {
        ...another recipe
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
  "message": "Recipe not found"
}
```

---

## Add Recipe API

**Endpoint :** POST /api/recipes

**Headers :**
- Authorization : token

**Request Body :**

- Content-Type : multipart/form-data

| Key                | Value                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------|
| `name`             | Jamu Kunyit Asam                                                                               |
| `tags[0]`          | Asam                                                                                           |
| `tags[1]`          | Kunyit                                                                                         |
| `tags[n]`          | ...another tag                                                                                 |
| `description`      | Jamu yang terbuat dari kunyit, asam jawa, gula aren, garam, dan air. Jamu ini memiliki khasiat...|
| `image`            | jamu-kunyit-asam.png                                       |
| `ingredients[0][name]`     | Kunyit segar                                                                           |
| `ingredients[0][quantity]` | 100 gram                                                                               |
| `ingredients[0][notes]`    | Kupas dan cuci bersih, lalu parut atau blender                                         |
| `ingredients[n][...]`       | ...another ingredient                                                                  |
| `steps[0][stepNumber]`      | 1                                                                                     |
| `steps[0][instruction]`     | Kupas kulit kunyit, lalu cuci bersih dan parut atau blender hingga halus.             |
| `steps[n][...]`             | ...another step                                                                        |
| `prepTime`         | 10 menit                                                                                       |
| `cookTime`         | 30 menit                                                                                       |
| `servingSize`      | 4 cangkir                                                                                      |
| `tips[0]`          | Jamu kunyit asam bisa disimpan dalam botol kaca di dalam kulkas selama 3-4 hari.                |
| `tips[1]`          | Jika tidak ada kunyit segar, gunakan 1-2 sendok makan kunyit bubuk.                             |


**Response Success Body :**

- 201 : Created

```json
{
  "status": "success",
  "data": {
    "recipeId": 1,
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
    }
  ]
}
```

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to add a new recipes"
}
```

- 409 : Conflict

```json
{
  "status": "fail",
  "message": "Recipe name already been made"
}
```

---

## Update Recipe API

**Endpoint :** PUT /api/recipes/:id

**Headers :**
- Authorization : token

**Request Body :**

- Content-Type : multipart/form-data

| Key                | Value                                                                                           |
|--------------------|-------------------------------------------------------------------------------------------------|
| `name`             | Jamu Kunyit Asam                                                                               |
| `tags[0]`          | Asam                                                                                           |
| `tags[1]`          | Kunyit                                                                                         |
| `tags[n]`          | ...another tag                                                                                 |
| `description`      | Jamu yang terbuat dari kunyit, asam jawa, gula aren, garam, dan air. Jamu ini memiliki khasiat...|
| `image`            | jamu-kunyit-asam.png                                       |
| `ingredients[0][name]`     | Kunyit segar                                                                           |
| `ingredients[0][quantity]` | 100 gram                                                                               |
| `ingredients[0][notes]`    | Kupas dan cuci bersih, lalu parut atau blender                                         |
| `ingredients[n][...]`       | ...another ingredient                                                                 |
| `steps[0][stepNumber]`      | 1                                                                                     |
| `steps[0][instruction]`     | Kupas kulit kunyit, lalu cuci bersih dan parut atau blender hingga halus.             |
| `steps[n][...]`             | ...another step                                                                       |
| `prepTime`         | 10 menit                                                                                       |
| `cookTime`         | 30 menit                                                                                       |
| `servingSize`      | 4 cangkir                                                                                      |
| `tips[0]`          | Jamu kunyit asam bisa disimpan dalam botol kaca di dalam kulkas selama 3-4 hari.                |
| `tips[1]`          | Jika tidak ada kunyit segar, gunakan 1-2 sendok makan kunyit bubuk.                             |

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "data": {
    "recipeId": 2,
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
    }
  ]
}
```

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to edit recipes"
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Recipe not found"
}
```

- 409 : Conflict

```json
{
  "status": "fail",
  "message": "Recipe name already been made"
}
```

---

## Delete Recipe API

**Endpoint :** DELETE /api/recipes/:id

**Headers :**
- Authorization : token

**Response Success Body :**

- 200 : OK

```json
{
  "status": "success",
  "message": "Recipe deleted successfully"
}
```

**Response Fail Body :**

- 403 : Forbidden

```json
{
  "status": "fail",
  "message": "You don't have an access to delete recipes"
}
```

- 404 : Not Found

```json
{
  "status": "fail",
  "message": "Recipe already deleted"
}
```

---
