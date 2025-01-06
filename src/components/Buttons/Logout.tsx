import { auth } from '@/firebase/firebase'
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { FiLogOut } from 'react-icons/fi'

const Logout = () => {
    const [signOut] = useSignOut(auth);

    const handleLogout = () =>{
        signOut();
        toast.success("Logged out successfully")
    }
  return (
    <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer text-brand-orange rounded' onClick={handleLogout}>
        <FiLogOut/>
    </button>
  )
}

export default Logout