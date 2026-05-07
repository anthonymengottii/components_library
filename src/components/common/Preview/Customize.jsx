import { useTranslation } from 'react-i18next';

const Customize = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="preview-options">
      <h2 className="demo-title-extra">{t('preview.customize')}</h2>

      {children}
    </div>
  );
};

export default Customize;
