import * as yup from 'yup';
import i18n from '@/translations';

const addCategory = yup.object({
  name: yup
    .string()
    .max(20, i18n.t('schemas:manageCategories.name.valid'))
    .required(i18n.t('schemas:manageCategories.name.required')),
});

const addSubCategory = addCategory.shape({
  id: yup.number().required(),
});

const editCategory = addSubCategory;

const deleteCategory = yup.object({
  id: yup.number().required(),
});

export default {
  addCategory,
  addSubCategory,
  editCategory,
  deleteCategory,
};
