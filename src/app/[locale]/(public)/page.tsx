'use client'

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import MainSection from "@/components/features/home/components/MainSection";
import ThinkStormPlatformSection from "@/components/features/home/components/ThinkStormPlatformSection";
import StillThinkingSection from "@/components/features/home/components/StillThinkingSection";
import CardSection from "@/components/features/home/components/CardSection";
import FAQSection from "@/components/features/home/components/FAQSection";
import { setIsWhite, setIsHidden } from "@/store/ui/headerSlice";
import { useAppDispatch } from "@/store/hooks";

export default function Landing() {
  const dispatch = useAppDispatch();
  const { scrollY } = useScroll();
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [mainHeight, setMainHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const changeHeaderWhite = useCallback(
    (value: boolean) => {
      dispatch(setIsWhite(value));
    },
    [dispatch],
  );

  const changeHeaderHidden = useCallback(
    (value: boolean) => {
      dispatch(setIsHidden(value));
    },
    [dispatch],
  );

  const updateHeaderState = useCallback(
    (currentScrollY: number) => {
      if (!isInitialized) return;

      if (currentScrollY === 0) {
        changeHeaderWhite(false);
        changeHeaderHidden(false);
      } else if (currentScrollY > 0 && currentScrollY < mainHeight * 0.9) {
        changeHeaderWhite(false);
        changeHeaderHidden(true);
      } else if (currentScrollY >= mainHeight * 0.9) {
        changeHeaderWhite(true);
        changeHeaderHidden(false);
      }
    },
    [mainHeight, isInitialized, changeHeaderWhite, changeHeaderHidden],
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    updateHeaderState(latest);
  });

  const updateMainHeight = () => {
    if (mainRef.current) {
      setMainHeight(mainRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    if (window.scrollY === 0) {
      changeHeaderWhite(false);
      changeHeaderHidden(false);
    }
    setIsInitialized(true);
  }, [changeHeaderWhite, changeHeaderHidden]);

  useEffect(() => {
    updateMainHeight();
    window.addEventListener("resize", updateMainHeight);
    return () => window.removeEventListener("resize", updateMainHeight);
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      updateHeaderState(window.scrollY);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [updateHeaderState]);

  return (
    <>
      <MainSection ref={mainRef} scrollY={scrollY} />
      <ThinkStormPlatformSection />
      <StillThinkingSection />
      <CardSection />
      <FAQSection />
    </>
  );
}
