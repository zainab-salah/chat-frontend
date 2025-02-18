 
import { api } from '@/services/api';
import useAuth from './useAuth';

interface RefreshResponse {
    access: string;
    refresh: string;
}

const useRefreshToken = () => {
    const {auth, setAuth } = useAuth();

    const refresh = async (): Promise<string> => {
        const response = await api.post<RefreshResponse>('/refresh', {
            refresh: auth.accessToken 
        }, { withCredentials: true });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return { ...prev, accessToken: response.data.access };
        });
        return response.data.access;
    };
    
    return refresh;
};

export default useRefreshToken;
