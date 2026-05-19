import { useState } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Image with lazy loading, loading skeleton, and graceful error fallback.
 * Uses native lazy loading + Intersection Observer so below-fold images
 * do not request until near the viewport (SSR-safe: same markup on server).
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  priority = false,
  sizes,
  srcSet,
  rootMargin = "200px 0px",
  onLoad,
  ...imgProps
}) {
  const [ref, inView] = useInView({ rootMargin, initialInView: priority });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const shouldLoad = priority || inView;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-stone-700/40 ${wrapperClassName}`}
    >
      {!loaded && !error && shouldLoad && (
        <span
          className="absolute inset-0 animate-pulse bg-stone-600/50"
          aria-hidden
        />
      )}

      {shouldLoad && !error && (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          srcSet={srcSet}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          {...imgProps}
        />
      )}

      {error && (
        <span
          className={`flex items-center justify-center bg-stone-700 text-stone-400 text-sm ${className}`}
          role="img"
          aria-label={alt}
        >
          Imagem indisponível
        </span>
      )}
    </div>
  );
}
