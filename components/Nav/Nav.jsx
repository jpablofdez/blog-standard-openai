
import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import {useUser} from '@auth0/nextjs-auth0/client';
import { Logo } from '../Logo';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import PostsContext from '../../context/postsContext'

import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure,DisclosureButton,DisclosurePanel,CloseButton,Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { forwardRef } from 'react'


import {
  MdOutlineSpaceDashboard,MdOutlineAnalytics,MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,MdOutlineSettings,MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import {Navbar, NavbarBrand, NavbarMenuToggle, 
  NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, 
   Button} from "@nextui-org/react";


export const Nav = ({ 
  availableTokens,
  posts: postsFromSSR, 
  postId,
  postCreated
   }) => {
  const {user} = useUser();

  const { setPostsFromSSR, posts, getPosts, noMorePosts } = useContext(PostsContext);

  useEffect(() => {
      setPostsFromSSR(postsFromSSR);
     
      if (postId) {
        const exists = postsFromSSR.find((post) => post._id === postId);
        if (!exists) {
          getPosts({ getNewerPosts: true, lastPostDate: postCreated });
        }
      }
    }, [postsFromSSR, setPostsFromSSR, postId,postCreated, getPosts]);
 
  return (
   <div> 
    <Logo />
    <Disclosure as="nav" >

     {({ open }) => (
       <>
         <DisclosureButton className="absolute top-4 right-4 inline-flex
         items-center peer justify-center rounded-md p-2 text-gray-800
         hover:bg-gray-900 hover:text-white
         focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
             <GiHamburgerMenu
             className="block md:hidden h-6 w-6"
             aria-hidden="true"
             />
         </DisclosureButton>
        

          <div className="p-6 w-1/4 h-screen bg-white z-20 fixed top-0 
          -left-96 lg:left-0  vertical-scrollable" >



          <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
          Virtual Dashboard
          </h1>
          <div className=" my-4 border-b border-gray-100 pb-4">
          <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
          <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />

          <Link href="/post/new" className="btn">
          New post
          </Link>

          </div>
          <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
          
          <Link href="/token-topup" className="block mt-2 text-center">
          <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
          <span className="pl-1">{availableTokens} tokens available</span>
          </Link>
          </div>
          <div className="px-4 flex-1 overflow-auto ">

          {posts.map((post) => (
          <Link
          key={post._id}
          href={`/post/${post._id}`}
          className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
              postId === post._id ? 'bg-white/20 border-white' : ''
          }`}
          >

          {post.topic}
          </Link>
          ))}
          {!noMorePosts && (
          <div  
          onClick={() => {
          getPosts({ lastPostDate: posts[posts.length - 1].created });
          }}
          className="hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4">Load more posts
          </div>
          )}
          </div>
          </div>


          {/* logout */}
          <div className=" my-4">
          <div className="flex items-center gap-2 border-t border border-gray-200 h-20 px-2  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

          {!!user ? (
          <>
          <div className="min-w-[50px]">
          <Image
              src={user.picture}
              alt={user.name}
              height={50}
              width={50}
              className="rounded-full"
          />
          </div>
          <div className="flex-1">
          <div className="font-bold">{user.email}</div>
          <Link className="text-sm" href='/api/auth/logout'>Logout</Link>
          </div>
          </>
          ) : (
          <Link href='/api/auth/login'>Login</Link>
          )}
          </div>
          </div>


          </div>
          </div>

          <AnimatePresence>
             {open && (
               <DisclosurePanel
                 static
                 as={motion.div}
                 initial={{ opacity: 0, y: -24 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -24 }}
                 transition={{ duration: 0.2, ease: easeOut }}
                 className="origin-top"
               >
           <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 
          left-0 w-70  
          peer:transition ease-out delay-150 duration-200">

          <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
          Virtual Dashboard
          </h1>
          <div className=" my-4 border-b border-gray-100 pb-4">
          <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
          <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />

          <Link href="/post/new" className="btn">
          New post
          </Link>

          </div>
          <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
          <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
          <Link href="/token-topup" className="block mt-2 text-center">
          <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
          <span className="pl-1">{availableTokens} tokens available</span>
          </Link>
          </div>
          <div className="px-4 flex-1 overflow-auto ">

          {posts.map((post) => (
          <Link
          key={post._id}
          href={`/post/${post._id}`}
          className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
              postId === post._id ? 'bg-white/20 border-white' : ''
          }`}
          >
          {post.topic}
          </Link>
          ))}
          {!noMorePosts && (
          <div  
          onClick={() => {
          getPosts({ lastPostDate: posts[posts.length - 1].created });
          }}
          className="hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4">Load more posts
          </div>
          )}
          </div>
          </div>


          {/* logout */}
          <div className=" my-4">
          <div className="flex items-center gap-2 border-t border border-gray-200 h-20 px-2  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

          {!!user ? (
          <>
          <div className="min-w-[50px]">
          <Image
              src={user.picture}
              alt={user.name}
              height={50}
              width={50}
              className="rounded-full"
          />
          </div>
          <div className="flex-1">
          <div className="font-bold">{user.email}</div>
          <Link className="text-sm" href='/api/auth/logout'>Logout</Link>
          </div>
          </>
          ) : (
          <Link href='/api/auth/login'>Login</Link>
          )}
          </div>
          </div>


          </div>
          </div>
               </DisclosurePanel>
             )}
           </AnimatePresence>

        
       </>
     )}
   </Disclosure>

    
   </div>
    
  );
};
