import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import Card from "./Card";
import { StyleSheet } from "react-native";

export default function CardItem({ card, onCardDropped, locationPosition }): any {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const endX = useSharedValue(0);
    const endY = useSharedValue(0);
    const isDropped = useSharedValue(false);
  
    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
        ctx.startX = x.value;
        ctx.startY = y.value;
        isDropped.value = false;
      },
      onActive: (event, ctx: any) => {
        x.value = ctx.startX + event.translationX;
        y.value = ctx.startY + event.translationY;
      },
      onEnd: (_) => {
        console.log(_);
        endX.value = _.absoluteX;
        endY.value = _.absoluteY;
        if (!isDropped.value) {
          x.value = withSpring(0);
          y.value = withSpring(0);
        }
      },
    });
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: x.value }, { translateY: y.value }],
      };
    });

    const isCardInsideLocation = (cardX, cardY) => {
      if (
        cardX > locationPosition.x &&
        cardX < locationPosition.x + locationPosition.width &&
        cardY > locationPosition.y &&
        cardY < locationPosition.y + locationPosition.height
      ) {
        return true;
      }
      return false;
    };

    const onDrop = () => {
      onCardDropped(card, isCardInsideLocation(endX.value, endY.value));
      isDropped.value = true;
    };
  
    return (
      <GestureHandlerRootView style={styles.cardContainer}>
        <PanGestureHandler
          onGestureEvent={gestureHandler}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === 5) {
              onDrop();
            }
          }}
        >
          <Animated.View style={[styles.card, animatedStyle]}>
            <Card value={card.value} suit={card.suit} onPress={card.onPress} />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  };

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