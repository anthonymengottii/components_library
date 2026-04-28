import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiArrowRight } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import './CTA.css';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="ln-cta-section">
      <div className="ln-cta-glow" />

      <motion.div
        className="ln-cta-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="ln-cta-card-wrapper">
          <div className="ln-cta-card-border" />
          <div className="ln-cta-card">
            <h2 className="ln-cta-headline">
              {t('cta.headline')}
            </h2>

            <p className="ln-cta-sub">
              {t('cta.subtitle')}
            </p>

            <div className="ln-cta-buttons">
              <Link to="/get-started/index" className="ln-cta-btn ln-cta-btn--primary">
                {t('cta.browse')} <FiArrowRight size={15} />
              </Link>
              <a
                href="https://github.com/DavidHDev/react-bits"
                target="_blank"
                rel="noopener noreferrer"
                className="ln-cta-btn ln-cta-btn--secondary"
              >
                <FaGithub size={15} /> {t('cta.starGithub')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
