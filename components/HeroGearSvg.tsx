type Props = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

/** Декоративная шестерня бренда (не логотип) — для прелоадера и угла Hero. */
export function HeroGearSvg({ className, ...rest }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="28" stroke="#C0392B" strokeWidth="8" />
        <circle cx="50" cy="50" r="8" stroke="#F0A500" strokeWidth="6" />
        <path
          d="M50 4v14M50 82v14M96 50H82M18 50H4M82.5 17.5l-10 10M27.5 72.5l-10 10M82.5 82.5l-10-10M27.5 27.5l-10-10"
          stroke="#C0392B"
          strokeWidth="6"
        />
        <circle cx="50" cy="50" r="32" stroke="rgba(240,165,0,.65)" strokeWidth="2" />
      </g>
    </svg>
  );
}
