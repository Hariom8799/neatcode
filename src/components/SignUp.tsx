'use client';
import { auth } from '@/firebase/firebase';
import { authModalState } from '@/states/atoms/AuthModalAtom';
import React from 'react'
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const SignUp = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [inputs, setInputs] = React.useState({"email": "", "password": "", "name": ""})
	const router = useRouter();
	const [
		createUserWithEmailAndPassword,
		// user,
		loading,
		
	  ] = useCreateUserWithEmailAndPassword(auth);

	const handleButtonClick = (type : "login" | "register" | "forgotPassword") =>{
		setAuthModalState((prev) => ({...prev, type}))
	}


	const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev)=> ({...prev, [e.target.name] : e.target.value}))
		// console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
	}

	const handleRegister = async (e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(!inputs.email || !inputs.password || !inputs.name) return toast.error("Please fill in all fields")
		try{
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
			if(!newUser)	return 
			toast.success("Account created successfully")
			router.push('/')
		}
		catch(err){
			toast.error("An error occurred. Please try again later")
			console.log(err)
		}
	}

  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister} >
			<h3 className='text-xl font-medium text-white'>Register to LeetClone</h3>
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
				<label htmlFor='name' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Name 
				</label>
				<input
					onChange={handleInputChange}
					type='text'
					name='name'
					id='name'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='John Doe'
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
				{loading ? "Loading..." : "Register"}
			</button>
			
			<div className='text-sm font-medium text-gray-300 text-center'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={()=> handleButtonClick('login')} >
					Log In
				</a>
			</div>
	</form>
  )
}

export default SignUp