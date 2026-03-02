
// ASSIGNMENT 3:
// -------------
// Employee Payroll Processor
// You are building a salary processing module in a company HR app.
// Test data:
// Tasks:
//     1. filter() employees from IT department
//     2. map() to add:
//             netSalary = salary + 10% bonus
//     3. reduce() to calculate total salary payout
//     4. find() employee with salary 30000
//     5. findIndex() of employee "Neha"

    const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];
//     1. filter() employees from IT department
const nonIt=employees.filter(temp=>temp.department!="IT")
console.log(nonIt)

//     2. map() to add:
//             netSalary = salary + 10% bonus
const newSalary=employees.map(emp=>{
    return emp.salary+emp.salary*0.10
})
console.log(newSalary)

//     3. reduce() to calculate total salary payout
const totalSalary=employees.reduce((sum,temp)=>{
    return sum+temp.salary},0)
console.log(totalSalary)

//     4. find() employee with salary 30000
const sal=employees.find(temp=>temp.salary===30000)
console.log(sal)

//     5. findIndex() of employee "Neha"
const neha=employees.findIndex(temp=>temp.name==="Neha")
console.log(neha)