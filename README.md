# react-brazil-heatmap

A React component for displaying a heatmap of Brazil. Ideal for visualizing data distribution across Brazilian states or regions.

## Features

- Easy integration with React applications
- Customizable colors and data input
- Interactive and responsive design
- Supports various data formats

## Installation

To install the package, use npm:

```bash
npm install react-brazil-heatmap
```

Or with yarn:

```bash
yarn add react-brazil-heatmap
```

## Usage

Here's a basic example of how to use the react-brazil-heatmap component in your React application:

```javascript
import React from 'react';
import BrazilHeatmap from 'react-brazil-heatmap';

const data = {
  "SP": 50,
  "RJ": 30,
  "MG": 20,
  // Add more states with corresponding values
};

function App() {
  return (
    <div className="App">
      <h1>Brazil Heatmap</h1>
      <BrazilHeatmap data={data} />
    </div>
  );
}

export default App;
```

## Props
## Props

The `react-brazil-heatmap` component accepts the following props:

| Prop     | Type     | Description                                      |
| -------- | -------- | ------------------------------------------------ |
| data     | object   | An object containing the data for each state.     |
| colors   | object   | An object specifying the colors for the heatmap.  |
| onClick  | function | A callback function triggered on state click.     |

Example usage:

```javascript
const data = {
    "SP": 50,
    "RJ": 30,
    "MG": 20,
    // Add more states with corresponding values
};

const colors = {
    "0": "#FFFFFF",
    "10": "#FF0000",
    "20": "#00FF00",
    "30": "#0000FF",
    // Add more color values for different data ranges
};

function handleStateClick(state) {
    console.log(`Clicked on ${state}`);
}

<BrazilHeatmap data={data} colors={colors} onClick={handleStateClick} />
```

Please note that the `data` prop should be an object where the keys represent the state abbreviations and the values represent the corresponding data values for each state. The `colors` prop should be an object where the keys represent the data ranges and the values represent the color codes for each range. The `onClick` prop should be a function that takes the clicked state as an argument.

## Contributing
We welcome contributions! If you have suggestions, bug reports, or want to add new features, please open an issue or submit a pull request.


## Customizing
- Se mudar a cor de fundo dos tooltips, é necessário mudar a cor das setas 

