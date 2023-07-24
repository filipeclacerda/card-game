import { useRef } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

export function useCardGestureHandler(onDrop) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const isDropped = useRef(false); // Corrected the useRef here

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      isDropped.current = false; // Corrected the useRef here
    },
    onActive: (event, ctx: any) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      if (!isDropped.current) {
        x.value = withSpring(0);
        y.value = withSpring(0);
      }
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

  const handleDrop = () => {
    isDropped.current = true; // Corrected the useRef here
    onDrop();
  };

  return { gestureHandler, animatedStyle, handleDrop };
}