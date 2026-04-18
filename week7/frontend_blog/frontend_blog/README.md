# 5-04-2025
# Storing files in mini app 
//understanding the uploading of files and images 

client                                          backend
--------------------------------------------------------

JSON data                                       req.body(exp.json()->body parser)    -> DB
Binary data(File)                               req.file(multer)    -> DB x
we store in the json data and extract from req.body 
we store in the form of binary data in the DB
we dont store the files in the DB instead in a sepearte cloud storage
(3rd party cloud) --- CDN link of the file ---- store in DB(finally db contain only text data not binary files)
|-> AWS S3,cloudinary(most popular) store images,videos,pdf,docs,etc
 
why this cloud??
no external tranformation of binary to text instead can use CDN link of the file

u will have a configuration which contains the boilerplate code for the cloud storage 80% of the code is already written u just need to add 20% of the code is bussiness logic 

(1)first the http post req  and the api will 
(2)save thr file in cloud service (upto 150mb it give space for free) 
(3)then it will return the CDN(content delivery network)link of the file  to the api and store it in the DB 
(4)when we want to display the image we will use the CDN link to display the image  from DB
(5)DB response will be like this {title:"title",content:"content",image:"cdnlink"}
(6) get http res to the frontend
(7)frontend will display the image using the CDN link

//flow of file upload
frontend app---->make htttp req with file---->backend api---->save file in cloud service---->return cdn link---->store in db---->get http res to the frontend---->display image using cdn link . 


backend-->.env 

to go browser-> cloudinary.com -> login -> dashboard->product environment -> there u find thr clod name and then click on Go to API keys for api key and api secret(u get mail of to acces the secret key)
(1)cloud name
(2)api key
(3)api secret

--install cloudinary and multer in backend
npm install cloudinary multer