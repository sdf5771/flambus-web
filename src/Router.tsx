import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { KakaoMap } from './components/Pages';

function Router(){

    return(
        <Routes>
            <Route path='/kakaomap' element={<KakaoMap />} />
        </Routes>
    )
}

export default Router;