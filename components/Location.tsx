import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";

interface LocationProps {
  cards: Array<{
    value: string;
    suit: string;
    onPress: () => void;
  }>;
}

export default function Location({ cards }: LocationProps) {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    border: "1px solid #ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    width: "30%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
