export default function Logo({ className, src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`p-2 m-2.5 w-16 h-16  ${className}`}
    />
  );
}
