jest.mock('../../src/config/logger', () => {
  return {
    logger: {
      debug: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
    }
  };
});
