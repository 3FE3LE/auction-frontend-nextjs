import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react'
// import components
import AdminLayout from '../components/layouts/AdminLayout'
import { Table } from '../components/Table';
// import constants 
import MUTATION from '../constants/mutations';
import QUERY from '../constants/queries'



export default function Index() {

  const router = useRouter();

  const { data, loading, error } = useQuery(QUERY.getClientsByUser);

  const [currentId, setCurrentId] = useState(null)

  const [deleteClient] = useMutation(MUTATION.deleteClient, {
    update(cache) {
      // get to object cache
      const { getClientsByUser } = cache.readQuery({ query: QUERY.getClientsByUser });
      // overwrite cache
      cache.writeQuery({
        query: QUERY.getClientsByUser,
        data: {
          getClientsByUser: getClientsByUser.filter(client => client.id !== currentId)
        }
      })
    }
  })



  if (loading) return 'cargando...';

  if (!data?.getClientsByUser) {
    localStorage.clear()
    router.push('/login')
    router.reload()
    return null;
  }


  const headers = [
    'Nombre',
    'Empresa',
    'Correo',
    'Acciones'
  ]

  const actions = {
    delete: async id => {
      setCurrentId(id);
      const { data } = await deleteClient({
        variables: {
          id
        }
      })
      return data;
    },
    edit: (id) => {
      router.push({
        pathname: '/edit_client/[id]',
        query: { id }
      })
    }
  }

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl text-gray-800 font-light">

          Clientes
      </h1>

        <Link href="/new_client" >
          <a className="bg-blue-800 py-2 px-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold" >Nuevo Cliente</a>
        </Link>

        <Table
          headers={headers}
          data={data}
          actions={actions}
          query={data.getClientsByUser}
        />

      </AdminLayout>
    </>
  )
}
