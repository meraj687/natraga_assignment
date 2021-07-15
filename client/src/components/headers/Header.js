import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
  const state = useContext(GlobalState)
  console.log(state)
  const [isLogged] = state.UserAPI.isLogged
  const [isAdmin] = state.UserAPI.isAdmin
  const [cart] = state.UserAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get('/user/logout')

    localStorage.removeItem('firstLogin')

    localStorage.clear()
    // setIsAdmin(false)
    // setIsLogged(false)
    window.location.href = '/'
  }

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to='/create_product'>Create Image Gallary</Link>
        </li>
        <li>
          {' '}
          <Link to='/category'>Image Categories</Link>
        </li>
      </>
    )
  }
  const loggedRouter = () => {
    return (
      <>
        {/* <li>
          <Link to='/history'>History</Link>
        </li> */}
        <li>
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    )
  }

  const styleMenu = {
    left: menu ? 0 : '-100%',
  }

  return (
    <header>
      <div className='menu' onClick={() => setMenu(!menu)}>
        <img src={Menu} alt='' srcset='' width='30' />
      </div>
      <div className='logo'>
        <h1>
          <Link to='/'>
            {isAdmin ? (
              <>
                <img
                  src='https://media.istockphoto.com/vectors/icon-vector-id858209386?k=6&m=858209386&s=612x612&w=0&h=3HIfo-itw6762I6aBphMYhGZBV2K821RTq2a-BFJqEE='
                  alt=''
                  width='100px'
                />
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiA3ExwjfzeiALmeNJ0cnHsQxfOS4as7BVnOr6YAQWSye9L9Uys2rl4JEI55etflBKO70&usqp=CAU'
                  width='100px'
                />
              </>
            ) : (
              <>
                <img
                  src='https://media.istockphoto.com/vectors/icon-vector-id858209386?k=6&m=858209386&s=612x612&w=0&h=3HIfo-itw6762I6aBphMYhGZBV2K821RTq2a-BFJqEE='
                  alt=''
                  width='100px'
                />
                <img
                  src='https://i.pinimg.com/474x/7d/9c/1f/7d9c1fb259e09760c50fc9f336ffe21f.jpg'
                  alt=''
                  srcset=''
                  width='110px'
                />
              </>
            )}
          </Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to='/'>{isAdmin ? 'Gallary' : 'Gallary Online Auction'}</Link>
          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter()
          ) : (
            <li>
              <Link to='/login'>Login & Register </Link>
            </li>
          )}
        </li>

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt='' width='30' className='menu' />
        </li>
      </ul>
      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <img src={Cart} alt='' width='30' />
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
