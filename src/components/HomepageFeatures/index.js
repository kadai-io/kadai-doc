import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Workbasket',
    Svg: require('@site/static/img/WorkbasketNew.png').default,
    description: (
      <>
        A Workbasket is a list of Tasks. Each Task is placed into exactly one Workbasket. You can specify access rights and other attributes of a Workbasket.
      </>
    ),
  },
  {
    title: 'Routing',
    Svg: require('@site/static/img/routing.png').default,
    description: (
      <>
        KADAI can route Tasks into different Workbaskets. The routing is performed automatically according to customized rules.
      </>
    ),
  },
  {
    title: 'Monitoring',
    Svg: require('@site/static/img/monitoring-logo.png').default,
    description: (
      <>
        KADAI visualizes the current state of work. This includes Tasks, their states, their due dates etc.. For example, you can view the number of due Tasks plotted by time.
      </>
    ),
  },

  {
    title: 'Prioritization',
    Svg: require('@site/static/img/PriorityNew.png').default,
    description: (
      <>
        In KADAI, tasks can be prioritized manually or automatically. They can also be reprioritized dynamically during their lifetime.
      </>
    ),
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={styles.featureBox+" "+clsx('col col--3')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={Svg} />
      </div>
      <div className="text--center padding-horiz--lg">
        <h3>{title}</h3>
        <div className={styles.featureText}>
          <p>{description}</p>
        </div>
      </div>
    </div >
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
