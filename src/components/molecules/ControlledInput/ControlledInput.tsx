import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from 'react-hook-form';
import { Input, Paragraph } from '@/components';
import React, { useCallback } from 'react';
import { InputProps } from '../Input/Input';
import { ParagraphAlign } from 'types/components';

type Props = {
  control: ControllerProps['control'];
  name: ControllerProps['name'];
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
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
