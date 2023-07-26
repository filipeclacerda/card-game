import { useAnimatedGestureHandler, useSharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

export function useCardGestureHandler(locationPosition, onCardDropped) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const endX = useSharedValue(0);
  const endY = useSharedValue(0);
  const isDropped = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      isDropped.value = false;
    },
    onActive: (event, ctx: any) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      endX.value = event.absoluteX;
      endY.value = event.absoluteY;
      if (!isDropped.value) {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
    },
  });

  const isCardInsideLocation = (cardX: number, cardY: number) => {
    return (
      cardX > locationPosition.x &&
      cardX < locationPosition.x + locationPosition.width &&
      cardY > locationPosition.y &&
      cardY < locationPosition.y + locationPosition.height
    );
  };

  const onDrop = () => {
    onCardDropped({ x: endX.value, y: endY.value }, isCardInsideLocation(endX.value, endY.value));
    isDropped.value = true;
  };

  return { x, y, gestureHandler, onDrop };
}
