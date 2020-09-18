import React from 'react'
import Swal from 'sweetalert2';
import { ClientTier } from './Misc/ClientTier';
import { ProductTier } from './Misc/ProductTier';
import { OrderTier } from './Misc/OrderTier';
import { useRouter } from 'next/router';

export const Table = ({ headers, data, actions, query }) => {

  const router = useRouter();

  const { pathname } = router;

  let section = '';

  console.log(pathname)

  const tier = (item) => {
    switch (pathname) {
      case "/":
        section = 'cliente'
        return (
          <ClientTier key={item.id} item={item} actions={actions} alert={alert} />
        )
      case "/products":
        section = 'producto'
        return (
          <ProductTier key={item.id} item={item} actions={actions} alert={alert} />
        )
      case "/orders":
        section = 'pedidos'
        return (
          <OrderTier key={item.id} item={item} actions={actions} alert={alert} />
        )
      default:
        break;
    }
  }

  const alert = id => Swal.fire({
    title: `¿Desea eliminar es te ${section}?`,
    text: "Esta acción es irreversible",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.value) {
      try {
        console.log(id)
        await actions.delete(id)
        Swal.fire(
          'Eliminado!',
          `El ${section} ha sido eliminado`,
          'success'
        )
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <table className="table-auto shadow-md mt-10 w-full w-lg  ">
      <thead className="bg-gray-800  ">
        <tr className="text-white  ">
          {headers.map(header => (
            <th key={header} className="w-1/4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white ">
        {data && query?.map(item => tier(item))}
      </tbody>
    </table>
  )
}
