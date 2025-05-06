import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';  // Import the Provider component
import store from './redux/store';  // Import your store (make sure the path is correct)
import "./Responsive.css";
const root = createRoot(document.getElementById('root'));

// Wrap your App component with Provider and pass in the store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
