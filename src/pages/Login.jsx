import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Context } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const response = await actions.login(data)
        if (response) {
            navigate('/')
        }
    }

    useEffect(() => {
        if(store.access_token !== null){
            navigate(-1)
        }
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center mt-5">Sign In</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5 p-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className={"form-control " + (errors.email ? 'is-invalid' : '')} id="email" name='email' placeholder="name@example.com" {...register('email', { required: 'Email is required!' })} />
                            <small className="invalid-feedback">{errors?.email?.message}</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="********" {...register('password')} />
                        </div>
                        <button className="btn btn-primary btn-sm w-100 py-2">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login