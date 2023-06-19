import React from 'react';
import ChartJSs from './ChartJS';

const WidgetWithGraphs = () => {
  return (
    <div className="container h-25 mt-3">
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active" aria-current="true" href="#">
                Расходы
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#">
                Доходы
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body ">
          <ChartJSs style={{ height: '10rem', width: '20rem' }} />
          {/* <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default WidgetWithGraphs;
