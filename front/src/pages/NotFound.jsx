import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h1>404 Not Found</h1>
      <br />
      <Link to="/">잘못 된 URL입니다.</Link>
    </>
  );
}
