"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Imagem com fallback se o arquivo ainda não existir em public/img/.
 */
export default function MediaImage({
  src,
  alt,
  wrapperClassName,
  sizes,
  imgClassName,
  placeholderClassName,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={wrapperClassName}>
      {failed ? (
        <div className={placeholderClassName} aria-hidden>
          <span>Foto</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "(max-width: 900px) 100vw, 50vw"}
          className={imgClassName}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
