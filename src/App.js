import React from 'react';
import './App.css';
import Table from './Table';
import { useSelector } from 'react-redux';
import ServeWaitingList from './ServeWaitingList';
import { useDispatch } from 'react-redux';
import { uploadFloorAction, uploadOrdersAction } from './redux/action';


const App = () => {
  const floor = useSelector(state => state.floor);
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  const uploadFile = (event, upload) => {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = function () {
      dispatch(upload(reader.result));
    };
  }

  return (
    floor.length > 0 && orders.length > 0 ?
    <div className="App">
      <div className="container">
        <ServeWaitingList />
        <div className="wrap-container">
          {floor.map((item, index) => (
            <Table
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="btn-container">
        <a href="https://dizengoff-yosi.herokuapp.com/download"
          download
          className="cta">
          <span>Download completed_orders.json</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </a>
      </div>
    </div>
     :
    <div className="Load">
      <div className="upload">
        <p>Upload file floor.json </p>
        <input type="file" onChange={e => uploadFile(e, uploadFloorAction)} />
      </div>
      <div className="upload">
        <p>Upload file orders.json </p>
        <input type="file" onChange={e => uploadFile(e, uploadOrdersAction)} />
      </div>
    </div>
  )
}

export default App;