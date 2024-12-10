import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-slate-800 text-white py-2'>
        <div className='logo'>
          <span className='font-bold text-xl mx-8'>ToDoList</span></div>
        <div>            
        <ul className="flex gap-4 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Contact Us</li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
