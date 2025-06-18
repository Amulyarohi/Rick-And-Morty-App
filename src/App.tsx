import React from 'react';
import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <div>
      <h1>Character App</h1>
      <Outlet />
    </div>
  );
}
