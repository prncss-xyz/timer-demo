import '../styles.css';

import type { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { DevStyleXInject } from '../components/DevStyleXInject';

const styles = stylex.create({
  root: {
    fontFamily: 'Nunito, sans-serif',
  },
  main: {
    margin: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 1024px)': {
      margin: 0,
      minHeight: '100svh',
      justifyContent: 'center',
    },
  },
});

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div {...stylex.props(styles.root)}>
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        precedence="font"
      />
      <DevStyleXInject cssHref="/timer-demo/stylex.css" />
      <Header />
      <main {...stylex.props(styles.main)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/timer-demo/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
