'use client';
import { useEffect } from 'react';

function DevStyleXInjectImpl() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      import(/* @vite-ignore */ 'virtual:stylex:runtime');
    }
  }, []);
  return <link rel="stylesheet" href="/virtual:stylex.css" />;
}

export function DevStyleXInject() {
  return import.meta.env.DEV ? <DevStyleXInjectImpl /> : null;
}
