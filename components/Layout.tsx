import NavBar from './NavBar';
import React from 'react';
import Head from 'next/head';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
