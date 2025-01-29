import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './styles.css';

const App = () => {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is a simple React app built with Webpack and Babel..</p>
    </div>
  )
};

// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
