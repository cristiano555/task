const getUser = async (id?: string) => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, headers);
    const user = await res.json();

    return user;
  } catch (err) {
    return 'That was a problem with getting data :(';
  }
};

export default getUser;
