const employees = [
  {
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
  },
  {
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
  },
  {
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
  },
  {
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
  },
  {
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
  },
];

//Insert new Emp at 2nd position
const newEmp={
  eno:100,
  name:"Vijju",
  marks:[99,97,98]
}
employees.splice(1,0,newEmp)
console.log(employees)

//Remove an emp with name "Kiran"
const idx=employees.findIndex(emp=>emp.name==="Kiran")
employees.splice(idx,1)
console.log(employees)

//Change the last mark 95 to 75 of emp  "Sneha"
const sneha=employees.find(employees=>employees.name==="Sneha")
if(sneha)
sneha.marks[sneha.marks.length-1]=75
console.log(employees)
  