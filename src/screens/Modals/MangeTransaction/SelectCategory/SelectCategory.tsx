import {
  allCategoriesSelector,
  subcategoriesByIdSelector,
} from '@/store/categories/selectors';
import {
  Chip,
  HorizontalList,
  Paragraph,
  Title,
  TitleInteractive,
} from '@/components';
import ManageCategoriesSheet, {
  CategoriesSheetType,
} from '@/screens/Settings/ManageCategories/ManageCategoriesSheet';
import React, { useCallback, useEffect, useState } from 'react';
import { useBottomSheet, useTheme } from '@/hooks';
import { CategoryModel } from 'types/models';
import { ErrorMessageInput } from 'types/components';
import { RootState } from '@/store';
import { useGetCategoriesQuery } from '@/services/modules/categories';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type Props = {
  setCategoryId: (id: number | null) => void;
  errorMessage?: ErrorMessageInput;
};

// TODO: move logic to hook
export default function SelectCategory({ setCategoryId, errorMessage }: Props) {
  const { t } = useTranslation(['selectCategory']);
  const { Gutters } = useTheme();
  const { isLoading, isError, refetch } = useGetCategoriesQuery({});
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryModel | undefined
  >();
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    CategoryModel | undefined
  >();
  const categories = useSelector(allCategoriesSelector);
  const subcategories = useSelector((state: RootState) =>
    subcategoriesByIdSelector(state)(selectedCategory?.id),
  );
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(0);
  const [sheetType, setSheetType] = useState<CategoriesSheetType>();
  const { open, close, isOpen } = useBottomSheet({});
  const [noCategoryError, setNoCategoryError] = useState<boolean>(
    !!errorMessage || false,
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setNoCategoryError(!!errorMessage);
  }, [errorMessage]);

  const handlePressCategory = useCallback(
    (item: CategoryModel, index: number) => {
      if (selectedCategory?.id === item.id) {
        setSelectedCategory(undefined);
        setCategoryId(null);
        return;
      }
      setSelectedCategory(item);
      setSelectedCategoryIndex(index);
      setCategoryId(item.id);
    },
    [selectedCategory],
  );

  const handlePressSubcategory = useCallback(
    (item: CategoryModel, index: number) => {
      if (selectedSubcategory?.id === item.id) {
        setSelectedSubcategory(undefined);
        setCategoryId(selectedCategory?.id || null);
        return;
      }
      setSelectedSubcategory(item);
      setSelectedSubcategoryIndex(index);
      setCategoryId(item.id);
    },
    [selectedSubcategory],
  );

  const handleAdd = useCallback(() => {
    setSheetType(CategoriesSheetType.add);
    open();
  }, []);

  const handleAddSub = useCallback(() => {
    setSheetType(CategoriesSheetType.addSub);
    open();
  }, []);

  useEffect(() => {
    setSelectedSubcategory(undefined);
    if (selectedCategory) {
      setNoCategoryError(false);
    }
  }, [selectedCategory]);

  const renderCategory = useCallback(
    ({ item, index }: { item: CategoryModel; index: number }) => {
      const isSelected = selectedCategory?.id === item.id;
      return (
        <Chip
          handlePress={() => handlePressCategory(item, index)}
          isSelected={isSelected}
          name={item.name}
        />
      );
    },
    [selectedCategory],
  );

  const renderSubcategory = useCallback(
    ({ item, index }: { item: CategoryModel; index: number }) => {
      const isSelected = selectedSubcategory?.id === item.id;
      return (
        <Chip
          handlePress={() => handlePressSubcategory(item, index)}
          isSelected={isSelected}
          name={item.name}
        />
      );
    },
    [selectedSubcategory],
  );

  return (
    <View style={[Gutters.tinyGap]}>
      <TitleInteractive
        renderTitle={() => (
          <Title text={t('selectCategory:category.title')} size="Small" />
        )}
        renderButton={() => (
          <Paragraph
            text={t('selectCategory:category.button')}
            onPress={handleAdd}
          />
        )}
      />
      <HorizontalList
        data={categories}
        renderItem={renderCategory}
        indexToScroll={selectedCategoryIndex}
        isLoading={isLoading}
        isError={isError}
      />
      {selectedCategory && (
        <>
          <TitleInteractive
            renderTitle={() => (
              <Title
                text={t('selectCategory:subcategory.title')}
                size="Small"
              />
            )}
            renderButton={() => (
              <Paragraph
                text={t('selectCategory:subcategory.button')}
                onPress={handleAddSub}
              />
            )}
          />
          <HorizontalList
            data={subcategories}
            renderItem={renderSubcategory}
            indexToScroll={selectedSubcategoryIndex}
          />
        </>
      )}
      {noCategoryError && (
        <Paragraph text={t('selectCategory:error')} isError />
      )}
      <ManageCategoriesSheet
        isOpen={isOpen}
        handleClose={close}
        sheetType={sheetType}
        category={selectedCategory}
      />
    </View>
  );
}
