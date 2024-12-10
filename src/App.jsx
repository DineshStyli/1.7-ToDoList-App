import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const saveToLocalStorage=(params)=>{
    localStorage.setItem("todos",JSON.stringify(params))
  }
  
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLocalStorage(todos)
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  
  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }
  const updateCheckbox=(e)=>{
    let id = e.target.id
    console.log(e)
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
  }
  const handleEdit=(e,id)=>{
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    handleDelete(e,id)
    // saveToLocalStorage()
  }
  const handleDelete=(e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage(newTodos)
    }
  return (
    <>
      <Navbar/>
      <div className='md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-cyan-500 min-h-[80vh] md:w-[35%]'>
          <h1 className='font-bold text-xl text-center'>Todo List Manager</h1>
        <div className='addTodo my-3 flex flex-col gap-3'>
          <h2 className='text-xl font-bold'>Add Todo</h2>
          <div className="flex">
          <input type="text" onChange={handleChange} value={todo} className='w-full rounded-sm'/>
          <button onClick = {handleAdd} disabled={todo.length<=3} className='bg-orange-400 hover:bg-orange-500 disabled:bg-orange-600 rounded-md px-3 py-1 mx-3'>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished}/> Show Finished
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0  && <div className='m-5'> No todos for you</div>}
          {todos.map(item=>{
          return ((showFinished || !item.isCompleted) && <div key={item.todo} className="todo flex my-4 justify-between">
            <div className='flex gap-5'>
            <input  id={item.id} onChange={updateCheckbox} type="checkbox" checked={item.isCompleted} name=""/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick = {(e)=>handleEdit(e,item.id)} className='bg-orange-500 hover:bg-orange-600 rounded-md px-3 py-1 mx-6'><FaRegEdit /></button>
            <button onClick = {(e)=>{handleDelete(e,item.id)}} className='bg-red-500 hover:bg-red-600 rounded-md px-3 py-1'><MdDeleteOutline /></button>
            </div>
          </div>)
})}
        </div>
      </div>
    </>
  )
}

export default App
