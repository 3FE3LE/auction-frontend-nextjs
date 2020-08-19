import React from 'react'
import Head from 'next/head'
import  SideBar  from '../SideBar';
import { useRouter } from 'next/router';

const AdminLayout = ({ children }) =>  {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Subasta agricola { router.pathname === '/' ? 'Clients' : router.pathname } </title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
            </Head>
            <div className="bg-gray-200 min-h-screen">
                <div className="flex min-h-screen">
                    <SideBar />
                    {children}
               </div>
            </div>
        </>
    )
}

export default AdminLayout;
