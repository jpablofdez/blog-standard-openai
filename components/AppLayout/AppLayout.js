import Link from "next/link";
import {useUser} from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { Logo } from '../Logo';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import PostsContext from '../../context/postsContext'
import { Nav } from '../Nav';

export const AppLayout = ({
    children, 
    availableTokens,
    posts: postsFromSSR, 
    postId,
    postCreated
     }) => {
    const {user} = useUser();

    const { setPostsFromSSR, posts, getPosts, noMorePosts } = useContext(PostsContext);

    useEffect(() => {
        setPostsFromSSR(postsFromSSR);
        console.log("applayaout: ",availableTokens);
        if (postId) {
          const exists = postsFromSSR.find((post) => post._id === postId);
          if (!exists) {
            getPosts({ getNewerPosts: true, lastPostDate: postCreated });
          }
        }
      }, [postsFromSSR, setPostsFromSSR, postId,postCreated, getPosts]);
    

    return(
        <div>

        <Nav availableTokens={availableTokens} postsFromSSR={postsFromSSR} postId= {postId} postCreated= {postCreated} />
        
        <div className="flex flex-col justify-start item-center h-screen max-h-screen">
            

            {children}
        </div>
        </div>
    );
};