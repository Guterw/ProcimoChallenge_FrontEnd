# Procimo Challenge Frontend
==========================

## Overview
### --------

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

## Project Components
### ------------------

### This project contains the following components:

-   Map
-   Networks
-   Stations
-   LocationMarker
-   CustomButton

## How to Run in Development
### -------------------------

### To run the project in development mode, follow these steps:

1.  Clone the repository: `git clone https://github.com/your-repo.git`
2.  Navigate to the project directory: `cd your-project-directory`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm start`
5.  Open your browser and navigate to `http://localhost:3000`

## How to Build for Production
### ---------------------------

### To build the project for production, follow these steps:

1.  Ensure you have already installed dependencies using `npm install`.
2.  Run the build command: `npm run build`
3.  Your optimized production build will be available in the `build` directory.

## How to Test
### -----------

Testing is an essential part of the development process. To run tests for this project, execute the following command:

`npm test`

## Dependencies
### ------------

### This project relies on the following dependencies:

-   ReactJS
-   Leaflet
-   react-leaflet

## Challenge Details
### -----------------

For detailed information about the challenge requirements, please refer to the "ProcimoChallenge_Frontend.pdf" document located in the root directory of this project