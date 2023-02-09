import React, { createContext } from 'react';
import SingleUser from "@/routes/SingleUser";


export const PostContext = createContext(null);

const SingleUserView = ({ userActivity }) => {

  return (
    <PostContext.Provider value={userActivity}>
      <SingleUser />
    </PostContext.Provider>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const fetchedUsers = await res.json();

  const paths = fetchedUsers.map(user => ({
    params: { id: user.id.toString() },
  }));

  return {
    fallback: false,
    paths,
  };
};


export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const fetchedPosts = await res.json();
  console.log('fetchedPosts', fetchedPosts)

  return {
    props: {
      userActivity: {
        id: id,
        posts: fetchedPosts
      }
    },
  }
}

export default SingleUserView;
