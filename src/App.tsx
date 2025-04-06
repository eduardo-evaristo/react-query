import { useReducer, useState } from "react";
import Posts from "./Posts";
import PostById from "./PostById";
import "./styles.css";
import CreatePost from "./CreatePost";

type ReducerState = { postId: number };

const initialState: ReducerState = {
  postId: 1,
};

type PossibleActions = "increment" | "decrement";

function reducer(state: ReducerState, action: { type: PossibleActions }) {
  switch (action.type) {
    case "increment":
      return { postId: state.postId + 1 };
    case "decrement":
      return { postId: state.postId === 1 ? state.postId : state.postId - 1 };
    default:
      throw new Error("No action with such name found");
  }
}

export default function App() {
  const [arePostsShown, setArePostsShown] = useState<boolean>(false);
  const [isPostShown, setIsPostsShown] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        <button onClick={() => dispatch({ type: "increment" })}>
          Novo post
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          Retroceder post
        </button>
      </div>
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
      {isPostShown && <PostById id={state.postId} />}
    </div>
  );
}
