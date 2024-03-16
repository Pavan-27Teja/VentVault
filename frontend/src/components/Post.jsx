import React from 'react'

const Post = ({ post,children }) => {
    return (
        <div className='py-3  w-full px-5  rounded-lg'>
            <div className='flex justify-between'>
                <div>
                    <div className='text-[--brand-color] font-semibold text-xl'>
                        {post.title}
                    </div>


                    <div className='font-light'>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                </div>
                {/* <div  className='fa-solid fa-trash p-2 bg-red-500 text-white h-fit rounded-md mr-5  '></div> */}
                <div>{children}</div>
            </div>
            <p className=''>
                {post.body}
            </p>


            <div className='flex h-px rounded-full  bg-gradient-to-r mt-5 from-indigo-50 via-[--brand-color] '>

            </div>
        </div>
    )
}

export default Post