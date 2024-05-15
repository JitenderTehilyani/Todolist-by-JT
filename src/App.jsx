import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbaar from './components/Navbaar'
import { v4 as uuidv4 } from 'uuid';

const DARK_MODE_KEY = 'isDarkMode';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem(DARK_MODE_KEY) === 'true'
  ); // Check local storage on initial render

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, isDarkMode); // Update local storage
  }, [isDarkMode]); // Update on `isDarkMode` change

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.querySelector(".main").style.backgroundColor =  // Add semicolon here
    isDarkMode ? "#ede9fe" : '#9EBFC0';
    document.querySelector(".main").style.color =  // Add semicolon here
    isDarkMode ? "#0D3530" : '#0D3530';
  };

  const getDarkModeStyles = () => ({
    backgroundColor: isDarkMode ? '#0D3530' : '#fff',
    color: isDarkMode ? '#4C5270' : '#333',
    minHeight: '100vh', // Optional: Ensure full viewport coverage
    margin: 0, // Optional: Remove potential margin/padding conflicts
    fontFamily: 'sans-serif', // Optional: Set a default font
  });


  // handels input text in todo
  const [todo, setTodo] = useState("");
  // stores todo
  const [todos, setTodos] = useState([]);
  // hide finshed todo
  const [showFinished, setshowFinished] = useState(true);

  // function to load todos from Local storage
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])


  // function to store todo to local storage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // function to Add todo
  const handleAdd = () => {
    setTodos([...todos, {
      id:
        uuidv4(), todo, isCompleted: false
    }]);
    setTodo("");
    saveToLS();
  }

  // function to Change todo
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  // function to handleCheckbox todo
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    todos[index].isCompleted = !todos[index].isCompleted;
    setTodos([...todos]); // This forces a rerender
    saveToLS();
  }

  // Function to toggle hide finisihed todo
  const toggleFinished = () => {
    setshowFinished(!showFinished);
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => { return item.id !== id });
    // todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(newTodos); // This forces a rerender
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => { return item.id === id });
    let newTodos = todos.filter(item => { return item.id !== id });
    // todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(newTodos); // This forces a rerender
    saveToLS();
  }


  return (
    < >
    <div className="App" style={getDarkModeStyles()}>
      {/* Your existing component hierarchy goes here */}
      
      
       <div className="mx-3 md:container md:mx-auto rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[75%] main">
       <div className="w-full">
        <button className="dark-mode-toggle flex justify-center mx-auto bg-violet-800 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white bgd" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1 className=' my-5 font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
      </div>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold mx-auto'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
         <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""} id='text'>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
      {/* <Navbaar /> Assuming your Navbaar component */}
      {/* ... other components */}
      
    </div>
    
    </>
  )
}

export default App



/*import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbaar from './components/Navbaar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  // handels input text in todo
  const [todo, setTodo] = useState("");
  // stores todo
  const [todos, setTodos] = useState([]);
  // hide finshed todo
  const [showFinished, setshowFinished] = useState(true);

  // function to load todos from Local storage
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])


  // function to store todo to local storage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // function to Add todo
  const handleAdd = () => {
    setTodos([...todos, {
      id:
        uuidv4(), todo, isCompleted: false
    }]);
    setTodo("");
    saveToLS();
  }

  // function to Change todo
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  // function to handleCheckbox todo
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    todos[index].isCompleted = !todos[index].isCompleted;
    setTodos([...todos]); // This forces a rerender
    saveToLS();
  }

  // Function to toggle hide finisihed todo
  const toggleFinished = () => {
    setshowFinished(!showFinished);
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => { return item.id !== id });
    // todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(newTodos); // This forces a rerender
    saveToLS();
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => { return item.id === id });
    let newTodos = todos.filter(item => { return item.id !== id });
    // todos[index].isCompleted = !todos[index].isCompleted;
    setTodos(newTodos); // This forces a rerender
    saveToLS();
  }


  return (
    < >
    <h1 className=' my-5 font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold mxau'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
         <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
    </>
  )
}

export default App */