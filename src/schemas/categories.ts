import * as yup from 'yup';

const addCategory = yup.object({
  name: yup
    .string()
    .max(20, 'schemas:manageCategories.name.valid')
    .required('schemas:manageCategories.name.required'),
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
