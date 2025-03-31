import { useState } from "react";
import Posts from "./Posts";

export default function App() {
  const [arePostsShown, setArePostsShown] = useState<boolean>(false);

  return (
    <div>
      <div>
        <button onClick={() => setArePostsShown(!arePostsShown)}>
          {arePostsShown ? "Hide" : "Show"} Posts
        </button>
      </div>
      {arePostsShown && <Posts />}
    </div>
  );
}
