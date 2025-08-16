
import React from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAccess: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin/login');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-4 z-40 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors duration-200 opacity-30 hover:opacity-70"
      title="Admin Access"
      aria-label="Admin Access"
    >
      <Shield className="h-4 w-4 text-muted-foreground" />
    </button>
  );
};

export default AdminAccess;
