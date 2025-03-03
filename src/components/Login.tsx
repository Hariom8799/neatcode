'use client'
import { auth } from '@/firebase/firebase';
import { authModalState } from '@/states/atoms/AuthModalAtom'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil'

const Login = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [signInWithEmailAndPassword,loading] = useSignInWithEmailAndPassword(auth);
	const [credentials, setCredentials] = useState({email: "", password: ""})
	const router = useRouter();

	const handleButtonClick = (type : "login" | "register" | "forgotPassword") =>{
		setAuthModalState((prev) => ({...prev, type}))
	}

	const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setCredentials((prev) => ({...prev, [name] : value}))
	}

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(!credentials.email || !credentials.password) return toast.error("Please fill in all fields")
			const user = await signInWithEmailAndPassword(credentials.email, credentials.password);

			if(!user){
				return toast.error("Invalid credentials")
				
			}

			toast.success("Login successfull")
			router.push('/');
		try {
			
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
				// console.log(err.message);
			} else {
				// console.log('An unknown error occurred');
				toast.error('An unknown error occurred');

			}
		}
	}

  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
			<h3 className='text-xl font-medium text-white'>Sign in to LeetClone</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Email
				</label>
				<input
					onChange={handleInputChange}
					type='email'
					name='email'
					id='email'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Password
				</label>
				<input
					onChange={handleInputChange}
					type='password'
					name='password'
					id='password'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            '
			>
				{loading ? "Loading..." : "Log In"}
			</button>
			<button className='flex w-full justify-end' onClick={()=> handleButtonClick("forgotPassword")} >
				<a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
					Forgot Password?
				</a>
			</button>
			<div className='text-sm font-medium text-gray-300 text-center'>
				Not Registered?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={()=> handleButtonClick("register")} >
					Create account
				</a>
			</div>
	</form>
  )
}

export default Login