export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_URL:
        process.env.NODE_ENV === 'development'
          ? 'http://192.168.1.14:5000/graphql'
          : 'http://localhost:8000/graphql',
    },
  };
};
