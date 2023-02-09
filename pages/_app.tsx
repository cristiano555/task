import '../styles/globals.css'
import { AppProps } from 'next/app';
import UsersProvider from '@/context/UsersContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UsersProvider>
      <Component {...pageProps} />
    </UsersProvider>
  )
}

export default MyApp
