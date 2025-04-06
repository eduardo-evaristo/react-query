//https://tanstack.com/query/latest/docs/framework/react/guides/queries
import { usePosts } from "./hooks";

export default function Posts() {
  //React Query does **NOT** do the fetching! Good ol' fetch or axios does it, React Query manages the peculiarities that happen in the fetching cycle
  const { data, isLoading, error, isFetching, isPending, refetch } = usePosts();

  //error comes from isError or status === 'error'
  if (error)
    return (
      <div>
        {/* Refetch is used to refetch manually */}
        <button onClick={() => refetch()}>Try again</button>
        <h1>Something went wrong: {error.message}</h1>
      </div>
    );

  // A query will only have isPending true when there is NO data yet, so this will be true only in the first time it fetches. After that, it already has cached data. isPending comes from status === 'pending', so, data-related
  if (isPending) return <h1>Is pending</h1>;

  // This will also be true only at the first query, because it depends on both isFetching being true and isPending being true
  if (isLoading) return <h1>Loading...</h1>;

  // isFetching true whenever data is being fetched, this includes the first query and any time it is refetching data. isFetching comes from fetchStatus === 'fetching', so it's query-related, not data-related
  if (isFetching) return <h1>Is fetching</h1>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {/* We dont need ! if we narrow by checking for isPending and isError or error before */}
        {data.map(
          (post: {
            title: string;
            body: string;
            userId: number;
            id: number;
          }) => (
            <li key={post.id}>{post.title}</li>
          )
        )}
      </ul>
    </div>
  );
}
