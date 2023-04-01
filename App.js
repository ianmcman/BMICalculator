import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

const keyHeight = '@MyApp:keyHeight';
const keyBMI = '@MyApp:keyBMI';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

export default class App extends Component {
  state = {
    weight: 0,
    height: 0,
    storedHeight: '',
    storedBMI: '',
    BMI: 0,
  };

  constructor(props) {
    super(props);
    this.onLoadHeight();
    this.onloadBMI();
  }

  onLoadHeight = async () => {
    try {
      const storedHeight = await AsyncStorage.getItem(keyHeight, storedHeight);
      this.setState({ storedHeight });
      this.setState({ height: parseFloat(storedHeight) });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the height');
    }
  }
  onloadBMI = async () => {
    try {
      const storedBMI = await AsyncStorage.getItem(keyBMI, storedBMI);
      this.setState({ storedBMI });
      this.setState({ BMI : parseFloat(this.state.storedBMI) });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the weight');
    }
  }

  onSave = async () => {
    
  }

  computeBMI = async () => {
    
  }

  onButtonPress = async () => {
    const { height, weight, BMI } = this.state;
    tempBMI = ((weight/(height*height))*703).toFixed(1)
    this.setState({ BMI: tempBMI });

    try {
      await AsyncStorage.setItem(keyHeight, this.state.height.toString());
      await AsyncStorage.setItem(keyBMI, this.state.BMI.toString());
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  };

  onWeightChange = (weight) => {
    this.setState({ weight: parseFloat(weight) });
  };

  onHeightChange = (height) => {
    tempHeight = parseFloat(height);
    this.setState({ height: parseFloat(height)});
  };

  render() {
    const { weight, height, BMI, storedHeight } = this.state;

    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>BMI Calculator</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onWeightChange}
          value={weight}
          placeholder="Weight in Pounds"
        />
        <TextInput
          style={styles.input}
          onChangeText={this.onHeightChange}
          defaultValue={ (storedHeight > 0 ? storedHeight : "")}
          value={height}
          placeholder="Height in Inches"
        />
        <TouchableOpacity onPress={this.onButtonPress} style={styles.button}>
          <Text style={{fontSize: 24, textAlign: 'center', color: '#fff'}}>Compute BMI</Text>
        </TouchableOpacity>
        {  (BMI > 0) ? <Text style={styles.showBMI}>{'\n'}Body Mass Index is {BMI}{'\n'}</Text> : null}
        <Text style={styles.assessing}>
          Assessing Your BMI{'\n'}
          {'\t'}Underweight: less than 18.5{'\n'}
          {'\t'}Healthy: 18.5 to 24.9{'\n'}
          {'\t'}Overweight: 25.0 to 29.9{'\n'}
          {'\t'}Obese: 30.0 or higher{'\n'}
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: "center",
    flexDirection: 'column',
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 30,
    padding: 5,
    margin: 5,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#34495e',
    padding: 5,
    borderRadius: 3,
    margin: 5,
    fontSize: 24,
  },
  showBMI: {
    fontSize: 28,
    textAlign: "center",
  },
  assessing: {
    fontSize: 20,
    position: "absolute",
    bottom: 200,
    padding: 5,
    margin: 5,
  }
});