import logo from './logo.svg';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';

import './App.css';

const BOTTOM_POINT = window.innerHeight - 30;

function App() {

  const posLogo = useSpring({ x: 0, y: 0 });
  const posP = useSpring({ x: 0, y: 0 });
  const posA = useSpring({ x: 0, y: 0 });
  const posHandle = useSpring({ y: 0 });

  const bindLogo = useDrag((params) => {
    posLogo.x.set(params.offset[0]);
    posLogo.y.set(params.offset[1]);
  });
  const bindP = useDrag((params) => {
    posP.x.set(params.offset[0]);
    posP.y.set(params.offset[1]);
  });
  const bindA = useDrag((params) => {
    posA.x.set(params.offset[0]);
    posA.y.set(params.offset[1]);
  });
  const bindHandle = useDrag((params) => {
    if (params.dragging) {
      if (params.xy[1] > 0 && params.xy[1] < BOTTOM_POINT) {
        posHandle.y.set(params.xy[1]);
      }
    } else {
      if (params.xy[1] < BOTTOM_POINT / 2) {
        posHandle.y.start(0);
      } else {
        posHandle.y.start(BOTTOM_POINT);
      }
    }
  }, {
    bounds: { top: 0, bottom: BOTTOM_POINT },
  });

  return (
    <div className="App">
      <animated.div {...bindHandle()} style={{
        y: posHandle.y,
        touchAction: 'none',
      }} className="App-handle-container">
        <div className="App-handle" />
      </animated.div>
      <div className="App-bg" />
      <animated.div className="App-overlay" style={{
        y: posHandle.y,
        opacity: posHandle.y.to([0, BOTTOM_POINT], [1, 0.8]),
      }} />

      <header className="App-header">

        <animated.div {...bindLogo()} style={{
          x: posLogo.x,
          y: posLogo.y,
          touchAction: 'none',
        }} >
          <img src={logo} className="App-logo" alt="logo" />
        </animated.div>

        <animated.div {...bindP()} style={{
          x: posP.x,
          y: posP.y,
          touchAction: 'none',
        }} >
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </animated.div>
        <animated.div {...bindA()} style={{
          x: posA.x,
          y: posA.y,
          touchAction: 'none',
        }} >
          bitesize.academy
        </animated.div>
      </header>
    </div>
  );
}

export default App;
