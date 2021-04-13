import React, { useState, useEffect } from "react";
import Post from "./Post";

const PostsList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>
          <Post id={post.id} post={posts} />
        </div>
      ))}
    </>
  );
};

export default PostsList;
