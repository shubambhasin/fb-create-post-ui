import { useRef, useState } from "react";
import { instance } from "./api/axios";
import { usePost } from "./context/PostContext";

export const CreatePost = () => {
  const {
    error,
    setError,
    text,
    setText,
    post,
    setPost,
    posts,
    setPosts,
    setModal
  } = usePost();
  const [searchGif, setSearchGif] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const ref = useRef("");
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const submitPost = () => {
    if (post[0].text.length !== 0 || post[0].image.length !== 0) {
      setPosts([...posts, post]);
      setPost([
        {
          text: "",

          image: ""
        }
      ]);

      console.log(post);

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
    if (gifSearch.length !== 0) {
      try {
        setLoader(true);
        const response = await instance.get(
          `/search?api_key=k63sMfP5nNS9CcNQCVCWGip59G0Jidhn&q=${gifSearch}&limit=5&offset=0&rating=g&lang=en`
        );
        setLoader(false);
        console.log(response.data.data);
        setData([...response.data.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const betterSearch = function (e) {
    console.log(e.target.value);
    setGifSearch(e.target.value);
    return debounce(handleGif, 400);
  };

  const getSource = (e) => {
    console.log(e.target.src);
    setPost([
      {
        text: text,
        image: e.target.src
      }
    ]);
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
              onChange={(e) => betterSearch(e)()}
              placeholder="Search gif"
              className="input input-blue mtb1-rem"
              value={gifSearch}
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
              <h3 className="h5 mt1-rem">Image preview</h3>
              {post[0].image.length !== 0 && (
                <img src={post[0].image} className="small-img" alt="preview" />
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
                        className="pointer"
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