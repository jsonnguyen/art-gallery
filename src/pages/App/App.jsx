import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewArtworkPage from '../NewArtworkPage/NewArtworkPage';
import NewGalleryPage from '../NewGalleryPage/NewGalleryPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
// import NavBar from '../../components/NavBar/NavBar';
import Artwork from '../Artwork/Artwork';
import Galleries from '../Galleries/Galleries';
import LandingPage from '../LandingPage/LandingPage';
import ArtworkDetail from '../ArtworkDetail/ArtworkDetail';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <Header user={user} setUser={setUser} />
      <Routes>
        {/* Always show the LandingPage at the root path */}
        <Route path="/" element={<LandingPage />} />

        {/* Routes for authenticated users */}
        {user && (
          <>
            <Route path="/artworks/new" element={<NewArtworkPage />} />
            <Route path="/galleries/new" element={<NewGalleryPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/artworks" element={<Artwork />} />
            <Route path="/galleries" element={<Galleries />} />
            <Route path="/artworks/:id" element={<ArtworkDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Routes for unauthenticated users */}
        {!user && (
          <>
            <Route path="/signup" element={<AuthPage setUser={setUser} />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </>
        )}
      </Routes>
      <Footer />
    </main>
  );
}