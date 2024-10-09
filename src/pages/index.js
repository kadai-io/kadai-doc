import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Hero from '../components/Hero/Hero';
import index from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`KADAI Documentation`}
      description="KADAI Documentation">
      <div className={index.backgroundImage}>
      <Hero />
      <main>
        <HomepageFeatures />
      </main>
      </div>
    </Layout>
  );
}
