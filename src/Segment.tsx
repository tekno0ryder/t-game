import React, { ForwardedRef, forwardRef } from "react";
import { SEGMENTS_CONFIG } from "./Game";

type Props = {
  config: typeof SEGMENTS_CONFIG[number];
  baseHeight: number;
};

const Segment = (
  { config, baseHeight }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      style={{
        width: 22,
        height: config.ratio * baseHeight,
        background: config.color,
      }}
    />
  );
};

export default forwardRef(Segment);
