import { View } from "react-native";
import Hand from "./components/Hand";
import React from "react";
import { StyleSheet } from "react-native";
import Location from "./components/Location";

export default function App() {
  const cards = [
    {
      value: "A",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "1",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "2",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "3",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "4",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "5",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "6",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
    {
      value: "7",
      suit: "♠",
      onPress: () => console.log("A pressed"),
    },
  ];

  return (
    <View style={styles.container}>
      <Location cards={cards} />
      <Hand cards={cards} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
});
