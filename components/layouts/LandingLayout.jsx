import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const LandingLayout = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Subasta agricola  {router.pathname === '/' ? 'Clients' : router.pathname} </title>
            </Head>
            <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                {children ? children : null}
            </div>
        </>
    )
}

export default LandingLayout
