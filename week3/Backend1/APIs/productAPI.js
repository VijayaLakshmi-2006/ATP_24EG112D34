//create mini-exp app(separate route) no http server will be there here
import exp from 'express';
export const productApp=exp.Router();


// Create REST API for Product resource with below operations:
//         1. Create new Product({productId,name,brand,price})
//         2. Read all products
//         3. Read all Product by brand
//         4. Update a product
//         5. Delete a product by id

//1. Create new Product                       (http://localhost:3000/products)
 const products=[]
 productApp.get('/products',(req,res)=>{
      res.json({message:"All products",payload:products})
 })

 productApp.get('/products/:name',(req,res)=>{
    const productName = req.params.name
    const filteredProducts = products.filter(
    temp => temp.name.toLowerCase() === productName.toLowerCase()
    )
    res.json({message:"Product by name",payload:filteredProducts})
})

productApp.post('/products',(req,res)=>{
const newProduct=req.body
products.push(newProduct)
res.json({message:"Product is created",payload:products})
})

productApp.put('/products/:productId',(req,res)=>{
    const idOfUrl = Number(req.params.productId)
    const modifiedProduct = req.body
    const proIdx = products.findIndex(temp=>temp.productId===idOfUrl)
    if(proIdx===-1){
       return res.json({message:"Product not found to update"})
    }
    products.splice(proIdx,1,modifiedProduct)
    res.json({message:"Product updated"})
})

productApp.delete('/products/:id',(req,res)=>{
    const proId=Number(req.params.id)
    const proIndex=products.findIndex(temp=>temp.productId===proId)
  if(proIndex===-1){
    return res.json({message:"Product not found to delete"})
  }
    products.splice(proIndex,1)
    res.json({message:"Product deleted"})
})
