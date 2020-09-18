import React from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import QUERY from '../constants/queries'


const Header = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(QUERY.getUser)

  if (loading) return null;

  if (!data) return router.replace('/login', undefined, { shallow: true })

  const { name, lastName } = data?.getUser;

  const closeSession = () => {
    localStorage.removeItem('token')
    router.push('/login');
  }

  return (
    <div className="flex justify-between">
      <p className="mr-2">Hola! {name} {lastName}</p>
      <button
        onClick={() => closeSession()}
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded px-2 text-white shadow-md"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
export default Header
