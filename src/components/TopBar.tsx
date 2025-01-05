'use client'
import { auth } from '@/firebase/firebase'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Logout from './Buttons/Logout'
import {  useSetRecoilState } from 'recoil'
import { authModalState } from '@/states/atoms/AuthModalAtom'

const TopBar = () => {
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <nav className='w-full h-[50px] flex items-center shrink-0 bg-dark-layer-1 text-dark-gray-7 '>
        <div className='flex items-center justify-between max-w-[1200px] mx-auto w-full'>
            <Link href={'/'}>
                <Image src='/logo-full.png' alt='Logo' height={100} width={100} />
            </Link>

            <div className='flex items-center space-x-4 justify-end flex-1'>
                <div>
                    <a href="#" className='bg-dark-fill-3 py-1.5 px-2 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'> Premium</a>
                </div>
                {
                    !user && (<Link href={'/auth'} >
                        <button className='bg-dark-fill-3 py-1 px-2 rounded cursor-pointer ' onClick={()=> {
                            setAuthModalState((prev)=>({...prev, isOpen: true, type: 'login'}))
                        }}>Sign In</button>
                    </Link>)
                }

                {
                    user && (
                        <div className='cursor-pointer group relative'>
                            <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />

                            <div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
                        </div>
                    )
                }

                {user && <Logout/>}
                
            </div>

        </div>

    </nav>
  )
}

export default TopBar