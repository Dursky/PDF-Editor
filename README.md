### PDF Editor Mobile App

A mobile application built with React Native and TypeScript for viewing and editing PDF files. This project provides a simple interface to pick, view, and manipulate PDF documents.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

PDF Editor App is a mobile application that allows users to pick PDF files from their device, view them, and perform basic editing tasks such as adding blank pages. This project demonstrates the integration of several libraries to handle PDF operations in a React Native environment.

## Features

- **Pick PDF Files**: Choose PDF files from the device storage.
- **View PDF Files**: Display PDF files within the application.
- **Edit PDF Files**: Perform basic editing tasks like adding blank pages to PDF files.

## Technologies

- **React Native**: Framework for building native apps using React.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **React Navigation**: Routing and navigation for your React Native apps.
- **react-native-pdf-lib**: Library for creating and editing PDF documents.
- **react-native-file-viewer**: Library for viewing files in React Native.
- **react-native-document-picker**: Library for picking documents from the device.
- **react-native-fs**: File system library for React Native.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dursky/PDF-Editor.git
   cd pdf-editor-app
   ```

2. Install dependencies:

```bash
npm install
or
yarn install
```

### Running the App

1. Start the Metro bundler:

```bash
npx react-native start
```

2. Run the app on an Android emulator or a connected device:

```bash
npx react-native  run-android
```

Or run the app on iOS simulator:

```bash
npx react-native run-ios
```

### Usage

1. On the home screen, click the "Pick a PDF" button to select a PDF file from your device.
2. The selected PDF will be displayed on the next screen.
3. The PDF will be edited to add a blank page (this is just an example; you can extend the functionality further).

### Project Structure

```
PDF-Editor/
├── android/                 # Native Android code
├── ios/                     # Native iOS code
├── src/                     # Source code
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx   # Home screen
│   │   └── PdfEditorScreen.tsx # PDF editor screen
│   └── App.tsx              # Main app component
├── App.tsx                  # Entry point
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project README
```

### Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
