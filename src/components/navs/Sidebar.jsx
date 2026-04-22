import { useRef, useState, useLayoutEffect, useCallback, useMemo, memo, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, VStack, Text, Stack, Icon, IconButton, Drawer, Image, Separator } from '@chakra-ui/react';
import { ArrowRight, MenuIcon, SearchIcon, Sparkles, XIcon, HeartIcon } from 'lucide-react';

import { TOOLS } from '../../constants/Tools';
import { colors } from '../../constants/colors';

import { useSearch } from '../context/SearchContext/useSearch';
import { useTransition } from '../../hooks/useTransition';
import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories';
import { componentMap } from '../../constants/Components';
import { getSavedComponents } from '../../utils/favorites';
import { useTranslation } from 'react-i18next';

import Logo from '../../assets/logos/react-bits-logo.svg';

// ─── Constants ───────────────────────────────────────────────────────────────
const SCROLL_OFFSET = 100;

const ICON_BUTTON_STYLES = {
  rounded: '10px',
  border: '1px solid #ffffff1c',
  bg: colors.bgBody
};

const ARROW_ICON_PROPS = { boxSize: 4, transform: 'rotate(-45deg)' };

const LINE_STYLES = {
  position: 'absolute',
  left: '0',
  w: '2px',
  h: '16px',
  rounded: '1px',
  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
  pointerEvents: 'none'
};

// ─── Utility Functions ───────────────────────────────────────────────────────
const scrollToTop = () => window.scrollTo(0, 0);
const slug = str => str.replace(/\s+/g, '-').toLowerCase();
const toPascal = str =>
  str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

