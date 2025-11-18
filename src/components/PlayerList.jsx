// src/components/PlayerList.jsx
import axios from 'axios';

function PlayerList({ players, onPlayerDeleted, onShowConfirm }) {
  const handleDelete = async (playerId) => {
    const deleteAction = async () => {
      try {
        await axios.delete(`http://localhost:3000/api/players/${playerId}`);
        alert('Player berhasil dihapus!');
        onPlayerDeleted();
      } catch (error) {
        console.error("Gagal menghapus player:", error);
        alert('Gagal menghapus player!');
      }
    };

    // Gunakan dialog kustom
    onShowConfirm(`Apakah Anda yakin ingin menghapus player dengan ID ${playerId}?`, deleteAction);
  };

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>Player ID</th>
          <th>Lokasi</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {players.map(player => (
          <tr key={player.id}>
            <td>{player.player_id}</td>
            <td>{player.location}</td>
            <td>{player.status}</td>
            <td>
              <button onClick={() => handleDelete(player.id)} className="delete-btn">
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerList;