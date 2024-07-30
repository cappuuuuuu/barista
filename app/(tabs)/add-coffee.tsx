import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Coffee, ChevronLeft } from 'react-native-feather';
import { useRouter } from 'expo-router';
import { NativeModules } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { CloudKitModule } = NativeModules;

const roastLevels = ['淺焙', '中淺焙', '中焙', '中深焙', '深焙'];

export default function AddCoffeeScreen() {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [roastLevel, setRoastLevel] = useState(roastLevels[0]);
  const [grindSize, setGrindSize] = useState('');
  const [waterTemperature, setWaterTemperature] = useState('');
  const [coffeeAmount, setCoffeeAmount] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !origin) {
      Alert.alert('錯誤', '請填寫所有必填欄位');
      return;
    }

    // 驗證數字輸入
    if (grindSize && (isNaN(grindSize) || grindSize < 1 || grindSize > 10)) {
      Alert.alert('錯誤', '研磨度應為1-10之間的數字');
      return;
    }
    if (waterTemperature && (isNaN(waterTemperature) || waterTemperature < 0 || waterTemperature > 100)) {
      Alert.alert('錯誤', '水溫應為0-100之間的數字');
      return;
    }
    if (coffeeAmount && (isNaN(coffeeAmount) || coffeeAmount < 0)) {
      Alert.alert('錯誤', '研磨克數應為正數');
      return;
    }

    try {
      await CloudKitModule.saveCoffee({
        name,
        origin,
        roastLevel,
        grindSize: grindSize ? parseInt(grindSize) : null,
        waterTemperature: waterTemperature ? parseFloat(waterTemperature) : null,
        coffeeAmount: coffeeAmount ? parseFloat(coffeeAmount) : null,
        notes,
      });
      Alert.alert('成功', '新的咖啡豆已添加', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('錯誤', '無法保存咖啡豆數據');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft stroke="#0075FF" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.title}>新增咖啡豆</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>咖啡豆名稱 *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="例如：巴西黃波旁"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>產地 *</Text>
            <TextInput
              style={styles.input}
              value={origin}
              onChangeText={setOrigin}
              placeholder="例如：巴西"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>烘焙程度 *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={roastLevel}
                onValueChange={(itemValue) => setRoastLevel(itemValue)}
                style={styles.picker}
              >
                {roastLevels.map((level) => (
                  <Picker.Item key={level} label={level} value={level} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>研磨度 (1-10, 1最細, 10最粗)</Text>
            <TextInput
              style={styles.input}
              value={grindSize}
              onChangeText={setGrindSize}
              placeholder="1-10"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>水溫 (°C)</Text>
            <TextInput
              style={styles.input}
              value={waterTemperature}
              onChangeText={setWaterTemperature}
              placeholder="例如：93"
              keyboardType="decimal-pad"
              maxLength={5}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>研磨克數 (g)</Text>
            <TextInput
              style={styles.input}
              value={coffeeAmount}
              onChangeText={setCoffeeAmount}
              placeholder="例如：18"
              keyboardType="decimal-pad"
              maxLength={5}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>風味描述</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="描述這款咖啡豆的風味特點..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>新增咖啡豆</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#0075FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});