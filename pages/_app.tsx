import React from 'react'
import 'styles/globals.ts'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return <Component {...pageProps} />
}

export default MyApp
