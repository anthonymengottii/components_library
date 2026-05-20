import code from '@content/Components/Preloader/Preloader.jsx?raw';
import css from '@content/Components/Preloader/Preloader.css?raw';
import tailwind from '@tailwind/Components/Preloader/Preloader.jsx?raw';
import tsCode from '@ts-default/Components/Preloader/Preloader.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Preloader/Preloader.tsx?raw';

export const preloader = {
  dependencies: `gsap @gsap/react`,
  usage: `import Preloader from './Preloader';

<Preloader
  backgroundColor="#000000"
  textColor="#ffffff"
  barColor="#ffffff"
  barBackground="rgb(80, 80, 80)"
  contentBackground="#111111"
  contentColor="#ffffff"
  animationDuration={10}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
