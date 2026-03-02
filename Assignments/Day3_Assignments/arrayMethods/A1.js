// ASSIGNMENT 1:
// -------------
// You are building a shopping cart summary for an e-commerce website.

// Test Data : const cart = [.....]
// Tasks:
//     1. Use filter() to get only inStock products
//     2. Use map() to create a new array with:  { name, totalPrice }
//     3. Use reduce() to calculate grand total cart value
//     4. Use find() to get details of "Mouse"
//     5. Use findIndex() to find the position of "Keyboard"

const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
]
//     1. Use filter() to get only inStock products
 const getInStock=cart.filter(carts=>carts.inStock===true)
 console.log(getInStock)

 //     2. Use map() to create a new array with:  { name, totalPrice }
 //map() only takes one callback function
 const newArray=cart.map(carts=>{
  return { name:carts.name,
  totalPrice:carts.price*carts.quantity}
})
 console.log(newArray)

//  3. Use reduce() to calculate grand total cart value
 const grandTotal=cart.reduce((sum,carts)=>{
  return sum+carts.price*carts.quantity
 },0)
console.log(grandTotal)

//     4. Use find() to get details of "Mouse"
const findMouse=cart.find(carts=>carts.name==="Mouse")
console.log(findMouse)

//     5. Use findIndex() to find the position of "Keyboard"
const findKeyboard=cart.findIndex(carts=>carts.name==="Keyboard")
console.log(findKeyboard)
