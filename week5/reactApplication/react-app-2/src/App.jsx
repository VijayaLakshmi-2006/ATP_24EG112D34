import './App.css'
import User from './components/user.jsx';
import Counter from './components/counter.jsx';
function App(){
  //state
  const users = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Vivaan Patel",
    email: "vivaan.patel@example.com",
    image: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    name: "Aditya Singh",
    email: "aditya.singh@example.com",
    image: "https://randomuser.me/api/portraits/men/13.jpg"
  },
  {
    name: "Sai Kumar",
    email: "sai.kumar@example.com",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    name: "Rohan Reddy",
    email: "rohan.reddy@example.com",
    image: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    name: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    image: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    name: "Isha Verma",
    email: "isha.verma@example.com",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    image: "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    name: "Sneha Das",
    email: "sneha.das@example.com",
    image: "https://randomuser.me/api/portraits/women/14.jpg"
  },
  {
    name: "Kavya Iyer",
    email: "kavya.iyer@example.com",
    image: "https://randomuser.me/api/portraits/women/15.jpg"
  }
];

   
  return(
    <div>
      <div className='grid grid-cols-2 bg-sky-300 p-6'>
    <h2>TCS</h2>
        <ul className='grid grid-cols-3 mx-auto gap-25 '>
          <li>Home</li>
          <li>Signup</li>
          <li>Login</li>
        </ul>
      </div>
      <div>
        <Counter/>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {
          users.map((user)=>(<User userObj={user} key={user.email}/>))
        }
      </div>
      <div className='grid grid-cols-2  gap-16 p-0'>
        <div className='text-black mx-auto'>
          <p>Anurag University</p>
          <p>Hyderabad</p>
          <p>Telangana</p>
        </div>
        <div className='text-black mx-auto'>
          <p>24eg107b36@gmail.com</p>
          <p>www.anurag.edu.in</p>
        </div>
      </div>
    </div>
  )
}

export default App;

