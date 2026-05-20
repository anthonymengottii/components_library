import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './Preloader.css';

const Preloader = ({
  backgroundColor = '#000',
  textColor = '#fff',
  barColor = '#fff',
  barBackground = 'rgb(80, 80, 80)',
  contentBackground = '#111',
  contentColor = '#fff',
  animationDuration = 10, // Not perfectly scaled to this exact number, used to multiply base durations
}) => {
  const container = useRef(null);
  
  useGSAP(() => {
    if (!container.current) return;
    
    // Scale durations based on the provided prop (base was roughly 8-10 seconds total)
    const d = animationDuration / 10;
    
    const counter3 = container.current.querySelector('.counter-3');
    const counter2 = container.current.querySelector('.counter-2');
    const counter1 = container.current.querySelector('.counter-1');

    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector('.num').clientHeight;
      const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration: duration * d,
        delay: delay * d,
        ease: 'power2.inOut',
      });
    }

    animate(counter3, 5);
    animate(counter2, 6);
    animate(counter1, 2, 4);

    gsap.to(container.current.querySelectorAll('.digit'), {
      top: '-150px',
      stagger: { amount: 0.25 * d },
      delay: 6 * d,
      duration: 1 * d,
      ease: 'power4.inOut',
    });

    gsap.from(container.current.querySelectorAll('.loader-1'), {
      width: 0,
      duration: 6 * d,
      ease: 'power2.inOut',
    });

    gsap.from(container.current.querySelectorAll('.loader-2'), {
      width: 0,
      delay: 1.9 * d,
      duration: 2 * d,
      ease: 'power2.inOut',
    });

    gsap.to(container.current.querySelectorAll('.loader'), {
      background: 'none',
      delay: 6 * d,
      duration: 0.1 * d,
    });

    gsap.to(container.current.querySelectorAll('.loader-1'), {
      rotate: 90,
      y: -50,
      duration: 0.5 * d,
      delay: 6 * d,
    });

    gsap.to(container.current.querySelectorAll('.loader-2'), {
      x: -75,
      y: 75,
      duration: 0.5 * d,
    }, '<');

    gsap.to(container.current.querySelectorAll('.loader'), {
      scale: 40,
      duration: 1 * d,
      delay: 7 * d,
      ease: 'power2.inOut',
    });

    gsap.to(container.current.querySelectorAll('.loader'), {
      rotate: 45,
      y: 500,
      x: 2000,
      duration: 1 * d,
      delay: 7 * d,
      ease: 'power2.inOut',
    });

    gsap.to(container.current.querySelectorAll('.loading-screen'), {
      opacity: 0,
      duration: 0.5 * d,
      delay: 7.5 * d,
      ease: 'power1.inOut',
      onComplete: () => {
        const loadingScreen = container.current.querySelector('.loading-screen');
        if (loadingScreen) loadingScreen.style.display = 'none';
      }
    });

    gsap.to(container.current.querySelectorAll('h1'), {
      delay: 7 * d,
      y: -80,
      duration: 1.5 * d,
      ease: 'power4.inOut',
      stagger: { amount: 0.1 * d },
    });
  }, { scope: container });

  return (
    <div className="preloader-container" ref={container}>
      {/* Target content that is revealed */}
      <div 
        className="website-content" 
        style={{ backgroundColor: contentBackground, color: contentColor }}
      >
        <div className="header">
          <div className="h1">
            <h1>Website</h1>
            <h1>Content</h1>
          </div>
          <div className="header-revealer" style={{ 
            '--revealer-bg': contentBackground,
            boxShadow: `inset 0 0 0 100vmax ${contentBackground}`
          }}></div>
        </div>
      </div>
      
      {/* Preloader overlay */}
      <div 
        className="loading-screen" 
        style={{ backgroundColor, color: textColor }}
      >
        <div className="loader" style={{ backgroundColor: barBackground }}>
          <div className="loader-1 bar" style={{ backgroundColor: barColor }}></div>
          <div className="loader-2 bar" style={{ backgroundColor: barColor }}></div>
        </div>
        <div className="counter">
          <div className="counter-1 digit">
            <div className="num">0</div>
            <div className="num num1offset1">1</div>
          </div>
          <div className="counter-2 digit">
            <div className="num">0</div>
            <div className="num num1offset2">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="counter-3 digit">
            {Array.from({ length: 2 }).map((_, i) =>
              Array.from({ length: 10 }).map((_, j) => (
                <div key={`${i}-${j}`} className="num">{j}</div>
              ))
            )}
            <div className="num">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
