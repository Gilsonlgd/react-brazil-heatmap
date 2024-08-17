import React from "react";

import type { MetaItem } from "src/types";
import "./Tooltip.css";

export type TooltipProps = {
  trigger?: "hover" | "click";
  float?: boolean;
  position?: "top" | "right" | "bottom" | "left";
  tooltipContent?: (meta: MetaItem) => React.ReactNode;
};

function Tooltip({}: TooltipProps): null {
  return null;
}

Tooltip.getTooltipProps = (tooltip: React.ReactNode): TooltipProps | null => {
  if (React.isValidElement(tooltip) && tooltip.type === Tooltip) {
    const props = tooltip.props as TooltipProps;
    return props;
  }
  return null;
};

export default Tooltip;
