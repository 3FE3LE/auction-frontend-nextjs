import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
// import components
import AdminLayout from '../components/layouts/AdminLayout'
import { Table } from '../components/Table';
import { Loader } from '../components/Loader'
// import constants 
import MUTATION from '../constants/mutations';
import QUERY from '../constants/queries'

export default function Orders() {

  useEffect(() => {
    // Prefetch the dashboard page as the user will go there after the login
    router.prefetch('/login')
  }, [])

  const router = useRouter();

  // const { data, loading, error } = useQuery(QUERY.getProducts);

  // const [currentId, setCurrentId] = useState(null)

  // const [deleteProduct] = useMutation(MUTATION.deleteProduct, {
  //   update(cache) {
  //     // get to object cache
  //     const { getProducts } = cache.readQuery({ query: QUERY.getProducts });
  //     // overwrite cache
  //     cache.writeQuery({
  //       query: QUERY.getProducts,
  //       data: {
  //         getProducts: getProducts.filter(client => client.id !== currentId)
  //       }
  //     })
  //   }
  // })

  if (loading) return (
    <AdminLayout>
      <Loader open={loading} />
    </AdminLayout>
  )

  // if (!data?.getProducts) {
  //   setTimeout(() => {
  //     localStorage.clear()
  //     return router.push('/login', undefined, {
  //       shallow: true
  //     })
  //   }, 500);
  // }

  const headers = [
    'Nombre',
    'Quantityidad',
    'Precio',
    'Acciones'
  ]

  const actions = {
    delete: async id => {
      // setCurrentId(id);
      // const { data } = await deleteProduct({
      //   variables: {
      //     id
      //   }
      // })
      return data;
    },
    edit: (id) => {
      // router.push({
      //   pathname: '/edit_product/[id]',
      //   query: { id }
      // })
    }
  }

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl text-gray-800 font-light">
          Pedidos
      </h1>
        <Link href="/new_order" >
          <a className="bg-blue-800 py-2 px-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold" >Nueva Orden</a>
        </Link>
        <Table
          headers={headers}
          // data={data}
          actions={actions}
          // query={data.getProducts}
        />
      </AdminLayout>
    </>
  )
}