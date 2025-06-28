import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //我的API基礎路徑
  withCredentials: true, //後端有設cookie驗證，這裡會保留cookie
  headers: {
    'Content-Type': 'application/json'
  }
});

//每次發送請求之前都會執行這段
//設定請求攔截器(自動加JWT)
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//封裝API請求
export const getRestaurants = () => {
  return apiClient.get('/restaurants');
};

export const getRestaurantsById = async (id) => {
  if (!id) {
    throw new Error('餐廳 ID 無效');
  }
  return apiClient.get(`/restaurants/${id}`);
};