import React from 'react';
import { Tabs } from 'expo-router';
import { Coffee, Feather, PlusCircle, BookOpen } from 'react-native-feather';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';

export default function AppLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'index') {
              icon = <Coffee stroke={color} width={size} height={size} />;
            } else if (route.name === 'coffee-list') {
              icon = <Feather stroke={color} width={size} height={size} />;
            } else if (route.name === 'add-coffee') {
              icon = <PlusCircle stroke={color} width={size} height={size} />;
            } else if (route.name === 'brew-guide') {
              icon = <BookOpen stroke={color} width={size} height={size} />;
            }

            return icon;
          },
          tabBarActiveTintColor: 'rgba(57, 44, 44, 0.88)',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 0,
            height: 85,
            paddingBottom: Platform.OS === 'ios' ? 30 : 15,
            paddingTop: 10,
          },
          tabBarLabelStyle: (props) => ({
            fontSize: 12,
            marginTop: 5,
            fontWeight: props.focused ? 'bold' : 'normal',
          }),
          tabBarIconStyle: {
            marginBottom: 3,
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: '首頁' }} />
        <Tabs.Screen name="coffee-list" options={{ title: '咖啡豆' }} />
        <Tabs.Screen name="add-coffee" options={{ title: '新增' }} />
        <Tabs.Screen name="brew-guide" options={{ title: '沖煮' }} />
      </Tabs>
    </View>
  );
}