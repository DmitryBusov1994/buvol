"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { publicAsset } from "@/lib/publicPath";

const STORAGE_KEY = "buvol-preloader-done";

export function Preloader() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const finished = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: number | undefined;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setShow(false);
        return;
      }
    } catch {
      /* private mode */
    }

    const unlockScroll = () => {
      document.body.style.overflow = "";
    };

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      setExiting(true);
      window.setTimeout(() => {
        setShow(false);
        unlockScroll();
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      }, 300);
    };

    document.body.style.overflow = "hidden";

    if (document.readyState === "complete") {
      window.requestAnimationFrame(() => finish());
    } else {
      window.addEventListener("load", finish, { once: true });
      timeoutId = window.setTimeout(finish, 2800);
    }

    return () => {
      unlockScroll();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "preloader-screen fixed inset-0 z-[10000] flex items-center justify-center bg-[#0e0e10]",
        "transition-opacity duration-300 ease-out motion-reduce:transition-none",
        exiting ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={publicAsset("/hero-logo.webp")}
        alt=""
        width={160}
        height={160}
        decoding="async"
        className="h-28 w-auto opacity-95 motion-reduce:animate-none md:h-32 animate-pulse"
      />
    </div>
  );
}
