// src/components/ContentList.jsx
import axios from 'axios';

function ContentList({ contents, onContentDeleted, onShowConfirm }) {
  const handleDelete = async (contentId, fileName) => {
    const deleteAction = async () => {
      try {
        await axios.delete(`http://localhost:3000/api/contents/${contentId}`);
        alert('Konten berhasil dihapus!');
        onContentDeleted();
      } catch (error) {
        console.error("Gagal menghapus konten:", error);
        alert('Gagal menghapus konten!');
      }
    };

    // Gunakan dialog kustom
    onShowConfirm(`Apakah Anda yakin ingin menghapus file "${fileName}"?`, deleteAction);
  };

  const renderPreview = (content) => {
    if (content.type === 'image') {
      return <img src={`http://localhost:3000${content.url}`} alt={content.original_name} width="100" />;
    }
    return <span>Tidak ada preview</span>;
  };

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>Preview</th>
          <th>Nama File Asli</th>
          <th>Tipe</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {contents.map(content => (
          <tr key={content.id}>
            <td style={{ textAlign: 'center' }}>{renderPreview(content)}</td>
            <td>{content.original_name}</td>
            <td>{content.type}</td>
            <td>
              <button onClick={() => handleDelete(content.id, content.original_name)} className="delete-btn">
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContentList;