import { useQuery } from "@tanstack/react-query";
import { fetchPostById, fetchPosts } from "./api";
import { Post } from "./types";

const staleTime: number = 1000 * 10;

//Extracting useQuery into a custom hook to get custom data transformation via the select property in useQuery and also bcuz it's apparently good practice
// Also it gives us more control over certain stuff and hides this whole setup from our components
export function usePosts<T = Post[]>(select?: (data: Post[]) => T) {
  return useQuery<Post[], Error, T>({
    //This is a unique key/name by which this query will be referenced internally for stuff like refetching, sharing data, invalidating etc
    queryKey: ["posts"],
    //This is the fn that'll do the fetching, it should either resolve the data or throw an error
    queryFn: fetchPosts,
    // Apparently it automatically tries to fetch a couple of times when the queryFn errors out, I can override this setting this to false or reducing the number of retries. Setting it to true will keep it retrying infinitely
    retry: 5,
    //React Query caches every request, the default time for cached data to be stale is 0 by default, we can override that to prevent unecessary requests (When fit, of course)
    // React Query refetches stale queries on windows focus by default, we can override with refetchOnWindowFocus: false
    staleTime,
    select,
  });
}

export function usePostById(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id),
    retry: 5,
    staleTime: Infinity,
  });
}
