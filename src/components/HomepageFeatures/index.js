import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Elektrikli Araç Rotalama',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        EVRP (Electric Vehicle Routing Problem) optimizasyonu için
        algoritma ve çözüm yöntemleri. Batarya kısıtları, şarj istasyonları
        ve zaman pencerelerini dikkate alan gelişmiş optimizasyon.
      </>
    ),
  },
  {
    title: 'RoutingML Standardı',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Routing Markup Language - Araç rotalama problemleri için standart
        veri değişim formatı. Sistemler arası uyumluluk ve veri paylaşımı
        için XML/JSON tabanlı yapı.
      </>
    ),
  },
  {
    title: 'ALNS Algoritması',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Adaptive Large Neighborhood Search meta-heuristik algoritması.
        Yüksek kaliteli çözümler için destroy-repair operatörleri
        ve adaptif ağırlık mekanizması.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
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
