"use client";

import { useState, useEffect } from "react";
import { useShakeDetection } from "./useShakeDetection";
import { ShakePopup } from "./ShakePopup";

export function ShakeDetector() {
  const { isSupported, permissionGranted, requestPermission, shakeDetected, resetShake } =
    useShakeDetection();
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []); // eslint-disable-line react-hooks/set-state-in-effect

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
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium shadow-lg transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            {permissionRequested ? "Waiting for permission..." : "Enable Shake Detection"}
          </button>
        </div>
      )}

      <ShakePopup isOpen={shakeDetected} onClose={resetShake} />
    </>
  );
}
