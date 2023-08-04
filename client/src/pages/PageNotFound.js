import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found :</h1>
      <h3 >Go to Home Page :<Link className='pageNotFound' to="/">Home</Link></h3>
    </div>
  );
}

export default PageNotFound;