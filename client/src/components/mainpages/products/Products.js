// import React, { useContext , useState} from 'react'
// import { GlobalState } from '../../../GlobalState'
// import ProductItem from '../utils/productItem/ProductItem'
// // import loading from '../utils/loading/Loading'
// import Loading from '../utils/loading/Loading'
// import axios from 'axios';
// import Filters from './Filters';
// import LoadMore from './LoadMore';

// function Products() {
//  const state = useContext(GlobalState)
//  const [products , setProducts] = state.productsAPI.products
//  const [isAdmin] = state.UserAPI.isAdmin
//  const [token] = state.token
//  const [callback , setCallback] = state.productsAPI.callback
//  const [loading ,setLoading] = useState(false)
//  const [isCheck , setIsCheck] = useState(false)

//   const handleCheck=(id)=>{
//   //  let newProduct = [...product]
//   // //  console.log(product.checked)
//   // newProduct.checked = !newProduct.checked
//   // setProducts(newProduct)
//   // console.log(id)
//   products.forEach(product=>{
//     if(product._id === id) product.checked = !product.checked
//   })
//   setProducts([...products])

//  }

//  const checkAll=()=>{
//    products.forEach(product=>{
//      product.checked = !product.checked
//    })
//    setProducts([...products])
//    setIsCheck(!isCheck)
//  }

//  const deleteAll=()=>{
//    products.forEach(product=>{
//      if(product.checked) deleteProduct(product._id , product.images.public_id)
//    })
//  }

//   const deleteProduct = async(id,public_id)=>{
//     console.log({id,public_id})
//   // console.log(product)
//   try {
//     setLoading(true)
//     const destroyImg =  axios.post('/api/destroy',{public_id},{
//      headers : {Authorization : token}
//     })
//     const deleteProduct =  axios.delete(`/api/products/${id}`,{
//      headers : {Authorization : token}
//     })
//     await destroyImg
//     await deleteProduct
//     setCallback(!callback)
//     setLoading(false)
//   } catch (err) {
//    alert(err.response.data.msg)
//   }
//  }

//  if(loading) return <div ><Loading/></div>

// //  const getProducts = async()=>{

// //   const res = await axios.get("/api/products")
// //   setProducts(res.data.products)
// //  }

// //  useEffect(()=>{
// //    const getProducts = async()=>{
// //   const res = await axios.get("/api/products")
// //   setProducts(res.data.products)
// //  }
// //    getProducts()
// //  },[setProducts])

//  return (
//    <>
//    <Filters/>
//    {
//      isAdmin &&
//      <div className="delete-all">
//        <span >Select All</span>
//        <input type="checkbox" checked={isCheck} onChange={checkAll} />
//        <button onClick={deleteAll}>Delete All</button>
//      </div>
//    }
//   <div className="products container-fluid" style={{padding: '0rem 12rem',margin: '0rem 11.27rem'}}>
//             {
//     products.map(product => {
//                     return <ProductItem key={product._id} product={product}
//                     isAdmin = {isAdmin}
//                       deleteProduct={deleteProduct} handleCheck={handleCheck}
//                     />
//      })
//    }
//   <LoadMore/>
//   </div>
//   {products.length === 0 && <Loading/>}
//   </>
//  )
// }

// export default Products;

import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'

function Products() {
  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [isAdmin] = state.UserAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.productsAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  // console.log(products)

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck
    })
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const deleteProduct = async (id, public_id) => {
    console.log({ id, public_id })
    // console.log(product)
    try {
      setLoading(true)
      const destroyImg = axios.post(
        '/api/destroy',
        {
          public_id,
        },
        {
          headers: { Authorization: token },
        }
      )
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      })
      await destroyImg
      await deleteProduct
      setLoading(false)
      setCallback(!callback)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id)
    })
  }
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    )

  return (
    <>
      <h2 style={{ textAlign: 'center', color: '#555', opacity: '0.7' }}>
        IMAGE GALLARY AUCTION APP
      </h2>
      <div>
        <h1
          style={{
            textAlign: 'center',
            opacity: '0.7',
            textDecoration: 'underline',
          }}
        >
          IMPORTANT NOTES
        </h1>
        <div style={{ background: 'grey', color: 'white' }}>
          <marquee>
            <h3
              style={{
                textAlign: 'center',
                opacity: '0.7',
                textTransform: 'uppercase',
              }}
            >
              For CRUD , the admin email :{' '}
              <strong
                style={{ color: 'greenyellow', textTransform: 'lowercase' }}
              >
                admin@gmail.com
              </strong>{' '}
              && password :{' '}
              <strong style={{ color: 'lawngreen' }}>12345678910</strong> and
              other user has to be undergo registration process.
            </h3>
          </marquee>
        </div>
      </div>
      <Filters />
      {isAdmin && (
        <div className='delete-all'>
          <span>Select all</span>
          <input type='checkbox' checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}
      <div className='products'>
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          )
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  )
}

export default Products