// ─── Custom Hooks ────────────────────────────────────────────────────────────
const useFavoritesSync = () => {
  const [savedSet, setSavedSet] = useState(() => new Set(getSavedComponents()));

  useEffect(() => {
    const updateSaved = () => setSavedSet(new Set(getSavedComponents()));
    const onStorage = e => {
      if (!e || e.key === 'savedComponents') updateSaved();
    };

    window.addEventListener('favorites:updated', updateSaved);
    window.addEventListener('storage', onStorage);
    updateSaved();

    return () => {
      window.removeEventListener('favorites:updated', updateSaved);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return savedSet;
};

const useScrolledToBottom = ref => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight - 10);
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return isScrolledToBottom;
};

// ─── Sub-components ──────────────────────────────────────────────────────────
const ActiveLine = ({ position, isVisible }) => (
  <Box
    {...LINE_STYLES}
    bg={colors.accent}
    zIndex={2}
    transform={isVisible && position !== null ? `translateY(${position - 8}px)` : 'translateY(-100px)'}
    opacity={isVisible ? 1 : 0}
  />
);

const HoverLine = ({ position, isVisible }) => (
  <Box
    {...LINE_STYLES}
    bg={colors.accentMuted}
    zIndex={1}
    transform={position !== null ? `translateY(${position - 8}px)` : 'translateY(-100px)'}
    opacity={isVisible ? 1 : 0}
  />
);

const MobileHeader = ({ onSearchClick, onMenuClick }) => (
  <Box display={{ md: 'none' }} position="fixed" top="60px" left={0} zIndex="overlay" w="100%" bg={colors.bgBody} p="1em">
    <Flex align="center" justify="space-between" gap="1em">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text fontSize="xl" fontWeight="900" letterSpacing="-0.5px" color="white" whiteSpace="nowrap">
          Components Library
        </Text>
      </Link>
      <Flex gap={2}>
        <IconButton {...ICON_BUTTON_STYLES} aria-label="Search" onClick={onSearchClick}>
          <Icon as={SearchIcon} color="#fff" />
        </IconButton>
        <IconButton {...ICON_BUTTON_STYLES} aria-label="Open Menu" onClick={onMenuClick}>
          <Icon as={MenuIcon} color="#fff" />
        </IconButton>
      </Flex>
    </Flex>
  </Box>
);

// ─── Tools Configuration ─────────────────────────────────────────────────────
const ToolsLinks = ({ onClose, t }) => (
  <>
    <Separator my={4} />
    <Text color="#a6a6a6" mb={3}>
      {t('sidebar.tools')}
    </Text>
    <Flex direction="column" gap={2}>
      {TOOLS.map(tool => (
        <Link
          key={tool.id}
          to={tool.comingSoon ? '#' : tool.path}
          onClick={tool.comingSoon ? e => e.preventDefault() : onClose}
          style={{
            opacity: tool.comingSoon ? 0.5 : 1,
            cursor: tool.comingSoon ? 'not-allowed' : 'pointer'
          }}
        >
          <Flex alignItems="center" gap="8px">
            <Icon as={tool.icon} boxSize={4} color={colors.accent} />
            <span>{t(`tools.items.${tool.id}.label`, tool.label)}</span>
            {tool.comingSoon && (
              <Text as="span" fontSize="10px" color={colors.accentMuted} fontWeight={600}>
                {t('nav.soon')}
              </Text>
            )}
          </Flex>
        </Link>
      ))}
    </Flex>
  </>
);

const UsefulLinks = ({ onClose, t }) => (
  <>
    <Separator my={4} />
    <Text color="#a6a6a6" mb={3}>
      {t('sidebar.usefulLinks')}
    </Text>
    <Flex direction="column" gap={2}>
      {[
        { to: 'https://github.com/anthonymengottii/components_library', label: 'GitHub', external: true },
        { to: '/templates', labelKey: 'nav.templates' },
        { to: 'https://x.com/AnthonyM78841', labelKey: 'footer.whoMadeThis', external: true }
      ].map(({ to, label, labelKey, external }) => (
        <Link key={to} to={to} target={external ? '_blank' : undefined} onClick={onClose} display="block" mb={2}>
          <Flex alignItems="center" gap="4px">
            <span>{label || t(labelKey)}</span>
            <Icon as={ArrowRight} {...ARROW_ICON_PROPS} />
          </Flex>
        </Link>
      ))}
    </Flex>
  </>
);

const MainDrawer = ({ isOpen, onClose, categories, location, pendingActivePath, onNavigation, isTransitioning, t }) => (
  <Drawer.Root open={isOpen} onOpenChange={onClose} placement="left" size="full">
    <Drawer.Backdrop mt="50px" h="calc(100vh - 50px)" />
    <Drawer.Positioner
      w="100vw"
      maxW="100vw"
      mt="50px"
      h="calc(100vh - 50px)"
      sx={{
        transition: 'transform 0.3s ease',
        "&[data-state='closed']": { transform: 'translateX(-100%)' },
        "&[data-state='open']": { transform: 'translateX(0)' }
      }}
    >
      <Drawer.Content bg={colors.bgBody} h="100%">
        <Drawer.Header h="72px" py={2} borderBottom="1px solid #ffffff1c" className="sidebar-logo">
          <Flex align="center" justify="space-between" w="100%">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Text fontSize="2xl" fontWeight="900" letterSpacing="-1px" color="white">
                Components Library
              </Text>
            </Link>
            <IconButton {...ICON_BUTTON_STYLES} aria-label="Close" onClick={onClose}>
              <Icon as={XIcon} color="#fff" />
            </IconButton>
          </Flex>
        </Drawer.Header>
        <Drawer.Body pb="6em">
          <VStack align="stretch" spacing={5} mt={8}>
            {categories.map((cat, i) => (
              <Box key={cat.name}>
                <Category
                  category={cat}
                  location={location}
                  pendingActivePath={pendingActivePath}
                  handleClick={onClose}
                  handleTransitionNavigation={onNavigation}
                  onItemMouseEnter={() => {}}
                  onItemMouseLeave={() => {}}
                  itemRefs={{}}
                  isTransitioning={isTransitioning}
                  isFirstCategory={i === 0}
                />
                {i === 0 && <ToolsLinks onClose={onClose} t={t} />}
              </Box>
            ))}
          </VStack>
          <UsefulLinks onClose={onClose} t={t} />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
);



const Category = memo(
  ({
    category,
    handleClick,
    handleTransitionNavigation,
    location,
    pendingActivePath,
    onItemMouseEnter,
    onItemMouseLeave,
    itemRefs,
    isTransitioning,
    isFirstCategory,
    savedSet
  }) => {
    const items = useMemo(
      () =>
        category.subcategories.map(sub => {
          const path = `/${slug(category.name)}/${slug(sub)}`;
          const activePath = pendingActivePath || location.pathname;
          const favoriteKey = `${toPascal(slug(category.name))}/${toPascal(slug(sub))}`;
          return {
            sub,
            path,
            isActive: activePath === path,
            isNew: NEW.includes(sub),
            isUpdated: UPDATED.includes(sub),
            isFavorited: savedSet?.has?.(favoriteKey)
          };
        }),
      [category.name, category.subcategories, location.pathname, pendingActivePath, savedSet]
    );

    return (
      <Box>
        <CategoryName name={category.name} isFirstCategory={isFirstCategory} />

        <Stack spacing={0.5} pl={4} borderLeft="1px solid #2F293A" position="relative">
          {items.map(({ sub, path, isActive, isNew, isUpdated, isFavorited }) => (
            <Link
              key={path}
              ref={el => itemRefs.current && (itemRefs.current[path] = el)}
              to={path}
              className={`sidebar-item ${isActive ? 'active-sidebar-item' : ''} ${isTransitioning ? 'transitioning' : ''}`}
              onClick={e => {
                e.preventDefault();
                handleTransitionNavigation ? handleTransitionNavigation(path, sub) : handleClick();
              }}
              onMouseEnter={e => onItemMouseEnter(path, e)}
              onMouseLeave={onItemMouseLeave}
            >
              <SubcategoryLabel name={sub} />
              {isNew && <NewTag />}
              {isUpdated && <UpdatedTag />}
              {isFavorited && <Icon as={HeartIcon} color={colors.accent} boxSize={3} style={{ marginLeft: 6 }} />}
            </Link>
          ))}
        </Stack>
      </Box>
    );
  }
);

Category.displayName = 'Category';

// Small wrapper components that use hooks (since Category is memo'd without t)
const CategoryName = ({ name, isFirstCategory }) => {
  const { t } = useTranslation();
  return (
    <Text className="category-name" mb={2} mt={isFirstCategory ? 0 : 4}>
      {t(`categories.${name}`, name)}
    </Text>
  );
};

const NewTag = () => {
  const { t } = useTranslation();
  return <span className="new-tag">{t('sidebar.new')}</span>;
};

const UpdatedTag = () => {
  const { t } = useTranslation();
  return <span className="updated-tag">{t('sidebar.updated')}</span>;
};

const SubcategoryLabel = ({ name }) => {
  const { t } = useTranslation();
  return <>{t(`subcategories.${name}`, name)}</>;
};

// ─── Main Component ──────────────────────────────────────────────────────────
const Sidebar = () => {
  const { t } = useTranslation();
  // State
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [linePosition, setLinePosition] = useState(null);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [hoverLinePosition, setHoverLinePosition] = useState(null);
  const [isHoverLineVisible, setIsHoverLineVisible] = useState(false);
  const [pendingActivePath, setPendingActivePath] = useState(null);

  // Refs
  const sidebarRef = useRef(null);
  const sidebarContainerRef = useRef(null);
  const itemRefs = useRef({});
  const hoverTimeoutRef = useRef(null);
  const hoverDelayTimeoutRef = useRef(null);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleSearch } = useSearch();
  const { startTransition, isTransitioning } = useTransition();
  const savedSet = useFavoritesSync();
  const isScrolledToBottom = useScrolledToBottom(sidebarContainerRef);

  // Helpers
  const findActiveElement = useCallback(() => {
    const activePath = pendingActivePath || location.pathname;
    for (const category of CATEGORIES) {
      const activeItem = category.subcategories.find(sub => activePath === `/${slug(category.name)}/${slug(sub)}`);
      if (activeItem) return itemRefs.current[`/${slug(category.name)}/${slug(activeItem)}`];
    }
    return null;
  }, [location.pathname, pendingActivePath]);

  const updateLinePosition = useCallback(el => {
    if (!el || !sidebarRef.current?.offsetParent) return null;
    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return elRect.top - sidebarRect.top + elRect.height / 2;
  }, []);

  const scrollActiveItemIntoView = useCallback(() => {
    const activeEl = findActiveElement();
    if (!activeEl || !sidebarContainerRef.current) return;

    const containerRect = sidebarContainerRef.current.getBoundingClientRect();
    const elementRect = activeEl.getBoundingClientRect();

    const isOutOfView =
      elementRect.top < containerRect.top + SCROLL_OFFSET || elementRect.bottom > containerRect.bottom - SCROLL_OFFSET;

    if (isOutOfView) {
      sidebarContainerRef.current.scrollTo({
        top: sidebarContainerRef.current.scrollTop + (elementRect.top - containerRect.top) - SCROLL_OFFSET,
        behavior: 'smooth'
      });
    }
  }, [findActiveElement]);

  // Handlers
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleSearchClick = useCallback(() => {
    closeDrawer();
    toggleSearch();
  }, [closeDrawer, toggleSearch]);

  const createNavigationHandler = useCallback(
    shouldCloseDrawer => async (path, subcategory) => {
      if (isTransitioning || location.pathname === path) return;

      if (shouldCloseDrawer) closeDrawer();
      setPendingActivePath(path);

      await startTransition(slug(subcategory), componentMap, () => {
        navigate(path);
        scrollToTop();
        setPendingActivePath(null);
      });
    },
    [isTransitioning, location.pathname, startTransition, navigate, closeDrawer]
  );

  const handleTransitionNavigation = useMemo(() => createNavigationHandler(false), [createNavigationHandler]);

  const handleMobileNavigation = useMemo(() => createNavigationHandler(true), [createNavigationHandler]);

  const onItemEnter = useCallback(
    (path, e) => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(hoverDelayTimeoutRef.current);

      const pos = updateLinePosition(e.currentTarget);
      if (pos !== null) setHoverLinePosition(pos);

      hoverDelayTimeoutRef.current = setTimeout(() => setIsHoverLineVisible(true), 200);
    },
    [updateLinePosition]
  );

  const onItemLeave = useCallback(() => {
    clearTimeout(hoverDelayTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setIsHoverLineVisible(false), 100);
  }, []);

  // Effects
  useLayoutEffect(() => {
    const activeEl = findActiveElement();
    if (!activeEl) {
      setIsLineVisible(false);
      return;
    }
    const pos = updateLinePosition(activeEl);
    setLinePosition(pos);
    setIsLineVisible(pos !== null);
  }, [findActiveElement, updateLinePosition]);

  useEffect(() => {
    const timer = setTimeout(scrollActiveItemIntoView, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, scrollActiveItemIntoView]);

  useEffect(
    () => () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(hoverDelayTimeoutRef.current);
    },
    []
  );

  useEffect(() => {
    if (pendingActivePath && location.pathname === pendingActivePath) {
      setPendingActivePath(null);
    }
  }, [location.pathname, pendingActivePath]);

  return (
    <>
      <MainDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        categories={CATEGORIES}
        location={location}
        pendingActivePath={pendingActivePath}
        onNavigation={handleMobileNavigation}
        isTransitioning={isTransitioning}
        t={t}
      />

      <Box
        as="nav"
        ref={sidebarContainerRef}
        position="fixed"
        top="0"
        left="2em"
        h="100vh"
        w={{ base: 0, md: 'fit-content' }}
        maxW="200px"
        p={5}
        overflowY="auto"
        className={`sidebar ${isScrolledToBottom ? 'sidebar-no-fade' : ''}`}
      >
        <Box ref={sidebarRef} position="relative">
          <ActiveLine position={linePosition} isVisible={isLineVisible} />
          <HoverLine position={hoverLinePosition} isVisible={isHoverLineVisible} />

          <VStack align="stretch" spacing={4}>
            {CATEGORIES.map((cat, i) => (
              <Fragment key={cat.name}>
                <Category
                  key={cat.name}
                  category={cat}
                  location={location}
                  pendingActivePath={pendingActivePath}
                  handleClick={scrollToTop}
                  handleTransitionNavigation={handleTransitionNavigation}
                  onItemMouseEnter={onItemEnter}
                  onItemMouseLeave={onItemLeave}
                  itemRefs={itemRefs}
                  isTransitioning={isTransitioning}
                  isFirstCategory={i === 0}
                  savedSet={savedSet}
                />
                {/* Tools Section - after Get Started */}
                {i === 0 && (
                  <Box>
                    <Text className="category-name" mb={2} mt={4}>
                      {t('sidebar.tools')}
                    </Text>
                    <Stack spacing={0.5} pl={4} borderLeft={`1px solid ${colors.borderSecondary}`} position="relative">
                      {TOOLS.map(tool => (
                        <Link
                          key={tool.id}
                          to={tool.path}
                          className={`sidebar-item ${location.pathname === tool.path ? 'active-sidebar-item' : ''}`}
                          onClick={scrollToTop}
                        >
                          <Flex alignItems="center" gap="6px">
                            <Icon as={tool.icon} boxSize={3.5} color={colors.accent} />
                            <span>{t(`tools.items.${tool.id}.label`, tool.label)}</span>
                          </Flex>
                        </Link>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Fragment>
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
