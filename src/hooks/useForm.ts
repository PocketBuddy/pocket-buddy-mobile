import * as yup from 'yup';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

type Props = {
  validationSchema: yup.ObjectSchema<any>;
  defaultValues: Record<string, any>;
};

export default function useForm({ validationSchema, defaultValues }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useReactHookForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return {
    control,
    errors,
    handleSubmit,
    reset,
  };
}
