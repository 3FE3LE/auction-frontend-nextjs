import React from 'react'
import Swal from 'sweetalert2';
export const Table = ({ headers, data, actions, query }) => {

  const alert = id => Swal.fire({
    title: '¿Desea eliminar es te cliente?',
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
          'El registro ha sido eliminado',
          'success'
        )
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-gray-800">
        <tr className="text-white">
          {headers.map(header => (
            <th key={header} className="w-1/4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {data && query.map(item => (
          <tr key={item.id} >
            <td className="border px-4 py-2">{item.name} {item.lastName}</td>
            <td className="border px-4 py-2">{item.company}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2 ">
              <div className="flex justify-around">
                <button
                  onClick={() => alert(item.id)}
                  type="button"
                  className="flex justify-center inline-flex items-center"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="x-circle w-6 h-6 text-red-600 hover:text-red-800"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                </button>
                <button
                  onClick={() => actions.edit(item.id)}
                  type="button"
                  className="flex justify-center inline-flex items-center"
                ><svg viewBox="0 0 20 20" fill="currentColor" className="pencil-alt w-6 h-6 text-blue-600 hover:text-blue-800"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </td>


          </tr>
        ))}
      </tbody>

    </table>
  )
}
