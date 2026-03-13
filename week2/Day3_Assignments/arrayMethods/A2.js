// ASSIGNMENT 2:

// Student Performance Dashboard
// You are working on a college result analysis system.
// Tasks:
//     1. filter() students who passed (marks ≥ 40)
//     2. map() to add a grade field
//               ≥90 → A
//               ≥75 → B
//               ≥60 → C
//               else → D

//    3. reduce() to calculate average marks
//    4. find() the student who scored 92
//    5. findIndex() of student "Kiran"
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

//     1. filter() students who passed (marks ≥ 40)
const passed=students.filter(marks=>marks.marks>=40)
console.log(passed)

//     2. map() to add a grade field
//               ≥90 → A
//               ≥75 → B
//               ≥60 → C
//               else → D
const addGrade=students.map((stu)=>{
  let grades;
  if(stu.marks>=90) grades="A"
  else if(stu.marks>=75) grades="B"
  else if(stu.marks>=60) grades="C"
  else grades="D"
  return{
    ...stu,
    grade:grades
  }
})
console.log(addGrade)

//    3. reduce() to calculate average marks
const avgMarks=students.reduce((sum,temp)=>{
  return sum+temp.marks
},0)/students.length
console.log(avgMarks)

//    4. find() the student who scored 92
const find90=students.find(temp=>temp.marks===92)
console.log(find90)

//    5. findIndex() of student "Kiran"
const findIdx=students.findIndex(temp=>temp.name==="Kiran")
console.log(findIdx)
