import React, { useState, useEffect } from 'react';

function LightDarkSwitch({ darkMode,setDarkMode }) {

    // const handleSwitch = () => {
    //     setDarkMode(prev => !prev)
    //     var r = document.querySelector(':root');
    //     if (!darkMode) {
    //         r.style.setProperty('--themeColor', '#000000');
    //         r.style.setProperty('--themeFontColor', '#fff');
    //         r.style.setProperty('--themeColorLighterShade', '#0d0d0d');
    //         r.style.setProperty('--themeColorLightestShade', '#2a2a2a');
    //         r.style.setProperty('--themeShadow', ' rgba(255, 255, 255, 0.16) 0px 1px 2px, rgb(255, 255, 255,.5) 0px 0px 0px 1px');

    //     }
      
    //     else {
    //         r.style.setProperty('--themeColor', '#fafaff');
    //         r.style.setProperty('--themeFontColor', '#000');
    //         r.style.setProperty('--themeColorLighterShade', '#e6e6ef');
    //         r.style.setProperty('--themeColorLightestShade', '#f5f5ff');
    //         r.style.setProperty('--themeShadow', 'var(--themeShadowColor) 0px 6px 12px -2px, var(--themeShadowLighterColor) 0px 3px 7px -3px');

    //     }

    // }

const handleSwitch = () => {
  setDarkMode(prev => {
    const newMode = !prev;
    sessionStorage.setItem("darkMode", newMode);

    const r = document.querySelector(':root');
    if (newMode) {
      r.style.setProperty('--themeColor', '#000000');
      r.style.setProperty('--themeFontColor', '#fff');
      r.style.setProperty('--themeColorLighterShade', '#0d0d0d');
      r.style.setProperty('--themeColorLightestShade', '#2a2a2a');
      r.style.setProperty('--themeShadow', ' rgba(255, 255, 255, 0.16) 0px 1px 2px, rgb(255, 255, 255,.5) 0px 0px 0px 1px');
      r.style.setProperty('--formBorderLineColor', 'rgba(255, 255, 255, 0.1)');
    } else {
      r.style.setProperty('--themeColor', '#fafaff');
      r.style.setProperty('--themeFontColor', '#000');
      r.style.setProperty('--themeColorLighterShade', '#e6e6ef');
      r.style.setProperty('--themeColorLightestShade', '#f5f5ff');
      r.style.setProperty('--themeShadow', 'var(--themeShadowColor) 0px 6px 12px -2px, var(--themeShadowLighterColor) 0px 3px 7px -3px');
       r.style.setProperty('--formBorderLineColor', '#dbdfe7');
    }

    return newMode;
  });
};


    // useEffect(()=>{
    //     var r = document.querySelector(':root');
    //     if(getComputedStyle(r)?.getPropertyValue('--themeColor')=="#000000")
    //     setDarkMode(true)
    //     else
    //     console.log("Hiiidisisd")
    //     setDarkMode(false)
    // },[])

    useEffect(() => {
  const r = document.querySelector(':root');
  if (darkMode) {
    r.style.setProperty('--themeColor', '#000000');
    r.style.setProperty('--themeFontColor', '#fff');
    r.style.setProperty('--themeColorLighterShade', '#0d0d0d');
    r.style.setProperty('--themeColorLightestShade', '#2a2a2a');
    r.style.setProperty('--themeShadow', ' rgba(255, 255, 255, 0.16) 0px 1px 2px, rgb(255, 255, 255,.5) 0px 0px 0px 1px');
    r.style.setProperty('--formBorderLineColor', '#727272');
  } else {
    r.style.setProperty('--themeColor', '#fafaff');
    r.style.setProperty('--themeFontColor', '#000');
    r.style.setProperty('--themeColorLighterShade', '#e6e6ef');
    r.style.setProperty('--themeColorLightestShade', '#f5f5ff');
    r.style.setProperty('--themeShadow', 'var(--themeShadowColor) 0px 6px 12px -2px, var(--themeShadowLighterColor) 0px 3px 7px -3px');
     r.style.setProperty('--formBorderLineColor', '#c7c7c7');
  }
}, [darkMode]);


    return (
        <>
            <button style={{ border: "none", background: "transparent" }} onClick={handleSwitch}>{darkMode ? <svg style={{ height: "1rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='#fff' d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" /></svg> :
             <svg  style={{ height: "1rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffd43b" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" /></svg>}</button>
        </>
    );
}

export default LightDarkSwitch;
