import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { TbBug, TbBulb } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ISSUE_BASE = 'https://github.com/DavidHDev/react-bits/issues/new';

const ContributionSection = () => {
  const { t } = useTranslation();
  const { subcategory, category } = useParams();
  const title = `${category}/${subcategory}`;

  return (
    <Box className="contribute-container">
      <Text className="contribute-heading">{t('contribution.heading')}</Text>
      <Text className="contribute-subtext">{t('contribution.subtext')}</Text>
      <Flex gap={3} justifyContent="center" alignItems="center" mt={5} direction={{ base: 'column', md: 'row' }}>
        <a
          className="contribute-link"
          href={`${ISSUE_BASE}?template=1-bug-report.yml&title=${encodeURIComponent(`[BUG]: ${title}`)}&labels=bug`}
          rel="noreferrer"
          target="_blank"
        >
          <Icon as={TbBug} boxSize={4} />
          {t('contribution.reportIssue')}
        </a>
        <a
          className="contribute-link"
          href={`${ISSUE_BASE}?template=2-feature-request.yml&title=${encodeURIComponent(`[FEAT]: ${title}`)}&labels=enhancement`}
          rel="noreferrer"
          target="_blank"
        >
          <Icon as={TbBulb} boxSize={4} />
          {t('contribution.requestFeature')}
        </a>
      </Flex>
    </Box>
  );
};

export default ContributionSection;
