import * as yup from 'yup';

// only positive numbers
const PRIORITY_REGEX = /^[0-9]+$/;

const addPriority = yup.object({
  name: yup
    .string()
    .max(20, 'schemas:manageCategories.name.valid')
    .required('schemas:manageCategories.name.required'),
  priority: yup
    .string()
    .required('schemas:managePriorities.priority.required')
    .matches(PRIORITY_REGEX, 'schemas:managePriorities.priority.valid'),
});

const editPriority = addPriority.shape({
  id: yup.number().required(),
});

const deletePriority = yup.object({
  id: yup.number().required(),
});

export default {
  addPriority,
  editPriority,
  deletePriority,
};
