import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Hand from "./components/Hand";
import Location from "./components/Location";

interface Card {
  value: string;
  suit: string;
  onPress: () => void;
}

interface LocationCards {
  id: number;
  cards: Card[];
}

const initialCards: Card[] = [
  { value: "A", suit: "♠", onPress: () => console.log("A pressed") },
  { value: "2", suit: "♠", onPress: () => console.log("2 pressed") },
  { value: "3", suit: "♠", onPress: () => console.log("3 pressed") },
  { value: "4", suit: "♠", onPress: () => console.log("4 pressed") },
  { value: "5", suit: "♠", onPress: () => console.log("5 pressed") },
  { value: "6", suit: "♠", onPress: () => console.log("6 pressed") },
  { value: "7", suit: "♠", onPress: () => console.log("7 pressed") },
];

const createEmptyLocations = (count: number): LocationCards[] => {
  const locations: LocationCards[] = [];
  for (let i = 0; i < count; i++) {
    locations.push({ id: i, cards: [] });
  }
  return locations;
};

export default function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [locations, setLocations] = useState<LocationCards[]>(createEmptyLocations(3));
  const initialPositions = [
    { x: 0, y: 0 }, // Position for the first location
    { x: 0, y: 0 }, // Position for the second location
    { x: 0, y: 0 }, // Position for the third location
  ];
  const [locationPositions, setLocationPositions] = useState(initialPositions);

  const dropCardHandler = (card: Card, locationCardIsIn: any) => {
    if (locationCardIsIn !== null) {
      setLocations((prevLocations) => {
        const updatedLocations = prevLocations.map((location) => {
          if (location.id === locationCardIsIn) {
            return { ...location, cards: [...location.cards, card] };
          }
          return location;
        });
        return updatedLocations;
      });

      setCards((prevCards) => prevCards.filter((c) => c.value !== card.value));
    } else {
      console.log("Not inside any location.");
    }
  };

  const setLocationPositionAtIndex = (index: number, newPosition: { x: number, y: number }) => {
    setLocationPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = newPosition;
      return newPositions;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.locations}>
        {locations.map((location, index) => (
          <Location
            key={location.id}
            locationId={location.id}
            cards={location.cards}
            onCardPress={() => console.log("pressed")}
            locationPosition={locationPositions[index]}
            setLocationPosition={(newPosition) => setLocationPositionAtIndex(index, newPosition)}
          />
        ))}
      </View>
      <Hand cards={cards} onCardDropped={dropCardHandler} locationPositions={locationPositions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    width: "100%",
    marginBottom: 20,
  },
});
