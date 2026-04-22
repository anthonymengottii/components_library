import { useState } from 'react';
import DocsButtonBar from './DocsButtonBar';
import CodeBlock from './CodeBlock';
import MethodSelector from './MethodSelector';
import useScrollToTop from '../hooks/useScrollToTop';
import { TbCopy, TbTerminal2 } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

import codeoptions from '../assets/common/code-options.webp';

const ICON_STYLE = { fontSize: '50px' };

const VariantList = ({ label, variants, t }) => (
  <>
    <p className="docs-paragraph short">{label}</p>
    <ul className="docs-list">
      {variants.map(({ code, label: descKey }) => (
        <li key={code} className="docs-list-item">
          <span className="docs-highlight">{code}</span> - {t(descKey)}
        </li>
      ))}
    </ul>
  </>
);

const ManualSteps = ({ t }) => (
  <>
    <p className="docs-paragraph dim">{t('install.manual.desc')}</p>

    <h4 className="docs-category-subtitle">{t('install.manual.step1Title')}</h4>
    <p className="docs-paragraph">
      {t('install.manual.step1Desc')}
    </p>

    <h4 className="docs-category-subtitle">{t('install.manual.step2Title')}</h4>
    <p className="docs-paragraph short">
      {t('install.manual.step2Desc')}
    </p>
    <CodeBlock showLineNumbers>npm install gsap</CodeBlock>

    <h4 className="docs-category-subtitle">{t('install.manual.step3Title')}</h4>
    <p className="docs-paragraph short">
      {t('install.manual.step3Desc')}
    </p>
    <div className="docs-code-options">
      <img src={codeoptions} className="code-options-img" />
    </div>

    <h4 className="docs-category-subtitle">{t('install.manual.step4Title')}</h4>
    <p className="docs-paragraph short">
      {t('install.manual.step4Desc')}
    </p>
    <CodeBlock showLineNumbers>
      {`import SplitText from "./SplitText";

<SplitText
  text="Hello, you!"
  delay={100}
  duration={0.6}
/>`}
    </CodeBlock>
  </>
);

const CliSteps = ({ t }) => {
  const SHADCN_VARIANTS = [
    { code: 'JS-CSS', label: 'install.variants.jsCss' },
    { code: 'JS-TW', label: 'install.variants.jsTw' },
    { code: 'TS-CSS', label: 'install.variants.tsCss' },
    { code: 'TS-TW', label: 'install.variants.tsTw' },
  ];

  const JSREPO_VARIANTS = [
    { code: 'default', label: 'install.variants.jsCss' },
    { code: 'tailwind', label: 'install.variants.jsTw' },
    { code: 'ts/default', label: 'install.variants.tsCss' },
    { code: 'ts/tailwind', label: 'install.variants.tsTw' },
  ];

  return (
    <>
      <p className="docs-paragraph dim">{t('install.cli.desc')}</p>

      <p className="docs-paragraph">
        {t('install.cli.intro')}
      </p>

      <h4 className="docs-category-subtitle">{t('install.cli.installTitle')}</h4>
      <p className="docs-paragraph short">
        {t('install.cli.installDesc')}
      </p>

      <h4 className="docs-category-subtitle docs-highlight" style={{ marginTop: '1.25rem' }}>
        shadcn
      </h4>
      <p className="docs-paragraph short"></p>
      <CodeBlock>{`npx shadcn@latest add https://github.com/anthonymengottii/components_library/r/<Component>-<LANG>-<STYLE>`}</CodeBlock>
      <VariantList label={t('install.cli.combinations')} variants={SHADCN_VARIANTS} t={t} />

      <h4 className="docs-category-subtitle docs-highlight" style={{ marginTop: '1.25rem' }}>
        jsrepo
      </h4>
      <p className="docs-paragraph short"></p>
      <CodeBlock>{`npx jsrepo@latest add https://github.com/anthonymengottii/components_library/r/<Component>-<LANG>-<STYLE>`}</CodeBlock>
      <VariantList label={t('install.cli.options')} variants={JSREPO_VARIANTS} t={t} />

      <p className="docs-paragraph dim" style={{ marginTop: '1rem' }}>
        {t('install.cli.tip')}
      </p>
    </>
  );
};

const Installation = () => {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState('manual');

  useScrollToTop();

  const METHODS = [
    { key: 'manual', icon: <TbCopy style={ICON_STYLE} />, label: t('install.methods.manual') },
    { key: 'cli', icon: <TbTerminal2 style={ICON_STYLE} />, label: t('install.methods.cli') },
  ];

  return (
    <section className="docs-section">
      <h3 className="docs-category-title">{t('install.title')}</h3>

      <p className="docs-paragraph dim">{t('install.desc')}</p>

      <hr className="docs-separator" />

      <h3 className="docs-category-title">{t('install.methodTitle')}</h3>

      <p className="docs-paragraph">
        {t('install.methodDesc')}
      </p>

      <p className="docs-paragraph dim">{t('install.clickCards')}</p>

      <MethodSelector methods={METHODS} selected={selectedMethod} onSelect={setSelectedMethod} />

      <h3 className="docs-category-title">{t('install.steps')}</h3>

      {selectedMethod === 'manual' ? <ManualSteps t={t} /> : <CliSteps t={t} />}

      <hr className="docs-separator" />

      <h4 className="docs-category-subtitle">{t('install.thatsAll')}</h4>

      <p className="docs-paragraph">
        {t('install.thatsAllDesc')}
      </p>

      <DocsButtonBar
        next={{ label: t('subcategories.MCP'), route: '/get-started/mcp' }}
        previous={{ label: t('subcategories.Introduction'), route: '/get-started/introduction' }}
      />
    </section>
  );
};

export default Installation;

