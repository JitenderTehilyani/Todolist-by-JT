import React, { useState } from 'react'
import { LuListTodo } from "react-icons/lu";

const Navbaar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const navBarClasses = `bg-slate-700 text-white py-3 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`;

  return (
    <nav className={navBarClasses}>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all mx-auto' onClick={toggleDarkMode}>Dark mode</li>
        </ul>
    </nav>
  )
}

export default Navbaar
