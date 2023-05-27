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
import { useTheme } from '@/hooks';

type Props = {
  control: ControllerProps['control'];
  name: ControllerProps['name'];
  errorMessage?: ErrorMessageInput;
};

type RenderInputProps = {
  field: ControllerRenderProps<FieldValues, string>;
};

export default function InputAmount({ control, name, errorMessage }: Props) {
  const { Fonts, Layout, Gutters } = useTheme();
  const ref = useRef<TextInput>(null);

  const handleFocus = useCallback(() => {
    if (ref.current) {
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
          <View style={[Layout.row, Gutters.tinyGap]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
              style={[Fonts.titleLarge, errorMessage ? Fonts.textError : null]}
              textAlign="left"
              ref={ref}
              // TODO: get dot or comma based on user preferences
              placeholder="0,00"
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
