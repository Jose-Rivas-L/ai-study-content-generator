'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect } from 'react'

function Provider({children}) {

  const {user} = useUser();

  useEffect(() =>{
        user&&checkIsNewUser();
  }, [user])

  const checkIsNewUser= async ()=>{
    const resp = await axios.post('/api/create-user', {user:user});
    console.log(resp.data)
    console.log("checking user")
  }  
  return (
    <div>{children}</div>
  )
}

export default Provider