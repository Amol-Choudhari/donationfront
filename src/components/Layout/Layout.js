import React from 'react';
import Sidebar from './SideBar';
import Navbar from './NavBar';
import './Layout.css';


const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Sidebar />
        <Navbar />
      </header>
      <main style={{ marginTop: '58px' }}>
        <div className="container pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
