import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const LandingLayout = ({children}) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Subasta agricola  { router.pathname === '/' ? 'Clients' : router.pathname } </title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"/>
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
            </Head>
            <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                {children}
            </div>
        </>
    )
}

export default LandingLayout
