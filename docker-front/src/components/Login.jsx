import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!login || !password) {
      alert('Please enter both login and password')
      return
    }
    
    onLogin({ login, password })
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Login</label>
        <input
          type='text'
          placeholder='Enter Login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <input type='submit' value='Login' className='btn btn-block' />
    </form>
  )
}

export default Login