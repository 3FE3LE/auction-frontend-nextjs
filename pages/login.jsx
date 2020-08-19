import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import LandingLayout from '../components/layouts/LandingLayout'

export default function Login() {

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('No tiene el formato adecuado')
                .required('El correo electrónico es requerido'),
            password: Yup.string()
                .required('La contraseña es requerida')
                .min(6, 'Debe contener al menos 6 caracteres')
        }),
        onSubmit: values => {
            console.log('Sending')
            console.log(values)
        }
    })

    return (
        <>
            <LandingLayout>
                <h1 className="text-center text-2xl text-white font-light">
                    Login
                </h1>
                <div className="flex justify-center mt-5">

                    <div className="w-full  max-w-sm">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
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
                            ): null}
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
                            ): null}
                            <input 
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer"
                                type="submit" 
                                value="Iniciar Sesión" />
                        </form>
                    </div>
                </div>
            </LandingLayout>
        </>
    )
}
