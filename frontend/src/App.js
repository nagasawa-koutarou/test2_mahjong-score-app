import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import api from './api/axios';

function App() {
  useEffect(() => {
    console.log('🟢 React が正常に動いています！');

    api.get('/test/')
      .then(res => {
        console.log('✅ API接続成功:', res.data);
      })
      .catch(err => {
        console.error('❌ API接続エラー:', err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
