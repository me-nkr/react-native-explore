import { GestureResponderEvent, useWindowDimensions } from "react-native";

type SwipeHook = (onSwipeLeft?: () => void, onSwipeRight?: () => void, swipeThresholdModifier?: number) => {
  onTouchStart: (e: GestureResponderEvent) => void,
  onTouchEnd: (e: GestureResponderEvent) => void
}

const useSwipe: SwipeHook = (onSwipeLeft, onSwipeRight, swipeThresholdModifier = 4) => {

  const { width } = useWindowDimensions();

  let initialTouchPoint: number;

  function onTouchStart(e: GestureResponderEvent) {
    initialTouchPoint = e.nativeEvent.pageX
  }

  function onTouchEnd(e: GestureResponderEvent) {

    const finalTouchPoint = e.nativeEvent.pageX
    const swipeThreshold = width / (swipeThresholdModifier || 4)

    if (finalTouchPoint - initialTouchPoint > swipeThreshold) {
      onSwipeRight && onSwipeRight()
    }
    else if (initialTouchPoint - finalTouchPoint > swipeThreshold) {
      onSwipeLeft && onSwipeLeft()
    }
  }

  return { onTouchStart, onTouchEnd };
}

export default useSwipe;