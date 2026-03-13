// Requirements:
//   Create a Book class with the following:

//   Properties:
//       title (string)
//       author (string)
//       pages (number)
//       isAvailable (boolean, default: true)

class Book{
    title;
    author;
    pages;
    isAvailable;
    constructor(title,author,pages,isAvailable){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isAvailable=isAvailable;
    }
    // Methods:
    //   borrow() - Marks the book as not available
    //   returnBook() - Marks the book as available
    //   getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
    //   isLongBook() - Returns true if pages > 300, false otherwise
    borrow(){
  return "Books are not available"
    }
    returnBook(){
        return "Books are available"
    }
    getInfo()
{
    console.log(`The ${this.title} by ${this.author} ${(this.pages)} pages`)

}
isLongBook()
{
    let count=0
    if(this.pages>300){
       count++
       console.log()
    }
    return false;
}

}
const b1=new Book("Hobbit","J.R.R. Tolkien",150,true);
const b2=new Book("Hary Poter","Vijju Reddy",550,false);
console.log(b1)
console.log(b2)
console.log(b1.isLongBook())