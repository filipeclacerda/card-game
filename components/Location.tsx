import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import Card from "./Card";

interface LocationProps {
  cards: Array<{
    value: string;
    suit: string;
    onPress: () => void;
  }>;
  onCardPress: (index: number) => void;
  locationPosition: { x: number; y: number };
  setLocationPosition: (position: { x: number; y: number, width: number, height: number }) => void;
}

export default function Location({ cards, onCardPress, locationPosition, setLocationPosition }: LocationProps) {
  const [droppedCards, setDroppedCards] = useState<Array<typeof cards[number]>>(
    []
  );
  const locationRef = useRef(null);

  const handleLayout = () => {
    if (locationPosition.x !== 0) return;
    locationRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      setLocationPosition({ x: pageX, y: pageY, width: width, height: height });
    });
  };

  const renderCard = (card: typeof cards[number], index: number) => {
    return (
      <View
        ref={locationRef}
        onLayout={handleLayout} >
        <TouchableOpacity
          key={index}
          onPress={() => onCardPress(index)}
          disabled={droppedCards.length > 0} // Disable card press if any cards have been dropped in the location
        >
          <Card {...card} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container} ref={locationRef} onLayout={handleLayout}>
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
    width: "400px",
    height: "400px",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
