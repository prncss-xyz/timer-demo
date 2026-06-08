import { Link } from 'waku';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    '@media (min-width: 1024px)': {
      position: 'fixed',
      left: 0,
      top: 0,
    },
  },
  title: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    margin: 0,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

export const Header = () => {
  return (
    <header {...stylex.props(styles.header)}>
      <h2 {...stylex.props(styles.title)}>
        <Link to="/" {...stylex.props(styles.link)}>Waku starter</Link>
      </h2>
    </header>
  );
};
