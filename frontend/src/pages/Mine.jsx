import { useState } from 'react';
import api from '../api/api';

export default function Mine() {
  const [message, setMessage] = useState('');
  const [block, setBlock] = useState(null);

  const handleMine = async () => {
    try {
      const res = await api.post('/mine');
      setMessage(res.data.message);
      setBlock(res.data.block);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to mine block');
    }
  };

  return (
    <div>
      <h2>Mine Block</h2>
      <button onClick={handleMine}>⛏️ Mine</button>
      {message && <p>{message}</p>}
      {block && (
        <div>
          <p>
            <strong>Hash:</strong> {block.hash}
          </p>
          <p>
            <strong>Transactions:</strong> {block.transactions.length}
          </p>
        </div>
      )}
    </div>
  );
}
