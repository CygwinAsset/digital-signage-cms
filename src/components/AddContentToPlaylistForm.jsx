// src/components/AddContentToPlaylistForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddContentToPlaylistForm({ onContentAdded }) {
  const [playlists, setPlaylists] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [selectedContentId, setSelectedContentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Ambil data playlist dan konten saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playlistRes, contentRes] = await Promise.all([
          axios.get('http://localhost:3000/api/playlists'),
          axios.get('http://localhost:3000/api/contents')
        ]);
        setPlaylists(playlistRes.data);
        setContents(contentRes.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert('Gagal memuat data playlist atau konten.');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPlaylistId || !selectedContentId) {
      alert('Silakan pilih playlist dan konten!');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/playlists/${selectedPlaylistId}/add-content`, {
        contentId: parseInt(selectedContentId), // Pastikan ID dikirim sebagai angka
      });

      alert('Konten berhasil ditambahkan ke playlist!');
      setSelectedPlaylistId('');
      setSelectedContentId('');
      onContentAdded(); // Beri tahu komponen induk untuk refresh data
    } catch (error) {
      console.error("Gagal menambahkan konten:", error);
      alert('Gagal menambahkan konten ke playlist!');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p>Memuat data formulir...</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3>Tambahkan Konten ke Playlist</h3>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Pilih Playlist:</label>
        <select value={selectedPlaylistId} onChange={(e) => setSelectedPlaylistId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
          <option value="">-- Pilih Playlist --</option>
          {playlists.map(playlist => (
            <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Pilih Konten:</label>
        <select value={selectedContentId} onChange={(e) => setSelectedContentId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
          <option value="">-- Pilih Konten --</option>
          {contents.map(content => (
            <option key={content.id} value={content.id}>{content.original_name}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Menambahkan...' : 'Tambahkan ke Playlist'}
      </button>
    </form>
  );
}

export default AddContentToPlaylistForm;