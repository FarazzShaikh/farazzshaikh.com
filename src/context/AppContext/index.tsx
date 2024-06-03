import { PropsWithChildren, useEffect } from "react";
import tunnel from "tunnel-rat";
import { useApp } from "./store";

export const DebugTunnel = tunnel();

export function AppProvider({ children }: PropsWithChildren) {
  const isRecordingMode = useApp((s) => s.isRecordingMode);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "r") {
        useApp.setState((s) => ({ isRecordingMode: !s.isRecordingMode }));
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 3) {
        useApp.setState((s) => ({ isRecordingMode: !s.isRecordingMode }));
      }
    };

    window.addEventListener("keydown", onKeydown);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return <>{children}</>;
}
