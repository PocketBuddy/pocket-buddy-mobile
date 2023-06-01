import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { ErrorMessageInput, ParagraphAlign } from 'types/components';
import { Paragraph, Title } from '@/components';
import React, { useCallback, useEffect, useRef } from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { decimalSeparatorSelector } from '@/store/preferences/selectors';
import { useSelector } from 'react-redux';
import { useTheme } from '@/hooks';

type Props = {
  control: ControllerProps['control'];
  name: ControllerProps['name'];
  errorMessage?: ErrorMessageInput;
  autoFocus?: boolean;
};

type RenderInputProps = {
  field: ControllerRenderProps<FieldValues, string>;
};

const MAX_LENGTH = 9;

export default function InputAmount({
  control,
  name,
  errorMessage,
  autoFocus = true,
}: Props) {
  const { Fonts, Layout, Gutters } = useTheme();
  const ref = useRef<TextInput>(null);
  const decimalSeparator = useSelector(decimalSeparatorSelector);

  const handleFocus = useCallback(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [ref]);

  useEffect(() => {
    handleFocus();
  }, []);

  const renderInput = useCallback(
    ({ field: { onBlur, onChange, value } }: RenderInputProps) => (
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={[Layout.center]}>
          <View
            style={[
              value.length < MAX_LENGTH ? Layout.row : Layout.colCenter,
              Gutters.tinyColumnGap,
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
              style={[Fonts.titleLarge, errorMessage ? Fonts.textError : null]}
              textAlign="left"
              ref={ref}
              placeholder={`0${decimalSeparator}00`}
              placeholderTextColor={Fonts.textPrimaryPlaceholder.color}
            />
            {/* TODO: get currency based on budget */}
            <Title text="EUR" size="Large" />
          </View>
          {errorMessage ? (
            <Paragraph
              text={errorMessage as string}
              isError
              align={ParagraphAlign.Center}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    ),
    [errorMessage, control],
  );

  return <Controller control={control} render={renderInput} name={name} />;
}
