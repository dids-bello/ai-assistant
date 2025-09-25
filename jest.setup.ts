import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock scrollIntoView for the chatbox auto scroll
window.HTMLElement.prototype.scrollIntoView = jest.fn();
