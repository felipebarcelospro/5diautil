import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { ReactElement, useEffect } from 'react'
import { pageview } from '../lib/gtag'

export default function MyApp({ Component, pageProps }): ReactElement {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
