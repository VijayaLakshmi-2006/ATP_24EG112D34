//smallest number of array
let small=marks[0]
for(let i=1;i<marks.length;i++){
    if(small>marks[i])
        small=marks[i]
}
console.log(small)