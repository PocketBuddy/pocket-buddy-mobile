import * as yup from 'yup';
import i18n from '@/translations';

// only positive numbers with 2 decimal places
const AMOUNT_REGEX = /^[0-9]+([.,][0-9]{1,2})?$/;

const transaction = yup.object({
  name: yup
    .string()
    .max(20, i18n.t('schemas:transactions.name.valid'))
    .required(i18n.t('schemas:transactions.name.required')),
  amount: yup
    .string()
    .required(i18n.t('schemas:transactions.amount.required'))
    .matches(AMOUNT_REGEX, i18n.t('schemas:transactions.amount.valid')),
  spentDate: yup
    .date()
    .required(i18n.t('schemas:transactions.spentDate.required')),
  categoryId: yup.number().required(),
  priorityId: yup.number().required(),
  // isPerpetual: yup.boolean(),
  // repeatedAt: yup.date().when('isPerpetual', {
  //   is: (isPerpetual: boolean) => console.log(isPerpetual),
  //   then: yup
  //     .date()
  //     .required(i18n.t('schemas:transactions.repeatedAt.required')),
  // }),
});

const deleteTransaction = yup.object({
  id: yup.number().required(),
});

export default {
  transaction,
  deleteTransaction,
};
