export default function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex flex-shrink-0 items-center justify-center bg-black font-black text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        clipPath:
          "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)",
      }}
    >
      N
    </span>
  );
}
