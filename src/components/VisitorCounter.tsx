import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate a "real" persisted counter
    // In a real app, this would fetch from a database
    const storedCount = localStorage.getItem('visitorCount');
    const initialCount = storedCount ? parseInt(storedCount) : 5240; // Start at a "premium" number
    
    // Increment for this session
    const newCount = initialCount + 1;
    setCount(newCount);
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);

  return (
    <div className="visitor-badge" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '20px',
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid #00ffff',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
        marginTop: '1rem',
        width: 'fit-content'
    }}>
      <Eye size={18} color="#00ffff" />
      <span style={{
          color: '#fff',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.9rem',
          letterSpacing: '1px'
      }}>
        VISITORS: <span style={{ color: '#00ffff', fontWeight: 'bold' }}>{count.toLocaleString()}</span>
      </span>
    </div>
  );
};

export default VisitorCounter;
