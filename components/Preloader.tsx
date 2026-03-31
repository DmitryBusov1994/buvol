"use client";

import { useEffect, useRef, useState } from "react";
import { publicAsset } from "@/lib/publicPath";

const MIN_MS = 2800;
const FADE_MS = 500;

/**
 * Прелоадер: две PNG + CSS-анимации. Скрытие после load и минимум MIN_MS с момента монтирования.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [hiddenClass, setHiddenClass] = useState(false);
  const started = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    let mainTimeoutId: number | undefined;
    started.current = Date.now();
    document.body.style.overflow = "hidden";

    const runHide = () => {
      if (cancelled) return;
      const start = started.current ?? Date.now();
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);

      mainTimeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setHiddenClass(true);
        document.body.style.overflow = "";
        fadeTimeoutRef.current = window.setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, FADE_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      runHide();
    } else {
      window.addEventListener("load", runHide, { once: true });
    }

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
      if (mainTimeoutId !== undefined) window.clearTimeout(mainTimeoutId);
      if (fadeTimeoutRef.current !== undefined) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className={["preloader", hiddenClass ? "hidden" : ""].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="preloader-scene">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicAsset("/images/loader_buffalo_head.png")}
          alt=""
          className="loader-buffalo"
          width={180}
          height={180}
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={publicAsset("/images/loader_gear.png")}
          alt=""
          className="loader-gear"
          width={130}
          height={130}
          decoding="async"
        />
      </div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" />
      </div>
    </div>
  );
}
