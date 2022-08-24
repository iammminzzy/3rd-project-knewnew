import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signin');
    return;
  }, []);
  return <div>Users</div>;
}
