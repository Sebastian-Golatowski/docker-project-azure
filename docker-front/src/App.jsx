import Header from './components/Header'
import { Tasks } from './components/Tasks'
import { useState, useEffect } from "react"
import { AddTask } from './components/AddTask'
import Login from './components/Login'
import Register from './components/Register'

const AUTH_API_URL = import.meta.env.VITE_AUTH_BACK_URL
const TASK_API_URL = import.meta.env.VITE_LOGIC_BACK_URL

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAddTask, setshowAddTask] = useState(false)
  const [isLoginView, setIsLoginView] = useState(true)
  const [currentUser, setCurrentUser] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('jwt_token')
    if(token) {
        fetchCurrentUser(token)
    }
  }, [])

  const fetchCurrentUser = async (token) => {
    try {
      const res = await fetch(`${AUTH_API_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (res.ok) {
        setCurrentUser(data.username)
        setIsAuthenticated(true)
        fetchTasks(token); 
      } else {
        logoutUser()
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      logoutUser()
    }
  }

  const fetchTasks = async (token) => {
    try {
        const res = await fetch(`${TASK_API_URL}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        if (res.ok) {
            const data = await res.json()
            setTasks(data)
        } else {
            console.error("Failed to fetch tasks")
        }
    } catch (error) {
        console.error("Error fetching tasks:", error)
    }
  }

  const loginUser = async (details) => {
    try {
      const res = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          login: details.login, 
          password: details.password 
        }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('jwt_token', data.token)
        fetchCurrentUser(data.token)
      } else {
        alert(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login Error:", error)
      alert("Server error")
    }
  }

  const registerUser = async (details) => {
      try {
        const res = await fetch(`${AUTH_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        })

        const data = await res.json()

        if (res.ok) {
          alert("Registration Successful! Please Login.")
          setIsLoginView(true)
        } else {
          alert(data.message || "Registration failed")
        }
      } catch (error) {
        console.error("Register Error:", error)
        alert("Server error")
      }
  }

  const logoutUser = () => {
      localStorage.removeItem('jwt_token')
      setIsAuthenticated(false)
      setshowAddTask(false) 
      setCurrentUser('')
      setTasks([]) 
  }

  const deleteTask = async (id) => {
    const token = localStorage.getItem('jwt_token')
    try {
        const res = await fetch(`${TASK_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(res.ok) {
            setTasks(tasks.filter((task) => task.id !== id))
        } else {
            alert("Error deleting task")
        }
    } catch (error) {
        console.error("Delete Error", error)
    }
  }

  const reminder = async (id) => {
    const token = localStorage.getItem('jwt_token')
    
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))

    try {
        const res = await fetch(`${TASK_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        if(!res.ok) {
            console.error("Failed to update reminder on server")
            setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
        }
    } catch (error) {
        console.error("Toggle Error", error)
    }
  }

  const addTask = async (task) => {
    const token = localStorage.getItem('jwt_token')
    try {
        const res = await fetch(`${TASK_API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(task)
        })

        if(res.ok) {
            const updatedTasks = await res.json()
            setTasks(updatedTasks)
        } else {
            alert("Failed to add task")
        }
    } catch (error) {
        console.error("Add Task Error", error)
    }
  }

  return (
    <div className='container'>
      {!isAuthenticated ? (
          <>
            <header className='header'>
                <h1>{isLoginView ? 'Login' : 'Register'}</h1>
                <button 
                    className='btn' 
                    style={{ backgroundColor: isLoginView ? 'green' : 'black' }}
                    onClick={() => setIsLoginView(!isLoginView)}
                >
                    {isLoginView ? 'Sign Up' : 'Login'}
                </button>
            </header>

            {isLoginView ? (
                <Login onLogin={loginUser} />
            ) : (
                <Register 
                    onRegister={registerUser} 
                    onSwitchToLogin={() => setIsLoginView(true)} 
                />
            )}
          </>
      ) : (
        <>
          <Header 
            title={`Hello, ${currentUser}`} 
            onAdd={() => setshowAddTask(!showAddTask)} 
            showAdd={showAddTask}
            onLogout={logoutUser} 
          />
          
          {showAddTask && <AddTask onAdd={addTask}/>}
          
          {tasks.length > 0 ? 
            <Tasks tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={reminder} />
          : 'No Tasks To Show'}
        </>
      )}
    </div>
  )
}

export default App