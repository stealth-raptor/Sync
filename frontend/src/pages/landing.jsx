import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import TrueFocus from '../contexts/TrueFocus'
import Hyperspeed from '../contexts/Hyperspeed';

const LandingPage = () => {

  const router=useNavigate();
  return (
    <div className='landingPageContainer'>

      <div className="hyperspeed-background">
        <Hyperspeed
          effectOptions={{

            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'LongRaceDistortion',
            length: 700,
            roadWidth: 30,
            islandWidth: 20,
            lanesPerRoad: 16,
            fov: 100,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 90,
            lightPairsPerRoadWay: 200,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.05, 400 * 0.15],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.05, 0.05],
            carFloorSeparation: [0.05, 1],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131318,
              brokenLines: 0x131318,
              leftCars: [0xFF5F73, 0xE74D60, 0xff102a],
              rightCars: [0xA4E3E6, 0x80D1D4, 0x53C2C6],
              sticks: 0xA4E3E6,
            }

          }}
        />
      </div>
      <nav>
        <div className='navHeader'><h2>Sync</h2></div>
        <div className='navList'>
          <p onClick={()=>{
            router("/fds;kn")
          }}>Join as Guest</p>
          <p onClick={()=>{
            router("/auth")
          }}>Signup</p>
          <button onClick={()=>{
            router("/auth")
          }}>Login</button>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className='heading'>
          <div className="hero">
          <TrueFocus
            sentence="Next-Gen Connectivity"
            manualMode={false}
            blurAmount={5}
            borderColor="rgba(82, 39, 255, 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
          </div>
      
          <p>Fast. Easy. Reliable. </p>
          <button className='sync'>
            <Link to={"/auth"}>Get in Sync</Link>
          </button>
        </div>




      </div>
    </div>
  )
}

export default LandingPage

