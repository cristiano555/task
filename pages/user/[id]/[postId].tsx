import React, { createContext } from 'react';
import SinglePost from "@/routes/SinglePost";
import { useRouter } from 'next/router';

const SinglePostView = () => {
  const router = useRouter();
  console.log(router.query);

  return (
    <SinglePost>test 123131</SinglePost>
  )
}

// export async function getStaticPaths(context) {
//   const { params } = context
//   // const router = useRouter();

// };


// export async function getStaticProps(context) {

// }

export default SinglePostView;
