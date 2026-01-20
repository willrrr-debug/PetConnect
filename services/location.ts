/**
 * 定位服务
 * 提供基于浏览器的 Geolocation API 和逆地理编码功能
 */

export interface LocationCoords {
    latitude: number;
    longitude: number;
}

export interface GeocodeResult {
    city: string;
    address?: string;
}

/**
 * 获取当前经纬度坐标
 */
export async function getCurrentPosition(): Promise<LocationCoords> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('浏览器不支持定位'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                let message = '定位失败';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = '用户拒绝了定位请求';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = '定位信息不可用';
                        break;
                    case error.TIMEOUT:
                        message = '定位请求超时';
                        break;
                }
                reject(new Error(message));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}

/**
 * 逆地理编码：经纬度转城市名
 * 使用 OpenStreetMap Nominatim API (免费且无需 Key)
 */
export async function reverseGeocode(coords: LocationCoords): Promise<GeocodeResult> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&accept-language=zh`
        );

        if (!response.ok) {
            throw new Error('逆地理编码请求失败');
        }

        const data = await response.json();

        // 提取城市名，依次尝试 city, town, village, state
        const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            '未知地点';

        return {
            city: city.replace('市', ''), // 去掉“市”字使显示更紧凑
            address: data.display_name,
        };
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        throw new Error('无法获取城市名称');
    }
}
