import { Link } from 'waku';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    minHeight: '16rem',
    minWidth: '16rem',
  },
  heading: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    margin: 0,
  },
  link: {
    marginTop: '1rem',
    display: 'inline-block',
    textDecoration: 'underline',
    color: 'inherit',
  },
});

export default async function AboutPage() {
  const data = await getData();

  return (
    <div {...stylex.props(styles.container)}>
      <title>{data.title}</title>
      <h1 {...stylex.props(styles.heading)}>{data.headline}</h1>
      <p>{data.body}</p>
      <Link to="/" {...stylex.props(styles.link)}>
        Return home
      </Link>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'About',
    headline: 'About Waku',
    body: 'The minimal React framework',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
