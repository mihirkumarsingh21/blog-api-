# 📖 Blog API Backend (TypeScript + Node.js + Express + MongoDB)

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-darkgreen?logo=mongodb)

🚀 This project is created to **explore and learn TypeScript** by building **Blog API backend**.  
It covers essential features like authentication, post management, likes, comments, pagination, search, and more.  
---

## ✨ Features Implemented 
- 🔐 User Authentication (JWT)  
- 👥 Role Based Access Control (RBAC)  
- 🧑‍🔧 Update user profile (bio, avatar, etc.)
- 👀 View public user profile
- 🤝 Follow / Unfollow other users
-👇 View followers list
-☝️ View following list
- 📝 CRUD operations for Posts  
- 👍 Like & Dislike functionality  
- 💬 Comments system (Add, Update, Delete)  
- 📄 Pagination support for posts  
- 🔍 Search & Filter posts  
- 🗑️ Soft Delete for posts (flagging instead of permanent delete)  
- 👀 Unique Post View Count (per user)  
- 🕓 Draft and Publish post options
## 🏷️ Tags & Categories
- ➕ Add categories to posts
- 🔍 Fetch posts by specific category
- ➕ Add tags to posts
- 🏷️ Fetch posts filtered by tag
## ⭐ Bookmarks / Favorites
- 💾 Bookmark / Unbookmark posts
- 📚 View all bookmarked posts
## 📊 Trending Posts
🔥 Get trending posts based on user published between 7 days

### 📂 Project Structure
<img width="1366" height="768" alt="Screenshot 2025-10-08 075407" src="https://github.com/user-attachments/assets/8f5fbbf6-b3c1-48c6-a299-74630ccaa279" />
<img width="1366" height="768" alt="Screenshot 2025-10-08 075255" src="https://github.com/user-attachments/assets/e2e3af73-74ce-4831-a1cb-bc146de37ab5" />

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
|  🛠️ **PUT**  | `/profile/update`    | 🧑‍🔧 Update authenticated user profile |
|   👀 **GET**  | `/profile/:userId`  | 🧾 Get public user profile by ID        |
|  🤝 **PATCH** | `/follow/:userId`   | ➕ Follow or unfollow a user             |
|   👥 **GET**  | `/followers/:userId`| 👇 Get list of followers for a user     |
| 🚶‍♂️ **GET** | `/following/:userId`   | ☝️ Get list of users being followed     |


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

|    Method   | Endpoint                           | Middleware    | Description                                      |
| :---------: | :--------------------------------- | :------------ | :----------------------------------------------- |
| 🗂️ **PUT** | `/add-cateory/:postId`             | `authProtect` | ➕ Add a category to a post                       |
| 🗃️ **GET** | `/posts-by-category/:categoryName` | `authProtect` | 🔍 Get all posts under a specific category       |
| 🏷️ **PUT** | `/add-tag/:postId`                 | `authProtect` | ➕ Add a tag to a post                            |
| 🏷️ **GET** | `/post-by-tag/:tagName`            | `authProtect` | 🔎 Get posts filtered by a specific tag          |
|  📝 **GET** | `/get-draft-posts`                 | `authProtect` | 🕓 Get all draft posts of the authenticated user |
|  🌍 **GET** | `/get-published-post`              | —             | 📢 Get all published posts                       |
| 🔖 **POST** | `/bookmark/:postId`                | `authProtect` | 💾 Bookmark a post                               |
|  📚 **GET** | `/bookmarks`                       | `authProtect` | 🧾 Get all bookmarked posts                      |
|  🔥 **GET** | `/trending`                        | `authProtect` | 📈 Get trending posts                            |


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
`GET /api/v1/posts/get-post`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 224004" src="https://github.com/user-attachments/assets/6157abff-d1a0-45a4-9635-e641430af53c" />

### Get Posts with Pagination  
`GET /api/v1/posts/get-post/:page/:limit`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 223220" src="https://github.com/user-attachments/assets/9b980187-ab47-41a6-8a19-83c808b8ed62" />

### Get Single Post  
`GET /api/v1/posts/single-post/:postId`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 225211" src="https://github.com/user-attachments/assets/978f678a-ac88-4da6-b4b2-24cf1efc2b9f" />

---

## 🔹 Like Route

### Like / Unlike Post  
`POST /api/v1/posts/like-post/:postId`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 225450" src="https://github.com/user-attachments/assets/fe762e02-e3f8-4344-a2ef-b75d7e4b5d90" />

---

## 🔹 Comment Routes

### Add Comment  
`POST /api/v1/posts/add-comment/:postId`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 225548" src="https://github.com/user-attachments/assets/60e0e61a-3452-4a87-8842-5ebb73245c04" />

### Update Comment  
`PUT /api/v1/posts/post-update/:postId`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 225711" src="https://github.com/user-attachments/assets/80c0eb4a-0a04-47aa-8bdd-3132b3e07c2f" />


---

## 🔹 Search Route

### Search Posts  
`GET /api/v1/posts/search-post?query=keyword`  
<img width="1366" height="768" alt="Screenshot 2025-10-03 225912" src="https://github.com/user-attachments/assets/eb743682-bdce-44f8-825b-8d386f21b920" />

---



---

## 📅 Roadmap (Next Features) 
- 🛡️ Rate limiting & Caching  
- 🔔 Notifications system  
- 🚨 Reporting & Moderation  
- 📈 Analytics & SEO fields  

---




