import { useCallback, useEffect } from 'react';
import {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} from '@/services/modules/categories';
import { CategoriesSchema } from '@/schemas';
import { useForm } from '@/hooks';

type Props = {
  id?: number;
  handleClose: () => void;
};

const defaultValues = {
  id: null,
  name: '',
};

const TIME_TO_CLOSE = 1000;

export function useAddCategoryForm({ handleClose }: Omit<Props, 'id'>) {
  const { handleSubmit, reset, ...formProps } = useForm({
    defaultValues,
    validationSchema: CategoriesSchema.addCategory,
  });
  const [createCategory, { isSuccess, isError }] = useCreateCategoryMutation();

  useEffect(() => {
    handleClose();
    setTimeout(() => {
      reset({
        name: '',
      });
    }, TIME_TO_CLOSE);
  }, [isSuccess, isError]);

  const onSubmit = useCallback(
    () =>
      handleSubmit((values: Record<string, string>) => {
        createCategory({
          name: values.name,
        });
      })(),
    [],
  );

  return {
    onSubmit,
    resetAddCategoryForm: reset,
    ...formProps,
  };
}

export function useAddSubCategoryForm({ id, handleClose }: Props) {
  const { handleSubmit, reset, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: CategoriesSchema.addSubCategory,
  });
  const [createSubCategory, { isSuccess, isError }] =
    useCreateSubCategoryMutation();

  useEffect(() => {
    setValue('id', id);
  }, [id, formProps.errors]);

  useEffect(() => {
    handleClose();
    setTimeout(() => {
      reset({
        name: '',
      });
    }, TIME_TO_CLOSE);
  }, [isSuccess, isError]);

  const onSuccessSubmit = useCallback((values: Record<string, string>) => {
    createSubCategory({
      id: +values.id,
      name: values.name,
    });
  }, []);

  const onSubmit = useCallback(() => handleSubmit(onSuccessSubmit)(), []);

  return {
    onSubmit,
    resetAddSubCategoryForm: reset,
    ...formProps,
  };
}

export function useEditCategoryForm({
  id,
  name,
  handleClose,
}: Props & { name?: string }) {
  const { handleSubmit, reset, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: CategoriesSchema.editCategory,
  });
  const [editCategory, { isSuccess, isError }] = useEditCategoryMutation();

  useEffect(() => {
    setValue('id', id);
    setValue('name', name);
  }, [id, name]);

  useEffect(() => {
    handleClose();
    if (isError) {
      setTimeout(() => {
        reset({
          name: name,
        });
      }, TIME_TO_CLOSE);
    }
  }, [isSuccess, isError]);

  const onSubmit = useCallback(
    () =>
      handleSubmit((values: Record<string, string>) => {
        editCategory({
          id: +values.id,
          name: values.name,
        });
      })(),
    [],
  );

  return {
    onSubmit,
    ...formProps,
  };
}

export function useDeleteCategoryForm({ id, handleClose }: Props) {
  const { handleSubmit, setValue, ...formProps } = useForm({
    defaultValues,
    validationSchema: CategoriesSchema.deleteCategory,
  });
  const [deleteCategory, { isSuccess, isError }] = useDeleteCategoryMutation();

  useEffect(() => {
    setValue('id', id);
  }, [id]);

  useEffect(() => {
    handleClose();
  }, [isSuccess, isError]);

  const onSubmit = useCallback(
    () =>
      handleSubmit((values: Record<string, string>) => {
        deleteCategory({
          id: +values.id,
        });
      })(),
    [],
  );

  return {
    onSubmit,
    ...formProps,
  };
}
