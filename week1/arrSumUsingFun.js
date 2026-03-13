let sum=0
let test=function(arr){
    for(let i=0;i<arr.length;i++){
        sum+=arr[i]
    }
return sum
}
let answer=test([10,20,30,30])
console.log(answer)