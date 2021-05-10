import { Dimensions, StyleSheet, Text, View, Image, TextInput, Button, Header } from 'react-native';
import React from 'react';

export default function HomeScreen({navigation}){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>go to Change Password</Text>
          <Button
            title="Go to ChangePassword!"
            onPress={() => navigation.navigate('ChangepassScreen')}
          />
          <Button
            title="Go to Register!"
            onPress={() => navigation.navigate('RegisterScreen')}
          />
          <Button
            title="Go to Login!"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Button
            title="Go to Dashboard!"
            onPress={() => navigation.navigate('DashboardScreen')}
          />
          <Button
            title="Go to LeaderBoard!"
            onPress={() => navigation.navigate('LeaderboardScreen')}
          />
        </View>
      );
}