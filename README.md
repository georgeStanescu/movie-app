## Status regarding the full-stack technical test

This full-stack app is developed using the `Laravel+React` template.

On the front-end part, I've implemented the following tasks:

- Enabled React through `Inertia`.
- Configured `Typescript`.
- Added support for linting using `eslint`.
- Fetched data from backend based on a query string parameter, mapped the response to models and displayed the models using the `Material UI DataGrid` component. The component also supports sorting the displayed entries by several columns.
- Added a placeholder for the poster column in the DataGrid, in case an entry doesn't have a poster image.
- Added minimal UI responsiveness for the data grid using the `emotion/styled` approach.
- Used `React Context API` and the `useReducer` hook to manage the application state
- Added support for testing(using `jest`, `babel` and `react testing library`) and added few test samples.
- Added error handling using basic `error boundary` component.

On the back-end part, I've implemented the following tasks:
- Added the `MovieController` and a dedicated route for fetching movies based on a search term.
- Fetched movies from the external API.
- Used `Eloquent ORM` to store the movies in the `MySQL` database if they don't already exist.
- Added migrations to create two tables - `Movies` and `Posters` with the one-to-one relation on the movie ID column.
- Created a movie repository to handle the DB operations and configured dependency injection for it.
- Created a separate service to handle the HTTP requests to the `OMDB API` and configured dependency injection for it.
- Created sample unit tests for the `MovieController`.

