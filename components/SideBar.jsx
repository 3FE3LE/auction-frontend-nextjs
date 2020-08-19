import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const SideBar = () => {

    const router = useRouter();
    const navItems = [
        {
            path: '/',
            name: 'Clientes'
        },
        {
            path: '/products',
            name: 'Productos',
        },
        {
            path: '/orders',
            name: 'Pedidos'
        }
    ]
    return (
        <aside className="bg-gray-800 xs:w-1/10 sm:w-1/3 md:w-1/4 xl:w-1/5 p-5">
            <div>
                <Link href="/">
                    <p className="text-white font-black text-2xl ">
                        Subasta agricola
                </p>
                </Link>
            </div>
            <nav className="list-none mt-5 " >
                {navItems.map(item => (
                    <li key={item.path } className={router.pathname === item.path ? 'bg-blue-700 p-2 ' : 'p-2'}>
                        <Link href={item.path} >
                            <a className="text-white block" >{item.name}</a>
                        </Link>
                    </li>
                ))}

            </nav>
        </aside>
    )
}

export default SideBar

