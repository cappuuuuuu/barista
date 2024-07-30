import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Coffee, Search, Star } from 'react-native-feather';
import { NativeModules } from 'react-native';

const { CloudKitModule } = NativeModules;

const CoffeeItem = ({ name, origin, roastLevel, rating }) => (
  <View style={styles.coffeeItem}>
    <Coffee stroke="#0075FF" width={24} height={24} />
    <View style={styles.coffeeInfo}>
      <Text style={styles.coffeeName}>{name}</Text>
      <Text style={styles.coffeeDetails}>{origin} · {roastLevel}</Text>
    </View>
    <View style={styles.ratingContainer}>
      <Star fill="#FFD700" stroke="#FFD700" width={16} height={16} />
      <Text style={styles.ratingText}>{rating || 'N/A'}</Text>
    </View>
  </View>
);

export default function CoffeeListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetchCoffees();
  }, []);

  const fetchCoffees = async () => {
    try {
      const fetchedCoffees = await CloudKitModule.fetchCoffees();
      setCoffees(fetchedCoffees);
    } catch (error) {
      console.error('Failed to fetch coffees:', error);
    }
  };

  const filteredCoffee = coffees.filter(coffee => 
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coffee.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>咖啡豆清單</Text>
      </View>
      <View style={styles.searchContainer}>
        <Search stroke="#9CA3AF" width={20} height={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜尋咖啡豆..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredCoffee}
        renderItem={({ item }) => <CoffeeItem {...item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  listContainer: {
    padding: 16,
  },
  coffeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coffeeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  coffeeDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});