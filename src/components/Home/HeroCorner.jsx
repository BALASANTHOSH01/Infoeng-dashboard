import React from 'react'

const HeroCorner = ({color}) => {
    const Color = color;
  return (
    <div style={{ backgroundColor: color }} className={`rotate-[25deg] absolute z-0 top-[-90%] left-[-20%] h-[150vh] w-[50%]`}>
        <h1>hi</h1>
    </div>
  )
}

export default HeroCorner;