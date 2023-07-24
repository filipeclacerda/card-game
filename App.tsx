import { View } from "react-native";
import Hand from "./components/Hand";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Location from "./components/Location";

export default function App() {
  const [cards, setCards] = useState([
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
  ]);
  const [local1Cards, setLocal1Cards] = useState([{value:"8", suit:"♠", onPress: () => console.log('a')}])
  
  const dropCardHandler = (card) => {
    setLocal1Cards(local1Cards => [...local1Cards, card])
    setCards(cards => cards.filter(c => c.value !== card.value))
  }

  return (
    <View style={styles.container}>
      <Location cards={local1Cards} onCardPress={()=>console.log('pressed')} />
      <Hand cards={cards} onCardDropped={dropCardHandler}/>
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
