import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
// import Home from '../src/pages/Home';
// import Versi2 from './pages/Versi2';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing_page" exact element={<LandingPage />} />
        <Route path="*" element={<Navigate replace to="/landing_page" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
