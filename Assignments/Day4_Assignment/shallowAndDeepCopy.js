//  Task
//     1. Create a shallow copy of user
//     2. Change:
//           i. name in the copied object
//           ii. preferences.theme in the copied object
//           iii .Log both original and copied objects
//           iv. Observe what changes and what doesn’t
 const user = {
                id: 101,
                name: "Ravi",
                preferences: {
                  theme: "dark",
                  language: "en"
                }
              }
            const copyUser={...user}
            copyUser.name="Vijju"
            console.log(user)
            copyUser.preferences.theme="Bright"
            console.log(copyUser)
            console.log(user)
            


    //        Task:
    //   1. Create a deep copy of order
    //   2. Modify in copied object:
    //         i. customer.address.city
    //         ii. items[0].price
    //         iii. Verify original object remains unchanged

const order = {
                  orderId: "ORD1001",
                  customer: {
                    name: "Anita",
                    address: {
                      city: "Hyderabad",
                      pincode: 500085
                    }
                  },
                  items: [
                    { product: "Laptop", price: 70000 }
                  ]
                };
            const copyOrder=structuredClone(order)
            copyOrder.customer.address.city="HYD"
            copyOrder.items[0].price=100000
            console.log(order)
            console.log(copyOrder)
            
