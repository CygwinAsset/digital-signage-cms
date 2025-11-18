// src/components/PlaylistList.jsx
import axios from 'axios';

function PlaylistList({ playlists, onPlaylistDeleted, onShowConfirm }) {
  const handleDelete = async (playlistId, playlistName) => {
    const deleteAction = async () => {
      try {
        await axios.delete(`http://localhost:3000/api/playlists/${playlistId}`);
        alert('Playlist berhasil dihapus!');
        onPlaylistDeleted();
      } catch (error) {
        console.error("Gagal menghapus playlist:", error);
        alert('Gagal menghapus playlist!');
      }
    };

    // Gunakan dialog kustom
    onShowConfirm(`Apakah Anda yakin ingin menghapus playlist "${playlistName}"?`, deleteAction);
  };

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>ID</th>
          <th>Nama Playlist</th>
          <th>Deskripsi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {playlists.map(playlist => (
          <tr key={playlist.id}>
            <td>{playlist.id}</td>
            <td>{playlist.name}</td>
            <td>{playlist.description || '-'}</td>
            <td>
              <button onClick={() => handleDelete(playlist.id, playlist.name)} className="delete-btn">
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlaylistList;