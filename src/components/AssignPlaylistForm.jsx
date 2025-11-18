// src/components/AssignPlaylistForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function AssignPlaylistForm({ onPlaylistAssigned }) {
  const [players, setPlayers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Ambil data player dan playlist saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerRes, playlistRes] = await Promise.all([
          axios.get('http://localhost:3000/api/players'),
          axios.get('http://localhost:3000/api/playlists')
        ]);
        setPlayers(playerRes.data);
        setPlaylists(playlistRes.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert('Gagal memuat data player atau playlist.');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPlayerId || !selectedPlaylistId) {
      alert('Silakan pilih player dan playlist!');
      return;
    }

    setLoading(true);
    try {
      // Kita memerlukan player_id (string) untuk URL API
      const selectedPlayer = players.find(p => p.id === parseInt(selectedPlayerId));
      if (!selectedPlayer) {
        alert('Player yang dipilih tidak valid.');
        return;
      }

      await axios.post(`http://localhost:3000/api/players/${selectedPlayer.player_id}/assign-playlist`, {
        playlistId: parseInt(selectedPlaylistId),
      });

      alert('Playlist berhasil ditugaskan ke player!');
      setSelectedPlayerId('');
      setSelectedPlaylistId('');
      onPlaylistAssigned(); // Beri tahu komponen induk
    } catch (error) {
      console.error("Gagal menugaskan playlist:", error);
      alert('Gagal menugaskan playlist!');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p>Memuat data formulir...</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3>Tugaskan Playlist ke Player</h3>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Pilih Player:</label>
        <select value={selectedPlayerId} onChange={(e) => setSelectedPlayerId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
          <option value="">-- Pilih Player --</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>{player.player_id} ({player.location})</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Pilih Playlist:</label>
        <select value={selectedPlaylistId} onChange={(e) => setSelectedPlaylistId(e.target.value)} style={{ width: '100%', padding: '8px' }}>
          <option value="">-- Pilih Playlist --</option>
          {playlists.map(playlist => (
            <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Menugaskan...' : 'Tugaskan'}
      </button>
    </form>
  );
}

export default AssignPlaylistForm;