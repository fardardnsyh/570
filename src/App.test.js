import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./pages/Index', () => () => <div data-testid="home-page">HomePage</div>);
jest.mock('./pages/Send', () => () => <div data-testid="send-page">SendMessagePage</div>);
jest.mock('./pages/Login', () => () => <div data-testid="login-page">LoginPage</div>);
jest.mock('./pages/PageNotFound404', () => () => <div data-testid="404-page">PageNotFound404</div>);

jest.useFakeTimers();

describe('App', () => {

  // Test splash screeen shows 
  test('renders SplashScreen initially', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const splashScreen = screen.getByAltText("truetalk-loader-img");
    expect(splashScreen).toBeInTheDocument();
  });

  // Test home page shows after splash screen is shown
  test('renders routes after loading', async () => {
    render(<App />);

    jest.advanceTimersByTime(2000); // Simulate loading time

    await waitFor(() => {
      const homePage = screen.queryByTestId('home-page');
      expect(homePage).toBeInTheDocument();
    });
  });

});
