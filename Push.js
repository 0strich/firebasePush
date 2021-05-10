import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotifService';

const Push = props => {
  const [registerToken, setRegisterToken] = useState(null);
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  const handlePerm = perms => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };

  const notif = new NotifService(onRegister, onNotif);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Example app react-native-push-notification
      </Text>
      <View style={styles.spacer}></View>
      <TextInput
        style={styles.textField}
        value={registerToken}
        placeholder="Register token"
      />
      <View style={styles.spacer}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => notif.localNotif()}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => notif.localNotif('sample.mp3')}>
        <Text>Local Notification with sound (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => scheduleNotif()}>
        <Text>Schedule Notification in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => scheduleNotif('sample.mp3')}>
        <Text>Schedule Notification with sound in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => cancelNotif()}>
        <Text>Cancel last notification (if any)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => cancelAll()}>
        <Text>Cancel all notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => notif.checkPermission(handlePerm)}>
        <Text>Check Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => requestPermissions()}>
        <Text>Request Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => abandonPermissions()}>
        <Text>Abandon Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getScheduledLocalNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console.Log Scheduled Local Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          getDeliveredNotifications(notifs => console.log(notifs))
        }>
        <Text>Console.Log Delivered Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createOrUpdateChannel()}>
        <Text>Create or update a channel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => popInitialNotification()}>
        <Text>popInitialNotification</Text>
      </TouchableOpacity>

      <View style={styles.spacer}></View>

      {fcmRegistered && <Text>FCM Configured !</Text>}

      <View style={styles.spacer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Push;