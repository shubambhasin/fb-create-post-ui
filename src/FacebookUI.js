import React, { useState } from "react";
import avatar from "./assets/avatar.jpg";
import { usePost } from "./context/PostContext";
import { CreatePost } from "./CreatePost";
export const FacebookUI = () => {
  const {
    error,
    setError,
    post,
    setPost,
    posts,
    setPosts,
    modal,
    setModal
  } = usePost();

  console.log(posts);
  return (
    <div className="flex flex-col gap-2 relative">
      <button className="btn btn-blue" onClick={() => setModal(true)}>
        Create post
      </button>
      {modal && <CreatePost />}
      <div className="posts-ui p1-rem">
        {posts.length !== 0 ? (
          <>
            <h1 className="h3">Posts</h1>
            {posts
              .slice(0)
              .reverse()
              .map((post, index) => {
                return (
                  <div className="post flex gap-2 mtb1-rem p1-rem" key={index}>
                    <div className="flex">
                      <img src={avatar} className="avatar" alt="avatar" />
                    </div>
                    <div className="post-data flex flex-col aifs">
                      <small className="bold">Test User</small>
                      <p className=" mtb1-rem">{post[0].text}</p>
                      {post[0].image.length !== 0 && (
                        <img
                          class="post-gif br5px"
                          src={post[0].image}
                          alt="img"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          "No posts to show, create one !"
        )}
      </div>
    </div>
  );
};
