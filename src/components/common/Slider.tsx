import React, { useState, useEffect } from 'react';
import './Slider.scss';

interface SliderProps {
  value: number[];
  onValueChange: (e: { detail: number[] }) => void;
  step?: number;
  ticks?: boolean;
  showValueLabel?: boolean;
  tickIntervals?: number;
  children?: React.ReactNode;
}

interface SliderMarkerProps {
  value: number;
  children: React.ReactNode;
}

export const SliderMarker: React.FC<SliderMarkerProps> = ({
  value,
  children,
}) => {
  return (
    <div className="slider-marker" style={{ left: `${value}%` }}>
      {children}
    </div>
  );
};

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  step = 1,
  ticks = false,
  showValueLabel = false,
  tickIntervals = 1,
  children,
}) => {
  const [sliderValue, setSliderValue] = useState(value[0]);

  useEffect(() => {
    setSliderValue(value[0]);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onValueChange({ detail: [newValue] });
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="slider"
      />
      {ticks && (
        <div className="slider-ticks">
          {Array.from({ length: 101 / tickIntervals }).map((_, index) => (
            <div
              key={index}
              className="slider-tick"
              style={{ left: `${index * tickIntervals}%` }}
            />
          ))}
        </div>
      )}
      {showValueLabel && (
        <div className="slider-value-label">{sliderValue}%</div>
      )}
      <div className="slider-markers">{children}</div>
    </div>
  );
};

export default Slider;
