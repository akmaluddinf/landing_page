import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
// import Home from '../src/pages/Home';
import Versi2 from './pages/Versi2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wisuda" exact element={<Versi2 />} />
        {/* <Route path="/versi2" exact element={<Versi2 />} /> */}
        <Route path="*" element={<Navigate replace to="/wisuda" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
