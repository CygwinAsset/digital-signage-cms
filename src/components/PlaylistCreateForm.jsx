// src/components/PlaylistCreateForm.jsx
import { useState } from 'react';
import axios from 'axios';

function PlaylistCreateForm({ onPlaylistCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert('Nama playlist tidak boleh kosong!');
      return;
    }

    setCreating(true);

    try {
      const response = await axios.post('http://localhost:3000/api/playlists', {
        name: name,
        description: description,
      });

      alert('Playlist berhasil dibuat!');
      setName(''); // Reset form
      setDescription('');
      onPlaylistCreated(); // Beri tahu komponen induk untuk refresh data
    } catch (error) {
      console.error("Gagal membuat playlist:", error);
      alert('Gagal membuat playlist!');
    } finally {
      setCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3>Buat Playlist Baru</h3>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="nameInput" style={{ display: 'block', marginBottom: '5px' }}>Nama Playlist:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="descInput" style={{ display: 'block', marginBottom: '5px' }}>Deskripsi (Opsional):</label>
        <textarea
          id="descInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" disabled={creating}>
        {creating ? 'Membuat...' : 'Buat Playlist'}
      </button>
    </form>
  );
}

export default PlaylistCreateForm;