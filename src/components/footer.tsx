import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  footer: {
    padding: '1.5rem',
    '@media (min-width: 1024px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  },
  link: {
    marginTop: '1rem',
    display: 'inline-block',
    textDecoration: 'underline',
    color: 'inherit',
  },
});

export const Footer = () => {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div>
        visit{' '}
        <a
          href="https://waku.gg/"
          target="_blank"
          rel="noreferrer"
          {...stylex.props(styles.link)}
        >
          waku.gg
        </a>{' '}
        to learn more
      </div>
    </footer>
  );
};
