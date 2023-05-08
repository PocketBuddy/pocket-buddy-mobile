import React from 'react';
import { Spinner } from '@/components';

export default function ManagePriorities() {
  // const [userPriorities, { isLoading }] = useGetPrioritiesQuery({});
  // const priorities = useSelector(prioritiesSelector);

  // const renderSeparator = useCallback(() => <ListSeparator />, []);

  // useEffect(() => {
  //   !priorities.length && userPriorities({}).refetch();
  // }, [priorities, userPriorities]);

  // if (isLoading) {
  return <Spinner />;
  // }

  // return (
  //   <View>
  //     <FlatList
  //       data={priorities}
  //       keyExtractor={item => item.id.toString()}
  //       ItemSeparatorComponent={renderSeparator}
  //       renderItem={({ item }) => (
  //         <ManageListItem
  //           title={item.name}
  //           handleEdit={() => null}
  //           handleDelete={() => null}
  //         />
  //       )}
  //     />
  //   </View>
  // );
}
