import React, { useId } from "react";
import ReactDOMServer from "react-dom/server";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { scaleLinear } from "d3-scale";

import type { Geography as GeographyType, Metadata, MetaItem } from "./types";
import { Legend } from "./components";

import brazilTopoJson from "./brazil-topojson.json";

import "./index.css";
import "react-tooltip/dist/react-tooltip.css";

interface HeatmapBrazilProps {
  children?: React.ReactNode[] | React.ReactNode;
  data: Record<string, number>;
  metadata?: Metadata;
  colorRange?: [string, string];
  domain?: [number, number];
  tooltip?: {
    show?: boolean;
    trigger?: "hover" | "click";
    float?: boolean;
    hideArrow?: boolean;
    position?: "top" | "right" | "bottom" | "left";
  };
  onClick?: (geo: GeographyType) => void;
  tooltipContent?: (meta: MetaItem) => React.ReactNode;
}

function HeatmapBrazil({
  children = [],
  data,
  metadata,
  domain,
  colorRange = ["#90caff", "#2998ff"],
  tooltip = {
    show: false,
    trigger: "hover",
    float: false,
    hideArrow: false,
    position: "top",
  },
  tooltipContent,
}: HeatmapBrazilProps): JSX.Element {
  const componentId = useId().replace(/:/g, "");
  const maxValue = Math.max(...Object.values(data));
  const colorScale = scaleLinear<string>()
    .domain(domain || [0, maxValue])
    .range(colorRange);

  const renderLegend = (): React.ReactNode | null => {
    if (Array.isArray(children)) {
      return children.find(
        (child) => React.isValidElement(child) && child.type === Legend
      ) as React.ReactNode | null;
    } else {
      if (React.isValidElement(children) && children.type === Legend) {
        return children;
      }
    }
    return null;
  };

  const getTooltipContent = (geoId: string): React.ReactNode => {
    if (tooltipContent && metadata) {
      return (
        <div
          className={`react-brazil-heatmap__tooltip ${
            tooltip.position || "top"
          }`}
        >
          {tooltipContent(metadata[geoId])}
        </div>
      );
    } else {
      return (
        <div
          className={`react-brazil-heatmap__tooltip ${
            tooltip.position || "top"
          }`}
        >
          <h3
            style={{
              color: "#ffff",
            }}
          >
            {geoId}
          </h3>
        </div>
      );
    }
  };

  return (
      <div className="react-brazil-heatmap">
        <ComposableMap
          className="w-100 h-100"
          projection="geoMercator"
          projectionConfig={{
            scale: 1100,
            center: [-54, -15],
          }}
        >
          <Geographies geography={brazilTopoJson}>
            {({ geographies }: { geographies: GeographyType[] }) =>
              geographies.map((geo) => {
                const stateValue = data[geo.id] || 0;
                return (
                  <Geography
                    className="react-brazil-heatmap__state"
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(stateValue)}
                    id={`geo-${componentId}-${geo.id}`}
                    data-tooltip-id={`tooltip-${componentId}`}
                    data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                      getTooltipContent(geo.id)
                    )}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {renderLegend()}
        <Tooltip
          id={`tooltip-${componentId}`}
          hidden={!tooltip.show}
          openOnClick={tooltip.trigger === "click"}
          float={tooltip.float}
          place={tooltip.position}
          border="none"
          style={{
            padding: 0,
            backgroundColor: "transparent",
          }}
        />
      </div>
  );
}

export default HeatmapBrazil;
export type { GeographyType, Metadata, MetaItem };
export { Legend } from "./components";
