import React from "react";
import { useState } from "react";
import Snowfall from "react-snowfall";
import "./GlobeReveal";

const Globe = () => {
  const [snowflakeCount, setSnowflakeCount] = useState(0); 
  const [snowflakeRadius, setSnowflakeRadius] = useState([0.5, 3.0]); 
  const [snowflakeSpeed, setSnowflakeSpeed] = useState([0.5, 3.0]); 
  return (
    <div className="globe-container">
      {/* Glass Globe */}
      <div className="globe">
        {/* Snow Effect */}
        <div className="snow-container">
          <Snowfall
            color="white"
            snowflakeCount={snowflakeCount}
            radius={snowflakeRadius}
            speed={snowflakeSpeed}
           
          />
        </div>
      </div>
  <img className="globeBase" src="/globe.png" alt="Globe base" loading="lazy" />
    </div>
  );
};

export default Globe;
