
import { Grow, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
// import components
import LandingLayout from '../components/layouts/LandingLayout'
importLoaderfrom '../components/Loader'

export default function Index() {



  const router = useRouter();

  const [show, setShow] = useState(true)

  setTimeout(() => {
    setShow(false)
  }, 1000);

  setTimeout(() => {
    setShow(true)
    router.push('/login')
  }, 3000);

  return (
    <>
      <LandingLayout>
        <Loader open={show} />
        <Slide direction="down" in={!show} timeout={{ enter: 1500, exit: 1000 }}>
          <div className="flex items-center justify-center text-gray-100 font-black text-6xl uppercase">
            <h1>Bienvenido a la subasta agraria</h1>
          </div>
        </Slide>
      </LandingLayout>
    </>
  )
}
