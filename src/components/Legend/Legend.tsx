import React from "react";
import "./Legend.css";

export type LegendProps = {
  children?: React.ReactNode | string;
  domain?: [number, number];
  stepSize?: number;
  colorScale?: (value: number) => string;
  formatter?: (value: number) => string;
};

function Legend({
  domain,
  children = "Legend",
  stepSize = 5,
  colorScale,
  formatter,
}: LegendProps): JSX.Element {
  const [minValue, maxValue] = domain!;
  const numSteps = Math.floor((maxValue - minValue) / stepSize) + 1;
  const legendValues = Array.from(
    { length: numSteps },
    (_, i) => minValue + i * stepSize
  );
  return (
    <div className={`react-brazil-heatmap__legend`}>
      <div className="content-wrapper">
        <div className="legend-header">{children}</div>
        <div className="legend-body">
          {legendValues.map((value, i) => (
            <div key={i} className="legend-item">
              <div
                className="legend-color"
                style={{
                  backgroundColor: colorScale!(value),
                }}
              ></div>
              <span>
                {formatter
                  ? formatter(value)
                  : value.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Legend.getLegendProps = (legend: React.ReactNode): LegendProps | null => {
  if (React.isValidElement(legend) && legend.type === Legend) {
    const props = legend.props as LegendProps;
    return props;
  }
  return null;
};

export default Legend;
