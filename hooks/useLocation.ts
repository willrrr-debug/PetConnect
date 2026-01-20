import { useState, useEffect } from 'react';
import { getCurrentPosition, reverseGeocode } from '../services/location';

export interface UseLocationResult {
    city: string;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * 获取并管理用户位置的自定义 Hook
 */
export const useLocation = (defaultCity: string = '未知'): UseLocationResult => {
    const [city, setCity] = useState<string>(defaultCity);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLocation = async () => {
        setLoading(true);
        setError(null);
        try {
            const coords = await getCurrentPosition();
            const result = await reverseGeocode(coords);
            setCity(result.city);
        } catch (err: any) {
            setError(err.message || '获取位置失败');
            // 可以在此处设置默认城市，如果定位失败
            setCity(defaultCity);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return {
        city,
        loading,
        error,
        refresh: fetchLocation,
    };
};
