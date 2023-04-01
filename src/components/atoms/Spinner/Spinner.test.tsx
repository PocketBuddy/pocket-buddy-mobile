import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import React from 'react';
import Spinner from './Spinner';
import { SpinnerSize } from 'types/components';
import { store } from '@/store';

describe('Spinner', () => {
  it('should render correctly with default values', () => {
    const component = (
      <Provider store={store}>
        <Spinner />;
      </Provider>
    );

    render(component);

    const spinner = screen.getByTestId('spinner');

    expect(spinner.props.size).toBe('small');
  });

  it('should render correctly when passed a number size', () => {
    const component = (
      <Provider store={store}>
        <Spinner size={100} />
      </Provider>
    );

    render(component);

    const spinner = screen.getByTestId('spinner');

    expect(spinner.props.size).toBe(100);
  });

  it('should render correctly when passed a string size', () => {
    const component = (
      <Provider store={store}>
        <Spinner size={SpinnerSize.Large} />
      </Provider>
    );

    render(component);

    const spinner = screen.getByTestId('spinner');

    expect(spinner.props.size).toBe('large');
  });
});
