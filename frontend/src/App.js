
import React, { useEffect, useState } from 'react';
import { login } from './api/auth';
import { fetchPlayers, addPlayer } from './api/player'; // 👈 addPlayerも追加！

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const result = await login('nagasawa', 'tibita1228');
        localStorage.setItem('access', result.access);
        localStorage.setItem('refresh', result.refresh);
        console.log('✅ JWTトークン保存完了');

        const data = await fetchPlayers();
        setPlayers(data);
        console.log('✅ プレイヤー取得成功:', data);
      } catch (err) {
        console.error('❌ エラー:', err);
        setError('プレイヤーデータの取得に失敗しました');
      }
    };

    run();
  }, []);

  // 👇 新しいプレイヤー追加処理
  const handleAddPlayer = async (e) => {
  e.preventDefault();
  try {
    await addPlayer(newPlayerName);           // プレイヤー追加
    const data = await fetchPlayers();        // 一覧を再取得！
    setPlayers(data);                         // 最新状態に更新
    setNewPlayerName('');
  } catch (err) {
    console.error('❌ プレイヤー追加エラー:', err);
    setError('プレイヤーの追加に失敗しました');
  }
};


  return (
    <div>
      <h1>麻雀スコア管理アプリ</h1>

      {/* 🔽 フォーム部分を追加 */}
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="プレイヤー名"
          required
        />
        <button type="submit">追加</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
