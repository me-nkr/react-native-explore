/**
 * @format
 */

import { describe, it, expect, jest } from '@jest/globals';
import { renderHook, act } from "@testing-library/react-native";
import { useSwipe } from '../../src/hooks';

import { GestureResponderEvent, NativeTouchEvent, Dimensions } from 'react-native';

/**
 * - render useSwipe hook with mock callback
 * - call callbacks start and end with correct values
 * - check if mock function has been called
 */

describe("Swipe Hook", () => {

    describe("swipe", () => {

        it("should call callback on left swipe", () => {

            const { width } = Dimensions.get("window");

            const leftSwipeCallback = jest.fn();

            const { result } = renderHook(() => useSwipe(leftSwipeCallback));

            act(() => {
                result.current.onTouchStart({
                    nativeEvent: {
                        pageX: width
                    } as NativeTouchEvent,
                } as GestureResponderEvent)
            })

            act(() => {
                result.current.onTouchEnd({
                    nativeEvent: {
                        pageX: width - (width / 4) - 10
                    } as NativeTouchEvent,
                } as GestureResponderEvent)
            })

            expect(leftSwipeCallback).toHaveBeenCalled();
        })

        it("should call callback on right swipe", () => {

            const { width } = Dimensions.get("window");

            const rightSwipeCallback = jest.fn();

            const { result } = renderHook(() => useSwipe(undefined, rightSwipeCallback));

            act(() => {
                result.current.onTouchStart({
                    nativeEvent: {
                        pageX: 0
                    } as NativeTouchEvent,
                } as GestureResponderEvent)
            })

            act(() => {
                result.current.onTouchEnd({
                    nativeEvent: {
                        pageX: (width / 4) + 10
                    } as NativeTouchEvent,
                } as GestureResponderEvent)
            })

            expect(rightSwipeCallback).toHaveBeenCalled();
        })
    })


    describe("threshold", () => {

        describe("default", () => {

            it("should call callback when swipe did cross threshold", () => {

                const { width } = Dimensions.get("window");

                const leftSwipeCallback = jest.fn();

                const { result } = renderHook(() => useSwipe(leftSwipeCallback));

                act(() => {
                    result.current.onTouchStart({
                        nativeEvent: {
                            pageX: width
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                act(() => {
                    result.current.onTouchEnd({
                        nativeEvent: {
                            pageX: width - (width / 4) - 10
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                expect(leftSwipeCallback).toHaveBeenCalled();
            })

            it("should not call callback when swipe did not cross threshold", () => {

                const { width } = Dimensions.get("window");

                const leftSwipeCallback = jest.fn();

                const { result } = renderHook(() => useSwipe(leftSwipeCallback));

                act(() => {
                    result.current.onTouchStart({
                        nativeEvent: {
                            pageX: width
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                act(() => {
                    result.current.onTouchEnd({
                        nativeEvent: {
                            pageX: width - (width / 4) + 1
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                expect(leftSwipeCallback).not.toHaveBeenCalled();
            })
        })

        describe("custom", () => {

            it("should call callback when swipe did cross threshold", () => {

                const { width } = Dimensions.get("window");

                const leftSwipeCallback = jest.fn();

                const { result } = renderHook(() => useSwipe(leftSwipeCallback, undefined, 10));

                act(() => {
                    result.current.onTouchStart({
                        nativeEvent: {
                            pageX: width
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                act(() => {
                    result.current.onTouchEnd({
                        nativeEvent: {
                            pageX: width - (width / 10) - 10
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                expect(leftSwipeCallback).toHaveBeenCalled();
            })

            it("should not call callback when swipe did not cross threshold", () => {

                const { width } = Dimensions.get("window");

                const leftSwipeCallback = jest.fn();

                const { result } = renderHook(() => useSwipe(leftSwipeCallback, undefined, 10));

                act(() => {
                    result.current.onTouchStart({
                        nativeEvent: {
                            pageX: width
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                act(() => {
                    result.current.onTouchEnd({
                        nativeEvent: {
                            pageX: width - (width / 10) + 1
                        } as NativeTouchEvent,
                    } as GestureResponderEvent)
                })

                expect(leftSwipeCallback).not.toHaveBeenCalled();
            })

        })

    })

})