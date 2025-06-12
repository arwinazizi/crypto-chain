import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <button onClick={() => navigate('/transactions')}>
            Transactions
          </button>
        </li>
        <li>
          <button onClick={() => navigate('/mine')}>Mine Block</button>
        </li>
        <li>
          <button onClick={() => navigate('/chain')}>View Blockchain</button>
        </li>
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
