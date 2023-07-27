import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CardProps {
  value: string;
  suit: string;
  onPress: () => void;
}

interface CardStyles {
  container: object;
  containerPressed: object;
  value: object;
  suit: object;
  touchable: object;
}

export default function Card({ value, suit, onPress }: CardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[styles.container, isPressed && styles.containerPressed]}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.suit}>{suit}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles: CardStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    width: 100,
    height: 150,
    cursor: "pointer",
  },
  containerPressed: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  touchable: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  suit: {
    fontSize: 18,
  },
});
