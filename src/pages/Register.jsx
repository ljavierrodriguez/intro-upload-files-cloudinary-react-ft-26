import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { Context } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
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
        const response = await actions.register(data)
        if (response) {
            navigate('/')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center mt-5">Register</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5 p-4">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input type="email" className={"form-control " + (errors.email ? 'is-invalid' : '')} id="email" name='email' placeholder="name@example.com" {...register('email', { required: 'Email is required!' })} />
                            <small className="invalid-feedback">{errors?.email?.message}</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="********" {...register('password')} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="********" {...register('confirm_password')} />
                        </div>
                        <button className="btn btn-primary btn-sm w-100 py-2">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register