import { render, screen } from '@testing-library/react-native';
import Brand from './Brand';
import { BrandMode } from 'types/components';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '@/store';

describe('Brand', () => {
  it('should render correctly with default values', () => {
    const component = (
      <Provider store={store}>
        <Brand />
      </Provider>
    );

    render(component);

    const wrapper = screen.getByTestId('brand-img-wrapper');
    const img = screen.getByTestId('brand-img');

    expect(wrapper.props.style.height).toBe(200);
    expect(wrapper.props.style.width).toBe(200);
    expect(img.props.resizeMode).toBe('contain');
  });

  it('should render correctly with overrides default values', () => {
    const component = (
      <Provider store={store}>
        <Brand height={100} width={100} mode={BrandMode.Repeat} />
      </Provider>
    );

    render(component);

    const wrapper = screen.getByTestId('brand-img-wrapper');
    const img = screen.getByTestId('brand-img');

    expect(wrapper.props.style.height).toBe(100);
    expect(wrapper.props.style.width).toBe(100);
    expect(img.props.resizeMode).toBe('repeat');
  });
});
