# Global News React Native Application

A mini mobile application using the Global News API to fetch and display news articles. This project is intended for showcasing skills in mobile development, UI/UX design, and React Native with Android native methodologies.

## Demo

Insert gif or link to demo

## Features

- **Splash Screen:** An attractive splash screen that appears when the application is launched.
- **User Authentication:**
  - **Normal Login:** Basic login system using email and password.
  - **Google Login:** Login using Google authentication.
- **News Searching:** Search for news articles using keywords.
- **Sorting:** Options to sort news articles by date, relevance, etc.
- **News Categories:** Display news articles based on categories such as Technology, Sports, and Business.
- **Bookmarking:** Users can bookmark their favorite articles for easy access.
- **Push Notifications:** Users receive notifications about new and important news articles.

## Screens

1. **Splash Screen:** Displayed on app launch.
2. **Login Screen:** Allows user login with email/password or Google account.
3. **Home Screen:** Displays the latest news articles.
4. **Search Component:** Users can search for news articles.
5. **Category Screen:** Displays articles filtered by category.
6. **Article Detail Screen:** Displays the full content of a selected news article.
7. **Bookmarks Screen:** Lists all bookmarked articles.

## Technical Stack

- **Framework:** React Native
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation
- **API:** Axios for networking with the Global News API
- **Authentication:** Firebase Authentication for email/password and Google Sign-In 
- **Database:** Firebase Cloud Firestore

## Architecture

- **Pattern:** MVVM (Model-View-ViewModel)
- **State Management:** Redux for state management

## Native Integration

- **Note:** Android native methodologies (e.g., Fragments) were planned but are not implemented in this version. Future updates may include these features.

## Unimplemented Features

- **Offline Access:** Caching of news articles for offline reading is not supported in this version.
- **Native Integration (Fragments):** Not implemented.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/limiRatnayake/GlobalNewsApp.git
   cd GlobalNewsApp

2. **Install dependencies using Yarn:**
   ```bash
   yarn install

3. **Connect your device or emulator:**
   Ensure that your Android device is connected or your emulator is running.

4. **Run the application:**
  ```bash 
  adb reverse tcp:8081 tcp:8081
yarn start 
```

