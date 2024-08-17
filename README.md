# react-brazil-heatmap

A React component for displaying a heatmap of Brazil. Ideal for visualizing data distribution across Brazilian states or regions.

## Features

- Easy integration with React applications
- Customizable colors and data input
- Interactive and responsive design

## Installation

To install the package, use npm:

```bash
npm install react-brazil-heatmap
```

Or with yarn:

```bash
yarn add react-brazil-heatmap
```

## Input Data

Here's a basic example of the data format used in the component:

```javascript
const data = {
  "SP": 50,
  "RJ": 30,
  "MG": 20,
  // Add more states with corresponding values
};

const metadata = {
  "SP": {
    "name": "São Paulo"
    "population": 50.000,
    "area": 50.000,
  },
  "RJ": {
    "name": "Rio de Janeiro"
    "population": 40.000,
    "area": 32.000,
  },
  // Add more states with corresponding data
}
```

## Props

### Main Component

The `react-brazil-heatmap` component accepts the following props:

| Prop        | Type                           | Description                                                                                    | Default                                                  |
| ----------- | ------------------------------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| data        | `Record<string, number>`       | An object containing the values for each state. The key should correspond to the state's code. | NA                                                       |
| metadata?   | `Metadata`                     | An object specifying metadata for each state, such as names or descriptions.                   | undefined                                                |
| colorRange? | `[string, string]`             | An array of two colors that define the color range for the heatmap.                            | `["#90caff", "#2998ff"]`                                 |
| domain?     | `[number, number]`             | An array containing the minimum and maximum values for the data range.                         | `[0, maxValue]` where maxValue is the max value in data. |
| onClick?    | `(geo: GeographyType) => void` | A callback function called when a state is clicked, receiving information about the geography. | `() => {}`                                               |


Basic example usage:

```javascript
import React from 'react';
import BrazilHeatmap from 'react-brazil-heatmap';

function App() {
  return (
    <div className="App">
      <h1>Brazil Heatmap</h1>
      <BrazilHeatmap data={data} metadata={metadata}/>
    </div>
  );
}

export default App;
```

### Children Components

#### Tooltip

Used to display a tooltip with relevant information about each state.


| Prop           | Type                                  | Description                                                                                                  | Default                          |
| -------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| trigger?       | `"hover", "click"`                    | Determines how the tooltip is triggered ( on hover or click).                                                | `"hover"`                        |
| float?          | `boolean`                             | If true, tooltip will follow the mouse position when it moves inside the anchor element.                     | `false`                          |
| position?       | `"top", "right", "bottom", "left"`    | Specifies the position of the tooltip relative to the target.                                                | `"top"`                           |
| tooltipContent? | `(meta: MetaItem) => React.ReactNode` | A function that returns the content of the tooltip based on metadata. Used to customize the tooltip content. | Returns a div with the state id. |


Example Usage (using bootstrap):
```javascript
import React from 'react';
import BrazilHeatmap, { Tooltip, MetaItem } from 'react-brazil-heatmap';

function App() {
  const tooltipContent = (meta: MetaItem): React.ReactNode => {
    return (
      <div className="d-flex container-fluid flex-column">
        <h3 className="fw-bold text-center text-white">{meta.name}</h3>
        <span>
          <strong>Population: </strong>
          {meta.population}
        </span>
        <span>
          <strong>Area: </strong>
          {meta.area} m2
        </span>
      </div>
    );
  };
  return (
    <div className="App">
      <BrazilHeatmap data={data} metadata={metadata}>
        <Tooltip
          float
          trigger="hover"
          tooltipContent={tooltipContent}
        />
      </BrazilHeatmap>
    </div>
  );
}

export default App;
```

#### Legend
Used to display the heatmap color scale legend.

| Prop       | Type                        | Description                               | Default Value                          |
| ---------- | --------------------------- | ----------------------------------------- | -------------------------------------- |
| children   | `React.ReactNode, string`   | Content to be displayed in the legend header. | `"Legend"` |
| stepSize   | `number`                    | The interval between steps in the legend. | `5`                                    |
| formatter  | `(value: number) => string` | Function to format the legend labels.     | `undefined`                            |

Example Usage (using bootstrap):
```javascript
import React from 'react';
import BrazilHeatmap, { Legend } from 'react-brazil-heatmap';

function App() {
  return (
    <div className="App">
      <BrazilHeatmap data={data} metadata={metadata}>
        <Legend
          stepSize={10}
          formatter={value => {
            return `${value.toLocaleString()}%`;}
          }
        >
          <strong>
            Public Schools Percentage
          </strong>
        </Legend>
      </BrazilHeatmap>
    </div>
  );
}

export default App;
```


## Customizing
Each component can be customized by overriding specific CSS classes.  
**Note**: Some properties may require the use of `!important` to be properly overridden.

### Main Component

- **`.react-brazil-heatmap`**: Controls the overall layout and dimensions of the heatmap.
- **`.react-brazil-heatmap__state`**: Styles each individual state within the heatmap, managing outline, border, and transition effects.
- **`.react-brazil-heatmap__state:hover`**: Defines the hover behavior for each state.

### Tooltip
The tooltip component can also be customized by overriding the following CSS classes:

- **`.react-brazil-heatmap__tooltip`**: Defines the overall appearance of the tooltip.
  
- **`.react-brazil-heatmap__tooltip.bottom::before`**: Styles the arrow at the top of the tooltip when it's positioned at the bottom. The arrow is created using CSS borders.

- **`.react-brazil-heatmap__tooltip.top::before`**: Styles the arrow at the bottom of the tooltip when it's positioned at the top.

- **`.react-brazil-heatmap__tooltip.right::before`**: Styles the arrow on the left side of the tooltip when it's positioned to the right.

- **`.react-brazil-heatmap__tooltip.left::before`**: Styles the arrow on the right side of the tooltip when it's positioned to the left.

**Note**: If you change the background color of the tooltips, you'll also need to update the arrow colors in the corresponding classes to match the new background.


### Legend
The legend component can be customized by overriding the following CSS classes:

- **`.react-brazil-heatmap__legend`**: Defines the overall appearance of the legend.

- **`.react-brazil-heatmap__legend .content-wrapper`**: Inherits layout properties from the parent legend class.

- **`.react-brazil-heatmap__legend .legend-header`**: Styles the header of the legend.

- **`.react-brazil-heatmap__legend .legend-body`**: Manages the layout of the legend's body, using flexbox to center content and defining font size and line height.

- **`.react-brazil-heatmap__legend .legend-item`**: Defines the layout of individual items within the legend.

- **`.react-brazil-heatmap__legend .legend-color`**: Styles the color indicators in the legend, setting their size, shape, and spacing.

## Contributing
We welcome contributions! If you have suggestions, bug reports, or want to add new features, please open an issue or submit a pull request.