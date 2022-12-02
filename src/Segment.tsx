import React, { ForwardedRef, forwardRef } from "react";

const config = {
  1: {
    ratio: 1,
    color: "#3b82f6",
  },
  2: {
    ratio: 0.6,
    color: "#22c55e",
  },
  3: {
    ratio: 0.2,
    color: "#e11d48",
  },
};

type Props = {
  type: keyof typeof config;
  baseHeight: number;
};

const Segment = (
  { type, baseHeight }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const conf = config[type];

  return (
    <div
      ref={ref}
      style={{
        width: 22,
        height: conf.ratio * baseHeight,
        background: conf.color,
        marginTop: 32,
      }}
    />
  );
};

export default forwardRef(Segment);
