import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  // Hämta transaktioner
  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Skapa transaktion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transaction', { recipient, amount });
      setRecipient('');
      setAmount('');
      fetchTransactions();
    } catch (err) {
      alert('Failed to send transaction: ' + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Recipient'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type='number'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type='submit'>Send</button>
      </form>

      <h3>Transaction Pool</h3>
      <ul>
        {transactions.map((tx, i) => (
          <li key={i}>
            <strong>{tx.sender}</strong> → <strong>{tx.recipient}</strong>:{' '}
            {tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
