# Pokedex

This is a Pokemon database that allows you to filter and search for Pokemon based on their category and name. You can also mark Pokemon as favorites and filter the list to show only your favorite ones. Additionally, you can identify a Pokemon by uploading an image or using your device's camera.

## Features

The Pokedex project provides the following features:

1. **Pokemon Database**: Browse through a comprehensive collection of Pokemon.
2. **Filtering**: Filter Pokemon by category or name to quickly find the ones you're interested in.
3. **Favorites**: Mark Pokemon as favorites to create a personalized list.
4. **Favorite Filtering**: View and filter the list to display only your favorite Pokemon.
5. **Image Identification**: Identify Pokemon by uploading an image or using your device's camera.

## Getting Started

To get started with the Pokedex project, follow these steps:

1. Clone the repository: `git clone https://github.com/myslirob/pokedex.git`
2. Navigate to the project directory: `cd pokedex`
3. Install the necessary dependencies: `yarn install`
4. Start the application: `yarn run dev`

## Usage

Once the application is running, you can access it through your web browser. The user interface allows you to perform various actions:

- **Filtering**: Use the filter options to narrow down the list of Pokemon based on their category or name.
- **Favorites**: Click on the star icon to mark a Pokemon as a favorite. The favorites can be viewed and filtered separately.
- **Image Identification**: You can identify a Pokemon using an image on both mobile devices and computers.
    - On Mobile Devices: Click on the camera icon to open the camera and capture an image of a Pokemon. The application will process the image and provide the identification results.
    - On Computers: Click on the camera icon and upload a Pokemon image from your computer. The application will analyze the image and provide the identification results.
## Available Scripts

- **dev**: Starts the development server using the command `next dev`. This script is intended for development purposes and allows you to quickly see changes in the application during development.
- **build**: Generates an optimized production build of the application using the command `next build`. This script is used before deploying the application to a production environment.
- **start**: Starts the production server using the command `next start`. This script is used to run the production version of the application.
- **export**: Generates static exports of the application using the command `next export`. This script is useful if you want to generate static HTML files for deployment to a static hosting service. Please note that you have to remove "next/image" component in application, before running the "export" script.
- **static**: Starts a server to serve static files from the "out" directory using the command `serve -l 3000 out`. This script is useful when testing the exported version of the application in a local environment.
- **check**: Runs code checking using the commands `yarn run check:cs` and `yarn run check:types`. This script is used to perform code syntax and type checking.
- **codegen**: Runs code generation based on the defined configuration in the `bin/codegen.ts` file. This script is likely used for generating code based on a GraphQL schema.

## Technologies Used

The Pokedex project utilizes the following technologies:

- **GraphQL**: A query language for APIs, used for efficient data retrieval.
- **Apollo Client**: A powerful GraphQL client for fetching and managing data in the client-side application.
- **Next.js**: A React framework for building server-rendered and statically generated applications.
- **Styled Components**: A CSS-in-JS library for styling React components with enhanced flexibility and readability.
- **React**: A JavaScript library for building user interfaces.
- **@tensorflow/tfjs**: A JavaScript library for training and deploying machine learning models in the browser or Node.js.

## Project Demo

Check out the project demo on YouTube: [Pokedex Demo](https://www.youtube.com/watch?v=Xq7dBypD6hU)
