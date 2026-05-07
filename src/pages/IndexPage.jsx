import { Box } from '@chakra-ui/react';
import BackToTopButton from '../components/common/BackToTopButton';
import { componentMetadata } from '../constants/Information';
import ComponentList from '../components/common/ComponentList';
import { useTranslation } from 'react-i18next';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <title>{`Components Library - ${t('index.title')}`}</title>
      <ComponentList title={t('index.title')} list={componentMetadata} hasFavoriteButton sorting="alphabetical" />
      <BackToTopButton />
    </Box>
  );
};

export default IndexPage;
