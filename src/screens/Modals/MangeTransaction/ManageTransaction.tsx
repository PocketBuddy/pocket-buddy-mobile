import { Button, ControlledInput, Form, TabBarIcon } from '@/components';
import { Constants, getTranslate } from '@/utils';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNetworkError, useTheme } from '@/hooks';
import { ButtonType } from 'types/components';
import InputAmount from './InputAmount/InputAmount';
import SelectCategory from './SelectCategory/SelectCategory';
import SelectDate from './SelectDate/SelectDate';
import SelectPriority from './SelectPriority/SelectPriority';
import useManageTransactionForm from './useManageTransactionForm';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

type Props = {
  route: {
    params: {
      transactionId: number;
    };
  };
};

export default function MangeTransaction({ route }: Props) {
  const { t } = useTranslation(['mangeTransaction']);
  const { Colors, Gutters, Layout, Images } = useTheme();
  const navigation = useNavigation();
  const transactionId = route.params?.transactionId || null;
  const { isNetworkError } = useNetworkError();
  const {
    form,
    isLoading,
    defaultValues,
    onSubmit,
    onDelete,
    setCategoryId,
    setPriorityId,
    setSpentDate,
  } = useManageTransactionForm({ transactionId });

  const renderRightHeaderIcon = useCallback(
    () => (
      <TouchableOpacity
        style={[Gutters.tinyRMargin, Layout.rotate90]}
        onPress={onDelete}
      >
        <TabBarIcon
          icon={Images.icons.xMark}
          focused
          size={Constants.HEADER_ICON_SIZE}
        />
      </TouchableOpacity>
    ),
    [onDelete],
  );

  React.useEffect(() => {
    if (transactionId) {
      navigation.setOptions({
        headerRight: renderRightHeaderIcon,
      });
    }
  }, [transactionId]);

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
                autoFocus={!transactionId}
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
                passedCategoryId={defaultValues.expenseCategoryId || undefined}
                isNetworkError={isNetworkError}
              />
              <SelectPriority
                setPriorityId={setPriorityId}
                errorMessage={form.errors.priorityId?.message}
                passedPriorityId={defaultValues.expensePriorityId || undefined}
                isNetworkError={isNetworkError}
              />
              <SelectDate
                title={t('spentDate.title')}
                setDate={setSpentDate}
                passedDate={new Date(defaultValues.spentDate)}
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
              label={transactionId ? t('buttons.edit') : t('buttons.create')}
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
