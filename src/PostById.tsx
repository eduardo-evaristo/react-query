//https://tanstack.com/query/latest/docs/framework/react/guides/queries
import { usePostById, usePosts } from "./hooks";

// Fetching data by id with Tanstack Query
// 1. Have the queryFn receive the param
// 2. Add the param to the queryKey array so we have an unique queryKey now
export default function PostById({ id }: { id: number }) {
  const { data, isLoading, isError, error, isFetching, isPending } =
    usePostById(id);
  const { data: posts } = usePosts<number>((posts) => posts.length);

  //error comes from isError or status === 'error'
  if (isError) return <h1>Something went wrong: {error.message}</h1>;

  if (isPending) return <h1>No data has been loaded yet, loading...</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  if (isFetching) return <div className="loader"></div>;

  return (
    <div>
      <h1>Total amount of posts {posts ? posts : ""}</h1>
      <h1>{data.title}</h1>
      <h2>{data.body}</h2>
    </div>
  );
}
