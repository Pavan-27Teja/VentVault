import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '../components';
import { PostContext } from '../contexts/PostContext';
import { updatePost } from '../controllers/postsController';

const Update = () => {
    const [error,setError] = useState(null);
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state);
    console.log(location)
    const {posts,setPosts} = useContext(PostContext);
    const [title,setTitle] = useState(state.title);
    const [body,setBody] = useState(state.body);
    const handleUpdate =async (e)=>{
        e.preventDefault();
        try{
            const data = await updatePost(state._id,title,body);
            setPosts([...posts,data.post])
            navigate('/dashboard')

        }catch(error){
            setError(error.message)
        }
    }
    return (
        <section>

            <div className='container'>
                <div className='card'>
                    <h1 className='title'>
                        Update the post
                    </h1>
                    <form onSubmit={handleUpdate} className='flex flex-col gap-4 mt-5'>
                        <input type="text" placeholder='Post title' value={title} onChange={(e)=>{setTitle(e.target.value)}} className='input' autoFocus />
                        <textarea rows='6' placeholder='Post Content'value={body} onChange={(e)=>{setBody(e.target.value)}}  className='input'></textarea>
                        <button className='btn w-fit' >Update</button>

                    </form>
                    {error && <Alert msg={error}/>}
                </div>

            </div>
        </section>
    )
}

export default Update