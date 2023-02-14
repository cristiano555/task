import React, {
  useState,
  useEffect,
} from 'react';
import { GetStaticProps } from 'next';
import SingleUser from '@/routes/SingleUser';
import { endpoint } from '@/utils/paths';
import { getData } from '@/utils/helpers';
import {
  UserType,
  PostType,
} from '@/utils/types';
import { ParsedUrlQuery } from 'querystring';
import UserContext from '@/context/UserContext';

type SingleUserPagePropTypes = {
  id: number | null;
  name: string;
  posts: Array<PostType>;
}

const SingleUserPage = ({
  id,
  name,
  posts,
}: SingleUserPagePropTypes) => {
  const [userName, setUserName] = useState<string>('');
  const [userPosts, setUserPosts] = useState<Array<PostType>>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    setUserPosts(posts);
    setUserId(id);
    setUserName(name);
  }, [
    id,
    name,
    posts,
  ])

  return (
    <UserContext.Provider value={{
      userPosts,
      setUserPosts,
      userId,
      setUserId,
      setUserName,
      userName,
    }}>
      <SingleUser />
    </UserContext.Provider>
  );
};

export async function getStaticPaths() {
  const users = await getData(endpoint.users);

  const paths = users.map((user: UserType) => ({
    params: {
      id: user.id.toString()
    },
  }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const params = context.params as ParsedUrlQuery;
  if (!params?.id) {
    return {
      props: {},
    };
  }
  const id = params.id as string;
  const requestAll = await Promise.all([
    getData(endpoint.users),
    getData(endpoint.postsUserId, id)
  ]);
  const users = requestAll[0];
  const posts = requestAll[1];
  const user = users.find((user: UserType) => user.id.toString() === id);

  return {
    props: {
      id: id,
      name: user.name,
      posts: posts,
    },
  };
};

export default SingleUserPage;
