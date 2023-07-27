// jest.config.js
export default function createConfig() {
    return {
      setupFilesAfterEnv: ['./jest.setup.js'],
      verbose: true,
      testEnvironment: 'jsdom',
    };
  }
  