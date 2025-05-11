// src/api/player.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// 共通の認証付きaxiosインスタンスを作成
const getAuthAxios = () => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('トークンがありません');
  }

  return axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// プレイヤー一覧を取得
export const fetchPlayers = async () => {
  try {
    const authAxios = getAuthAxios();
    const response = await authAxios.get('/players/');
    return response.data;
  } catch (error) {
    console.error('❌ プレイヤー取得エラー:', error.response?.data || error.message);
    throw error;
  }
};

// プレイヤーを追加（ownerは送らない）
export const addPlayer = async (name) => {
  try {
    const authAxios = getAuthAxios();
    const response = await authAxios.post('/players/', { name });
    return response.data;
  } catch (error) {
    console.error('❌ プレイヤー追加エラー:', error.response?.data || error.message);
    throw error;
  }
};
