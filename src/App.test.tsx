import App from './App';
import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { store } from './store';

describe('App', () => {
  it('should renders correctly', () => {
    const component = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    render(component);

    expect(component).toBeDefined();
  });
});
