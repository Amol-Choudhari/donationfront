import React from 'react';
import NavBar from '../Layout/NavBar';
import SideBar from '../Layout/SideBar';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="container-fluid pt-4">  
      <NavBar />
      <div className="row">
        <div className="col-lg-3">
          <SideBar />
        </div>
        <div className="col-lg-9">
          <div className="container">
            {/* Ensuring cards are centered and have consistent spacing */}
            <div className="row justify-content-center">
              <div className="col-md-4 d-flex align-items-stretch">
                <div className="card m-2" style={{width: "100%"}}>  {/* Use 100% width for full column usage */}
                  <img className="card-img-top" src="..." alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-stretch">
                <div className="card m-2" style={{width: "100%"}}>
                  <img className="card-img-top" src="..." alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-stretch">
                <div className="card m-2" style={{width: "100%"}}>
                  <img className="card-img-top" src="..." alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

