import React from 'react'
import { Tooltip } from '@material-ui/core'

export const OrderTier = ({item, actions, alert}) => {
  return (
    <tr key={item.id} >
            <td className="border px-4 py-2">{item.name} {item.lastName}</td>
            <td className="border px-4 py-2">{item.company}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2 ">
              <div className="flex justify-around">
                <Tooltip
                  title="ELIMINAR"
                >
                <button
                  onClick={() => alert(item.id)}
                  type="button"
                  className="flex justify-center inline-flex items-center"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="x-circle w-6 h-6 text-red-600 hover:text-red-800"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                </button>
                </Tooltip>
                <Tooltip
                  title="EDITAR"
                >
                <button
                  onClick={() => actions.edit(item.id)}
                  type="button"
                  className="flex justify-center inline-flex items-center"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="pencil-alt w-6 h-6 text-blue-600 hover:text-blue-800"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                </button>
                </Tooltip>
              </div>
            </td>
          </tr>
  )
}
