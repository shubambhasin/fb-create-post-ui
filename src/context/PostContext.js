import { createContext, useContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [post, setPost] = useState([
    {
      text: "",
      image: ""
    }
  ]);
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);

  return (
    <PostContext.Provider
      value={{
        error,
        setError,
        post,
        setPost,
        text,
        setText,
        posts,
        setPosts,
        modal,
        setModal
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
