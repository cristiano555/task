import '../styles/globals.css';
import {
  useState,
  useEffect,
} from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router'
import FullScreenLoader from '@/components/FullScreenLoader';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", url => {
      setIsLoading(true)
    });

    router.events.on("routeChangeComplete", url => {
      setIsLoading(false)
    });

    router.events.on("routeChangeError", url => {
      setIsLoading(false)
    });

  }, [router])


  return (
    <>
      {isLoading ? <FullScreenLoader/> : <Component {...pageProps} />}
    </>
  )
}

export default MyApp
