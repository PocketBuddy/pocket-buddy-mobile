import * as yup from 'yup';
import i18n from '@/translations';

// only positive numbers
const PRIORITY_REGEX = /^[0-9]+$/;

const addPriority = yup.object({
  name: yup
    .string()
    .max(20, i18n.t('schemas:manageCategories.name.valid'))
    .required(i18n.t('schemas:manageCategories.name.required')),
  priority: yup
    .string()
    .required(i18n.t('schemas:managePriorities.priority.required'))
    .matches(PRIORITY_REGEX, i18n.t('schemas:managePriorities.priority.valid')),
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
