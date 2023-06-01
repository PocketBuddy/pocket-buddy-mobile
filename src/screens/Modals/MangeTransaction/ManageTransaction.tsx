import { Button, ControlledInput, Form } from '@/components';
import { ButtonType } from 'types/components';
import { getTranslate } from '@/utils';
import InputAmount from './InputAmount/InputAmount';
import React from 'react';
import SelectCategory from './SelectCategory/SelectCategory';
import SelectDate from './SelectDate/SelectDate';
import SelectPriority from './SelectPriority/SelectPriority';
import useAddTransactionForm from './useAddTransactionForm';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function MangeTransaction() {
  const { t } = useTranslation(['mangeTransaction']);
  const { Colors, Gutters, Layout } = useTheme();
  const navigation = useNavigation();
  const {
    form,
    isLoading,
    onSubmit,
    setCategoryId,
    setPriorityId,
    setSpentDate,
  } = useAddTransactionForm();

  return (
    <View
      style={[
        Layout.fill,
        Gutters.tinyPadding,
        { backgroundColor: Colors.background },
      ]}
    >
      <Form
        renderInputs={() => (
          <View style={[Gutters.largeRowGap]}>
            <View>
              <InputAmount
                control={form.control}
                name="amount"
                errorMessage={getTranslate(form.errors.amount?.message)}
              />
            </View>
            <View style={[Gutters.tinyGap]}>
              <View>
                <ControlledInput
                  name="name"
                  control={form.control}
                  label={t('name.label')}
                  placeholder={t('name.placeholder')}
                  errorMessage={getTranslate(form.errors.name?.message)}
                />
              </View>
              <SelectCategory
                setCategoryId={setCategoryId}
                errorMessage={form.errors.categoryId?.message}
              />
              <SelectPriority
                setPriorityId={setPriorityId}
                errorMessage={form.errors.priorityId?.message}
              />
              <SelectDate
                title={t('spentDate.title')}
                setDate={setSpentDate}
                passedDate={form.control._defaultValues.spentDate}
              />
              {/* TODO: add perpetual transaction when backend will be ready */}
              {/* <View style={[Gutters.tinyGap]}>
                <TitleInteractive
                  renderTitle={() => (
                    <Title text="Is perpetual?" size="Small" />
                  )}
                  renderButton={() => (
                    <Switch
                      trackColor={{
                        false: Colors.primaryPlaceholder,
                        true: Colors.primary,
                      }}
                      thumbColor={Colors.secondary}
                      ios_backgroundColor={Colors.primary}
                      style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  )}
                />
                {isEnabled && <SelectDate title="Select perpetual date" />}
              </View> */}
            </View>
          </View>
        )}
        renderButtons={() => (
          <>
            <Button
              label={t('buttons.create')}
              onPress={onSubmit}
              isLoading={isLoading}
            />
            <Button
              label={t('buttons.cancel')}
              onPress={() => navigation.goBack()}
              type={ButtonType.Secondary}
            />
          </>
        )}
      />
    </View>
  );
}
