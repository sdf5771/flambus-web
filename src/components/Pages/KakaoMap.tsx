import React, {useState, useEffect} from 'react';
import { Map, useKakaoLoader, MapMarker } from 'react-kakao-maps-sdk';

const API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY

function KakaoMap(){
    const [deviceWidth, setDeviceWidth] = useState<number | null>(null);
    const [deviceHeight, setDeviceHeight] = useState<number | null>(null);
    const [loading, error] = useKakaoLoader({appkey: API_KEY ? API_KEY : ''});

    const testLocations = [
        { title: "선지해장국 우주점", location: {lat: 33.5563, lng: 126.79581} },
        { title: "떡볶이 우주점", location: {lat: 34.5563, lng: 128.79581} },
        { title: "뼈해장국 우주점", location: {lat: 35.5563, lng: 130.79581} },
        { title: "미라클미라클 빙그르르 우주점", location: {lat: 36.5563, lng: 122.79581} },
    ]
    
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
                    {
                        testLocations.map((data, index) => {
                            return (
                                <MapMarker
                                    key={`${data.title}-${data.location}`}
                                    position={data.location}
                                    image={{
                                        src: "",
                                        size: {width: 24, height: 24}
                                    }}
                                    title={data.title}
                                >
                                
                                </MapMarker>
                            )
                        })
                    }
                </Map>
            : <h1>loading...</h1>}
        </div>
    )
}

export default KakaoMap;