# Skyfringe

## Description

[App] A fullstack social media application built using the MERN stack and Typescript. Front-end application is fully tested with Vitest and React Testing Library. Back-end application is tested with Supertest and mongodb-memory-server. AWS S3 is used to store images. The Microsoft Azure Computer Vision API is used to AI-generate alt text for images. The Giphy API is used for the chat-based section of Skyfringe to allow users to send GIFs and stickers to their friends. Hosted the front-end with Netlify and the back-end with Heroku.

> See it live on [https://skyfringe.netlify.app](https://skyfringe.netlify.app)

## Development Features

Creating an application that emcompasses everything I have learned using the MERN Stack with Typescript.

Beyond that, other learning outcomes were:

- Using the Giphy API to allow users to upload GIFs and stickers in the chat application
- Using Socket.io for real-time communication for the chat section of Skyfringe
- Using the Microsoft Azure Computer Vision API to generate alt text
- Using Test-Driven-Development to build features
- Using a 'Toast' component to give user feedback on certain actions like creating posts, making a change to their profile picture, etc.
- Building custom skeleton components for when the application is loading
- Using passport.js for authentication using the Local Strategy and Facebook authentication with JWT tokens stored in HTTP only cookies.
- Creating testing configuration for testing purposes, including seeding the database, and setting up "mongodb-memory-server"
- Creating custom Express.js middleware for useful functions. See the "/middleware" folder in "/server" to see some of the functionality.
- Writing an npm script to populate database. 
- Using "react-css-modules" for styling purposes.
- Using custom React hooks for data fetching, features like adding keyboard support for menu, and for implementing expected UX features like pressing "Esc" or clicking away to close a menu.
- Substantial testing on the back-end using "supertest" and "mongodb-memory-server" for testing API endpoints.
- Substantial testing on the front-end using Vitest and React Testing Library for testing front-end functionality.

## Features

1. Allows users to authenticate by using a guest user, creating their own account, or OAuth with Facebook.
2. Allows users to perform CRUD operations on posts and comments.
3. Providing suggestions for users based on their friends and mutual connections.
4. Allowing users to send, cancel, reject, and accept friend requests. Allows users to unfriend their friends.
5. Allows users like posts and comments.
6. Allows users to change their profile details including their full name, bio, password information, profile picture, and cover picture.
7. Allows users to delete their accounts.
8. Allows users to chat with their friends in real-time using Socket.io. Users can send messages, emojis, GIFs, stickers, and emojis.
9. Allows users to see notifications based on certain events like a user liking their post/comment, or a user sending out accepting/rejecting/cancelling/sending/unfriending requests.
10. Allows users to see their posts, liked posts, friends, and all images related to that user in their profile page.
11. Allows a user to search for other uses using the search bar on the aside of the page.
12. Allows users to log out.
15. Highly focused on accessibility for keyboard users and users who use screen readers.
16. Responsive design

## Screenshots


![Home Page](https://github.com/OptimisticTrousers/skyfringe/assets/36343664/ad3e2ced-c30c-44ef-a72b-d382e00b8069)

![Friends Page](https://github.com/OptimisticTrousers/skyfringe/assets/36343664/ef81c4e8-a1c7-4c20-bfad-36bf001765e0)
![Chat Page](https://github.com/OptimisticTrousers/skyfringe/assets/36343664/49aa0bc5-89b1-43c2-95dd-ea6e74c3d70e)

![Settings Page](https://github.com/OptimisticTrousers/skyfringe/assets/36343664/d619580f-3958-4042-a741-83aa1cd389f9)

![Profile Page](https://github.com/OptimisticTrousers/skyfringe/assets/36343664/baa24b02-f3ab-4c8f-a7c7-d4e4cef993ac)


## Showcase

[skyfringe.webm](https://github.com/OptimisticTrousers/skyfringe/assets/36343664/d90a5596-a7ed-4fa2-b021-ba71c742d8c7)

## Development

### Javascript Framework(s)

- [React](https://github.com/facebook/create-react-app)

### Technologies used

- [Typescript](https://www.typescriptlang.org/) - Static typing in JavaScript
- [Jest](https://jestjs.io/) - Assertion and test running library
- [Vitest](https://vitest.dev/) - Unit testing framework that works especially well with Vite applications
- [Supertest](https://github.com/ladjs/supertest) - Super-agent driven library for testing node.js HTTP servers using a fluent API
- [mongodb-memory-server](https://nodkz.github.io/mongodb-memory-server/) - Spins up a fresh in-memory mongoDB server that you can connect to with mongoose, and then use for your testing environment
- [Passport](https://www.passportjs.org/) - Authentication library for Node.js
- [AWS S3](https://aws.amazon.com/s3/) - Storage bucket for images
- [Microsoft Azure Computer Vision API](https://learn.microsoft.com/en-us/javascript/api/overview/azure/cognitive-services?view=azure-node-latest) - API used to analyze images, read, and text using AI
- [Multer-S3](https://github.com/anacronw/multer-s3) - storage engine for Amazon S3
- [Mongoose](https://mongoosejs.com/) - ODM for MongoDB
- [Socket.io](https://socket.io/) - WebSocket library
- [Emoji Picker](https://github.com/ealush/emoji-picker-react) - UI library
- [React Router](https://reactrouter.com/en/main) - Client-side routing
- [React CSS Modules](https://github.com/gajus/react-css-modules) - CSS with local scoping
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database

![My Skills](https://skills.thijs.gg/icons?i=js,react,css,html,aws,jest,mongo,vite,azure,ts,heroku,netlify)


## API Endpoints

| Method |                Endpoint                |                                       Description                                       |                 Required fields                | JSON Web Token (JWT) required |
|:------:|:--------------------------------------:|:---------------------------------------------------------------------------------------:|:----------------------------------------------:|:-----------------------------:|
|   GET  |               /api/users               |                              Get all users (public details)                             |                        -                       |               ✅               |
|   GET  |           /api/users/:userId           |                                Get a user (public details)                              |                        -                       |               ✅               |
|   GET  |        /api/users/:userId/chats        |                                     Get user chats                                      |                        -                       |               ✅               |
|   PUT  |           /api/users/:userId           |                                   Update user details                                   |fullName,bio,oldPassword,newPassword,passwordCon|               ✅               |
|   PUT  |        /api/users/:userId/avatar       |                                 Update user profile pic                                 |                image, imageUpdated             |               ✅               |
|   GET  |     /api/users/:userId/notifications   |                                Get all user notifications                               |                        -                       |               ✅               |
| DELETE |     /api/users/:userId/notifications   |                                Delete all user notifications                            |                        -                       |               ✅               |
|   GET  |   /api/users/:userId/notifications/:id |                                 Delete user notification                                |                        -                       |               ✅               |
|   PUT  |        /api/users/:userId/cover        |                                   Update user cover pic                                 |                image, imageUpdated             |               ✅               |
|   GET  |        /api/users/:userId/images       |                             Get all images related to a user                            |                        -                       |               ✅               |
| DELETE |           /api/users/:userId           |                                   Delete single user                                    |                        -                       |               ✅               |
|   GET  |         /api/users/:userId/feed        |                   Get all posts making up a user's feed, sorted by date recency         |                        -                       |               ✅               |
|   GET  |         /api/search-users/:query       |                                    Search for users                                     |                      query                     |               ✅               |
|   GET  |               /api/posts               |                                      Get all posts                                      |                        -                       |               ✅               |
|  POST  |               /api/posts               |                                      Add new post                                       |                  image, content                |               ✅               |
|   PUT  |        /api/posts/:postId/likes        |                   Like a single post (i.e. add new user to likes array)                 |                        -                       |               ✅               |
|   PUT  |           /api/posts/:postId           |                                 Update single post by ID                                |                  image, content                |               ✅               |
| DELETE |           /api/posts/:postId           |                                   Delete a post by ID                                   |                        -                       |               ✅               |
|   PUT  |           /api/posts/:postId           |                                    Edit a post by ID                                    |                content, img_url                |               ✅               |
|   GET  |       /api/posts/:postId/comments      |                             Retrieve the comments on a post                             |                        -                       |               ✅               |
|  POST  |       /api/posts/:postId/comments      |                                Create a comment on a post                               |                     content                    |               ✅               |
| DELETE |        /api/comments/:commentId        |                                  Delete a comment by ID                                 |                        -                       |               ✅               |
|   PUT  |        /api/comments/:commentId        |                                   Edit a comment by ID                                  |                     content                    |               ✅               |
|   PUT  |     /api/comments/:commentId/likes     |                                 Like a comment on a post                                |                        -                       |               ✅               |
|   GET  |        /api/comments/:commentId        |                                 Retrieve a comment by ID                                |                        -                       |               ✅               |
|   GET  |           /api/users/:userId           |                              Retrieve a user's information                              |                        -                       |               ✅               |
|   GET  |               /api/chat                |                                       Get chat                                          |                     friend                     |               ✅               |
|  POST  |        /api/chat/:chatId/messages      |                                    Add a new message                                    |                   requestType                  |               ✅               |
|   PUT  |        /api/friends/:userId            |     Handle all friend requests. API call MUST specify requestType in the request body   |                  image, content                |               ✅               |
|  POST  |            /api/auth/current           |                            Return the currently logged in user                          |                        -                       |               ✅               |
|  POST  |         /api/auth/login/facebook       |                 Authenticate using Facebook and return JWT token in a cookie            |                        -                       |               ❌               |
|  POST  |             /api/auth/login            |                          Authenticate a user and return JWT token                       |               userName, password               |               ❌               |
|  POST  |            /api/auth/register          |                    Register user and return JWT token inside of a cookie                |        fullName, userName, email, password     |               ❌               |


<h2 style='width:100%;text-align:center'>How To Use</h2>

- Clone this Repo
- Install Dependencies inside of the "/web" directory from the root project and run the server

  ```bash
  cd web/ && npm install && npm run dev
  ```
  
- Install Dependencies inside of the "/server" directory from the root project and run the server

  ```bash
  cd server/ && npm install && npm run dev
  ```

- Add `env` file in the root folder of the "/app" directory:

  ```bash
  VITE_API_DOMAIN=https://example-api.com/api
  VITE_BASE_DOMAIN=https://example-api.com
  VITE_S3_BUCKET=https://examplebucketname.s3.amazonaws.com
  GIPHY_API_KEY=[YOUR KEY HERE]
  VITE_FACEBOOK_APP_ID=[YOUR ID HERE]
  ```

- Add `env` file in the root folder of the "/server" directory:

  ```bash
  DB_STRING=mongodb+srv://example:password@cluster0.8deylk9.mongodb.net/skyfringe?retryWrites=true&w=majority
  JWT_SECRET=bob
  PORT=5000
  AWS_BUCKET_NAME=https://examplebucketname.s3.amazonaws.com
  AWS_ACCESS_KEY_ID=[YOUR AWS S3 ACCESS KEY ID HERE]
  AWS_SECRET_ACCESS_KEY=[YOUR AWS S3 SECRET ACCESS KEY HERE]
  AZURE_KEY=[YOUR MICROSOFT AZURE KEY HERE]
  AZURE_ENDPOINT=[YOUR MICROSOFT AZURE ENDPOINT HERE]
  FRONTEND_URL=https://frontend.com
  FACEBOOK_APP_ID=[YOUR FACEBOOK APP ID HERE]
  FACEBOOK_APP_SECRET=[YOUR FACEBOOK APP SECRET HERE]

  ```
- Populate your database using my NPM script without any effort on your end!

  ```bash
  cd server && npm run seed
  ```


## Areas for Improvement

* [ ] Write more tests on the front-end and backend
* [ ] Make the application more accessible on the front-end to conform to WAI-ARIA standards
* [ ] Make the notifications section real-time
* [ ] Change color schemes and add more animations to the front-end
* [ ] Use React Query for data fetching

## Known Bugs

1. None
