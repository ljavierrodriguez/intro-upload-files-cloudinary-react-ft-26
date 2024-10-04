import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
export const Context = createContext(null)

const GlobalContext = ({ children }) => {

    const [store, setStore] = useState({
        apiURL: 'http://127.0.0.1:5000',
        access_token: null,
        user: null,
        posts: null
    })

    const [actions] = useState({
        checkCurrentUser: async () => {
            if (sessionStorage.getItem('access_token')) {
                setStore((store) => ({ ...store, access_token: sessionStorage.getItem('access_token') }))
                setStore((store) => ({ ...store, user: JSON.parse(sessionStorage.getItem('user')) }))
            }
        },
        register: async (credentials) => {
            try {
                const { apiURL } = store
                const response = await fetch(`${apiURL}/api/register`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()

                console.log(datos)
                if (datos.status === 'success') {
                    toast.success(datos.message)
                    setStore((store) => ({ ...store, access_token: datos.data.access_token, user: datos.data.user }))
                    sessionStorage.setItem('access_token', datos.data.access_token)
                    sessionStorage.setItem('user', JSON.stringify(datos.data.user))
                    return true
                } else {
                    toast.error(datos.message)
                    return false
                }

            } catch (error) {
                console.log(error.message)
            }
        },
        login: async (credentials) => {
            try {
                const { apiURL } = store
                const response = await fetch(`${apiURL}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()

                console.log(datos)
                if (datos.status === 'success') {
                    toast.success(datos.message)
                    setStore((store) => ({ ...store, access_token: datos.data.access_token, user: datos.data.user }))
                    sessionStorage.setItem('access_token', datos.data.access_token)
                    sessionStorage.setItem('user', JSON.stringify(datos.data.user))
                    return true
                } else {
                    toast.error(datos.message)
                    return false
                }

            } catch (error) {
                console.log(error.message)
            }
        },
        updateProfile: async (formData, access_token) => {
            try {
                const { apiURL } = store
                console.log(access_token)
                const response = await fetch(`${apiURL}/api/profile`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                const datos = await response.json()

                console.log(datos)
                if (datos.status === 'success') {
                    toast.success(datos.message)
                    setStore((store) => ({ ...store, user: datos.user }))
                    sessionStorage.setItem('user', JSON.stringify(datos?.user))
                    return true
                } else {
                    toast.error(datos.message)
                    return false
                }

            } catch (error) {
                console.log(error.message)
            }
        },
        logout: async () => {
            if (sessionStorage.getItem('access_token')) {
                sessionStorage.removeItem('access_token')
                sessionStorage.removeItem('user')
                setStore((store) => ({ ...store, access_token: null, user: null }))
                return true
            }
        }
    })

    useEffect(() => {
        actions.checkCurrentUser()
    }, [])


    return (
        <Context.Provider value={{ store, actions }}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext