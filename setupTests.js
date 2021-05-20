jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  function MockEventEmitter() {}
  MockEventEmitter.prototype.addListener = jest.fn(() => ({remove: jest.fn()}));
  MockEventEmitter.prototype.removeListener = jest.fn();
  return MockEventEmitter;
});