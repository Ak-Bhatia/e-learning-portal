import * as React from 'react';
import { View, Text } from 'react-native';
import { Appbar} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

const MyComponent = (props) => {

    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');
  
    return (
      <Appbar.Header>
        {props.backBtn?<Appbar.BackAction onPress={props.goback} />: <Text></Text>}
        <Appbar.Content title={props.titleText}/>
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        <Appbar.Action icon="account" onPress={_handleMore} />
        <Appbar.Action icon="alert-octagon" onPress={_handleMore} />
        <Appbar.Action icon="dictionary" onPress={_handleMore} />
        <Appbar.Action icon="login-variant" onPress={_handleMore} />
      </Appbar.Header>
    );
  };

export default MyComponent;