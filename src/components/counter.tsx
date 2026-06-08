'use client';

import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  section: {
    borderColor: '#60a5fa',
    marginLeft: '-1rem',
    marginRight: '-1rem',
    marginTop: '1rem',
    borderRadius: '2px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    padding: '1rem',
  },
  button: {
    borderRadius: '1px',
    backgroundColor: '#000',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.125rem',
    paddingBottom: '0.125rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
});

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((c) => c + 1);

  return (
    <section {...stylex.props(styles.section)}>
      <div>Count: {count}</div>
      <button
        onClick={handleIncrement}
        {...stylex.props(styles.button)}
      >
        Increment
      </button>
    </section>
  );
};
