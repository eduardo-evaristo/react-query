// Queries still need a place to happen, so the handler of the posts query will be this function which, if all goes well, shoudl return an array with posts
export async function fetchPosts(): Promise<
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

// Queries still need a place to happen, so the handler of the posts query will be this function which, if all goes well, shoudl return an array with posts
export async function fetchPostById(
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
