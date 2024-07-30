import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown, ChevronUp, Coffee } from 'react-native-feather';

const brewGuides = [
  {
    id: '1',
    method: '手沖咖啡',
    steps: [
      '準備器具：濾杯、濾紙、手沖壺、咖啡粉',
      '將濾紙放入濾杯並用熱水沖洗',
      '加入咖啡粉（通常15-18克）',
      '以螺旋方式注入60ml熱水（92-96°C），等待30秒讓咖啡膨脹',
      '慢慢注入剩餘的水，總量達到240ml',
      '等待所有水流過，取下濾杯即可享用'
    ]
  },
  {
    id: '2',
    method: '法壓壺',
    steps: [
      '將粗研磨的咖啡粉加入法壓壺（每200ml水使用12-15克咖啡粉）',
      '倒入92-96°C的熱水，攪拌均勻',
      '蓋上蓋子但不要下壓，靜置4分鐘',
      '緩慢而穩定地將濾網壓到底',
      '立即倒出咖啡享用'
    ]
  },
  {
    id: '3',
    method: '摩卡壺',
    steps: [
      '在下層注入冷水至安全閥位置',
      '在濾斗中加入細研磨的咖啡粉，不要壓實',
      '將三個部分擰緊',
      '放在中小火上加熱',
      '聽到咕嘟聲後，打開蓋子觀察',
      '當咖啡流出變淺黃色時，取下摩卡壺並用冷水降溫',
      '倒出咖啡即可享用'
    ]
  }
];

const BrewGuideItem = ({ method, steps }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.guideItem}>
      <TouchableOpacity style={styles.guideHeader} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.guideMethod}>{method}</Text>
        {expanded ? <ChevronUp stroke="#0075FF" width={24} height={24} /> : <ChevronDown stroke="#0075FF" width={24} height={24} />}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.guideSteps}>
          {steps.map((step, index) => (
            <Text key={index} style={styles.stepText}>{index + 1}. {step}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default function BrewGuideScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Coffee stroke="#0075FF" width={32} height={32} />
          <Text style={styles.title}>沖煮指南</Text>
        </View>
        {brewGuides.map((guide) => (
          <BrewGuideItem key={guide.id} method={guide.method} steps={guide.steps} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  guideItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  guideMethod: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  guideSteps: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  stepText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
});