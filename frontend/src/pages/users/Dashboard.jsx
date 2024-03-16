import React, { useContext, useEffect, useState } from 'react'
import { deletePost, getUserPosts } from '../../controllers/postsController'
import Post from '../../components/Post';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import Success from '../../components/Success';
import { Alert } from '../../components';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const [success,setSuccess] = useState(null)
    const [error,setError] = useState(null)
    useEffect(() => {
        setTimeout(async () => {
            const { userPosts, email } = await getUserPosts();

            setUser({ email: email, posts: userPosts });
            setLoading(false)
        }, 500);
    }, [])
    
    const handleDelete =async (_id)=>{
        try{
            const data = await deletePost(_id);
            setSuccess(data.success)
        }catch(error){
            setError(error.message)
        }
        const newPosts = user.posts.filter(post=>post._id!==_id );
        setUser({...user,posts:newPosts});
    }
    return (
        <section>
            <div className='container'>
                <div className='card'>
                <div className='py-1 px-2  bg-[--brand-lowcolor] w-fit text-white rounded-md'>
                        <h1>
                            {user.email}
                        </h1>
                    </div>
                    <h1 className='title  mt-1'>
                        User Dashboard
                    </h1>

                    {loading && (
                        <div className='flex justify-center'>
                            <div className='text-center animate-spin h-[80px]  w-[80px] border-t-[6px] border-b-[6px] rounded-full border-[--brand-color] mt-10'>

                            </div>
                        </div>


                    )}

                    {success && <Success msg={success}/>}
                    {error && <Alert msg={error}/>}

                    
                    {user.posts && user.posts.map((post) => (
                        <div key={post._id} >
                            <Post post={post} >
                                <div className='flex items-center'>
                                    <Link title='Update' to='/update' state={post} className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200">
                                    </Link>
                                    <button title='Delete'  onClick={()=>handleDelete(post._id)} className='fa-solid fa-trash-can text-red-500 nav-link hover:bg-red-200'></button>
                                </div>
                            </Post>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    )
}

export default Dashboard