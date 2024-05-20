import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewArtworkPage from '../NewArtworkPage/NewArtworkPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import Artwork from '../Artwork/Artwork';
import ArtworkDetail from '../ArtworkDetail/ArtworkDetail';
import Galleries from '../Galleries/Galleries';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/artworks/new" element={<NewArtworkPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/artworks" element={<Artwork />} />
              <Route path="/galleries" element={<Galleries />} />
              <Route path="/artworks/:id" element={<ArtworkDetail />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
