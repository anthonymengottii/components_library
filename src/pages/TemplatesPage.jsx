import useScrollToTop from '../hooks/useScrollToTop';
import Navbar from '../components/landingnew/Navbar/Navbar';
import Footer from '../components/landingnew/Footer/Footer';
import DotField from '../components/landingnew/Hero/DotField';
import { TEMPLATE_ITEMS } from '../constants/Templates';
import { useTranslation } from 'react-i18next';

import '../css/templates.css';

const TemplatesPage = () => {
  const { t } = useTranslation();
  useScrollToTop();

  return (
    <>
      <Navbar showDocs />
      <div className="showcase-dotfield">
        <DotField sparkle waveAmplitude={5} dotRadius={2} />
      </div>
      <section className="showcase-page">
        <title>Components Library - {t('templates.title')}</title>

        <div className="showcase-header">
          <div className="showcase-header-left">
            <h1 className="showcase-title">{t('templates.title')}</h1>
            <p className="showcase-subtitle">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>

        <div className="showcase-grid">
          {TEMPLATE_ITEMS.map(item => (
            <a
              href={item.url}
              rel="noreferrer"
              target="_blank"
              className="showcase-card"
              key={item.url}
            >
              <div className="showcase-card-media">
                <img
                  className="showcase-card-img"
                  src={item.image}
                  alt={`Template website by ${item.name || t('templates.anonymous')}`}
                  loading="lazy"
                />
              </div>
              <div className="showcase-card-info">
                <span className="showcase-card-name">{item.name || t('templates.anonymous')}</span>
                <span className="showcase-card-using">{item.using}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TemplatesPage;

