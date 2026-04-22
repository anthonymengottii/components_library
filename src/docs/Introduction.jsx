import useScrollToTop from '../hooks/useScrollToTop';
import DocsButtonBar from './DocsButtonBar';
import { useTranslation } from 'react-i18next';

const Introduction = () => {
  const { t } = useTranslation();
  useScrollToTop();

  return (
    <section className="docs-section">
      <h3 className="docs-category-title">{t('intro.title')}</h3>

      <p className="docs-paragraph dim">
        {t('intro.p1')}
      </p>
      <p className="docs-paragraph">
        {t('intro.p2')}
      </p>
      <p className="docs-paragraph">
        {t('intro.p3')}
      </p>

      <hr className="docs-separator" />

      <h3 className="docs-category-title">{t('intro.mission')}</h3>

      <p className="docs-paragraph dim">
        {t('intro.missionP1')}
      </p>
      <p className="docs-paragraph">{t('intro.missionPrinciples')}</p>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.freeForAll')}:</span> {t('intro.freeForAllDesc')}
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.propFirst')}:</span> {t('intro.propFirstDesc')}
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.fullyModular')}:</span> {t('intro.fullyModularDesc')}
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.freeChoice')}:</span> {t('intro.freeChoiceDesc')}
        </li>
      </ul>

      <h4 className="docs-category-subtitle">{t('intro.freeForAll')}</h4>

      <p className="docs-paragraph">
        {t('intro.freeForAllSection')}
      </p>

      <h4 className="docs-category-subtitle">{t('intro.propFirst')}</h4>

      <p className="docs-paragraph">
        {t('intro.propFirstSection')}
      </p>

      <h4 className="docs-category-subtitle">{t('intro.fullyModular')}</h4>

      <p className="docs-paragraph">
        {t('intro.fullyModularSection')}
      </p>

      <h4 className="docs-category-subtitle">{t('intro.freeChoice')}</h4>

      <p className="docs-paragraph">
        {t('intro.freeChoiceSection')}
      </p>

      <p className="docs-paragraph dim">
        {t('intro.ps')}
      </p>

      <hr className="docs-separator" />

      <h3 className="docs-category-title">{t('intro.performance')}</h3>

      <p className="docs-paragraph dim">
        {t('intro.performanceDesc')}
      </p>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.lessIsMore')}:</span> {t('intro.lessIsMoreDesc')}
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.mobileOptimization')}:</span> {t('intro.mobileOptimizationDesc')}
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">{t('intro.testThoroughly')}:</span> {t('intro.testThoroughlyDesc')}
        </li>
      </ul>

      <DocsButtonBar next={{ label: t('subcategories.Installation'), route: '/get-started/installation' }} />
    </section>
  );
};

export default Introduction;

