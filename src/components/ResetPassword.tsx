import { auth } from '@/firebase/firebase';
// import { authModalState } from '@/states/atoms/AuthModalAtom';
import React, {  useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
// import { useSetRecoilState } from 'recoil';

const ResetPassword = () => {
	
	// const setAuthModalState = useSetRecoilState(authModalState);
	const [email, setEmail] = useState('');
	const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
	
	// const handleButtonClick = (type : "login" | "register" | "forgotPassword") =>{
	// 	setAuthModalState((prev) => ({...prev, type}))
	// }
	
	const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email)
		if(success){
			toast.success("Password reset email sent successfully" )
		}
		else{
			toast.error("An error occurred. Please try again later")
		}
	}


  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleResetPassword}>
			<h3 className='text-xl font-medium text-white'>Reset Password</h3>

            <p className='text-sm text-white'>Forgotten your password? Enter your e-mail address below, and we will send you an e-mail allowing you to reset it.</p>

			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Email
				</label>
				<input
					onChange={(e) => setEmail(e.target.value)}
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
			
			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            '
				// onClick={()=> handleButtonClick("login")}
			>
				Log In
			</button>
			
	</form>
  )
}

export default ResetPassword