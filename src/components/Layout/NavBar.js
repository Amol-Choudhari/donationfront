import React from 'react';
import './Layout.css';


const Navbar = () => {
  return (
    <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-collapse-init
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <a className="navbar-brand" href="#">
         Shree Sati Anasuya Mata Mandir
        </a>

        <form className="d-none d-md-flex input-group w-auto my-auto">
          <input
            autoComplete="off"
            type="search"
            className="form-control rounded"
            placeholder='Search (ctrl + "/" to focus)'
            style={{ minWidth: '225px' }}
          />
          <span className="input-group-text border-0"><i className="fas fa-search"></i></span>
        </form>

        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item dropdown">
            <a
              data-mdb-dropdown-init
              className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              <span className="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a className="dropdown-item" href="#">Some news</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Another news</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </li>

   

          <li className="nav-item dropdown">
            <a
              data-mdb-dropdown-init
              className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height="22"
                alt="Avatar"
                loading="lazy"
              />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a className="dropdown-item" href="#">My profile</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Settings</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
