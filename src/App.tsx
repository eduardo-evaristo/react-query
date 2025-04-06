import { useState } from "react";
import Posts from "./Posts";
import PostById from "./PostById";
import "./styles.css";
import CreatePost from "./CreatePost";

export default function App() {
  const [arePostsShown, setArePostsShown] = useState<boolean>(false);
  const [isPostShown, setIsPostsShown] = useState<boolean>(false);

  return (
    <div>
      <div>
        <button onClick={() => setArePostsShown(!arePostsShown)}>
          {arePostsShown ? "Hide" : "Show"} Posts
        </button>
        <button onClick={() => setIsPostsShown(!isPostShown)}>
          {isPostShown ? "Hide" : "Show"} Post
        </button>
      </div>
      <CreatePost />
      {arePostsShown && <Posts />}
      {isPostShown && <PostById id={3} />}
    </div>
  );
}
