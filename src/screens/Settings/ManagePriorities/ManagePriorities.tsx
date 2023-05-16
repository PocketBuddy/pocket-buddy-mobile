import { FloatingButton, ManageListItem, ManagementList } from '@/components';
import ManagePrioritiesSheet from './ManagePrioritiesSheet';
import { PriorityModel } from 'types/models';
import React from 'react';
import useManagePriorities from './hooks/useManagePriorities';
import { useTheme } from '@/hooks';

export default function ManagePriorities() {
  const { Images } = useTheme();
  const { manageList, manageSheet } = useManagePriorities();

  return (
    <>
      <ManagementList
        data={manageList.priorities}
        isLoading={manageList.isLoading}
        isError={manageList.isError}
        renderFloatingButton={() => (
          <FloatingButton
            onPress={manageList.handleAdd}
            icon={Images.icons.plus}
          />
        )}
        renderItem={({ item }: { item: PriorityModel }) => (
          <ManageListItem
            title={item.name}
            handleEdit={() => manageList.handleEdit(item)}
            handleDelete={() => manageList.handleDelete(item)}
          />
        )}
      />
      <ManagePrioritiesSheet
        isOpen={manageSheet.isOpen}
        handleClose={manageSheet.close}
        sheetType={manageSheet.sheetType}
        priority={manageSheet.selectedPriority}
      />
    </>
  );
}
