# 1. Music App

Single Page Application (SPA) for browsing, creating, and managing music albums.
Built with JavaScript and REST API, focusing on authentication, CRUD operations, and dynamic UI rendering.

## 2. Overview

**Music App** is a client-side application where users can explore albums and manage their own content.

### Users can:

* Browse all albums
* View album details
* Register and login
* Create new albums
* Edit and delete their own albums
* (Bonus) Search albums by name

## 3. Tech Stack

* JavaScript (ES6+)
* REST API (SoftUni local server)
* HTML & CSS
* Client-side rendering (SPA approach)

## 4. Application Structure
```
src/
  api/        → HTTP requests (data layer)
  views/      → UI pages
  utils/      → helpers & session logic
  app.js      → routing & initialization
```

## 5. Authentication

The application supports full user authentication:

* Register
* Login
* Logout

### Behavior:

* Session is stored in `sessionStorage`
* Navigation updates dynamically
* Authenticated users gain access to additional features

## 6. Features

### - Home Page
* Static landing page
* Accessible by all users

### - Catalog Page
* Displays all albums
* Sorted by creation date
* Guests can view albums
* Logged users can access details

### - Create Album
Available only for logged-in users.
On success → redirects to Catalog

### - Album Details
* Displays full album information
* Conditional actions based on ownership:

Guest - view only
Owner - Edit & Delete

### - Edit Album
* Accessible only to the creator
* Pre-filled form
* Full validation before submit

### - Delete Album
* Confirmation dialog before deletion
* Redirects to Catalog after success

### - Search
* Filter albums by name
* Works for both guests and users
* Displays results dynamically


## 7. Core Logic

### - Authorization

* Auth token is stored after login/register
* Sent via `X-Authorization` header for protected requests

### - Conditional Rendering
UI changes depending on:

* Authentication state
* Ownership of content

### - Data Handling

* Fetch albums with sorting and filtering
* Full CRUD operations via REST API
* No partial updates (PUT replaces entire object)

## 8. API Endpoints

### Users

* POST `/users/register`
* POST `/users/login`
* GET `/users/logout`

### Albums

* GET `/data/albums`
* POST `/data/albums`
* GET `/data/albums/:id`
* PUT `/data/albums/:id`
* DELETE `/data/albums/:id`

## 9. Key Implementation Highlights

* SPA without page reloads
* Clean separation between data and UI layers
* Role-based UI behavior
* Form validation and error handling
* Query-based search functionality

## 10. Getting Started

### - install dependencies
npm install

### - start REST service
node server.js

### - run app
npm start

## 11. Screenshots
### - guest view
  * home view
  <p>
    <img src="https://github.com/user-attachments/assets/cca7ebbb-9581-4b07-b4e0-44cacb99ce21" width="48%" />
  </p>

  * catalog view
  <p>
    <img src="https://github.com/user-attachments/assets/860f1e29-530f-488e-b210-0df2e55d6678" width="48%" />
  </p>

  * details view
  <p>
    <img width="48%" alt="image" src="https://github.com/user-attachments/assets/572f7d68-8c29-4791-b41d-9f26bb19e106" />
  </p>

  * search view
  <p>
    <img width="48%" alt="image" src="https://github.com/user-attachments/assets/5d38f565-3014-471f-8692-ce63b3f02e72" />
  </p>

  * login and register view
<p>
  <img src="https://github.com/user-attachments/assets/e0f370ff-213a-4d94-9456-dac1f4b7be6c" width="48%" />
  <img src="https://github.com/user-attachments/assets/24bcf7ec-e26e-48aa-914b-65d8bd1f0c88" width="48%" />
</p>

### - user view

  * create view
    <p>
      <img width="48%" alt="image" src="https://github.com/user-attachments/assets/72029794-8256-48f6-82fa-30ecc9083e76" />
    </p>

  * my album details view
    <p>
      <img width="48%" alt="image" src="https://github.com/user-attachments/assets/ef6a59c0-fc88-4163-8569-6d864a8f5a2e" />
    </p>
