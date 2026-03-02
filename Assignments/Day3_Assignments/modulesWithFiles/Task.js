import {vadilateTitle,validatePriority,validateDueDate} from './validator.js'
let ans1=vadilateTitle("Teja")
let ans2=vadilateTitle("ab")
let tasks=[]
function addTask(title, priority, dueDate) {
                      // Validate using imported functions
                      if(!vadilateTitle(title) && !validatePriority(priority) && !validateDueDate(dueDate)){
                        return "Invalid task"
                      }
                      // If valid, add to tasks array
               tasks.push({title,priority,dueDate})
                      // Return success/error message
                      //return true
                    //console.log(tasks)
                }

function getAllTasks(){
return tasks;
}
          export {addTask,getAllTasks}             