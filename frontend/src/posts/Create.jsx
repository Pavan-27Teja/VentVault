import React, { useContext, useState } from 'react'
import { Alert } from '../components';
import { createPost } from '../controllers/postsController';
import { PostContext } from '../contexts/PostContext';
import { useNavigate } from 'react-router-dom';
import {Editor} from "primereact/editor"

const Create = () => {
    const [error,setError] = useState(null);
    const navigate = useNavigate()
    const {posts,setPosts} = useContext(PostContext);
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const handleCreate =async (e)=>{
        e.preventDefault();
        try{
            const data = await createPost(title,body);
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
                        Create a new post
                    </h1>
                    <form onSubmit={handleCreate} className='flex flex-col gap-4 mt-5'>
                        <input type="text" placeholder='Post title' value={title} onChange={(e)=>{setTitle(e.target.value)}} className='input' autoFocus />
                        <textarea rows='6' placeholder='Post Content'value={body} onChange={(e)=>{setBody(e.target.value)}}  className='input'></textarea>
                        {/* <Editor value={body} onTextChange={(e)=>setBody(e.htmlValue)} className='max-h-[50vh] h-[250px] mb-10'/> */}
                        <button className='btn w-fit' >Create</button>

                    </form>
                    {error && <Alert msg={error}/>}
                </div>

            </div>
        </section>
    )
}

export default Create