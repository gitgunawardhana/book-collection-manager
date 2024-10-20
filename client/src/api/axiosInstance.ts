import axios from 'axios';
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { accessToken } = JSON.parse(user);
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const user = localStorage.getItem('user');
      if (user) {
        const { refreshToken } = JSON.parse(user);
        try {
          const response = await axios.post(`${BACKEND_BASE_URL}/auth/refresh-token`, { refreshToken });
          
          const newAccessToken = response.data.accessToken;

          const updatedUser = JSON.parse(user);
          updatedUser.accessToken = newAccessToken;
          localStorage.setItem('user', JSON.stringify(updatedUser));

          error.config.headers['authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
