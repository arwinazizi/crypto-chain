import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Mine from './pages/Mine';
import Chain from './pages/Chain';



export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/transactions' element={<Transactions />} />
      <Route path='/mine' element={<Mine />} />
      <Route path='/chain' element={<Chain />} />
    </Routes>
  );
}
