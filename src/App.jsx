// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './components/PlayerList';
import PlaylistList from './components/PlaylistList';
import ContentList from './components/ContentList';
import ContentUploadForm from './components/ContentUploadForm';
import AddContentToPlaylistForm from './components/AddContentToPlaylistForm';
import PlaylistCreateForm from './components/PlaylistCreateForm';
import AssignPlaylistForm from './components/AssignPlaylistForm';
import ConfirmDialog from './components/ConfirmDialog';
import './App.css';

// Ambil variabel dari .env melalui vite.config.js
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // State untuk Player
  const [players, setPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(true);

  // State untuk Playlist
  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(true);

  // State untuk Konten
  const [contents, setContents] = useState([]);
  const [contentsLoading, setContentsLoading] = useState(true);

  // State untuk Dialog Konfirmasi
  const [dialog, setDialog] = useState({ isOpen: false, message: '', onConfirm: null, onCancel: null });

  const showConfirmDialog = (message, onConfirmCallback) => {
    setDialog({
      isOpen: true,
      message: message,
      onConfirm: () => {
        onConfirmCallback();
        setDialog({ ...dialog, isOpen: false });
      },
      onCancel: () => {
        setDialog({ ...dialog, isOpen: false });
      }
    });
  };

  // Fungsi untuk mengambil data Player
  const fetchPlayers = async () => {
    setPlayersLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/players`);
      setPlayers(response.data);
    } catch (error) {
      console.error("Gagal mengambil data player:", error);
    } finally {
      setPlayersLoading(false);
    }
  };

  // Fungsi untuk mengambil data Playlist
  const fetchPlaylists = async () => {
    setPlaylistsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/playlists`);
      setPlaylists(response.data);
    } catch (error) {
      console.error("Gagal mengambil data playlist:", error);
    } finally {
      setPlaylistsLoading(false);
    }
  };

  // Fungsi untuk mengambil data Konten
  const fetchContents = async () => {
    setContentsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/contents`);
      setContents(response.data);
    } catch (error) {
      console.error("Gagal mengambil data konten:", error);
    } finally {
      setContentsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchPlaylists();
    fetchContents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* --- Bagian Manajemen Player --- */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Manajemen Player</h1>
          <button onClick={fetchPlayers}>Refresh Data</button>
        </div>
        <AssignPlaylistForm onPlaylistAssigned={fetchPlayers} />
        {playersLoading ? <p>Sedang memuat data player...</p> : <PlayerList players={players} onPlayerDeleted={fetchPlayers} onShowConfirm={showConfirmDialog} />}
      </div>

      {/* --- Bagian Manajemen Playlist --- */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Manajemen Playlist</h1>
          <button onClick={fetchPlaylists}>Refresh Data</button>
        </div>
        <PlaylistCreateForm onPlaylistCreated={fetchPlaylists} />
        <AddContentToPlaylistForm onContentAdded={fetchPlaylists} />
        {playlistsLoading ? <p>Sedang memuat data playlist...</p> : <PlaylistList playlists={playlists} onPlaylistDeleted={fetchPlaylists} onShowConfirm={showConfirmDialog} />}
      </div>

      {/* --- Bagian Manajemen Konten --- */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Manajemen Konten</h1>
          <button onClick={fetchContents}>Refresh Data</button>
        </div>
        <ContentUploadForm onContentUploaded={fetchContents} />
        {contentsLoading ? <p>Sedang memuat data konten...</p> : <ContentList contents={contents} onContentDeleted={fetchContents} onShowConfirm={showConfirmDialog} />}
      </div>

      {/* Render Dialog jika terbuka */}
      {dialog.isOpen && (
        <ConfirmDialog
          message={dialog.message}
          onConfirm={dialog.onConfirm}
          onCancel={dialog.onCancel}
        />
      )}
    </div>
  );
}

export default App;