# 📖 Blog API Backend (TypeScript + Node.js + Express + MongoDB)

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-darkgreen?logo=mongodb)

🚀 This project is created to **explore and learn TypeScript** by building a fully functional **Blog API backend**.  
It covers essential features like authentication, post management, likes, comments, pagination, search, and more.  

---

## ✨ Features Implemented (Phase 1)
- 🔐 User Authentication (JWT)  
- 👥 Role Based Access Control (RBAC)  
- 📝 CRUD operations for Posts  
- 👍 Like & Dislike functionality  
- 💬 Comments system (Add, Update, Delete)  
- 📄 Pagination support for posts  
- 🔍 Search & Filter posts  
- 🗑️ Soft Delete for posts (flagging instead of permanent delete)  
- 👀 Unique Post View Count (per user)  

---

## ⚙️ Tech Stack
- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT  
- **Other**: Bcrypt  

---

## 📌 API Routes

### 🔑 Auth
| Method | Endpoint      | Description |
|--------|--------------|-------------|
| POST   | `/register`  | Register a new user |
| POST   | `/login`     | Login user |
| GET    | `/logout`    | Logout user |

### 📝 Posts
| Method | Endpoint                     | Middleware         | Description |
|--------|------------------------------|-------------------|-------------|
| POST   | `/create`                    | authProtect        | Create a new post |
| GET    | `/get-post`                  | authProtect        | Get all posts |
| GET    | `/get-post/:page/:limit`     | authProtect        | Get posts with pagination |
| PUT    | `/update-post/:postId`       | authProtect, author| Update a post |
| DELETE | `/delete/:postId`            | authProtect, author| Soft delete a post |
| GET    | `/search-post`               | authProtect        | Search posts |
| GET    | `/single-post/:postId`       | authProtect        | Get a single post |

### 👍 Likes
| Method | Endpoint                     | Middleware   | Description |
|--------|------------------------------|-------------|-------------|
| POST   | `/like-post/:postId`         | authProtect | Like/Dislike a post |

### 💬 Comments
| Method | Endpoint                                       | Middleware   | Description |
|--------|------------------------------------------------|-------------|-------------|
| POST   | `/add-comment/:postId`                         | authProtect | Add a comment to a post |
| PUT    | `/post-update/:postId`                         | authProtect | Update a comment |
| DELETE | `/delete-comment/:commentId/post/:postId`      | authProtect | Delete a comment |

---

## 📡 API Endpoints Examples

---

## 🔹 Auth Routes

### Register User  
`POST /api/v1/users/register`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 165941" src="https://github.com/user-attachments/assets/d50fae36-75f1-4e8a-92c3-dec0a89af72c" />

### Login User  
`POST /api/v1/users/login`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 170057" src="https://github.com/user-attachments/assets/bbff0012-0cad-475a-9034-9882e2113749" />


### Logout User  
`GET /api/v1/users/logout`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 170319" src="https://github.com/user-attachments/assets/0318a6bd-6fb0-4198-8e07-d9d94a606d23" />

---

## 🔹 Post Routes

### Create Post  
`POST /api/v1/posts/create`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 171824" src="https://github.com/user-attachments/assets/dd3c956d-6ee7-493d-8557-188a304a2443" />

### Get All Posts  
`GET /api/posts/get-post`  
![Get Posts](./screenshots/get_posts.png)  

### Get Posts with Pagination  
`GET /api/posts/get-post/:page/:limit`  
![Pagination](./screenshots/pagination.png)  

### Get Single Post  
`GET /api/posts/single-post/:postId`  

### Update Post  
`PUT /api/posts/update-post/:postId`  
![Update Post](./screenshots/update_post.png)  

### Delete Post (Soft Delete)  
`DELETE /api/posts/delete/:postId`  
![Delete Post](./screenshots/delete_post.png)  

---

## 🔹 Like Route

### Like / Unlike Post  
`POST /api/posts/like-post/:postId`  
![Like Post](./screenshots/like_post.png)  

---

## 🔹 Comment Routes

### Add Comment  
`POST /api/posts/add-comment/:postId`  
![Add Comment](./screenshots/add_comment.png)  

### Update Comment  
`PUT /api/posts/post-update/:postId`  
![Update Comment](./screenshots/update_comment.png)  

### Delete Comment  
`DELETE /api/posts/delete-comment/:commentId/post/:postId`  
![Delete Comment](./screenshots/delete_comment.png)  

---

## 🔹 Search Route

### Search Posts  
`GET /api/posts/search-post?query=keyword`  
![Search](./screenshots/search.png)  

---



