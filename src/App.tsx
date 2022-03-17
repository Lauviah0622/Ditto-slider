import React, { useState } from "react";
import Slide, { SlideContainer, SlideItem } from "./Slide";
import style from "./style.module.scss";

const createImagePlaceHolder = (i: number) =>
  `https://via.placeholder.com/360x360.jpg?text=${i}th`;

const images: string[] = Array.from(Array(5), (_, i) =>
  createImagePlaceHolder(i)
);

const Item: SlideItem = ({ src }: { src: string }) => (
  <div className={style.card}>
    <img src={src} />
  </div>
);

const Container: SlideContainer = React.forwardRef(({ children }, ref) => (
  <div className={style.container} ref={ref}>
    {children}
  </div>
));

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Slide
          index={count}
          images={images}
          Item={Item}
          Container={Container}
        />
        <div>
          <button
            onClick={() => {
              setCount((v) => v - 1);
            }}
          >
            prev
          </button>
          <select
            value={count}
            onChange={(e) => {
              setCount(+e.target.value);
            }}
          >
            {Array.from(Array(images.length), (_, i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setCount((v) => v + 1);
            }}
          >
            next
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
