import {addTask,getAllTasks} from './Task.js'
addTask("eating","High","2024-12-12")
addTask("sleeping","Low","2025-12-12")
const tasks=getAllTasks()
console.log(tasks)
