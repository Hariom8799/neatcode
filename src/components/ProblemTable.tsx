'use client'
import { problems } from '@/mockProblems/problemData'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillYoutube } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'


const ProblemTable = () => {
    const [youtubeplayer, setYoutubePlayer] = useState({show:false, videoId:''})
    
    const closeModal = ()=>(setYoutubePlayer({show : false, videoId : ""}))
  return (
    <>
    
    <tbody>
        {
            problems.map((doc,ind)=>{
                const diffColor = doc.difficulty === 'Easy' ? "text-dark-green-s" : doc.difficulty === 'Medium' ? "text-dark-yellow" : "text-dark-pink"
                return(
                    <tr key={ind} className={`${ind%2 === 1 ? 'bg-dark-fill-2' : ""} `}>
                        <th className='px-6 py-4 font-medium text-dark-green-s whitespace-nowrap'>
                            <BsCheck2Circle fontSize={'18'} width={"18"}/>
                        </th>
                        <td className='px-6 py-4 '>
                            <Link href={`/problems/${doc.id}`} className="cursor-pointer hover:text-blue-600">{doc.title}</Link>
                        </td>
                        <td className={`px-6 py-4 ${diffColor}`}>
                            {doc.difficulty}
                        </td>
                        <td className='px-6 py-4'>
                            {doc.category}
                        </td>
                        <td className='px-6 py-4'>
                            {doc.videoId ? (<AiFillYoutube onClick={()=> (setYoutubePlayer({show : true, videoId : doc.videoId as string}))} fontSize={"30"} className={"hover:text-red-600 cursor-pointer"}/>) : (<p>Comming Soon</p>)}
                        </td>
                    </tr>
                )
            })
        }
    </tbody>

    {
        youtubeplayer.show && (
            <tfoot className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center'>
                <div className='bg-black opacity-70 z-10 top-0 left-0 w-screen h-screen absolute' onClick={closeModal}></div>
                <div className='w-full h-full px-6 relative max-w-4xl z-20 '>
                    <div className='flex items-center justify-center w-full h-full relative'>
                        <div className='w-full relative'>
                            <IoClose onClick={closeModal} fontSize={"35"} className='absolute -top-16 right-0 cursor-pointer'/>
                            <YouTube videoId={youtubeplayer.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]' />
                        </div>
                    </div>
                </div>
            </tfoot>
        )
    }

    

    </>
  )
}

export default ProblemTable