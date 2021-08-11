import { useRef, useState } from "react";
import { instance } from "./api/axios";
import { usePost } from "./context/PostContext";

export const CreatePost = () => {
  const {
    error,
    setError,
    post,
    setPost,
    posts,
    setPosts,
    setModal
  } = usePost();
  const [searchGif, setSearchGif] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const ref = useRef("");
  const handleChange = (e) => {
    e.preventDefault();
    setPost({ ...post, text: e.target.value });
  };
  const submitPost = () => {
    if (post.text.length !== 0 || post.image.length !== 0) {
      setPosts([...posts, post]);
      setPost({
        text: "",

        image: ""
      });

      setModal(false);
    } else {
      setError("Enter text or choose gif");
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };

  const debounce = function (callback, delay) {
    let timer;
    return function () {
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const handleGif = async (e) => {
    if (ref.current.value.length !== 0) {
      try {
        setLoader(true);
        const response = await instance.get(
          `/search?api_key=k63sMfP5nNS9CcNQCVCWGip59G0Jidhn&q=${ref.current.value}&limit=10&offset=0&rating=g&lang=en`
        );
        setLoader(false);
        setData([...response.data.data]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Not able to make calls");
    }
  };
  const betterSearch = debounce(handleGif, 400);
  const getSource = (e) => {
    setPost({ ...post, image: e.target.src });
  };
  return (
    <div className="container">
      <div className="ui p1-rem relative">
        <span
          className="pointer absolute tr1-rem"
          onClick={() => setModal(false)}
        >
          x
        </span>
        <h1 className="h3">Add a post</h1>
        <textarea
          onChange={handleChange}
          placeholder="What's on your mind ?"
          value={post.text}
        ></textarea>
        <div className="gif" ref={ref}></div>
        {searchGif && (
          <div>
            <input
              onChange={betterSearch}
              placeholder="Search gif"
              className="input input-blue mtb1-rem"
              ref={ref}
            />
            <span className="pointer" onClick={() => setSearchGif(false)}>
              x
            </span>
          </div>
        )}
        <div className="f-red">{error}</div>
        <div className="flex gap-2 jcc">
          <button
            className="btn btn-outline-red"
            onClick={() => setSearchGif(true)}
          >
            Add Gif{" "}
          </button>
          <button className="btn btn-outline-black" onClick={submitPost}>
            Post
          </button>
        </div>
        {searchGif && (
          <>
            <div>
              <h3 className="h5 mtb1-rem">Image preview</h3>
              {post.image.length !== 0 && (
                <img
                  src={post.image}
                  className=" br10px small-img"
                  alt="preview"
                />
              )}
            </div>
            <div className="mt1-rem gifs-toolbar">
              <h2 className="h4">Gifs</h2>
              {loader && <p>Searching...</p>}
              {!loader && (
                <>
                  {data.map((gif) => {
                    return (
                      <img
                        className="pointer br10px"
                        onClick={getSource}
                        key={gif.id}
                        src={gif.images.downsized.url}
                        alt="gif"
                      />
                    );
                  })}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
