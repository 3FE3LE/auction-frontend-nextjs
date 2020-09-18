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
import Loader from '../../components/Loader';

const EditProduct = () => {
  const router = useRouter();

  console.log(router.query.id)

  const { query: { id } } = router

  const [updateProduct] = useMutation(MUTATION.updateProduct)

  const { data, loading, error } = useQuery(QUERY.getProductById, {
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

  const { getProductById } = data;

  const onSubmit = async values => {
    const { name, quantity, price } = values;
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            price: Number(price),
            quantity: Number(quantity)
          }
        }
      })
      console.log(data)
      Swal.fire(
        'Actualizado',
        'El producto se ha actualizo correctamente',
        'success'
      )
      router.push('/products')
    } catch (error) {
      console.log(error)
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es requerido'),
    quantity: Yup.number()
      .required('la quantityidad es requerida')
      .positive('no se permiten quantityidades negativas')
      .integer('solo se permiten quantityidades enteras'),
    price: Yup.number()
      .required('El precio es requerido')
      .positive('no se permiten quantityidades negativas')
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
              initialValues={getProductById}
              onSubmit={values => onSubmit(values)}

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
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Precio
                </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        id="price"
                        type="text"
                        placeholder="Precio"
                        value={props.values.price}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.price && props.touched.price ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.price}</p>
                      </div>
                    ) : null}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                        Quantityidad
                                </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        id="quantity"
                        type="text"
                        placeholder="Quantityidad"
                        value={props.values.quantity}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.errors.quantity && props.touched.quantity ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold" >Error</p>
                        <p>{props.errors.quantity}</p>
                      </div>
                    ) : null}
                    <input
                      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer"
                      type="submit"
                      value="Editar Producto" />
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

export default EditProduct
