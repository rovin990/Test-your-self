import React, { useState } from 'react'
import User from "../Models/User"

function LoggedInUser() {
    const [loggedInUser,setLoggedInUser] = useState(new User())
  return (
    <div>LoggedInUser</div>
  )
}

export default LoggedInUser