import * as React from 'react';
import {render} from 'react-native-testing-library';

import MapboxGL from '../MapboxGL';
import locationManager from '@react-native-mapbox-gl/maps/javascript/modules/location/locationManager';

// Used on UserLocation tests - identifying location change
const position = {
  coords: {
    accuracy: 9.977999687194824,
    altitude: 44.64373779296875,
    heading: 251.5358428955078,
    latitude: 51.5462244,
    longitude: 4.1036916,
    speed: 0.08543474227190018,
    course: 251.5358428955078,
  },
  timestamp: 1573730357879,
};

describe('MapView Test Suit', () => {

  // Mock initial position on locationManager in order to check if the change of position is recognized on UserLocation
  jest.spyOn(locationManager, 'start').mockImplementation(jest.fn());
  jest
    .spyOn(locationManager, 'getLastKnownLocation')
    .mockImplementation(() => position);

  jest.spyOn(locationManager, 'addListener');

  jest.spyOn(locationManager, 'removeListener');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Testing if the map is rendered
  test('renders with testID', () => {
    const expectedTestId = 'testId';
    const {getByTestId} = render(<MapboxGL.MapView testID={expectedTestId} />);

    expect(() => {
      getByTestId(expectedTestId);
    }).not.toThrowError();
  });

  // Testing Map Styles
  test('renders vectory source correctly', () => {
    const vectorSource = {
      type: 'vector',
      url: 'mapbox://mapbox.660ui7x6',
      tiles: ['http://host1', 'http://host2'],
      minzoom: 1,
      maxzoom: 22,
      attribution: 'Copyright',
      scheme: 'tms',
    };

    const json = {
      layers: [],
      sources: {
        vectorSource,
      },
    };

    const {UNSAFE_getByType} = render(<MapboxGL.Style json={json} />);
    const component = UNSAFE_getByType(MapboxGL.VectorSource);
    const {props} = component;

    expect(props.id).toStrictEqual(Object.keys(json.sources)[0]);
    expect(props.url).toStrictEqual(vectorSource.url);
    expect(props.tileUrlTemplates).toStrictEqual(vectorSource.tiles);
    expect(props.minZoomLevel).toStrictEqual(vectorSource.minzoom);
    expect(props.maxZoomLevel).toStrictEqual(vectorSource.maxzoom);
    expect(props.attribution).toStrictEqual(vectorSource.attribution);
    expect(props.tms).toBe(true);
  });

  // Testing the onUpdate is called when the location is changed
  test('calls onUpdate callback when new location is received', () => {
    const onUpdateCallback = jest.fn();

    render(<MapboxGL.UserLocation onUpdate={onUpdateCallback} />);

    locationManager.onUpdate({
      coords: {
        accuracy: 9.977999687194824,
        altitude: 44.64373779296875,
        heading: 251.5358428955078,
        latitude: 51.5462244,
        longitude: 4.1036916,
        speed: 0.08543474227190018,
        course: 251.5358428955078,
      },
      timestamp: 1573730357879,
    });

    expect(onUpdateCallback).toHaveBeenCalled();
  });

  // Camera tests
  test('Camera renders correctly', () => {
    const {getByTestId} = render(<MapboxGL.Camera />);
    expect(getByTestId('Camera')).toBeDefined();
  });
});

