import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import Button from './Button';
import { Constants } from '@/utils';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '@/store';

const mockedFunction = jest.fn();
const TIMEOUT = 100;
const DELAY = 500;

describe('Button', () => {
  it('should avoid multiple click', () => {
    const component = (
      <Provider store={store}>
        <Button label="test" onPress={mockedFunction} />
      </Provider>
    );

    render(component);

    const button = screen.getByTestId('button');

    waitFor(() => fireEvent.press(button), { timeout: TIMEOUT });
    waitFor(() => fireEvent.press(button), { timeout: TIMEOUT });

    waitFor(() => expect(mockedFunction).toBeCalledTimes(1), {
      timeout: Constants.DEBOUNCE_TIMEOUT + DELAY,
    });
  });

  it('should not call onPress function when button is disabled', () => {
    const component = (
      <Provider store={store}>
        <Button label="test" onPress={mockedFunction} disabled />
      </Provider>
    );

    render(component);

    const button = screen.getByTestId('button');

    fireEvent.press(button);

    expect(mockedFunction).not.toBeCalled();
  });
});
