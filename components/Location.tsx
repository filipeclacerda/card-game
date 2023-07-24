import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Card from "./Card";

interface LocationProps {
  cards: Array<{
    value: string;
    suit: string;
    onPress: () => void;
  }>;
  onCardPress: (index: number) => void;
}

export default function Location({ cards, onCardPress }: LocationProps) {
  const [droppedCards, setDroppedCards] = useState<Array<typeof cards[number]>>(
    []
  );

  const handleCardDropped = (index: number) => {
    const cardToDrop = cards[index];
    setDroppedCards((prevDroppedCards) => [...prevDroppedCards, cardToDrop]);
  };

  const renderCard = (card: typeof cards[number], index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onCardPress(index)}
        disabled={droppedCards.length > 0} // Disable card press if any cards have been dropped in the location
      >
        <Card {...card} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {droppedCards.map((card, index) => (
        <Card key={`dropped_${index}`} {...card} />
      ))}
      {cards?.map((card, index) => {
        if (!droppedCards.includes(card)) {
          return renderCard(card, index);
        }
        return null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    border: "1px solid #ccc",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    width: "30%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
