"use client";

import { useState, useEffect, useRef } from "react";
import { gooeyToast } from "goey-toast";
import { useWebHaptics } from "web-haptics/react";
import { useShakeDetection } from "./useShakeDetection";

export function ShakeDetector() {
  const { isSupported, permissionGranted, requestPermission, shakeDetected, resetShake } =
    useShakeDetection();
  const { trigger } = useWebHaptics();
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => setMounted(true), []); // eslint-disable-line react-hooks/set-state-in-effect

  useEffect(() => {
    if (shakeDetected && !hasShownRef.current) {
      hasShownRef.current = true;
      trigger([
                { duration: 1000 },
              ], { intensity: 1 })
      gooeyToast.success("motion detected", {
        borderColor: "#E0E0E0",
        borderWidth: 1.5,
        preset: "bouncy",
      });
      resetShake();
    }
    if (!shakeDetected) {
      hasShownRef.current = false;
    }
  }, [shakeDetected, resetShake, trigger]);

  const handleEnable = async () => {
    setPermissionRequested(true);
    await requestPermission();
  };

  if (!mounted || !isSupported) return null;

  return (
    <>
      {!permissionGranted && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <button
            onClick={handleEnable}
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium shadow-lg transition-colors dark:border-zinc-600 dark:text-black"
          >
            {permissionRequested ? "Waiting for permission..." : "Enable Shake Detection"}
          </button>
        </div>
      )}
    </>
  );
}
