// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from '../api/auth';

const Home = () => {
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProtectedData()
      .then(data => {
        setProtectedData(data);
      })
      .catch(err => {
        setError('データ取得に失敗しました');
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>ようこそ！</h1>
      {protectedData && (
        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Home;
