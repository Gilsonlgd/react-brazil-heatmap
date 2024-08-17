import React, { useId } from "react";
import ReactDOMServer from "react-dom/server";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { scaleLinear } from "d3-scale";

import type { Geography as GeographyType, Metadata, MetaItem } from "./types";
import { Tooltip as TT, Legend } from "./components";

import brazilTopoJson from "./brazil-topojson.json";

import "./index.css";
import "react-tooltip/dist/react-tooltip.css";

interface HeatmapBrazilProps {
  children?: React.ReactNode[] | React.ReactNode;
  data: Record<string, number>;
  metadata?: Metadata;
  colorRange?: [string, string];
  domain?: [number, number];
  onClick?: (geo: GeographyType) => void;
}

function HeatmapBrazil({
  children = [],
  data,
  metadata,
  domain,
  colorRange = ["#90caff", "#2998ff"],
}: HeatmapBrazilProps): JSX.Element {
  const componentId = useId().replace(/:/g, "");

  const maxValue = Math.max(...Object.values(data));
  const colorScale = scaleLinear<string>()
    .domain(domain || [0, maxValue])
    .range(colorRange);

  const getChild = (type: React.ElementType) => {
    if (Array.isArray(children)) {
      return children.find(
        (child) => React.isValidElement(child) && child.type === type
      ) as React.ReactNode | null;
    } else {
      if (React.isValidElement(children) && children.type === type) {
        return children;
      }
    }
    return null;
  };

  const tooltipProps = TT.getTooltipProps(getChild(TT));
  const legendProps = Legend.getLegendProps(getChild(Legend));

  const getTooltipContent = (geoId: string): React.ReactNode => {
    if (tooltipProps && metadata && tooltipProps.tooltipContent) {
      return (
        <div
          className={`react-brazil-heatmap__tooltip ${
            tooltipProps.position || "top"
          }`}
        >
          {tooltipProps.tooltipContent(metadata[geoId])}
        </div>
      );
    } else {
      return (
        <div
          className={`react-brazil-heatmap__tooltip ${
            tooltipProps?.position || "top"
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
      {legendProps && (
        <Legend
          domain={legendProps.domain || domain || [0, maxValue]}
          colorScale={legendProps.colorScale || colorScale}
          stepSize={legendProps.stepSize}
          formatter={legendProps.formatter}
        >
          {legendProps.children}
        </Legend>
      )}
      <ComposableMap
        style={{
          width: legendProps ? "95%" : "100%",
          height: "auto",
          marginLeft: "auto",
        }}
        projection="geoMercator"
        projectionConfig={{
          scale: 1100,
          center: [-54, -15],
        }}
        viewBox="0 -100 800 800"
      >
        <Geographies geography={brazilTopoJson} style={{ flexGrow: 1 }}>
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
      <Tooltip
        id={`tooltip-${componentId}`}
        hidden={!!!tooltipProps}
        openOnClick={tooltipProps?.trigger === "click"}
        float={tooltipProps?.float || false}
        place={tooltipProps?.position || "top"}
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
export { Legend, Tooltip } from "./components";
