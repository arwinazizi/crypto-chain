import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      alert('Registration successful! Now login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type='submit'>Register</button>
        <p>
          Already have an account? <Link to='/login'>Login here</Link>
        </p>
      </form>
    </div>
  );
}
