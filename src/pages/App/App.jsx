import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewArtworkPage from '../NewArtworkPage/NewArtworkPage';
import NewGalleryPage from '../NewGalleryPage/NewGalleryPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import Artwork from '../Artwork/Artwork';
import Galleries from '../Galleries/Galleries';
import LandingPage from '../LandingPage/LandingPage';
import ArtworkDetail from '../ArtworkDetail/ArtworkDetail';
import GalleryDetailPage from '../GalleryDetailPage/GalleryDetailPage';
import Header from '../../components/Header/Header';
import AllGalleries from '../AllGalleries/AllGalleries';

export default function App() {
    const [user, setUser] = useState(getUser());

    return (
        <main className="App">
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {user && (
                    <>
                        <Route path="/artworks/new" element={<NewArtworkPage />} />
                        <Route path="/galleries/new" element={<NewGalleryPage />} />
                        <Route path="/galleries/:id" element={<GalleryDetailPage />} />
                        <Route path="/galleries" element={<Galleries />} />
                        <Route path="/orders" element={<OrderHistoryPage />} />
                        <Route path="/artworks" element={<Artwork user={user} />} />
                        <Route path="/all-galleries" element={<AllGalleries />} />
                        <Route path="/artworks/:id" element={<ArtworkDetail user={user} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
                {!user && (
                    <>
                        <Route path="/signup" element={<AuthPage setUser={setUser} />} />
                        <Route path="/login" element={<AuthPage setUser={setUser} />} />
                        <Route path="*" element={<Navigate to="/signup" />} />
                    </>
                )}
            </Routes>
        </main>
    );
}
