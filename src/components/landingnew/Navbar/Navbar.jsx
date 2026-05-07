import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../common/LanguageSwitcher';
import { useStars } from '../../../hooks/useStars';
import { GITHUB_URL } from '../../../constants/Site';
import { FaGithub } from 'react-icons/fa6';
import { LuSearch, LuHeart, LuUser } from 'react-icons/lu';
import { useSearch } from '../../context/SearchContext/useSearch';
import { useOptions } from '../../context/OptionsContext/useOptions';
import { CATEGORIES } from '../../../constants/Categories';
import { TOOLS } from '../../../constants/Tools';
import jsIcon from '../../../assets/icons/js.svg';
import tsIcon from '../../../assets/icons/ts.svg';
import cssIcon from '../../../assets/icons/css.svg';
import twIcon from '../../../assets/icons/tw.svg';
import './Navbar.css';
const NAV_LINKS = [
  { label: 'Docs', to: '/get-started/introduction', match: '/get-started' },
  { label: 'Templates', to: '/templates', match: '/templates' },
  { label: 'Tools', to: '/tools', match: '/tools' },
];

const Navbar = ({ showDocs }) => {
  const { t, i18n } = useTranslation();
  const stars = useStars();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const linksRef = useRef(null);
  const highlightRef = useRef(null);
  const prefsTimeoutRef = useRef(null);

  const { toggleSearch } = useSearch();
  const { languagePreset, setLanguagePreset, stylePreset, setStylePreset } = useOptions();
  const location = useLocation();

  const isActive = useCallback((match) => location.pathname.startsWith(match), [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const positionHighlight = useCallback((el) => {
    const highlight = highlightRef.current;
    const container = linksRef.current;
    if (!highlight || !container || !el) return;
    const linkRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.height = `${linkRect.height}px`;
    highlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
    highlight.style.opacity = '1';
  }, []);

  const getActiveEl = useCallback(() => {
    const container = linksRef.current;
    if (!container) return null;
    return container.querySelector('.ln-navbar-link-active');
  }, []);

  const handleLinkHover = useCallback((e) => {
    positionHighlight(e.currentTarget);
  }, [positionHighlight]);

  const handleLinksLeave = useCallback(() => {
    const activeEl = getActiveEl();
    if (activeEl) {
      positionHighlight(activeEl);
    } else {
      const highlight = highlightRef.current;
      if (highlight) highlight.style.opacity = '0';
    }
  }, [positionHighlight, getActiveEl]);

  // Position highlight on active link on mount, route change, or language change
  useEffect(() => {
    requestAnimationFrame(() => {
      const activeEl = getActiveEl();
      if (activeEl) positionHighlight(activeEl);
    });
  }, [location.pathname, i18n.language, positionHighlight, getActiveEl]);

  const formattedStars = useMemo(() =>
    stars >= 1000 ? `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k` : stars,
    [stars]
  );

  const handlePrefsEnter = useCallback(() => {
    if (prefsTimeoutRef.current) clearTimeout(prefsTimeoutRef.current);
    setPrefsOpen(true);
  }, []);

  const handlePrefsLeave = useCallback(() => {
    prefsTimeoutRef.current = setTimeout(() => setPrefsOpen(false), 150);
  }, []);

  return (
    <header className={`ln-navbar${scrolled ? ' ln-navbar-scrolled' : ''}${showDocs ? ' ln-navbar-docs' : ''}`}>
      <div className="ln-navbar-inner">
        <div className="ln-navbar-left">
          <Link to="/" className="ln-navbar-logo" style={{ textDecoration: 'none' }}>
            <span className="ln-navbar-logo-text">
              Components Library
            </span>
          </Link>

          <span className="ln-navbar-divider">/</span>

          <nav className="ln-navbar-links" ref={linksRef} onMouseLeave={handleLinksLeave}>
            <div className="ln-navbar-link-highlight" ref={highlightRef} />
            {NAV_LINKS.map(({ label, to, match }) => (
              <Link key={to} className={`ln-navbar-link${isActive(match) ? ' ln-navbar-link-active' : ''}`} to={to} onMouseEnter={handleLinkHover}>
                {t(`nav.${label.toLowerCase()}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ln-navbar-right">
          {showDocs && (
            <>
              <button className="ln-navbar-icon-btn ln-navbar-search-btn" onClick={toggleSearch} aria-label={t('nav.search')}>
                <LuSearch size={15} />
                <span className="ln-navbar-search-text">{t('nav.search')}</span>
                <kbd className="ln-navbar-kbd">/</kbd>
              </button>

              <div
                className="ln-navbar-prefs-wrapper"
                onMouseEnter={handlePrefsEnter}
                onMouseLeave={handlePrefsLeave}
              >
                <button className="ln-navbar-icon-btn ln-navbar-prefs-trigger" aria-label={t('header.preferences')}>
                  <LuUser size={16} />
                </button>

                {prefsOpen && (
                  <div className="ln-navbar-prefs-menu">
                    <span className="ln-navbar-prefs-label">{t('nav.codeLanguage')}</span>
                    <div className="ln-navbar-toggle-group">
                      <button className={`ln-navbar-toggle-item${languagePreset === 'JS' ? ' active' : ''}`} onClick={() => setLanguagePreset('JS')}>
                        <img src={jsIcon} alt="JS" width={18} height={18} />
                      </button>
                      <button className={`ln-navbar-toggle-item${languagePreset === 'TS' ? ' active' : ''}`} onClick={() => setLanguagePreset('TS')}>
                        <img src={tsIcon} alt="TS" width={18} height={18} />
                      </button>
                    </div>
                    <span className="ln-navbar-prefs-label">{t('nav.styling')}</span>
                    <div className="ln-navbar-toggle-group">
                      <button className={`ln-navbar-toggle-item${stylePreset === 'CSS' ? ' active' : ''}`} onClick={() => setStylePreset('CSS')}>
                        <img src={cssIcon} alt="CSS" width={18} height={18} />
                      </button>
                      <button className={`ln-navbar-toggle-item${stylePreset === 'TW' ? ' active' : ''}`} onClick={() => setStylePreset('TW')}>
                        <img src={twIcon} alt="TW" width={18} height={18} />
                      </button>
                    </div>
                    <div className="ln-navbar-prefs-divider" />
                    <Link to="/favorites" className="ln-navbar-prefs-fav" onClick={() => setPrefsOpen(false)}>
                      <LuHeart size={13} />
                      {t('nav.favorites')}
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {!showDocs && (
            <>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ln-navbar-pro"
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  e.currentTarget.style.setProperty('--pro-mx', `${x}%`);
                }}
              >
                {t('nav.getPro')}
              </a>
              <span className="ln-navbar-browse">
                {t('nav.community')} <span className="ln-navbar-soon">{t('nav.soon')}</span>
              </span>
            </>
          )}

          <a
            className="ln-navbar-github"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={16} color="#fff" />
            <span>{formattedStars}</span>
          </a>

          <LanguageSwitcher />

          <button
            className={`ln-navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={t('header.openMenu')}
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <>
            {showDocs && <div className="ln-navbar-mobile-backdrop" onClick={() => setMenuOpen(false)} />}
            <div className={`ln-navbar-mobile-menu${showDocs ? ' ln-navbar-mobile-menu-docs' : ''}`}>
              {showDocs ? (
                <>
                  <div className="ln-navbar-mobile-scroll">
                    {CATEGORIES.map((cat, i) => {
                      const slug = str => str.replace(/\s+/g, '-').toLowerCase();
                      const firstSub = cat.subcategories?.[0];
                      return (
                        <div className="ln-navbar-mobile-section" key={cat.name}>
                          <span className="ln-navbar-mobile-label">{t(`categories.${cat.name}`, cat.name)}</span>
                          {firstSub && (
                            <Link
                              className="ln-navbar-mobile-link"
                              to={`/${slug(cat.name)}/${slug(firstSub)}`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {t(`categories.${cat.name}`, cat.name)}
                            </Link>
                          )}
                          {
                            i === 0 && (
                              <>
                                <span className="ln-navbar-mobile-label" style={{ marginTop: 12 }}>{t('sidebar.tools')}</span>
                                {TOOLS.map(tool => (
                                  <Link key={tool.id} className="ln-navbar-mobile-link" to={tool.path} onClick={() => setMenuOpen(false)}>
                                    {t(`tools.items.${tool.id}.label`, tool.label)}
                                  </Link>
                                ))}
                              </>
                            )
                          }
                        </div >
                      );
                    })}
                    <div className="ln-navbar-mobile-divider" />
                    <div className="ln-navbar-mobile-section">
                      <span className="ln-navbar-mobile-label">{t('nav.codeLanguage')}</span>
                      <div className="ln-navbar-mobile-prefs">
                        <div className="ln-navbar-toggle-group">
                          <button className={`ln-navbar-toggle-item${languagePreset === 'JS' ? ' active' : ''}`} onClick={() => setLanguagePreset('JS')}>
                            <img src={jsIcon} alt="JS" width={18} height={18} />
                            JS
                          </button>
                          <button className={`ln-navbar-toggle-item${languagePreset === 'TS' ? ' active' : ''}`} onClick={() => setLanguagePreset('TS')}>
                            <img src={tsIcon} alt="TS" width={18} height={18} />
                            TS
                          </button>
                        </div>
                      </div>

                      <span className="ln-navbar-mobile-label" style={{ marginTop: 12 }}>{t('nav.styling')}</span>
                      <div className="ln-navbar-mobile-prefs">
                        <div className="ln-navbar-toggle-group">
                          <button className={`ln-navbar-toggle-item${stylePreset === 'CSS' ? ' active' : ''}`} onClick={() => setStylePreset('CSS')}>
                            <img src={cssIcon} alt="CSS" width={18} height={18} />
                            CSS
                          </button>
                          <button className={`ln-navbar-toggle-item${stylePreset === 'TW' ? ' active' : ''}`} onClick={() => setStylePreset('TW')}>
                            <img src={twIcon} alt="TW" width={18} height={18} />
                            TW
                          </button>
                        </div>
                      </div>

                      <span className="ln-navbar-mobile-label" style={{ marginTop: 12 }}>{t('nav.language')}</span>
                      <div className="ln-navbar-mobile-prefs">
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="ln-navbar-mobile-scroll">
                  {NAV_LINKS.map(({ label, to }) => (
                    <Link key={to} className="ln-navbar-mobile-link" to={to} onClick={() => setMenuOpen(false)}>
                      {t(`nav.${label.toLowerCase()}`)}
                    </Link>
                  ))}
                  <div className="ln-navbar-mobile-divider" />
                  <div className="ln-navbar-mobile-section">
                    <span className="ln-navbar-mobile-label">{t('nav.language')}</span>
                    <div className="ln-navbar-mobile-prefs">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              )}
            </div >
          </>
        )}
      </div >
    </header >
  );
};

export default Navbar;
