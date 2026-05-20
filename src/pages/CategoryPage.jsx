import { useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { componentMap } from '../constants/Components';
import { decodeLabel } from '../utils/utils';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useTransition } from '../hooks/useTransition';
import BackToTopButton from '../components/common/BackToTopButton';
import { SkeletonLoader, GetStartedLoader } from '../components/common/SkeletonLoader';
import IndexPage from './IndexPage';

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const { transitionPhase, getPreloadedComponent } = useTransition();
  const { t } = useTranslation();

  const decodedLabel = decodeLabel(subcategory);
  const translatedLabel = t(`subcategories.${decodedLabel}`, decodedLabel);
  const isLoading = transitionPhase === 'loading';
  const opacity = ['fade-out', 'loading'].includes(transitionPhase) ? 0 : 1;
  const isGetStartedRoute = category === 'get-started';
  const isIndexPage = subcategory === 'index';

  const componentFactory = subcategory && componentMap[subcategory];
  const SubcategoryComponent =
    getPreloadedComponent(subcategory)?.default || (componentFactory ? lazy(componentFactory) : null);
  const Loader = isGetStartedRoute ? GetStartedLoader : SkeletonLoader;

  useEffect(() => {
    if (transitionPhase !== 'fade-out') {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [subcategory, transitionPhase]);

  useEffect(() => {
    if (translatedLabel) {
      document.title = `Components Library - ${translatedLabel}`;
    }
  }, [translatedLabel]);

  return (
    <>
      {isIndexPage ? (
        <IndexPage />
      ) : (
        <Box className={`category-page ${isLoading ? 'loading' : ''}`}>
          <Box className="page-transition-fade" style={{ opacity }}>
            {!isGetStartedRoute && <h2 className="sub-category">{translatedLabel}</h2>}

            {SubcategoryComponent ? (
              <Suspense fallback={<Loader />}>
                <SubcategoryComponent />
              </Suspense>
            ) : (
              <Box p={6}>
                <Text color="#fff" fontWeight={600} fontSize="18px">
                  {t('common.notFound', 'Not found')}
                </Text>
                <Text color="#a6a6a6" fontSize="14px">
                  {t('common.sectionUnavailable', 'This section is unavailable.')}
                </Text>
              </Box>
            )}
          </Box>
          <BackToTopButton />
        </Box>
      )}
    </>
  );
};

export default CategoryPage;
