import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import SingleUser from '@/routes/SingleUser';
import { endpoint } from '@/utils/paths';

export const PostContext = createContext(null);

const SingleUserView = ({ userActivity }) => {
  const [posts, setPosts] = useState([]);
  const [activeUserId, setActiveUserId] = useState();

  useEffect(() => {
    const { posts, id } = userActivity;
    setPosts(posts);
    setActiveUserId(id);

  }, [userActivity])

  return (
    <PostContext.Provider value={{posts, setPosts, activeUserId, setActiveUserId}}>
      <SingleUser />
    </PostContext.Provider>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${endpoint.baseApiUrl}${endpoint.users}`);
  const users = await res.json();

  const paths = users.map(user => ({
    params: {
      id: user.id.toString()
    },
  }));

  return {
    fallback: false,
    paths,
  };
};

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`${endpoint.baseApiUrl}/posts?userId=${id}`);
  const posts = await res.json();

  return {
    props: {
      userActivity: {
        id: id,
        posts: posts
      }
    },
  };
};

export default SingleUserView;
