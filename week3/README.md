# Week 3 Assignments

This folder contains the backend code for the week 3 assignments. The main goal was to build a functioning API that handles users and products with security features.


### What is covered

I set up a server using Express and connected it to a MongoDB database. The code is organized into different folders for APIs, data models, and middleware.

- Server Setup: The main server file connects to the database and routes requests to the right places. It also has a basic error handler to catch any issues.
- 
- User API: This handles user registration and login. When someone signs up, their password is hashed for safety. For login, it verifies the credentials and creates a session.
- 
- Authentication: I used JSON Web Tokens (JWT) for security. When a user logs in, a token is stored in a cookie. This token is used to identify the user for future requests.
- 
- Protected Routes: I added a middleware that checks the token. If the token is missing or invalid, the user cannot access certain data like the list of users or products.
- 
- Product API: This part handles everything for products. You can create a new product, see all products, find a specific one by its ID, update information, or delete a product.
- 
- Database Models: I created schemas for both users and products to define what kind of data we are storing, like names, emails, prices, and descriptions.



### Core Concepts

- Connecting a Node.js app to MongoDB using Mongoose.
  
- Building RESTful routes (GET, POST, PUT, DELETE).
  
- Securing passwords with hashing and using JWT for authentication.
  
- Using middleware to protect private information.
  
- Managing user sessions through cookies.
  
- Testing the API using the req.http file to make sure everything works as expected.
