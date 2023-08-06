import type {AppType} from 'next/app';
import {trpc} from '~/utils/trpc';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: AppType = ({Component, pageProps}) => {
    return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
