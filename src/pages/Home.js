import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'

function Home() {
   

  return (
    <div className='container-fluid bg-primary'>
        <div className='row'>
            <div className='col-md-12'>
                <Navbar />
            </div>
        </div>
        <div className='row'>
            <div className='col-md-12 bg-primary'>
                hello
            </div>

        </div>
    </div>
  )
}

export default Home