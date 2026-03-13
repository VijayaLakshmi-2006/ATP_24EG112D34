// ASSIGNMENT 4: 
// ------------
// Movie Streaming Platform
// You are working on a movie recommendation system.
// Test data:
// Tasks:
//     1. filter() only "Sci-Fi" movies
//     2. map() to return:
//             "Inception (8.8)"

//     3. reduce() to find average movie rating
//     4. find() movie "Joker"
//     5. findIndex() of "Avengers"
    const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

//     1. filter() only "Sci-Fi" movies
const moviesFilter=movies.filter(temp=>temp.genre==="Sci-Fi")
console.log(moviesFilter)

//     2. map() to return:
//             "Inception (8.8)"
const ans=movies.map(temp=>{
  return `${temp.title} (${temp.rating})`
})
console.log(ans)

//OR

const moviesSciFi=movies.filter(temp=>temp.genre==="Sci-Fi").map(temps=>{
  return `${temps.title} (${temps.rating})`
})
console.log(moviesSciFi)

//     3. reduce() to find average movie rating
const avgRating=movies.reduce((sum,temp)=>{
  return sum+temp.rating
},0)/movies.length
console.log(avgRating)

//     4. find() movie "Joker"
const movieName=movies.find(temp=>temp.title==="Joker")
console.log(movieName)

//     5. findIndex() of "Avengers"
const movieIndex=movies.findIndex(temp=>temp.title==="Avengers")
console.log(movieIndex)