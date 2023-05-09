import { aiCss } from './module';

const App = () => {
  const style = aiCss(`
    an element with good contrast of light blue
  `)
  return <div className={style}>Hey There 👋🏻</div>
}

/// mount
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <App />
);
