export default ({ config }) => ({
  ...config, // extend app.json
  extra: {
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY
  },
});