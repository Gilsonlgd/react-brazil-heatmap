import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import brazilTopoJson from "./brazil-topojson.json";

import "./index.css";

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

interface HeatmapBrazilProps {
  data: Record<string, number>;
  colorRange?: [string, string];
  domain?: [number, number];
  onClick?: (geo: Geography) => void;
}

function HeatmapBrazil({
  data,
  domain,
  colorRange = ["#90caff", "#2998ff"],
}: HeatmapBrazilProps): JSX.Element {
  const maxValue = Math.max(...Object.values(data));
  const colorScale = scaleLinear<string>()
    .domain(domain || [0, maxValue])
    .range(colorRange);

  return (
    <ComposableMap
      className="react-brazil-heatmap"
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
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

export default HeatmapBrazil;
