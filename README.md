# Luccas Procimo Challenge Frontend

## Overview

This project is part of the Procimo Tryout (frontend) challenge, where you will be building a web app using ReactJS to visualize geolocated data retrieved from the CityBikes API.

### Requirements

-   Build a Web App using ReactJS.
-   Fetch data from [CityBikes API](https://api.citybik.es/v2/), an API for Bike Sharing Data.
-   Show data on a map with 3 different layers:
    -   L1: Number of networks per country.
    -   L2: Number of stations per network.
    -   L3: Station details.
-   Allow the user to drill down from L1 to L3 by clicking on markers.
-   Allow the user to go back to the previous layer.

## Project Development:

### Planning Project with sprints in Trello:

In summary, this project was completed within a timeframe of 4 days, employing the Kanban organizational method with Trello for sprint management. Using Kanban allowed for a clear visualization of tasks, workflows, and progress throughout the development process. The Trello board was utilized to plan, organize, and track tasks, ensuring efficient project management and timely delivery. This approach facilitated collaboration and prioritization, enabling the project to progress smoothly from conception to completion within the specified timeframe.

<a href="https://trello.com/invite/b/CjfOe5el/ATTI6a1e24f6ce6b8509707c43f56d35d37b14EECC28/luccas-project-challenge" target="_blank">Click here for see the Trello Kanban Project of this project</a>

### ---------------------------------------------------
### Design

It's worth mentioning that a design prototype was created for this project, which served as a blueprint for the code implementation. You can view the design prototype in: <a href="https://www.figma.com/file/MEkhSQX0MSDIeMw6Iq41ih/Procimo_Challenge?type=design&node-id=0%3A1&mode=dev&t=qFhwZPMNzFyFHFtJ-1" target="_blank">Click here for see the Design Prototype of this project</a> to get a visual representation of how the final product was intended to look and function.

Following this design prototype ensured consistency and alignment between the visual representation and the implemented code. It helped in maintaining a cohesive user interface design, adhering to best practices in usability and user experience.

This design prototype served as a guide throughout the development process, ensuring that the final product meets the expectations set by the initial design concept.

## Coding:
## Dependencies

### This project relies on the following dependencies:

-   ReactJS
-   Leaflet
-   react-leaflet

### This project contains the following components:

- Map: The Map component is responsible for rendering the main map interface where all the geolocated data is visualized. It manages the display of different layers (Networks, Stations, etc.) and handles user interactions such as zooming and panning.

- Networks: The Networks component displays the number of bike sharing networks per country on the map. It fetches data from the CityBikes API and renders markers or overlays representing the networks' locations.

- Stations: The Stations component displays the number of bike sharing stations per network on the map. It fetches data from the CityBikes API and renders markers or overlays representing the stations' locations within each network.

- LocationMarker: The LocationMarker component represents the user's current location on the map. It may use browser geolocation APIs or user input to determine the user's location and display a marker accordingly.

- CustomButton: The CustomButton component provides customized buttons for user interactions within the map interface. These buttons may trigger actions such as switching between map layers, navigating through different views, or performing specific tasks related to the map's functionality.

All these components are rendered within the Map component, which serves as the main container for displaying and interacting with the geolocated data. The Map component itself is then rendered on the homepage of the application, providing users with access to the bike sharing data visualization.

## How to Run in Development

### To run the project in development mode, follow these steps:

1.  Clone the repository: `git clone https://github.com/Guterw/ProcimoChallenge_FrontEnd.git`
2.  Navigate to the project directory: `cd ProcimoChallenge_FrontEnd`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm start`
5.  Open your browser and navigate to `http://localhost:3000`

## How to Build for Production

### To build the project for production, follow these steps:

1.  Ensure you have already installed dependencies using `npm install`.
2.  Run the build command: `npm run build`
3.  Your optimized production build will be available in the `build` directory.

## How to Test

Testing is an essential part of the development process. To run tests for this project, execute the following command:

`npm test`

## Challenge Details

For detailed information about the challenge requirements, please refer to the "ProcimoChallenge_Frontend.pdf" document located in the root directory of this project