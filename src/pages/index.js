import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const AcademicPapers = [
  {
    title: 'Electric Vehicle Routing With Recharging Stations: Trade‐Offs in Last‐Mile Delivery',
    authors: 'Keser et al. (2025)',
    journal: 'IET Intelligent Transport Systems',
    link: '#', // Linkler sağlanırsa buraya eklenebilir
  },
  {
    title: 'Electric Vehicle Routing with Time Windows and Charging Stations from the Perspective of Customer Satisfaction',
    authors: 'Ünal et al. (2025)',
    journal: 'Applied Sciences',
    link: '#',
  },
  {
    title: 'Analysis of Factors Affecting Electric Vehicle Range Estimation: A Case Study of the Eskisehir Osmangazi University Campus',
    authors: 'Polat et al. (2025)',
    journal: 'Sustainability',
    link: '#',
  },
  {
    title: 'A dataset for state of charge and range estimation of an L5 type electric vehicle that is used for Urban Logistic',
    authors: 'Polat et al. (2025)',
    journal: 'Data in Brief',
    link: '#',
  },
  {
    title: 'A reinforcement learning-based solution for the capacitated electric vehicle routing problem from the last-mile delivery perspective',
    authors: 'Yıldız et al. (2025)',
    journal: 'Applied Sciences',
    link: '#',
  },
  {
    title: 'Multi-Partner Project: Electric Vehicle Data Acquisition and Valorisation: A Perspective from the OPEVA Project',
    authors: 'Kanak et al. (2025)',
    journal: 'Design Automation & Test in Europe Conference (DATE)',
    link: '#',
  },
  {
    title: 'Federated Learning-Based State of Charge Estimation in Electric Vehicles Using Federated Adaptive Client Momentum',
    authors: 'Yılmaz et al. (2025)',
    journal: 'IEEE Access',
    link: '#',
  },
  {
    title: 'Path Planning Considering Driver Preferences Using Analytic Hierarchy Process for Electric Vehicles',
    authors: 'Arıkan et al. (2025)',
    journal: 'ESOGÜ Mühendislik ve Mimarlık Fakültesi Dergisi',
    link: '#',
  },
  {
    title: 'Real time routing with vehicle failure and traffic awareness in last-mile delivery',
    authors: 'Ünal et al. (2025)',
    journal: 'Engineering and Applied Science Letters',
    link: '#',
  }
];

const Modules = [
  {
    title: 'Project Overview',
    description: 'Vision, mission, and scope of the OPEVA project across all workstreams.',
    to: '/docs/overview/introduction',
    icon: '🌐',
  },
  {
    title: 'Platform Architecture',
    description: 'Deep dive into the Routing Engine, Fleet Management, and AI/ML services.',
    to: '/docs/platform/',
    icon: '🏗️',
  },
  {
    title: 'Ecosystem Tools',
    description: 'Internal dashboards, repositories, and automation scripts for developers.',
    to: '/docs/ecosystem/',
    icon: '🛠️',
  },
  {
    title: 'Research & Media',
    description: 'Academic papers, technical specifications, and project demo videos.',
    to: '/docs/resources/',
    icon: '📚',
  }
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">Unified Documentation Portal for OPEVA Ecosystem</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview/introduction">
            Explore Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function PaperCard({title, authors, journal, link}) {
  return (
    <div className={clsx('col col--4', styles.paperCardCol)}>
      <div className={clsx('card', styles.paperCard)}>
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
        </div>
        <div className="card__body">
          <p><strong>{authors}</strong></p>
          <p className={styles.journalName}>{journal}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--outline button--primary button--block" to={link}>
            Makaleyi Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}

function ModuleRef({title, description, to, icon}) {
  return (
    <div className={clsx('col col--3', styles.moduleRefCol)}>
      <div className="text--center">
        <span style={{fontSize: '3rem'}}>{icon}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--link" to={to}>Detaylar →</Link>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="OPEVA FMS"
      description="ESOGÜ OPEVA Filo Yönetim Sistemi ve Rotalama Optimizasyonu Teknik Dökümantasyonu">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">Core Workstreams</Heading>
            <div className="row">
              {Modules.map((props, idx) => (
                <ModuleRef key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">Academic Contributions</Heading>
            <div className="row">
              {AcademicPapers.map((props, idx) => (
                <PaperCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
