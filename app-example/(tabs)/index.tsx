import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { Text, Button } from 'react-native-paper';

const StartScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const images = [
    require('../../assets/images/startscreen_2.png'),
    require('../../assets/images/startscreen_1.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.var_1}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pencatatan Pasien</Text>
      </View>
      <View style={styles.content}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={image}
                style={[
                  styles.image,
                  index % 2 === 0 ? styles.imageRadius1 : styles.imageRadius2
                ]}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Button
            mode="contained"
            style={[styles.button, isPressed && styles.buttonHover]}
            labelStyle={[styles.buttonLabel, isPressed && styles.buttonLabelHover]}
            onPress={() => console.log('Mulai')}
          >
            Mulai
          </Button>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0966f2',
  },
  var_1: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#629bf0',
    position: 'absolute',
    top: 86,
    left: 60,
  },
  header: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  headerText: {
    fontSize: 49,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    flex: 1,
    marginTop: 180,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 130,
  },
  imageRadius1: {
    borderRadius: 30,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  imageRadius2: {
    borderRadius: 60,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  buttonContainer: {
    paddingHorizontal: 50,
    paddingBottom: 40,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 5,
    elevation: 4,
    backgroundColor: '#fff',
  },
  buttonHover: {
    backgroundColor: '#e6e6e6',
    transform: [{ scale: 0.98 }],
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    color: '#0966f2',
  },
  buttonLabelHover: {
    color: '#0854c9',
  },
});

export default StartScreen;