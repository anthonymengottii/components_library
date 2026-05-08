import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TbMenu } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

import PreviewSwitch from './PreviewSwitch';

const BackgroundContent = ({
  headline = 'Build interfaces that feel alive'
}) => {
  const { t } = useTranslation();
  const [showContent, setShowContent] = useState(true);
  const displayHeadline = headline === 'Build interfaces that feel alive' ? t('preview.headline') : headline;

  return (
    <Box userSelect="none">
      {/* Toggle */}
      <Box
        position="absolute"
        bottom={3}
        right={3}
        w="180px"
        zIndex={10}
        opacity={0.5}
        _hover={{ opacity: 1 }}
        transition="opacity 0.3s ease"
        userSelect="none"
      >
        <PreviewSwitch title={t('preview.demoContent')} isChecked={showContent} onChange={setShowContent} />
      </Box>

      {showContent && (
        <>
          {/* Nav */}
          <Box position="absolute" top={0} left={0} w="100%" zIndex={2} pointerEvents="none">
            <Box
              mx="auto"
              mt={5}
              w={{ base: '92%', md: '70%' }}
              h="48px"
              borderRadius="14px"
              p="0px 8px 0px 14px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg="rgba(255, 255, 255, 0.03)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              className="bg-content-glass"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Text color="white" fontSize="14px" fontWeight={700} letterSpacing="-0.02em">
                  Components Library
                </Text>
              </Box>

              <Box display={{ base: 'flex', md: 'none' }} alignItems="center" color="rgba(255,255,255,0.5)">
                <TbMenu size={18} />
              </Box>

              <Box display={{ base: 'none', md: 'flex' }} alignItems="center" gap={5}>
                {[t('preview.features'), t('preview.about')].map(item => (
                  <Text key={item} color="rgba(255,255,255,0.4)" fontSize="13px" fontWeight={500}>{item}</Text>
                ))}
                <Box
                  h="30px"
                  px={4}
                  borderRadius="8px"
                  bg="white"
                  color="black"
                  fontSize="12px"
                  fontWeight={600}
                  display="flex"
                  alignItems="center"
                >
                  {t('preview.signUp')}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Hero */}
          <Box
            position="absolute"
            inset={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            zIndex={1}
            pointerEvents="none"
            px={6}
          >
            {/* Tag */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              px="14px"
              py="5px"
              pl="5px"
              borderRadius="50px"
              border="1px solid rgba(255, 255, 255, 0.08)"
              bg="rgba(2, 11, 16, 0.5)"
              className="bg-content-glass"
            >
              <Box
                px="10px"
                py="3px"
                borderRadius="50px"
                bg="white"
                fontSize="11px"
                fontWeight={600}
                color="black"
                textTransform="uppercase"
                letterSpacing="0.02em"
              >
                {t('sidebar.new')}
              </Box>
              <Text fontSize="12px" fontWeight={500} color="rgba(255,255,255,0.5)">
                {t('preview.justShipped')}
              </Text>
            </Box>

            {/* Headline */}
            <Text
              mt={6}
              color="white"
              fontSize="clamp(1.6rem, 4vw, 2.4rem)"
              lineHeight={1.1}
              textAlign="center"
              letterSpacing="-0.03em"
              fontWeight={600}
              maxW="20ch"
              textShadow="0 4px 24px rgba(0,0,0,0.5)"
            >
              {displayHeadline}
            </Text>

            {/* Buttons */}
            <Box display="flex" gap={3} mt={7} alignItems="center" pointerEvents="none">
              <Box
                as="span"
                h="40px"
                px={5}
                bg="white"
                color="black"
                borderRadius="10px"
                fontSize="13px"
                fontWeight={600}
                display="flex"
                alignItems="center"
              >
                {t('preview.getStarted')}
              </Box>
              <Box
                as="span"
                h="40px"
                px={5}
                borderRadius="10px"
                fontSize="13px"
                fontWeight={500}
                color="rgba(255,255,255,0.6)"
                border="1px solid rgba(255,255,255,0.08)"
                bg="rgba(255,255,255,0.03)"
                display="flex"
                alignItems="center"
                className="bg-content-glass"
              >
                {t('preview.learnMore')}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BackgroundContent;
