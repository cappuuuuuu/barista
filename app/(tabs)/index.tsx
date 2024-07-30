import React from 'react';
import { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, ImageBackground, Modal, Image } from 'react-native';
import { Coffee, Gift, Search } from 'react-native-feather';

const suggestedCoffees = [
  { 
    id: '1', 
    name: 'Espresso', 
    method: [
      '研磨新鮮咖啡豆',
      '將咖啡粉放入濾器中壓實',
      '使用9 bar壓力的熱水沖煮25-30秒',
      '提取約30ml的濃縮咖啡'
    ],
    image: require('@/assets/images/coffee/espresso.jpg')
  },
  { 
    id: '2', 
    name: 'Cappuccino', 
    price: '4.5',
    method: [
      '製作一杯濃縮咖啡',
      '蒸煮牛奶並製作奶泡',
      '將等量的濃縮咖啡、熱牛奶和奶泡分層倒入杯中',
      '可以在表面撒上可可粉裝飾'
    ],
    image: require('@/assets/images/coffee/cappuccino.jpg')
  },
  // ... 其他咖啡品項
];

const SuggestedCoffeeItem = ({ coffee, onPress }) => (
  <TouchableOpacity style={styles.suggestionItem} onPress={() => onPress(coffee)}>
    <Coffee stroke="#1F2937" width={24} height={24} />
    <Text style={styles.suggestionText}>{coffee.name}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCoffeePress = (coffee) => {
    setSelectedCoffee(coffee);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KeiSyou Barista</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Gift stroke="#1F2937" width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Search stroke="#1F2937" width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground
        source={require('../../assets/images/index-bg-11.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>每日咖啡報告</Text>
            <Text style={styles.cardText}>別忘了記錄今天的咖啡體驗！</Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>完成報告</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>今日推薦</Text>
            <FlatList
              style={styles.flatList}
              data={suggestedCoffees}
              renderItem={({ item }) => (
                <SuggestedCoffeeItem
                  coffee={item} 
                  onPress={handleCoffeePress}
                />
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>23</Text>
              <Text style={styles.statLabel}>本週沖煮</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>咖啡豆種類</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>平均評分</Text>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedCoffee && (
                <ScrollView>
                  <Text style={styles.detailTitle}>{selectedCoffee.name}</Text>
                  <Image source={selectedCoffee.image} style={styles.coffeeImage} resizeMode="cover"/>
                  {selectedCoffee.method.map((step, index) => (
                    <Text key={index} style={styles.methodStep}>
                      {index + 1}. {step}
                    </Text>
                  ))}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>關閉</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  backgroundImage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(57, 44, 44, 0.88))',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  flatList: {
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  suggestionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1F2937',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#686767',
  },
  statLabel: {
    fontSize: 12,
    color: '#1F2937',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  coffeeImage: {
    // width: '100%',
    // height: 200,
    // borderRadius: 10,
    // marginBottom: 16,
    width: '100%',
    height: 200,  // 你可以根據需要調整這個高度
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',  // 確保圖片不會超出圓角邊界
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  methodStep: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4a4a4a',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});