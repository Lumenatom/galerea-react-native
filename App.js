import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Pressable, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const api_url = "https://api.unsplash.com/photos/?client_id=HcmXNkteD_QMBY1_pzPuNGNM8Igs7YxAYmnjY2_LNSU";

const fetchImagesFromUnplash = async () => {
  const data = await fetch(api_url)
  const results = await data.json();
  return results
}

export default function App() {

  const [images, setImages] = useState([])
  const [picture, setPicture] = useState("")
  const [modalWindow, setModalWindow] = useState(false)

  React.useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromUnplash();
      console.log(images)
      setImages(images)

    }
    fetchImages();
  }, [])



  return (
    <View style={styles.container} >
      <Modal visible={modalWindow}>
        <AntDesign style={styles.icon} name="closecircleo" size={24} color="black" onPress={() => {
          setModalWindow(false)
        }} />

        <Image style={styles.imgOpen} source={{ uri: picture }} />
        <StatusBar style="black" />
      </Modal>
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.main} >
              <View style={styles.containerImg} >
                <Pressable onPress={() => {
                  setPicture(item.urls.small)
                  setModalWindow(true)
                }}>
                  <Image style={styles.img} source={{ uri: item.urls.small }} />

                </Pressable>
                <StatusBar style="light" />
              </View>
              <View style={styles.containerText}>
                <Text style={styles.text1}>
                  Description: {item.alt_description = "No description"}
                </Text>
                <Text style={styles.text2}>
                  Creator: {item.user.name}
                </Text>
                <StatusBar style="light" />
              </View>
              <StatusBar style="light" />
            </View>

          )

        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e272e',
    width: '100%',
    paddingTop: 25,
  },
  icon: {
    color: "black",
    size: 35,
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: 30,



  },
  containerImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },
  main: {
    flex: 1,
    paddingBottom: 50,
    width: "100%",
    // flexDirection: "row",
  },
  text1: {
    paddingTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: "400"


  },
  text2: {
    paddingTop: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: "500"

  },
  img: {
    width: 250,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8
  },
  imgOpen: {
    // paddingTop: 90,
    width: "100%",
    height: "100%",
    resizeMode: 'cover',



  },

});
