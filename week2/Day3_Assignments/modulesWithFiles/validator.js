let vadilateTitle= function(title){
if(title.length>=3) 
console.log("Length is Valid")
else
    console.log("Length is Invalid")
}
let validatePriority=function(priority){
//if(priority=="low" || priority=="medium" || priority=="high" )
    const priorities=["low","Medium","High"]
let result=priorities.includes(priority)
if(result===false){
    return "Invalid priority";
}
return true
}
let validateDueDate=function(date){
    let dueDate=new Date('2006-08-30') //yyyy-mm-dd
    let today=new Date()
    if(dueDate>today) return dueDate;
    return true;
}

export {vadilateTitle,validatePriority,validateDueDate}