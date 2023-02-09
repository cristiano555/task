import react, { useState } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import UsersProvider from '@/context/UsersContext';
// import UsersContext from '@/context/UsersContext';
import PostsContext from '@/context/PostsContext';


function MyApp({ Component, pageProps }: AppProps) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeUserId, setActiveUserId] = useState();

  return (
    // <UsersProvider>
    //   <Component {...pageProps} />
    // </UsersProvider>
    // <UsersContext.Provider value={{users, setUsers}}>
    // {/* </UsersContext.Provider> */}
    <UsersProvider>
      <PostsContext.Provider value={{posts, setPosts, activeUserId, setActiveUserId}}>
        <Component {...pageProps} />
      </PostsContext.Provider>
    </UsersProvider>
  )
}

export default MyApp
