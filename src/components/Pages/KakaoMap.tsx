import React, {useState, useEffect} from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';

const API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY

function KakaoMap(){
    const [deviceWidth, setDeviceWidth] = useState<number | null>(null);
    const [deviceHeight, setDeviceHeight] = useState<number | null>(null);
    const [loading, error] = useKakaoLoader({appkey: API_KEY ? API_KEY : ''});
    useEffect(() => {
        setDeviceWidth(window.innerWidth);
        setDeviceHeight(window.innerHeight);
    }, [loading])
    
    return(
        <div style={{display: 'flex', width: `${deviceWidth}px`, height: `${deviceHeight}px`}}>
            {!loading ? 
                <Map 
                    center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
                    style={{ width: `${deviceWidth}px`, height: `${deviceHeight}px` }} // 지도 크기
                    level={3}                                   // 지도 확대 레벨
                >
                </Map>
            : <h1>loading...</h1>}
        </div>
    )
}

export default KakaoMap;