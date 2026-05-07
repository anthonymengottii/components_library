import { Button, Icon } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const MESSAGE_KEYS = [
  'backToTop.msg1',
  'backToTop.msg2',
  'backToTop.msg3',
  'backToTop.msg4',
  'backToTop.msg5',
  'backToTop.msg6',
  'backToTop.msg7',
  'backToTop.msg8',
  'backToTop.msg9',
  'backToTop.msg10',
  'backToTop.msg11',
  'backToTop.msg12'
];

const BackToTopButton = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const randomMessage = () => t(MESSAGE_KEYS[Math.floor(Math.random() * MESSAGE_KEYS.length)]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    toast(randomMessage());
  };

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Button
      fontWeight={500}
      rounded="xl"
      py={4}
      right="2em"
      position="fixed"
      zIndex={98}
      boxShadow="10px 0 25px rgba(0, 0, 6, 1)"
      transition="0.3s ease"
      className="back-to-top"
      opacity={visible ? 1 : 0}
      bottom={visible ? '2.5em' : '1em'}
      cursor={visible ? 'pointer' : 'default'}
      onClick={() => visible && scrollToTop()}
      aria-label={t('backToTop.ariaLabel')}
    >
      <Icon as={FiArrowUp} color="#fff" boxSize={4} />
    </Button>
  );
};

export default BackToTopButton;
