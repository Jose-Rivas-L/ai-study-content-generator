'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { db } from './configs/db';
import { USER_TABLE } from './configs/schema';
import {eq} from 'drizzle-orm'

function Provider({children}) {

  const {user} = useUser();

  useEffect(() =>{
        user&&checkIsNewUser();
  }, [user])

  const checkIsNewUser= async ()=>{
     //check is user already exist
     console.log(user?.primaryEmailAddress?.emailAddress)
    const result = await db.select().from(USER_TABLE)
    .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

    console.log(result)
    //if not, then add to db
    if(result?.length == 0)
    {
        const userResponse = await db.insert(USER_TABLE).values({
            userName: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        }).returning({id: USER_TABLE.id})

        console.log(userResponse)
    }

  }  
  return (
    <div>{children}</div>
  )
}

export default Provider