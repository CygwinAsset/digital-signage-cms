// src/components/ContentUploadForm.jsx
import { useState } from 'react';
import axios from 'axios';

function ContentUploadForm({ onContentUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Mencegah halaman refresh saat submit

    if (!selectedFile) {
      alert('Silakan pilih file terlebih dahulu!');
      return;
    }

    setUploading(true);

    // Buat objek FormData untuk mengirim file
    const formData = new FormData();
    formData.append('contentFile', selectedFile); // 'contentFile' harus sama dengan yang di backend

    try {
      const response = await axios.post('http://localhost:3000/api/contents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Header wajib untuk upload file
        },
      });

      alert('Konten berhasil diunggah!');
      setSelectedFile(null); // Reset file input
      event.target.reset(); // Reset form
      onContentUploaded(); // Beri tahu komponen induk untuk refresh data
    } catch (error) {
      console.error("Gagal mengunggah konten:", error);
      alert('Gagal mengunggah konten!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Unggah Konten Baru</h3>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="fileInput" style={{ marginRight: '10px' }}>Pilih File:</label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept="image/*,video/*" // Hanya izinkan gambar dan video
        />
      </div>
      <button type="submit" disabled={uploading}>
        {uploading ? 'Mengunggah...' : 'Unggah'}
      </button>
    </form>
  );
}

export default ContentUploadForm;