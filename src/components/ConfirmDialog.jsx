// src/components/ConfirmDialog.jsx
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: 'white', padding: '20px', borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', minWidth: '300px'
      }}>
        <p>{message}</p>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={onCancel} style={{ marginRight: '10px', backgroundColor: '#95a5a6' }}>
            Batal
          </button>
          <button onClick={onConfirm} className="delete-btn">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;