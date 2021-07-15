import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Login() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const RegisterSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })
      localStorage.setItem('firstLogin', true)

      // localStorage.setItem("firstLogin", true)

      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  return (
    <>
      <div className='login-page'>
        <form action='' onSubmit={RegisterSubmit}>
          <h2>Register</h2>

          <input
            type='name'
            name='name'
            required
            placeholder='Name'
            value={user.name}
            onChange={onChangeInput}
          />
          <input
            type='email'
            name='email'
            required
            placeholder='Email'
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type='password'
            name='password'
            required
            placeholder='Password'
            autoComplete='on'
            value={user.password}
            onChange={onChangeInput}
          />
          <div className='row'>
            <button type='submit'>Register </button>
            <Link to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login

// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// function Login() {
//   return <div>Login</div>
// }

// export default Login
