import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user"

const Home = () => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts} = useSelector((state) => state.post);

    useEffect(()=>{
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    },[])


    useEffect(() => {
        function onScroll() {
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -80) {
                if(hasMorePosts){
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts]);

    return (
        <div>
            <AppLayout>
                {me && <PostForm />}
                {mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
            </AppLayout>
        </div>
    );
};

export default Home;