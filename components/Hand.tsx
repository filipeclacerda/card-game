import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Card from "./Card";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";

interface HandProps {
  cards: Array<{
    value: string;
    suit: string;
    onPress: () => void;
  }>;
}

export default function Hand({ cards }: HandProps) {
  const cardAnimatedStyles = cards.map(() => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
        ctx.startX = x.value;
        ctx.startY = y.value;
      },
      onActive: (event, ctx: any) => {
        x.value = ctx.startX + event.translationX;
        y.value = ctx.startY + event.translationY;
      },
      onEnd: (_) => {
        x.value = withSpring(0);
        y.value = withSpring(0);
      },
    });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: x.value,
          },
          {
            translateY: y.value,
          },
        ],
      };
    });

    return { gestureHandler, animatedStyle };
  });

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <GestureHandlerRootView key={index} style={styles.cardContainer}>
          <PanGestureHandler
            onGestureEvent={cardAnimatedStyles[index].gestureHandler}
          >
            <Animated.View
              style={[styles.card, cardAnimatedStyles[index].animatedStyle]}
            >
              <Card
                key={card.value}
                value={card.value}
                suit={card.suit}
                onPress={card.onPress}
              />
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
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
