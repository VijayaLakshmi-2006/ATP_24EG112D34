1.Generate package.json

2.create .env file

3.create express app and assign port number (before install express)

4.connect to database (install mongoose)

After database connenction we need to connect server(so move app.use(...) to try in connect fn)  (npm install bcryptjs)


5.define schemas and create "models"
       -UserTypeSchema
         //Fields to be included
           Firstname
           Lastname
           email
           passsword
           role
           profileImageUrl
           isUserActive(Use for deleting and restoring)


       -ArticleSchema
           author
           title
           category
           content
           comments
           isArticleActive

6.Implement APIs
     -UserApi
     -AuthorApi
     -AdminApi
7.Create common API for REGISTER,LOGIN and LOGOUT  (FOLLOW (DRY)-Donot Repeat Yourself)
