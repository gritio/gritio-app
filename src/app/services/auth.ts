const IS_DEV_MODE = import.meta.env.VITE_USE_MOCK_TOKEN === 'true';

export const getToken = async (): Promise<string | null> => {
  if (IS_DEV_MODE) {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbXA4bXdreXYwMDAwMjJsZHc2Mjl3amdvIiwiZW1haWwiOiJzb3dteWFzbml5ZXJAZ21haWwuY29tIiwiaWF0IjoxNzc4OTU1MDk0LCJleHAiOjE3ODE1NDcwOTR9.O-uFPpu258S7bL_0d9g6a9ZGCWAVQqTUEEQFrGEdoj0';
  }
  return localStorage.getItem('authToken');
};
