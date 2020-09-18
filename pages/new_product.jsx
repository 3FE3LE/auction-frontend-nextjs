import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router';
import { useFormik} from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react'
// import components
import AdminLayout from '../components/layouts/AdminLayout'
// import constants
import MUTATION from '../constants/mutations';
import QUERY from '../constants/queries';

export default function NewProducts() {
  const router = useRouter();

  const [newProduct] = useMutation(MUTATION.newProduct, {
    update(cache, { data: { newProduct } }) {
      // get cache object
      const { getProducts } = cache.readQuery({ query: QUERY.getProducts });

      // overwrite cache
      cache.writeQuery({
        query: QUERY.getProducts,
        data: {
          getProducts: [...getProducts, newProduct]
        }
      })
    }
  })

  const [msg, setMsg] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      quantity: '',
      price: 0
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('El nombre es requerido'),
      quantity: Yup.number()
        .required('la quantityidad es requerida')
        .positive('no se permiten quantityidades negativas')
        .integer('solo se permiten quantityidades enteras'),
      price: Yup.number()
        .required('El precio es requerido')
        .positive('no se permiten quantityidades negativas')
    }),
    onSubmit: async values => {
      const { name, quantity, price } = values;
      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              quantity: Number(quantity),
              price: Number(price)
            }
          }
        })
        console.log(data)
        setMsg(`${data.newProduct.name} registrado correctamente`)
        setTimeout(() => {
          setMsg(null)
        }, 2000);
        setTimeout(() => {
          router.push('/products')
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Precio
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="price"
                  type="text"
                  placeholder="Precio"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.price && formik.touched.price ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.price}</p>
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
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.quantity && formik.touched.quantity ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold" >Error</p>
                  <p>{formik.errors.quantity}</p>
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
