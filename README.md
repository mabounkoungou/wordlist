# WordList App
### The WordList app is a React Native application that allows users to explore various words from different API endpoints and search for specific words. It provides a list of words obtained from external APIs and offers features such as filtering, searching, and changing the theme mode.

# Features
## Data Fetching: The app fetches data from several API URLs using Axios and presents the results in a sorted list.

## Greeting Message: Depending on the current time of the day, the app displays a greeting message: "Good morning," "Good afternoon," or "Good evening."

### Search Functionality: Users can search for specific words by entering a search query in the search input field. The app then filters the list of words to match the search query.

### Pull to Refresh: Users can refresh the word list by pulling down on the list, triggering a new data fetch from the APIs.

### Theme Mode Switching: The app supports both light and dark theme modes. Users can switch between these themes by tapping the "Switch to Dark Mode" or "Switch to Light Mode" button.

# Libraries Used
## The app utilizes the following libraries:

## React: The core library for building the user interface and managing component states.

## React Native: A framework for building cross-platform mobile applications using React.

## Axios: A library for making HTTP requests to fetch data from external APIs.

# Components
## The main component of the app is the WordList component, which is responsible for rendering the entire UI and managing the app's state. The following components are used within the WordList component:

### View: A container component used to group and style other components.

### FlatList: A component for efficiently rendering large lists of items. It displays the list of words obtained from the API.

### ActivityIndicator: A loading indicator that is shown while the data is being fetched from the APIs.

### TextInput: An input field for users to enter their search queries.

### TouchableOpacity: A button-like component that responds to user touches.

### Text: A component for displaying text.

### RefreshControl: A component that enables pull-to-refresh functionality on the word list.

# Styling
## The app uses StyleSheet to define various styles for its components. It supports both light and dark themes, altering the background colors, text colors, and button colors accordingly.

# Usage
## To use the WordList app, simply integrate the WordList component into your React Native application. Make sure to install the required libraries such as React, React Native, and Axios before running the app.

# Data Receiving API using Express
## This is a simple Express.js server that receives data sent to the /api/data endpoint via a POST request. The server uses the body-parser middleware to parse incoming JSON and URL-encoded data with increased size limits.



