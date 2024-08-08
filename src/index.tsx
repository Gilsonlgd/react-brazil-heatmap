import React, { useId } from "react";
import ReactDOMServer from "react-dom/server";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import brazilTopoJson from "./brazil-topojson.json";
import { Tooltip } from "react-tooltip";

import "./index.css";
import "react-tooltip/dist/react-tooltip.css";

export type Geography = {
  type: string;
  properties: {
    name: string;
    uf: string;
    codigo: number;
    regiao: string;
  };
  id: string;
  rsmKey: string;
};

export type MetaItem = {
  [key: string]: string | number;
};

export type Metadata = {
  [key: string]: MetaItem;
};

interface HeatmapBrazilProps {
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
  onClick?: (geo: Geography) => void;
  tooltipContent?: (meta: MetaItem) => React.ReactNode;
}

function HeatmapBrazil({
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
  const id = useId().replace(/:/g, "");
  const maxValue = Math.max(...Object.values(data));
  const colorScale = scaleLinear<string>()
    .domain(domain || [0, maxValue])
    .range(colorRange);

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
          {({ geographies }: { geographies: Geography[] }) =>
            geographies.map((geo) => {
              const stateValue = data[geo.id] || 0;
              return (
                <Geography
                  className="react-brazil-heatmap__state"
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(stateValue)}
                  id={`geo-${id}-${geo.id}`}
                  data-tooltip-id={`tooltip-${id}`}
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    getTooltipContent(geo.id)
                  )}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Tooltip
        id={`tooltip-${id}`}
        hidden={!tooltip.show}
        openOnClick={tooltip.trigger === "click"}
        float={tooltip.float}
        place={tooltip.position}
        style={{
          padding: 0,
          backgroundColor: "transparent",
          border: "none",
        }}
      />
    </div>
  );
}

export default HeatmapBrazil;
