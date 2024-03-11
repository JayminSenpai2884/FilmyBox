import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../styles/globals.css';

export default function App({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <title>FilmyBox</title>
        <Component {...pageProps} />
    </SessionProvider>
  )
}
