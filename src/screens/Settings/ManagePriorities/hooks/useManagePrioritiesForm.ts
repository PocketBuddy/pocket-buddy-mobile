import { useCallback, useEffect } from 'react';
import {
  useCreatePriorityMutation,
  useDeletePriorityMutation,
  useEditPriorityMutation,
} from '@/services/modules/priorities';
import { PrioritiesSchema } from '@/schemas';
import { PriorityModel } from 'types/models';
import { useForm } from '@/hooks';

type Props = {
  priority?: PriorityModel;
  handleClose: () => void;
};

const defaultValues = {
  id: null,
  name: '',
  priority: '',
};

const TIME_TO_CLOSE = 1000;

export function useAddPriorityForm({ handleClose }: Omit<Props, 'priority'>) {
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema: PrioritiesSchema.addPriority,
  });
  const [createPriority, { isSuccess, isError, isLoading }] =
    useCreatePriorityMutation();

  useEffect(() => {
    handleClose();
    setTimeout(() => {
      reset({
        name: '',
        priority: '',
      });
    }, TIME_TO_CLOSE);
  }, [isSuccess, isError]);

  const onSubmit = useCallback(
    () =>
      handleSubmit((values: Record<string, string>) => {
        createPriority({
          name: values.name,
          priority: +values.priority,
        });
      })(),
    [],
  );

  return {
    onSubmit,
    resetAddPriorityForm: reset,
    isLoading,
    ...formProps,
  };
}

export function useEditPriorityForm({ priority, handleClose }: Props) {
  const { handleSubmit, reset, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: PrioritiesSchema.editPriority,
  });
  const [editPriority, { isSuccess, isError, isLoading }] =
    useEditPriorityMutation();

  useEffect(() => {
    setValue('id', priority?.id || '');
    setValue('name', priority?.name || '');
    setValue('priority', String(priority?.priority) || '');
  }, [priority]);

  useEffect(() => {
    handleClose();
    if (isError) {
      setTimeout(() => {
        reset({
          name: priority?.name || '',
          priority: String(priority?.priority) || '',
        });
      }, TIME_TO_CLOSE);
    }
  }, [isSuccess, isError]);

  const onSubmit = useCallback(
    () =>
      handleSubmit((values: Record<string, string>) => {
        editPriority({
          id: +values.id,
          name: values.name,
          priority: +values.priority,
        });
      })(),
    [],
  );

  return {
    onSubmit,
    isLoading,
    ...formProps,
  };
}

export function useDeletePriorityForm({
  id,
  handleClose,
}: Omit<Props, 'priority'> & { id?: number }) {
  const { handleSubmit, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: PrioritiesSchema.deletePriority,
  });
  const [deletePriority, { isSuccess, isError, isLoading }] =
    useDeletePriorityMutation();

  useEffect(() => {
    setValue('id', id);
  }, [id]);

  useEffect(() => {
    handleClose();
  }, [isSuccess, isError]);

  const onSubmit = useCallback(
    () =>
      handleSubmit((values: Record<string, string>) => {
        deletePriority({
          id: +values.id,
        });
      })(),
    [],
  );

  return {
    onSubmit,
    isLoading,
    ...formProps,
  };
}
