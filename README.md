# Tardygram (Instagram clone)

## Models

### User
* A String `username`
* A String `passwordHash`
* A String `profilePhotoUrl`

### Post
* A reference to user `user`
* A String `photoUrl`
* A String `caption`
* An array of String `tags`

### Comment
* A reference to a user `commentBy`
* A reference to a post `post`
* A string `comment`

## Routes

### Auth
* `POST /auth/signup`
  * creates a new user
  * responds with the created user
* `POST /auth/signin`
  * responds with a user
* `GET /auth/verify`
  * uses the `ensureAuth` middleware
  * responds with a user

### Posts
* `POST /posts`
  * requires authentication
  * creates a new post
  * responds with the new post
  * HINT: get the user who created the post from `req.user`.
* `GET /posts`
  * responds with a list of posts
* `GET /posts/:id`
  * responds with a post by id
  * should include the populated user
  * should include all comments associated with the post (populated with commenter)
    * HINT: You'll need to make two separate queries and a `Promise.all`
* `PATCH /posts/:id`
  * requires authentication
  * only can update the post caption
  * respond with the updated post
  * NOTE: make sure the user attempting to update the post owns it
* `DELETE /posts/:id`
  * requires authentication
  * deletes a post
  * responds with the deleted post
  * NOTE: make sure the user attempting to delete the post owns it
* `GET /posts/popular`
  * respond with a list of the 10 posts with the most comments

### Comments
* `POST /comments`
  * requires authentication
  * create a new comment
  * respond with the comment
  * HINT: get the user who created the comment from `req.user`.
* `DELETE /comments/:id`
  * requires authentication
  * delete a comment by id
  * respond with the deleted comment
  * NOTE: make sure the user attempting to delete the comment owns it

### Users
* BONUS:
  * `GET /users/popular`
    * respond with the 10 users with the most total comments on their posts
  * `GET /users/prolific`
    * respond with the 10 users with the most posts
  * `GET /users/leader`
    * respond with the 10 users with the most comments
  * `GET /users/impact`
    * respond with the 10 users with the highest `$avg` comments per post


## Plan

### User Model and auth routes

[X] create User model
[X] hash password with virtual (User model)
[X] create auth token with jwt (User model)
[X] signup route (auth route)
[X] authorize method  (User model)
[X] seed data (seed)
[X] login route (auth route)
[X] agent (data-helpers)
[X] findByToken method (User model)
[X] ensureAuth middleware (cookie-parser) (ensure-auth)
[X] verify route (auth route)

### Post (gram) Model and post (grams) routes

[X] Gram model
[X] grams post route
[] grams get all route
[] grams get (id) route
[] grams patch route
[] grams delete route
[] grams popular aggregate route

### Comment Model and comments routes

[] Comment model
[] comments post route
[] comments delete route

### users routes

[] get popular aggregate route
[] get prolific aggregate route
[] get leader aggregate route
[] get impact aggregate route