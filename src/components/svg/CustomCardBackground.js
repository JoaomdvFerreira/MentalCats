import React from 'react';
import Svg, { Rect, Image, Mask, Path } from 'react-native-svg';

const CustomCardBackground = ({ width = 320, height = 425, imageUrl }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 319 416" fill="none">
      <Mask id="mask0" maskUnits="userSpaceOnUse">
        <Rect
          x="28.2581"
          y="1.601"
          width="272"
          height="375"
          transform="rotate(1.00079 28.2581 1.601)"
          fill="#FDEB01"
        />
      </Mask>
      <Rect
        x="43.7179"
        y="19"
        width="275"
        height="378"
        transform="rotate(4.00079 43.7179 19)"
        fill="#FDEB01"
      />
      <Image
        x="28.2581"
        y="1.601"
        width="270"
        height="375"
        transform="rotate(3.50079 28.2581 1.601)"
        xlinkHref={imageUrl}
        preserveAspectRatio="xMidYMid slice"
        mask="url(#mask0)"
      />
      <Rect
        x="28.2581"
        y="1.601"
        width="270"
        height="375"
        transform="rotate(4.0079 28.2581 1.601)"
        fill="transparent"
        stroke="black"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default CustomCardBackground;
