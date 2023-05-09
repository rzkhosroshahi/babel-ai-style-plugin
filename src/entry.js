import { aiCss } from './aiCss';

const App = () => {
  const style = aiCss(`
    an element with good contrast of light blue with a text color that has a good contrast with background and also with rounded corners and enough padding. also I need the body element makes everything center from every aspects
  `)
  return <div className={style}>Hey There 👋🏻</div>
}

/// mount
const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <App />
);
