import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '@testing-library/jest-dom';

// Clean up after each test
afterEach(() => {
  cleanup();
});
