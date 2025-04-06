//https://tanstack.com/query/latest/docs/framework/react/guides/mutations
// According to the docs, queries arent supposed to be used for stuff that aren't fetching/getting data
// Mutations are tipycally used to create, update and delete data or perform server side-effects.
// Below we got a mutation that creates a new post to an API
// As we can see, just like with useQuery, useMutation will deal specifically with the function that 'fetches', although we could go beyond that, as shown in the docs
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

type Post = {
  title: string;
  body: string;
};

async function createPost(newPost: Post) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) throw new Error("Response was not ok");

  return response.json();
}

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();
  // If this mutation succeeds, we might as well say the posts query made in Posts contains stale data. We can inform React Query this inside the useMutation hook
  //What we do is, we tell it that on the success of this mutation, we want to invalidate that one, to do so, we need the QueryClient
  const { mutate } = useMutation({
    mutationFn: createPost,
    //This does something when/if the mutation succeeds
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        //'active' fetches only rendered, 'inactive' fetches not rendered, 'all' does both, 'none' just sets them stale and skips refetching
        refetchType: "all",
      });
    },
  });

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    //mutation logic(hand it to React Query now)
    const newPost: Post = { title, body: "This is a new post" };
    // mutate is the function returned by the useMutation that wraps around the function we provided
    mutate(newPost);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        minLength={3}
        placeholder="Post title..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <button type="submit">Create</button>
    </form>
  );
}
