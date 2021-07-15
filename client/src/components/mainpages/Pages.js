import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/Notfound'
import { GlobalState } from '../../GlobalState'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.UserAPI.isLogged
  const [isAdmin] = state.UserAPI.isAdmin
  return (
    <Switch>
      <Route path='/' exact component={Products} />

      <Route path='/detail/:id' exact component={DetailProduct} />

      <Route path='/login' exact component={isLogged ? NotFound : Login} />

      <Route
        path='/register'
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route
        path='/category'
        exact
        component={isAdmin ? Categories : NotFound}
      />

      <Route
        path='/create_product'
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />

      <Route
        path='/edit_product/:id'
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />

      <Route path='/cart' exact component={Cart} />

      <Route path='*' exact component={NotFound} />
    </Switch>
  )
}

export default Pages
