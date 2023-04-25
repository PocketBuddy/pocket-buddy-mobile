import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNames } from '@/navigators/routes';
import { useLogoutMutation } from '@/services/modules/auth/logout';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export default function Settings({ navigation }: Props) {
  const [logoutMutation, { isSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: StackNames.start }],
      });
    }
  }, [isSuccess]);

  // TODO: create Settings screen
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={async () => {
          await logoutMutation({});
        }}
      >
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
