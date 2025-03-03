'use client'
import AuthModal from '@/components/AuthModal'
import Navbar from '@/components/Navbar'
import { auth } from '@/firebase/firebase'
import { authModalState } from '@/states/atoms/AuthModalAtom'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'

const Page = () => {
    const authModal = useRecoilValue(authModalState)
	const [user,loading] = useAuthState(auth);
	const [pageLoading,setPageLoading] = useState(true);
	const router = useRouter();

	useEffect(()=>{
		if(user){
			router.push('/')
		}
		if(!user && !loading){
			setPageLoading(false)
		}
	},[user,loading,router])

	if(pageLoading){
		return null
	}

  return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image src='/hero.png' alt='Hero img' width={700} height={700} />
				</div>
                {authModal.isOpen && <AuthModal/>}
			</div>
		</div>
  )
}

export default Page