import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

// 🔑 ログイン用
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/`, {
      username,
      password,
    });

    console.log('✅ トークン取得成功:', response.data);
    return response.data; // { access, refresh }
  } catch (error) {
    console.error('❌ ログイン失敗:', error.response?.data || error.message);
    throw error;
  }
};

// 🔒 保護API呼び出し用（必要に応じて）
export const fetchProtectedData = async () => {
  const accessToken = localStorage.getItem('access');

  if (!accessToken) {
    throw new Error('アクセストークンが存在しません');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/secret/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('✅ 保護データ取得成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 保護データ取得失敗:', error.response?.data || error.message);
    throw error;
  }
};

