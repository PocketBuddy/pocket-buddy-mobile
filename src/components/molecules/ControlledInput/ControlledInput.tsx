import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { ErrorMessageInput, ParagraphAlign } from 'types/components';
import { Input, Paragraph } from '@/components';
import React, { useCallback } from 'react';
import { InputProps } from '../Input/Input';

type Props = {
  control: ControllerProps['control'];
  name: ControllerProps['name'];
  errorMessage?: ErrorMessageInput;
} & Omit<InputProps, 'onChangeText'>;

type RenderInputProps = {
  field: ControllerRenderProps<FieldValues, string>;
};

export default function ControlledInput({
  control,
  name,
  errorMessage,
  ...props
}: Props) {
  const renderInput = useCallback(
    ({ field: { onBlur, onChange, value } }: RenderInputProps) => (
      <Input
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        renderMessage={() => {
          return errorMessage ? (
            <Paragraph
              text={errorMessage as string}
              isError
              align={ParagraphAlign.Right}
            />
          ) : null;
        }}
        {...props}
      />
    ),
    [errorMessage],
  );

  return <Controller control={control} render={renderInput} name={name} />;
}
