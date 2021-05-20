# React-Native - Mapbox-GL - EAS Generic Workflow

- By: [The Outbound Collective](https://www.theoutbound.com/)

This project demonstrates how to build an Expo project with native libraries using the new Expo EAS Build Service. 

The Expo EAS Build Service allows, among other things, the ability to build standalone applications using the [Expo bare workflow](https://docs.expo.io/bare/exploring-bare-workflow/).  In order to use native libraries with Expo, [you must currently eject your project](https://docs.expo.io/workflow/customizing/), creating iOS and Android build folders.

This project demonstrates that process using the [react-native-mapbox-gl](https://github.com/react-native-mapbox-gl/maps) library.

In order to use Mapbox GL, you will we need an access token. Sign up and create
one [here](https://account.mapbox.com/).

<img src="/assets/mapios.jpg" width="300" alt="Rendered Mapbox GL Map on the iOS Simulator">

---

 - [Requirements](#requirements)
     + [Android](#android)
     + [iOS](#android)
 - [Usage](#usage)
     + Clone the Repo
     + Install the Dependencies
     + Set your .env variables
 - [Build Instructions](#build-instructions)
     + Xcode
     + iOS Simulator
     + Android Simulator
     + [Expo EAS](#expo-eas)
        * [Install EAS CLI](#install-eas-cli)
        * [Login to EAS](#login-to-eas)
        * [Configure EAS Secrets](#configure-eas-secrets)
        * [Push a build](#push-a-build)
        * [Run a build](#run-a-build)
     + [Github Actions](#github-actions)
 - [Tutorial](#tutorial)
     + [Expo Setup](#expo-setup)
     + [Eject the Project](#eject-the-project)
     + [Install `react-native-mapbox-gl`](#install-react-native-mapbox-gl)
     + [Create the Templates](#create-the-templates)
     + [IOS Architectural Requirements](ios-architectural-requirements)
     + [Configuring EAS](#configuring-eas)
         * [Configure app.json](configure-app-json)
         * [Configure eas.json](configure-eas-json)
         * [Configure app.config.json](configure-app-config-json) 


---

## Requirements

- React Native > 0.6

### Android

- Mapbox supports from version 6 (API 23) upwardsCheck for the react-native-mapbox-gl requirements

### IOS

- Xcode > 12.0

## Usage

Clone the project:

`$ git clone git@github.com:getoutbound/expo-mapbox-gl.git`

Install the dependencies:

`$ cd expo-mapbox-gl; npm install`

Create an .env file and specify your Mapbox Token:

```
MAPBOX_API_KEY=<YOUR TOKEN>
```

If the map is not rendering, make sure you have the correct token set.

## Build Instructuctions

### Xcode:

Open ios/expomaplibre.xcworkspace in Xcode and choose 'build'.

### iOS Simulator:

Open up the terminal and run `yarn ios`, which is short-hand for `react-native run-ios`. You will need Xcode Tools installed.

### Android Simulator:

Install AndroidStudio, and configure and Android Emulator by using `tools` -> `avd manager`. Open the Android Emulator, and run `yarn android` from the terminal.

### EAS Build:

#### Install EAS CLI

If you don't have the EAS cli install it now.

`$ npm install -g eas-cli`

#### Login to EAS

Now log in to EAS. The EAS account must have the 'EAS priority plan' or be associated with an organization that has the 'EAS priority plan', and the project owner must be that user or organization, otherwise you will get a login or build error.

`$ eas login`

#### Configure EAS Secrets

In order to build our project on EAS, we need to configure EAS Secrets to store the required environment variables. Log into EAS:

- Select 'Secrets'
- Click on 'Create'
- On secret Name, type `MAPBOX_API_KEY`
- On secret Value, type `YOUR MAPBOX API TOKEN`
- Click on 'Create New Secret'

#### Push a build

Build for the platform want: 

  * IOS: `eas build -p ios --profile preview `
  * Android: `eas build -p android --profile preview`

If everything goes ok, the build will be available for downloading on the 'Builds' area of your EAS dashboard account. 

#### Run the build

One way to test the IOS build is to download it and dragging it into the simulator.

On Android, there will be a .apk file available for downloading and testing.

### Github Actions

A Github Actions workflow is included to run the test suite and push a build to EAS.  To do so:

- Generate an EAS Access Token by logging into EAS and choosing "Access Tokens" > "Create" From Settings.
- Add the EAS Access Token as the Github Secret, `EXPO_TOKEN`, in the repositories settings.

All new builds commits to main, or pull requests to main, will run the test suite, and all green builds will push a build to EAS.

## Tutorial

The following is a step by step guide to creating and building an Expo project with native libraries using Expo's EAS Build Service. We will create and eject the expo project, import [react-native-mapbox-gl](https://github.com/react-native-mapbox-gl/maps) and configure EAS to build the project.

### Expo Setup

First, we are going to initialize a project with Expo.

If you don't have `expo cli` installed, install it now:

```
npm install -g expo-cli
```

With `expo cli` installed, start and eject the expo project.

```
expo init <projectName>
```

For this project, we chose the 'blank' option: 'a minimal app as clean as an empty canvas'.

### Eject the Project

In order to use native libraries not included in the Mapbox SDK, we need to eject our application and use the [bare workflow](https://docs.expo.io/bare/exploring-bare-workflow/) project in order to create Android and iOS build folders. That way we are able to configure third party libraries.

Enter the project folder and eject the project:

```
cd <projectName> && expo eject
```

Expo will ask you to set the IOS Bundle Identifies and the Android package.
 
### Install `react-native-mapbox-gl`

At this point, you should have an ejected expo project and will be ready to install native libraries.  Lets install @react-native-mapbox-gl now.

```
npm install @react-native-mapbox-gl/maps --save
```

### @react-native-mapbox-gl Configuration

In order to build an iOS and Android project with @react-native-mapbox-gl we must make some platform build configurations [IOS](https://github.com/react-native-mapbox-gl/maps/blob/master/ios/install.md) and/or [Android](https://github.com/react-native-mapbox-gl/maps/blob/master/android/install.md).

### Create the Templates

1. Create a file named `MapboxGL.js` on the root of the project, with the following content:

```javascript
// MapboxGL.js
import * as React from 'react';
import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import Config from "react-native-config";

let MapboxGL;

if (Constants.appOwnership === 'expo') {
  MapView = props => (
    <View
      style={[
        {
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      <Text>🗺 (Mapbox not available)</Text>
    </View>
  );
} else {
  const Mapbox = require('@react-native-mapbox-gl/maps').default;
  Mapbox.setAccessToken(Constants?.manifest?.extra?.MAPBOX_API_KEY || Config?.MAPBOX_API_KEY);
  MapboxGL = Mapbox
}

export default MapboxGL;
```

Replace the content of App.js with the following: 

```javascript
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import MapboxGL from './MapboxGL';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.UserLocation visible={true} />
        <MapboxGL.Camera
          zoomLevel={16}
          followUserMode={'normal'}
          followUserLocation
        />
      </MapboxGL.MapView>
      <StatusBar style="default" />
    </View>
  );
}
```

### Set your Local Environment Variables

Diferent from EAS Secrets - used along with the EAS Built App (configured on `Configure EAS Secrets`) - we need to set the `.env` file in order to set our local environment variables. Environment variables are used, for example, to set the mapbox `token` and render the map without the need of hardcoding the `token` on the code. For that, we are going to use react-native-config. Let's install it:

```
npm install react-native-config
```

```
react-native link react-native-config
```

On IOS, we need to install the pods also:

```
cd ios && pod install
```

Now, to set the environment variables, create a file named `.env` on the root of the project, and set your token there:

```
MAPBOX_API_KEY=<YOUR TOKEN>
```

### IOS Architectural Requirements

The library react-native-mapbox-gl doesn't support `arm64` architecture for simulator builds. Therefore, on Xcode, we are going to exclude this architecture from the configurations.

Open the `ios/<projectName>.xcworkspace` on Xcode and, to exclude arm64 for the architectures, add `arm64` to all the available options for excluding architectures, as the image below:

![alt text](/assets/xcode_arm64.jpg "ExcludedArm64")

#### Configuring EAS

In order to build a project on EAS, you must be [enrolled in the EAS Priority Plan](https://expo.io/signup), and configure `app.json` with the appropriate slug and owner (user or organization.

#####  Configure `app.json`

```json
    "slug": "expomapboxgl",
    "owner": "projectowner",
    ...
```

#####  Configure `eas.json`

On the `eas.json` file, we will configure our build platforms. Given we have ejected our project and are using the bare workflow, we must set the worklow to 'generic' instead of 'managed'. We have created a 'preview' platform targeting the simulator for iOS distribution.

```json
{
  "builds": {
    "ios": {
      "preview": {
        "workflow": "generic",
        "distribution": "simulator"
      }
    },
    "android": {
      "preview": {
        "workflow": "generic",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  }
}
...
```

#####  Configure `app.config.json`

In order to pull ENV variables into our build process we must customize `app.config.json`:

```javascript
export default ({ config }) => ({
  ...config, // extend app.json
  extra: {
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY
  },
});
```

At this point, your project should be ready to follow the [Build Instructions](build-instructions) above.

Congratulations! You built an Expo project with native libraries.


If you don't have the EAS cli install it now.

`$ npm install -g eas-cli`

### Login to EAS

Now log in to EAS. The EAS account must have the 'EAS priority plan' or be associated with an organization that has the 'EAS priority plan', and the project owner must be that user or organization, otherwise you will get a login or build error.

`$ eas login`

### Configure EAS Secrets

In order to build our project on EAS, we need to configure EAS Secrets to store the required environment variables. Log into EAS:

- Select 'Secrets'
- Click on 'Create'
- On secret Name, type `MAPBOX_API_KEY`
- On secret Value, type `YOUR MAPBOX API TOKEN`
- Click on 'Create New Secret'

Alternatively, you can [set ENV variables in  `eas.json`](https://docs.expo.io/build-reference/variables/), which is useful to testing and debugging.

```json
...
"ios": {
  "preview": {
    "workflow": "generic",
    "distribution": "simulator",
    "env": {
      " MAPBOX_API_KEY": "YOUR MAPBOX TOKEN"
    }
  }
}
...
```

### Push a build

Build for the platform want: 

  * IOS: `eas build -p ios --profile preview `
  * Android: `eas build -p android --profile preview`

If everything goes ok, the build will be available for downloading on the 'Builds' area of your EAS dashboard account. 

### Run the build

One way to test the IOS build is to download it and dragging it into the simulator.

On Android, there will be a .apk file available for downloading and testing.

### Testing

There is a set of 4 tests developed in order to test the current features:

- MapView (testing if the map was rendered)
- UserLocation (testing if the user location is properly tracked/updated)
- Styles (testing if vector styles are loaded properly)
- Camera (testing if Camera is loaded properly)

For testing, we should run the following command:

```
yarn run test
```

Test suite located on: `__tests__/MapboxGL.test.js`

### Troubleshooting

- If the map is not rendering, make sure you have the correct token set.
