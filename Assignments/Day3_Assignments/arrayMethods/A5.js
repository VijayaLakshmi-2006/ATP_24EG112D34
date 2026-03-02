// ASSIGNMENT 5: 
// -------------
// Bank Transaction Analyzer
// You are building a bank statement summary.
// Test data:
// Tasks:
//     1. filter() all credit transactions
//     2. map() to extract only transaction amounts
//     3. reduce() to calculate final account balance
//     4. find() the first debit transaction
//     5. findIndex() of transaction with amount 10000

 const transactions = [
   { id: 1, type: "credit", amount: 5000 },
   { id: 2, type: "debit", amount: 2000 },
   { id: 3, type: "credit", amount: 10000 },
   { id: 4, type: "debit", amount: 3000 }
 ];
//     1. filter() all credit transactions
const creditFilter=transactions.filter(temp=>temp.type==="credit")
console.log(creditFilter)

//     2. map() to extract only transaction amounts
const filterAmt=transactions.filter(temp=>temp.type==="credit").map(temp=>{
  return `${temp.amount}`})
console.log(filterAmt)

//    3. reduce() to calculate final account balance
const totalAmt=transactions.reduce((acc,temp)=>{
if(temp.type==="credit") 
  return acc+temp.amount
else
  return acc-temp.amount
},0)
console.log(totalAmt)

//     4. find() the first debit transaction
const FirstDebitFilter=transactions.find(temp=>temp.type==="debit")
console.log(FirstDebitFilter)

//     5. findIndex() of transaction with amount 10000
const index=transactions.findIndex(temp=>temp.amount===10000)
console.log(index)