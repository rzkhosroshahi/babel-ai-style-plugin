import { aiCss } from './aiCss';

const App = () => {
  const style = aiCss(`
    I require an element with good contrast between the light blue color and the background color, rounded corners, and enough padding. Moreover, I need the body element to make everything center which includes full height from the viewport.
  `)
  const spanStyle = aiCss(`
    I need a text that is bold but not too big or too small
  `)
  return <div className={style}>
    <span className={spanStyle}>
      Hey There 👋🏻
    </span>
  </div>
}

/// mount
const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <App />
);
