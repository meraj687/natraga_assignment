import React, { createContext, useEffect, useState } from 'react'
import ProductsAPI from './api/ProductaAPI'
import axios from 'axios'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')

    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        console.log(token)
        setToken(res.data.accesstoken)

        setTimeout(() => {
          refreshToken()
        }, 10 * 60 * 1000)
      }
      refreshToken()
    }
  }, [])

  // ProductsAPI()
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    UserAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  }
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
