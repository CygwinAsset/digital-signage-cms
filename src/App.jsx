// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './components/PlayerList';
import PlaylistList from './components/PlaylistList';
import ContentList from './components/ContentList';
import ContentUploadForm from './components/ContentUploadForm'; // Import formulir upload
import AddContentToPlaylistForm from './components/AddContentToPlaylistForm'; // import add file to content
import PlaylistCreateForm from './components/PlaylistCreateForm'; // Import form playlist
import AssignPlaylistForm from './components/AssignPlaylistForm'; // Import playlist for player
import ConfirmDialog from './components/ConfirmDialog';
import './App.css';

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

  // Fungsi untuk menampilkan dialog konfirmasi kustom
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
      const response = await axios.get('http://192.168.10.5:3000');
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
      const response = await axios.get('http://192.168.10.5:3000');
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
      const response = await axios.get('http://192.168.10.5:3000');
      setContents(response.data);
    } catch (error) {
      console.error("Gagal mengambil data konten:", error);
    } finally {
      setContentsLoading(false);
    }
  };

  // Jalankan semua fungsi saat komponen pertama kali dimuat
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

        {/* TAMBAHKAN KOMPONEN FORMULIR PENUGASAN DI SINI */}
        <AssignPlaylistForm onPlaylistAssigned={fetchPlayers} />

        {playersLoading ? <p>Sedang memuat data player...</p> : <PlayerList players={players} onPlayerDeleted={fetchPlayers} onShowConfirm={showConfirmDialog} />}
      </div>

      {/* --- Bagian Manajemen Playlist --- */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Manajemen Playlist</h1>
          <button onClick={fetchPlaylists}>Refresh Data</button>
        </div>

        {/* TAMBAHKAN KOMPONEN FORMULIR PEMBUATAN PLAYLIST DI SINI */}
        <PlaylistCreateForm onPlaylistCreated={fetchPlaylists} />  

        {/* TAMBAHKAN KOMPONEN FORMULIR DI SINI */}
        <AddContentToPlaylistForm onContentAdded={fetchPlaylists} />

        {playlistsLoading ? <p>Sedang memuat data playlist...</p> : <PlaylistList playlists={playlists} onPlaylistDeleted={fetchPlaylists} onShowConfirm={showConfirmDialog} />}
      </div>

      {/* --- Bagian Manajemen Konten --- */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Manajemen Konten</h1>
          <button onClick={fetchContents}>Refresh Data</button>
        </div>

        {/* Tampilkan Formulir Upload Konten */}
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