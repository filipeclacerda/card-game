import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CardItem from "./CardItem";

interface HandProps {
  cards: Array<{
    value: string;
    suit: string;
    onPress: () => void;
  }>;
  onCardDropped: (card: object) => void;
}

export default function Hand({ cards, onCardDropped }: HandProps) {
  if (!cards || !Array.isArray(cards)) {
    return null;
  }

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <CardItem key={card.value} card={card} onCardDropped={onCardDropped} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "30%",
    position: "relative",
    marginBottom: 20,
    paddingHorizontal: 16,
    gap: 16,
    border: "1px solid #ccc",
  },
  cardContainer: {
    width: 100,
  },
  card: {
    position: "absolute",
    bottom: 20,
  },
});
