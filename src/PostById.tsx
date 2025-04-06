//https://tanstack.com/query/latest/docs/framework/react/guides/queries
import { useQuery } from "@tanstack/react-query";
const staleTime: number = 1000 * 5;

// Queries still need a place to happen, so the handler of the posts query will be this function which, if all goes well, shoudl return an array with posts
async function fetchPostById(
  id: number
): Promise<{ title: string; body: string; userId: number; id: number }> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  //Accounting for errors
  if (!response.ok) throw new Error("Error fetching data");

  //Returning whatwever the API call gave us
  return response.json();
}

// Fetching data by id with Tanstack Query
// 1. Have the queryFn receive the param
// 2. Add the param to the queryKey array so we have an unique queryKey now
export default function PostById({ id }: { id: number }) {
  const { data, isLoading, isError, error, isFetching, isPending } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id),
    retry: 5,
    staleTime: staleTime,
  });

  //error comes from isError or status === 'error'
  if (isError) return <h1>Something went wrong: {error.message}</h1>;

  if (isPending) return <h1>No data has been loaded yet, loading...</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  if (isFetching) return <div className="loader"></div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <h2>{data.body}</h2>
    </div>
  );
}
