import React, {useState, useEffect} from 'react';
import { Map, useKakaoLoader, MapMarker } from 'react-kakao-maps-sdk';
import {ReactComponent as MarkerEmpty} from 'assets/images/markers/marker_0.svg';
import imageSrc from 'assets/images/markers/marker_0.svg';

const API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY

type TMapData = {
    "storeIdx": number,
    "storeName": string,
    "location": {
        "lat": number,
        "lng": number
    },
    "journalCount": number
}

type TApiData = {
    type: string,
    data: TMapData[],
}

type Tlocation = {
    lat: number,
    lng: number,
}

function KakaoMap(){
    const [deviceWidth, setDeviceWidth] = useState<number | null>(window.innerWidth);
    const [deviceHeight, setDeviceHeight] = useState<number | null>(window.innerHeight);
    const [loading, error] = useKakaoLoader({appkey: API_KEY ? API_KEY : ''});
    const [markerData, setMarkerData] = useState<TMapData[] | null>(null);
    const [createMap, onCreateMap] = useState(false); 
    
    useEffect(() => {
        setDeviceWidth(window.innerWidth);
        setDeviceHeight(window.innerHeight);
    }, [loading])

    const onMessageEvent = (event: MessageEvent) => {
        const {type, data} = JSON.parse(event.data)
        
        switch (type){
            case "marker Data":
                setMarkerData(data); 
                break
        }
    };

    useEffect(() => {
        window.addEventListener("message", onMessageEvent, { capture: true });
        return () => window.removeEventListener("message", onMessageEvent);
    });
    
    return(
        <div style={{display: 'flex', width: `100%`, height: `100%`}}>
            {!loading && window.ReactNativeWebView.locationData ? 
                <Map 
                    center={{ 
                        lat: window.ReactNativeWebView ? window.ReactNativeWebView.locationData.lat : 37.559718, 
                        lng: window.ReactNativeWebView ? window.ReactNativeWebView.locationData.lng : 126.918775 
                    }}   // 지도의 중심 좌표 
                    style={{ width: `${deviceWidth ? deviceWidth : 0}px`, height: `${deviceHeight ? deviceHeight : 0}px` }} // 지도 크기
                    level={3}                                   // 지도 확대 레벨
                    onCreate={(maps) => {
                        if(window.ReactNativeWebView.locationData){
                            window.ReactNativeWebView.postMessage(
                                JSON.stringify({
                                    type: 'locationData received',
                                    data: {
                                        lat: window.ReactNativeWebView.locationData.lat,
                                        lng: window.ReactNativeWebView.locationData.lng,
                                    },
                                })
                            );
                        }
                        onCreateMap(true);
                        maps.relayout()
                    }}
                >
                    {
                        markerData && createMap ? markerData.map((data: TMapData, index) => {
                            return (
                                <MapMarker
                                    key={`${data.storeIdx}-${data.storeName}`}
                                    position={{lng: data.location.lng, lat: data.location.lat}}
                                    image={{
                                        src: imageSrc,
                                        size: {width: 80, height: 80},
                                        options: {
                                          spriteSize: { width: 80, height: 80 },
                                          spriteOrigin: { x: 0, y: 0 },
                                        },
                                      }}
                                    title={data.storeName}
                                    onClick={() => {
                                        window.ReactNativeWebView.postMessage(
                                            JSON.stringify({
                                                type: 'mapmarker data clicked',
                                                data: data,
                                            })
                                        );
                                    }}
                                />
                            )
                        }) : null
                    }
                </Map>
            : 
            <h1>loading...</h1>
            }
        </div>
    )
}

export default KakaoMap;