import React, { useState } from 'react'
import axios from 'axios';

function Profile() {
  const [user , setUser] = useState({
  name: "",
  email : "",
  password : "",
  organization_name: "",
  phone_number : ""
 })
 const onChangeInput=(e)=>{
  const {name,value} = e.target;
   setUser({...user , [name] : value})
 }
  const RegisterSubmit=async e=>{
  e.preventDefault()
  try {
   await axios.post("/user/register",{...user})

   localStorage.setItem("firstLogin", true)

   window.location.href = "/"
  } catch (error) {
   alert(error.response.data.msg)
  }
 }

 return (
  <div style={{textAlign:'center' , marginTop:'20%'}}>
   
   <h1>Profile</h1>
   <form action="" style={{padding:'0rem 6rem'}} onSubmit={RegisterSubmit} >
      <label htmlFor="" style={{color:'grey'}}>Email : </label>
      <input type="name" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Password : </label>
      <input type="password" name="password" required placeholder="Password" autoComplete="on"  value={user.password} onChange={onChangeInput} /><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Organization Name : </label>
      <input type="organization_name" name="organization_name" required placeholder="Organization_name" value={user.organization_name} onChange={onChangeInput}/><br /><br />
      <label htmlFor="" style={{color:'grey'}}>Phone Number : </label>
      <input type="phone_number" name="phone_number" required placeholder="Phone_number" autoComplete="on"  value={user.phone_number} onChange={onChangeInput}/><br /><br />
      

     
     </form>
  </div>
 )
}

export default Profile
