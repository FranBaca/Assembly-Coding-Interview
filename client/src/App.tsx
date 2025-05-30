import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PhotoDetail from './pages/PhotoDetail';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photo/:id" element={<PhotoDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
