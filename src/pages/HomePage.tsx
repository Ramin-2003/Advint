import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="hero-container">
        <video
          className="hero-bg"
          id="hero-video"
          autoPlay
          playsInline
          loop
          muted
          poster="/hero-poster.jpg"
        >
          <source
            type="video/mp4"
            src="https://www.dropbox.com/scl/fi/ebjz91vj86tplot13o5y6/Bg24.mp4?rlkey=ifr1zm9smcd0qbqvzj3gxgujt&st=9gvcmofc&raw=1"
          />
        </video>
        <div className="hero">
          <h2>
            Smarter Social Media Ads. <br /> Guaranteed Results. <br /> Zero
            Effort.
          </h2>
          <h3>
            Let AI handle your Facebook and Instagram ads—from creation to
            optimization, <b>Completely Autonomous</b>. <br /> We generate
            <b> stunning visuals, persuasive copy, and continuously improve </b>
            performance based on real-time data. <br /> Just drop your brands
            website link for a quick free demo:
          </h3>
          <div className="demo">
            <div className="input-field">
              <svg
                className="ai-icon"
                id="a"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.67 192.97"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    gradientTransform="rotate(90)"
                    x1="0"
                    y1="0"
                    x2="192.67"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stop-color="rgb(69, 147, 248)" />
                    <stop offset="100%" stop-color="rgb(34, 77, 250)" />
                  </linearGradient>
                </defs>
                <path
                  className="b"
                  fill="url(#gradient)"
                  d="m149.12,164.46c0,9.1-7.41,16.51-16.51,16.51H28.51c-9.1,0-16.51-7.41-16.51-16.51V60.37c0-9.1,7.41-16.51,16.51-16.51h52.05v-12H28.51C12.77,31.85,0,44.62,0,60.37v104.09c0,15.75,12.77,28.51,28.51,28.51h104.09c15.75,0,28.51-12.77,28.51-28.51v-54.8h-12v54.8Z"
                />
                <path
                  className="b"
                  fill="url(#gradient)"
                  d="m57.68,78.63l-22.21,72h12.72l5.55-18.81h24.72l6.09,18.81h13.61l-24-72h-16.48Zm-1.61,43.17l8.81-32.54h1.49l10.3,32.54h-20.6Z"
                />
                <rect
                  className="b"
                  fill="url(#gradient)"
                  x="107.11"
                  y="78.63"
                  width="12.71"
                  height="72.7"
                />
                <path
                  className="b"
                  fill="url(#gradient)"
                  d="m191.64,47.24c-3.51-.45-15.57-2.62-27.88-12.11-12.7-9.79-17.54-29.09-18.59-33.99-.14-.68-.74-1.15-1.43-1.14h0c-.7,0-1.31.49-1.47,1.17-.83,3.53-3.68,14.49-8.94,23.72l-.15-.14c-.59,1.05-.94,1.61-.94,1.61-6.88,12.88-30.06,18.81-35.78,20.1-.75.17-1.28.84-1.28,1.61,0,.59.43,1.08,1.01,1.16,3.5.47,15.55,2.73,27.79,12.31,12.63,9.88,17.33,29.21,18.35,34.12.14.68.74,1.15,1.43,1.15h0c.7,0,1.31-.48,1.48-1.16.95-3.92,4.46-17.01,10.99-26.66.06.08.12.17.17.26,7.5-12.16,29.45-17.94,34.99-19.23.75-.17,1.28-.85,1.27-1.62,0-.59-.44-1.08-1.02-1.16Z"
                />
                <path
                  className="b"
                  fill="url(#gradient)"
                  d="m104.13,12.08c.79.11,3.5.61,6.26,2.77,2.85,2.23,3.91,6.58,4.13,7.69.03.15.17.26.32.26h0c.16,0,.3-.11.33-.26.21-.88,1-3.83,2.48-6.01.01.02.03.04.04.06,1.69-2.74,6.64-4.04,7.88-4.33.17-.04.29-.19.29-.36,0-.13-.1-.24-.23-.26-.79-.1-3.51-.59-6.28-2.73-2.86-2.21-3.95-6.55-4.19-7.66-.03-.15-.17-.26-.32-.26h0c-.16,0-.29.11-.33.26-.19.8-.83,3.27-2.01,5.34l-.03-.03c-.13.24-.21.36-.21.36-1.55,2.9-6.77,4.24-8.06,4.53-.17.04-.29.19-.29.36,0,.13.1.24.23.26Z"
                />
              </svg>
              <input type="url" placeholder="Your Brands URL" />
            </div>
            <button className="demo-submit">
              Demo{" "}
              <i className="bi bi-arrow-right-circle-fill" id="demo-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
