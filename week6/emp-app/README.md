 - Create HTTP Server
        - Create Employee Schema(
                name,email,mobile,designation & companyName
                ) and model
        - Define REST API routes for
                - Create Employee
                - Read all employees
                - Edit employee
                - Delete Employee






























client side application and server side application can interact with each other over http protocal by making http req and recieving http res to make the http req from client side application , one can use either fetch function or axios module


the following are the http req types:
        1.GET - to read all resources
        2.POST - to create a new resource
        3.PUT - to update the resource
        4.DELETE - to delete a resource 
        5.PATCH - to update a resource partcially


the post,put and patch req types can have body property,which can hold json data,where as get and delete req ,donot have body property and they can send data through url


react 
        