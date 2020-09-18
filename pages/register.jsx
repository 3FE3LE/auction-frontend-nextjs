import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import LandingLayout from '../components/layouts/LandingLayout'
import { useMutation } from '@apollo/client'

// constants
import MUTATION from '../constants/mutations'
import { useRouter } from 'next/router'




export default function Register() {

    const router = useRouter();

    const [msg, setMsg] = useState(null)

    const [newUser] = useMutation(MUTATION.newUser);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El nombre es requerido'),
            lastName: Yup.string()
                .required('El apellido es requerido'),
            email: Yup.string()
                .email('No tiene el formato adecuado')
                .required('El correo electrónico es requerido'),
            password: Yup.string()
                .required('La contraseña es requerida')
                .min(6, 'Debe contener al menos 6 caracteres')
        }),
        onSubmit: async values => {
            const { name, lastName, email, password } = values;
            try {
                const { data } = await newUser({
                    variables: {
                        input: {
                            name,
                            lastName,
                            email,
                            password
                        }
                    }
                })
                console.log(data )
                setMsg(`${data.newUser.name} ${data.newUser.lastName} se registro correctamente`)
                setTimeout(() => {
                    setMsg(null)
                }, 3000);
                setTimeout(() => {
                    router.push('/login')
                }, 4000);
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
            <LandingLayout>
                {msg && showMsg()}
                <h1 className="text-center text-2xl text-white font-light">
                    Registro de usurario
                </h1>
                <div className="flex justify-center mt-5">

                    <div className="w-full  max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    id="name"
                                    type="name"
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
                                    Apellidos
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    id="lastName"
                                    type="lastName"
                                    placeholder="Apellidos"
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
                            <div className="mb-4" >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Contrase&#241;a
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold" >Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                            <input
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer"
                                type="submit"
                                value="Crear Cuenta" />
                        </form>
                    </div>
                </div>
            </LandingLayout>
        </>
    )
}
