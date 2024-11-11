# Crypto Gainers and Losers

A React Native mobile application that tracks cryptocurrency prices, showing the top 100 cryptocurrencies along with their gainers and losers in the last 24 hours.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/joao4xz/crypto_gainers_and_losers.git
cd crypto_gainers_and_losers
```

2. Install dependencies:

```bash
npm install
```

## Running the App

1. Start the development server:

```bash
npm run start
```

2. Choose your platform:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for web

## Building the App

### Setting up EAS Build

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to your Expo account:
```bash
eas login
```

### Building for Android

1. Create a development build:
```bash
eas build -p android --profile preview
```

2. Once the build is complete, download the APK from the provided URL

3. Install the APK using ADB:
```bash
adb install path/to/your/app.apk
```
## Resources

- [CoinPaprika API](https://api.coinpaprika.com/) for cryptocurrency data
- [Expo](https://expo.dev/) for the development framework
- [React Native](https://reactnative.dev/) for the mobile framework