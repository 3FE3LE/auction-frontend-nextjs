import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup'
// import components
import AdminLayout from '../../components/layouts/AdminLayout';
// import constants
import QUERY from '../../constants/queries';
import MUTATION from '../../constants/mutations';
import Swal from 'sweetalert2';
importLoaderfrom '../../components/Loader';

const EditClient = () => {
  const router = useRouter();

  console.log(router.query.id)

  const { query: { id } } = router

  const [updateClient] = useMutation(MUTATION.updateClient)

  const { data, loading, error } = useQuery(QUERY.getClientById, {
    variables: {
      id
    }
  })

  console.log(data, loading)
  console.log(error)

  if (loading) return (
    <AdminLayout>
      <Loader open={loading} />
    </AdminLayout>
  )

  const { getClientById } = data;

  const onSubmit = async values => {
    const { name, lastName, email, company } = values;
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastName,
            email,
            company
          }
        }
      })
      console.log(data)
      Swal.fire(
        'Actualizado',
        'El cliente se actualizo correctamente',
        'success'
      )
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const validationSchema = Yup.object({
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
  })

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl text-gray-800 font-light">
          Editar cliente
      </h1>
        {/* {msg && showMsg()} */}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <Formik
              validationSchema={validationSchema}
              enableReinitialize
              initialValues={getClientById}
              onSubmit={ values=> onSubmit(values)}

            >
              {props => {
                return (
                  <form
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={props.handleSubmit}
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
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.name && props.touched.name ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.name}</p>
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
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.lastName && props.touched.lastName ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.lastName}</p>
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
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.email && props.touched.email ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.email}</p>
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
                        value={props.values.company}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.company && props.touched.company ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.company}</p>
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
                        value={props.values.cellphone}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.cellphone && props.touched.cellphone ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.cellphone}</p>
                      </div>
                    ) : null}
                    <input
                      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer"
                      type="submit"
                      value="Editar Cliente" />
                  </form>
                )
              }}
            </Formik>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default EditClient
