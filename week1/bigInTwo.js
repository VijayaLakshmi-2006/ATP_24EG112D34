let test=function(a,b,c){
if(a>b && a>c) return a
else if(b>c && b>a) return b
else return c
}
let result=test(109,309,500)
console.log(result)