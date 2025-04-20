# 🌥️ Cloud Computing Team
| Name | Bangkit ID | Profile |
| ---- | ---------- | -------- |
| Muhammad Reza Haryanto | C403B4KY3034 | [GitHub](https://github.com/rezyanto263) |
| Muhammad Gian Novridan | C318B4KY2638 | [GitHub](https://github.com/jack12-dev) |


## 📋 Overview
Welcome to the **Cloud Computing Team**! We specialize in building scalable and efficient cloud-based solutions. Our current stack leverages Google Cloud Platform (GCP) services to deliver robust, reliable, and high-performance applications. 

## 🔧 Tech Stack
Here's a breakdown of the tools and services we use:

### 1. **Backend API**
- **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Hosting Service:** Google App Engine
  - Enables auto-scaling and seamless deployment.
  - Simplifies API management with built-in support for versioning and load balancing.

### 2. **Relational Database**
- **Service:** Google Cloud SQL (MySQL)
  - Ensures data integrity and supports complex queries for relational data.
  - Automatically handles replication, backups, and failover for high availability.

### 3. **Storage**
- **Service:** Google Cloud Storage
  - Stores images and trained Machine Learning models.
  - Provides easy access through bucket configurations with fine-grained security settings.

## 🚀 How It Works
### Backend API
1. The Node.js & Express application runs as a service on Google App Engine.
2. App Engine listens on the specified `PORT` (default: `8080`) for incoming requests.
3. The API handles user requests, performs validations, and interacts with Cloud SQL or Cloud Storage as needed.

### Relational Database
- Cloud SQL is used to store structured data such as user accounts, contents, or metadata about uploaded images.

### File Storage
- Large files, such as images or pre-trained ML models, are uploaded to Google Cloud Storage buckets.
- The backend API generates signed URLs for secure file uploads/downloads.

## 📂 Project Structure
```plaintext
├── docs/                  # API Specifications
├── src/
│   ├── config/            # Configuration files (e.g., database, environment settings)
│   ├── controllers/       # Logic for handling incoming requests (business logic)
│   ├── models/            # Database models (SQL queries)
│   ├── middlewares/       # Middleware functions (e.g., authentication, validation)
│   ├── routes/            # API route definitions (maps endpoints to controllers)
│   ├── services/          # Service layer for interacting with models or external APIs
│   ├── validations/       # Request validation logic (e.g., Express-validator schema)
│   └── utils/             # Utility functions (e.g., error handling, helper methods)
├── README.md              # Project documentation
├── package.json           # Node.js dependencies and scripts
├── app.yaml               # Google App Engine configuration
└── .env                   # Environment variables
```

## 🌐 Cloud Architecture
![image](https://github.com/user-attachments/assets/0ee4452c-b6bf-486b-8848-4ddd555be536)
