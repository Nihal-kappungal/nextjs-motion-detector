"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const SHAKE_THRESHOLD = 15;
const COOLDOWN_MS = 2000;

interface DeviceMotionEventWithPermission {
  requestPermission?: () => Promise<PermissionState>;
}

export function useShakeDetection() {
  const [isSupported] = useState(() => typeof window !== "undefined" && "DeviceMotionEvent" in window);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [shakeDetected, setShakeDetected] = useState(false);
  const lastShakeTime = useRef(0);
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const deltaX = Math.abs(acc.x - lastAcceleration.current.x);
      const deltaY = Math.abs(acc.y - lastAcceleration.current.y);
      const deltaZ = Math.abs(acc.z - lastAcceleration.current.z);

      lastAcceleration.current = { x: acc.x, y: acc.y, z: acc.z };

      const magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

      const now = Date.now();
      if (magnitude > SHAKE_THRESHOLD && now - lastShakeTime.current > COOLDOWN_MS) {
        lastShakeTime.current = now;
        setShakeDetected(true);
      }
    },
    []
  );

  const requestPermission = useCallback(async () => {
    const DME = window.DeviceMotionEvent as unknown as DeviceMotionEventWithPermission;
    if (typeof DME.requestPermission === "function") {
      try {
        const permission = await DME.requestPermission();
        if (permission === "granted") {
          setPermissionGranted(true);
          return true;
        }
      } catch {
        return false;
      }
    } else {
      setPermissionGranted(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (!isSupported || !permissionGranted) return;

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [isSupported, permissionGranted, handleMotion]);

  const resetShake = useCallback(() => {
    setShakeDetected(false);
  }, []);

  return { isSupported, permissionGranted, requestPermission, shakeDetected, resetShake };
}
