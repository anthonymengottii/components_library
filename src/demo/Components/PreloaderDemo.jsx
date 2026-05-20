import { useMemo, useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Button, Flex } from '@chakra-ui/react';
import { VscDebugRestart } from 'react-icons/vsc';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import Preloader from '../../content/Components/Preloader/Preloader';
import { preloader } from '../../constants/code/Components/preloaderCode';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { colors } from '../../constants/colors';

const DEFAULT_PROPS = {
  backgroundColor: '#000000',
  textColor: '#ffffff',
  barColor: '#ffffff',
  barBackground: 'rgb(80, 80, 80)',
  contentBackground: '#111111',
  contentColor: '#ffffff',
  animationDuration: 10
};

const PreloaderDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { backgroundColor, textColor, barColor, barBackground, contentBackground, contentColor, animationDuration } = props;
  
  const [key, setKey] = useState(0);
  const handleReplay = () => setKey(prev => prev + 1);

  const propData = useMemo(
    () => [
      {
        name: 'backgroundColor',
        type: 'string',
        default: "'#000000'",
        description: 'The background color of the preloader screen.'
      },
      {
        name: 'textColor',
        type: 'string',
        default: "'#ffffff'",
        description: 'The color of the text and numbers in the preloader.'
      },
      {
        name: 'barColor',
        type: 'string',
        default: "'#ffffff'",
        description: 'The color of the expanding loading bars.'
      },
      {
        name: 'barBackground',
        type: 'string',
        default: "'rgb(80, 80, 80)'",
        description: 'The background color of the loading bar container.'
      },
      {
        name: 'contentBackground',
        type: 'string',
        default: "'#111111'",
        description: 'The background color of the revealed content.'
      },
      {
        name: 'contentColor',
        type: 'string',
        default: "'#ffffff'",
        description: 'The text color of the revealed content.'
      },
      {
        name: 'animationDuration',
        type: 'number',
        default: '10',
        description: 'Multiplier for animation duration (default is 10, approx 10s).'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" borderRadius={10}>
            <Preloader
              key={key}
              backgroundColor={backgroundColor}
              textColor={textColor}
              barColor={barColor}
              barBackground={barBackground}
              contentBackground={contentBackground}
              contentColor={contentColor}
              animationDuration={animationDuration}
            />

            <Button
              position="absolute"
              bottom="20px"
              right="20px"
              zIndex={100}
              leftIcon={<VscDebugRestart />}
              onClick={handleReplay}
              bg={colors.bgElevated}
              color={colors.textPrimary}
              _hover={{ bg: colors.bgElevatedHover }}
            >
              Replay
            </Button>
          </Box>

          <Customize>
            {/* Minimal customize options, most colors can be passed via props but for this demo a simple replay is usually enough,
                or we can use PreviewSwitch/PreviewSlider if we had more numerical/boolean options. */}
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap', '@gsap/react']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={preloader} componentName="Preloader" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PreloaderDemo;
