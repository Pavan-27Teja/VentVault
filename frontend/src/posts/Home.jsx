import React, { useContext, useEffect, useState } from 'react'
import { getPosts } from '../controllers/postsController'
import { PostContext } from '../contexts/PostContext'
import Post from '../components/Post';

const Home = () => {
    // Use post Context
    const { posts, setPosts } = useContext(PostContext);

    // Loading State
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(async () => {
            const data = await getPosts();
            setPosts(data.posts);

            setLoading(false);
        }, 500)
    }, [])

    return (
        <section>
            <div className='container'>
                <div className='card '>
                    <h1 className='title'>Latest posts</h1>
                    {loading && (
                        <div className='flex justify-center'>
                            <div className='text-center animate-spin h-[80px]  w-[80px] border-t-[6px] border-b-[6px] rounded-full border-[--brand-color] mt-10'>
                            
                            </div>
                        </div>
                        
                    )}
                    <div className="posts-section mt-10">
                        {posts && posts.map((post) => (
                            <div key={post._id} >
                                <Post post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Home