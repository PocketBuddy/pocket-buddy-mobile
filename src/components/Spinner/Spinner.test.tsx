import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import React from 'react';
import Spinner from './Spinner';
import { store } from '@/store';

describe('Spinner', () => {
  it('should render correctly', () => {
    const component = (
      <Provider store={store}>
        <Spinner />;
      </Provider>
    );

    render(component);

    const spinner = screen.getByTestId('spinner');

    expect(spinner.props.size).toBe(30);
  });
});
