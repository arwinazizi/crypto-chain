import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Chain() {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const fetchChain = async () => {
      try {
        const res = await api.get('/chain');
        setChain(res.data);
      } catch (err) {
        console.error('Failed to load chain:', err);
      }
    };
    fetchChain();
  }, []);

  return (
    <div>
      <h2>Blockchain</h2>
      {chain.map((block, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #aaa',
            marginBottom: '1rem',
            padding: '1rem',
          }}
        >
          <p>
            <strong>Index:</strong> {index}
          </p>
          <p>
            <strong>Timestamp:</strong> {block.timestamp}
          </p>
          <p>
            <strong>Hash:</strong> {block.hash}
          </p>
          <p>
            <strong>Previous Hash:</strong> {block.previousHash}
          </p>
          <p>
            <strong>Nonce:</strong> {block.nonce}
          </p>
          <p>
            <strong>Transactions:</strong>
          </p>
          <ul>
            {block.transactions.map((tx, i) => (
              <li key={i}>
                {tx.sender} → {tx.recipient}: {tx.amount}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
