import React from 'react'
import "./Loading.css"

function Loading() {
  return (
    <div className="loading-window">
      <div className="car">
        <div className="strike"></div>
        <div className="strike"></div>
        <div className="strike"></div>
        <div className="strike"></div>
        <div className="strike"></div>
        <div className="strike"></div>
        <div className="speed">
          <div className="car-detail center"></div>
          <div className="car-detail center2"></div>
          <div className="car-detail top"></div>
          <div className="car-detail window"></div>
          <div className="car-detail window"></div>
          <div className="car-detail window"></div>
          <div className="car-detail window"></div>
          <div className="car-detail window"></div>
          <div className="car-detail rear-bumper"></div>
          <div className="car-detail front-bumper"></div>
          <div className="car-detail front-light"></div>
          <div className="car-detail wheel"></div>
          <div className="car-detail wheel"></div>
          <div className='car-detail door'></div>
        </div>
      </div>

      <div className="text">
        <span>Loading</span><span className="dots">...</span>
      </div>
    </div>
  )
}

export default Loading