import { useRouter } from 'next/router';
import Head from 'next/head'
import React from 'react'
// import components
import SideBar from '../SideBar';
import Header from '../Header'

const AdminLayout = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Subasta agricola {router.pathname === '/' ? 'Clients' : router.pathname} </title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
            </Head>
            <div className="bg-gray-200 min-h-screen">
                <div className="flex min-h-screen">
                    <SideBar />
                    <main className="xs:w-9/10 sm:w-2/3 md:w-3/4 xl:w-4/5 sm:min-h-screen p-5">
                        <Header />
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminLayout;
