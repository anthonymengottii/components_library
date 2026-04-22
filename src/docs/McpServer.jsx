import { useState } from 'react';
import DocsButtonBar from './DocsButtonBar';
import CodeBlock from './CodeBlock';
import MethodSelector from './MethodSelector';
import useScrollToTop from '../hooks/useScrollToTop';
import { useTranslation } from 'react-i18next';
import claude from '../assets/icons/claude.svg';
import vscode from '../assets/icons/vscode.svg';
import cursor from '../assets/icons/cursor.svg';

const IMG_STYLE = { width: '40px', height: '40px' };

const PromptList = ({ prompts }) => (
  <ul className="docs-list">
    {prompts.map((prompt) => (
      <li key={prompt} className="docs-list-item dim">{prompt}</li>
    ))}
  </ul>
);

const ClientInstructions = ({ client, t }) => {
  const initCommand = `npx shadcn@latest mcp init --client ${client}`;

  return (
    <>
      <p className="docs-paragraph short">{t('mcp.instructions')}</p>
      <CodeBlock showLineNumbers>{initCommand}</CodeBlock>

      {client === 'claude' && (
        <>
          <p className="docs-paragraph">{t('mcp.claudeRestart')}</p>
          <PromptList prompts={t('mcp.prompts', { returnObjects: true })} />
          <p className="docs-paragraph dim">{t('mcp.claudeTip')}</p>
        </>
      )}

      {client === 'cursor' && (
        <>
          <p className="docs-paragraph">
            {t('mcp.cursorEnable')}
          </p>
          <PromptList prompts={t('mcp.prompts', { returnObjects: true })} />
        </>
      )}

      {client === 'vscode' && (
        <>
          <p className="docs-paragraph">
            {t('mcp.vscodeEnable')}
          </p>
          <PromptList prompts={t('mcp.prompts', { returnObjects: true })} />
        </>
      )}
    </>
  );
};

const McpServer = () => {
  const { t } = useTranslation();
  const [selectedClient, setSelectedClient] = useState('claude');

  useScrollToTop();

  const CLIENTS = [
    { key: 'claude', icon: <img src={claude} alt="Claude Code Logo" style={IMG_STYLE} />, label: 'Claude Code' },
    { key: 'cursor', icon: <img src={cursor} alt="Cursor Logo" style={IMG_STYLE} />, label: 'Cursor' },
    { key: 'vscode', icon: <img src={vscode} alt="VS Code Logo" style={IMG_STYLE} />, label: 'VS Code' },
  ];

  return (
    <section className="docs-section">
      <h3 className="docs-category-title">{t('mcp.title')}</h3>

      <p className="docs-paragraph">
        <a style={{ textDecoration: 'underline' }} href="https://modelcontextprotocol.io/" target="_blank" rel="noreferrer">
          {t('mcp.title')} (MCP)
        </a>{' '}
        {t('mcp.intro')}
      </p>

      <p className="docs-paragraph dim">
        {t('mcp.introDesc')}
      </p>

      <hr className="docs-separator" />

      <h3 className="docs-category-title">{t('mcp.quickStart')}</h3>

      <p className="docs-paragraph">
        {t('mcp.registriesDesc')}
      </p>
      <CodeBlock showLineNumbers>{`{
  "registries": {
    "@components-library": "https://github.com/anthonymengottii/components_library/r/{name}.json"
  }
}`}</CodeBlock>

      <p className="docs-paragraph dim">
        {t('mcp.setupDesc')}
      </p>

      <MethodSelector methods={CLIENTS} selected={selectedClient} onSelect={setSelectedClient} />

      <ClientInstructions client={selectedClient} t={t} />

      <hr className="docs-separator" />

      <h3 className="docs-category-title">{t('mcp.learnMore')}</h3>

      <p className="docs-paragraph dim" style={{ marginBottom: '16px' }}>
        {t('mcp.officialDocs')}
      </p>

      <a
        className="docs-paragraph"
        style={{ textDecoration: 'underline' }}
        href="https://ui.shadcn.com/docs/mcp"
        target="_blank"
        rel="noreferrer"
      >
        ui.shadcn.com/docs/mcp
      </a>

      <DocsButtonBar
        next={{ label: t('subcategories.Index'), route: '/get-started/index' }}
        previous={{ label: t('subcategories.Installation'), route: '/get-started/installation' }}
      />
    </section>
  );
};

export default McpServer;

