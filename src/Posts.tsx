//https://tanstack.com/query/latest/docs/framework/react/guides/queries
import { useQuery } from "@tanstack/react-query";

// Queries still need a place to happen, so the handler of the posts query will be this function which, if all goes well, shoudl return an array with posts
async function fetchPosts(): Promise<
  { title: string; body: string; userId: number; id: number }[]
> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //Accounting for errors
  if (!response.ok) throw new Error("Error fetching data");

  //Returning whatwever the API call gave us
  //   return response.json();

  // Making it wait 2 secs to see the loading state in action
  const data = await response.json();

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

export default function Posts() {
  //React Query does **NOT** do the fetching! Good ol' fetch or axios does it, React Query manages the peculiarities that happen in the fetching cycle
  const { data, isLoading, error, isFetching, isPending } = useQuery({
    //This is a unique key/name by which this query will be referenced internally for stuff like refetching, sharing data, invalidating etc
    queryKey: ["posts"],
    //This is the fn that'll do the fetching, it should either resolve the data or throw an error
    queryFn: fetchPosts,
    // Apparently it automatically tries to fetch a couple of times when the queryFn errors out, I can override this setting this to false or reducing the number of retries. Setting it to true will keep it retrying infinitely
    retry: 5,
    //React Query caches every request, the default time for cached data to be stale is 0 by default, we can override that to prevent unecessary requests (When fit, of course)
    staleTime: 1000 * 1,
  });

  //error comes from isError or status === 'error'
  if (error) return <h1>Something went wrong: {error.message}</h1>;

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
