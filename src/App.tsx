import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App;
