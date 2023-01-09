## Status regarding the full-stack technical test

This full-stack app is developed using the `Laravel+React` template. The back-end logic isn't yet implemented. I'm currently serving some test json objects through the `MovieController`.
On the front-end part I've implemented the following tasks:

- Enabled React through `Inertia`.
- Configured `Typescript`.
- Added support for linting using `eslint`.
- Fetched data from backend based on a query string parameter, mapped the response to models and displayed the models using the `Material UI DataGrid` component. The component also supports sorting the displayed entries by several columns.
- Added minimal UI responsiveness for the data grid using the `emotion/styled` approach.
- Used `React Context API` and the `useReducer` hook to manage the application state
- Added support for testing(using `jest`, `babel` and `react testing library`) and added few test samples.
- Added error handling using basic `error boundary` component.

The PHP backend requires more effort to implement, as I'm not familiar with `PHP/Laravel`. I've only focused on the front-end part for the moment.
