import {
  FloatingButton,
  ListSeparator,
  ManageListItem,
  ManagementList,
} from '@/components';
import React, { useCallback } from 'react';
import { CategoryModel } from 'types/models';
import ManageCategoriesSheet from './ManageCategoriesSheet';
import { FlatList as NestedFlatList } from 'react-native-gesture-handler';
import useManageCategories from './hooks/useManageCategories';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

export default function ManageCategories() {
  const { Gutters, Images } = useTheme();
  const { manageList, manageSheet } = useManageCategories();
  const renderSeparator = useCallback(() => <ListSeparator />, []);

  return (
    <>
      <ManagementList
        data={manageList.categories}
        isLoading={manageList.isLoading}
        isError={manageList.isError}
        renderFloatingButton={() => (
          <FloatingButton
            onPress={manageList.handleAdd}
            icon={Images.icons.plus}
          />
        )}
        renderItem={({ item }: { item: CategoryModel }) =>
          item.subcategories.length ? (
            <>
              <ManageListItem
                title={item.name}
                handleAdd={() => manageList.handleAddSub(item)}
                handleEdit={() => manageList.handleEdit(item)}
                handleDelete={() => manageList.handleDelete(item)}
              />
              <ListSeparator />
              <NestedFlatList
                data={item.subcategories}
                ItemSeparatorComponent={renderSeparator}
                keyExtractor={subItem => subItem.id.toString()}
                renderItem={({ item: subItem }) => (
                  <View style={Gutters.tinyLMargin}>
                    <ManageListItem
                      title={subItem.name}
                      isSubItem
                      handleEdit={() => manageList.handleEdit(subItem)}
                      handleDelete={() => manageList.handleDelete(subItem)}
                    />
                  </View>
                )}
              />
            </>
          ) : (
            <ManageListItem
              title={item.name}
              handleAdd={() => manageList.handleAddSub(item)}
              handleEdit={() => manageList.handleEdit(item)}
              handleDelete={() => manageList.handleDelete(item)}
            />
          )
        }
      />
      <ManageCategoriesSheet
        isOpen={manageSheet.isOpen}
        handleClose={manageSheet.close}
        sheetType={manageSheet.sheetType}
        category={manageSheet.selectedCategory}
      />
    </>
  );
}
