import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Context } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

import imgSrc from './../img/no-photo.png'

const Profile = () => {
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

        const formData = new FormData()

        formData.append('biography', data.biography)
        formData.append('github', data.github)
        formData.append('linkedin', data.linkedin)
        formData.append('avatar', data.avatar[0])


        await actions.updateProfile(formData, store.access_token)
    
    }

    useEffect(() => {
        if(store?.access_token == null){
            navigate('/login')
        }
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center mt-5">Profile</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5 p-4">
                        <div className="mb-3 text-center">
                            <img src={store?.user?.profile?.avatar || imgSrc } alt="" className='img-fluid w-50 my-3' />
                            <input type="file" className={"form-control " + (errors.avatar ? 'is-invalid' : '')} id="avatar" name='avatar' {...register('avatar')} />
                            <small className="invalid-feedback">{errors?.avatar?.message}</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input type="email" defaultValue={store?.user?.email} className={"form-control " + (errors.email ? 'is-invalid' : '')} id="email" name='email' placeholder="name@example.com" {...register('email')} readOnly disabled/>
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
                        <div className="mb-3">
                            <label htmlFor="biography" className="form-label">Biography</label>
                            <textarea className="form-control" id="biography" name="biography" rows="3" placeholder='Your biography here' {...register('biography')} defaultValue={store?.user?.profile?.biography}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="github" className="form-label">Github</label>
                            <input type="text" className={"form-control"} id="github" name='github' placeholder="john.doe" {...register('github')} defaultValue={store?.user?.profile?.github} />
                            <small className="invalid-feedback"></small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="linkedin" className="form-label">Linkedin</label>
                            <input type="text" className={"form-control"} id="linkedin" name='linkedin' placeholder="john.doe" {...register('linkedin')} defaultValue={store?.user?.profile?.linkedin} />
                            <small className="invalid-feedback"></small>
                        </div>
                        <button className="btn btn-warning btn-sm w-100 py-2">Update Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile