import AppRoute from './routes/AppRoute';
import './App.css';
import { app } from './firebase';

function App() {
  app();
  return <AppRoute />;
}

export default App;
