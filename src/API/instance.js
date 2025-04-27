import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post('http://localhost:3000/refresh', { refreshToken });

        localStorage.setItem('accessToken', data.accessToken);

        // حدث الهيدر بالتوكن الجديد
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
          const dispatch = useDispatch();
          const navigate = useNavigate();
        dispatch({ type: "LOGOUT" });
  
        setTimeout(() => navigate("/login"), 1000);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
