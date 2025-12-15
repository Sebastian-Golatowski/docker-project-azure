import { useState } from 'react'

const Register = ({ onRegister }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    // basic validation
    if (!login || !password || !confirmPassword) {
      alert('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // this is where you'll connect to your backend in the future
    // onRegister can call fetch/axios etc.
    onRegister({ login, password })
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Login</label>
        <input
          type='text'
          placeholder='Enter login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <input type='submit' value='Register' className='btn btn-block' />
    </form>
  )
}

export default Register