import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react'
// import components
import AdminLayout from '../components/layouts/AdminLayout'
import MUTATION from '../constants/mutations';
import QUERY from '../constants/queries';




export default function Index() {
  const router = useRouter();

  const [newClient] = useMutation(MUTATION.newClient,{
    update(cache, { data:{newClient}}) {
      // get cache object
      const {getClientsByUser} = cache.readQuery({query: QUERY.getClientsByUser});
      
      // overwrite cache
      cache.writeQuery({
        query: QUERY.getClientsByUser,
        data: {
          getClientsByUser: [ ... getClientsByUser, newClient]
        }
      })
    }
  })

  const [msg, setMsg] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      company: '',
      cellphone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('El nombre es requerido'),
      lastName: Yup.string()
        .required('El apellido es requerido'),
      email: Yup.string()
        .email('No tiene el formato adecuado')
        .required('El correo electrónico es requerido'),
      company: Yup.string()
        .required('La compañia es requerida'),
      cellphone: Yup.string()
    }),
    onSubmit: async values => {
      const { name, lastName, email, company, cellphone } = values;
      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastName,
              email,
              company,
              cellphone
            }
          }
        })
        console.log(data)
        setMsg(`${data.newClient.name} ${data.newClient.lastName} se registro correctamente`)
        setTimeout(() => {
          setMsg(null)
        }, 2000);
        setTimeout(() => {
          router.push('/')
        }, 2500);
      } catch (error) {
        setMsg(error.message.replace('GraphQL error: ', ''))
        setTimeout(() => {
          setMsg(null)
        }, 3000);
        console.log(error)
      }
    }
  })

  const showMsg = () => (
    <div className="bg-white py-2 px-3 w-full my-4 max-w-sm mx-auto text-center">
      <p>{msg}</p>
    </div>
  )
  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl text-gray-800 font-light">

          Nuevo Cliente
      </h1>
        {msg && showMsg()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre
                                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.name && formik.touched.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Apellido
                                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="lastName"
                  type="text"
                  placeholder="Apellido"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.lastName}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Correo Electrónico
                                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="email"
                  type="email"
                  placeholder="Correo Electrónico"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                  Compa&#241;ia
                                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="company"
                  type="text"
                  placeholder="Compa&#241;ia"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.company && formik.touched.company ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.company}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellphone">
                  Celular
                                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="cellphone"
                  type="text"
                  placeholder="Celular"
                  value={formik.values.cellphone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.cellphone && formik.touched.cellphone ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.cellphone}</p>
                </div>
              ) : null}
              <input
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer"
                type="submit"
                value="Crear Cliente" />
            </form>
        </div>
        </div>

    </AdminLayout>
    </>
  )
}
