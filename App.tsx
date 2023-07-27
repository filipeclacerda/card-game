import { View } from "react-native";
import Hand from "./components/Hand";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Location from "./components/Location";

interface Card {
  value: string;
  suit: string;
  onPress: () => void;
}

export default function App() {
  const [cards, setCards] = useState([
    {
      value: "A",
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
  const [local1Cards, setLocal1Cards] = useState([]);
  const [local2Cards, setLocal2Cards] = useState([]);
  const [local3Cards, setLocal3Cards] = useState([]);
  const [locationPosition, setLocationPosition] = useState({ x: 0, y: 0 });

  const dropCardHandler = (card: Card, isInsideLocation: boolean) => {
    if (isInsideLocation) {
      setLocal1Cards((local1Cards) => [...local1Cards, card]);
      setCards((cards) => cards.filter((c) => c.value !== card.value));
    } else {
      console.log("nao esta dentro");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.locations}>
        <Location
          cards={local1Cards}
          onCardPress={() => console.log("pressed")}
          locationPosition={locationPosition}
          setLocationPosition={setLocationPosition}
        />
        <Location
          cards={local2Cards}
          onCardPress={() => console.log("pressed")}
          locationPosition={locationPosition}
          setLocationPosition={setLocationPosition}
        />
        <Location
          cards={local3Cards}
          onCardPress={() => console.log("pressed")}
          locationPosition={locationPosition}
          setLocationPosition={setLocationPosition}
        />
      </View>
      <Hand
        cards={cards}
        onCardDropped={dropCardHandler}
        locationPosition={locationPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
  locations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    width: "100%",
    marginBottom: 20,
  },
});
