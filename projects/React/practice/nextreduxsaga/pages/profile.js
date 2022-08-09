import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const Profile = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>MINI LAND | 프로필</title>
      </Head>
      <Layout>
        <h1>프로필</h1>
      </Layout>
    </>
  );
};

export default Profile;
