import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AiFillHeart } from 'react-icons/ai';
import { GITHUB_URL } from '../../../constants/Site';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="ln-footer">
      <div className="ln-footer-glow" />

      <div className="ln-footer-separator" />

      <motion.div
        className="ln-footer-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="ln-footer-top">
          <div className="ln-footer-brand">
            <Link to="/" style={{ textDecoration: 'none' }}>
               <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>
                Components Library
              </span>
            </Link>
            <p className="ln-footer-tagline">
              {t('footer.tagline')}
            </p>
          </div>

          <nav className="ln-footer-nav">
            <div className="ln-footer-col">
              <span className="ln-footer-col-title">{t('footer.product')}</span>
              <Link to="/get-started/introduction" className="ln-footer-link">{t('nav.docs')}</Link>
              <Link to="/templates" className="ln-footer-link">{t('nav.templates')}</Link>
            </div>

            <div className="ln-footer-col">
              <span className="ln-footer-col-title">{t('footer.resources')}</span>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ln-footer-link">
                {t('nav.github')}
              </a>

            </div>
          </nav>
        </div>

        <div className="ln-footer-bottom">

          <p className="ln-footer-copy">© {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
