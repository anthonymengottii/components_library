import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="ln-navbar-toggle-group" style={{ width: 'auto' }}>
      <button
        className={`ln-navbar-toggle-item${i18n.language?.startsWith('en') ? ' active' : ''}`}
        onClick={() => i18n.changeLanguage('en')}
        aria-label={t('nav.switchToEnglish')}
        style={{ padding: '0 12px' }}
      >
        EN
      </button>
      <button
        className={`ln-navbar-toggle-item${i18n.language?.startsWith('pt') ? ' active' : ''}`}
        onClick={() => i18n.changeLanguage('pt')}
        aria-label={t('nav.switchToPortuguese')}
        style={{ padding: '0 12px' }}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;
