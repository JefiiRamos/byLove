"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import MediaImage from "./components/MediaImage";
import { story } from "@/data/story";
import { media } from "@/data/media";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [siteReady, setSiteReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let rafId;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => setSiteReady(true), 800);
  };

  const galleryClassForIndex = (i, total) => {
    if (total <= 5) {
      if (i === 0) return `${styles.galeriaItem} ${styles.galeriaItemTall}`;
      if (i === 3) return `${styles.galeriaItem} ${styles.galeriaItemWide}`;
      return styles.galeriaItem;
    }
    return `${styles.galeriaItem} ${styles.galeriaItemUniform}`;
  };

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={cursorDotRef} className={styles.cursorDot} />

      <div className={`${styles.entry} ${entered ? styles.entryExit : ""}`}>
        <div className={styles.blobTL} />
        <div className={styles.blobBR} />
        <div className={styles.blobCenter} />

        <header className={styles.entryHeader}>
          <span className={styles.entryLogo}>J&amp;N</span>
        </header>

        <div className={styles.entryBody}>
          <p className={styles.entryTagline}>feito com amor</p>
          <h1 className={styles.entryTitle}>
            Jeferson<br />
            <em>&amp; Nicole</em>
          </h1>
          <button
            className={styles.enterBtn}
            onClick={handleEnter}
            disabled={loadProgress < 100}
          >
            {loadProgress < 100 ? "carregando..." : "ENTRAR"}
          </button>
        </div>

        <div className={styles.entryFooter}>
          <span className={styles.progressNum}>{Math.min(loadProgress, 100)}%</span>
        </div>
      </div>

      <div className={`${styles.site} ${siteReady ? styles.siteVisible : ""}`}>
        <nav className={`${styles.nav} ${scrollY > 60 ? styles.navSolid : ""}`}>
          <span className={styles.navLogo}>J&amp;N</span>
          <ul className={styles.navLinks}>
            <li>
              <a href="#nossa-historia">História</a>
            </li>
            <li>
              <a href="#momentos">Momentos</a>
            </li>
            <li>
              <a href="#galeria">Galeria</a>
            </li>
            {media.videos.length > 0 ? (
              <li>
                <a href="#videos">Vídeos</a>
              </li>
            ) : null}
            <li>
              <a href="#carta">Carta</a>
            </li>
          </ul>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroBlob1} />
          <div className={styles.heroBlob2} />
          <div className={styles.heroBg} />
          <div className={styles.heroContent} id="nossa-historia">
            <span className={styles.heroEyebrow}>{story.heroEyebrow}</span>
            <h2 className={styles.heroHeading}>{story.heroHeading}</h2>
            <p className={styles.heroSub}>{story.heroSub}</p>
          </div>
          <div className={styles.heroScroll}>
            <span>descobrir</span>
            <div className={styles.heroScrollLine} />
          </div>
          <div className={styles.heroIndex}>001</div>
        </section>

        <section className={styles.quoteSection}>
          <div className={styles.quoteWrap}>
            <div className={styles.quoteMark}>&ldquo;</div>
            <blockquote className={styles.quoteText}>{story.quote.text}</blockquote>
            <cite className={styles.quoteCite}>{story.quote.cite}</cite>
            <p className={styles.quoteNote}>{story.quote.note}</p>
          </div>
        </section>

        <section className={styles.editorial} id="momentos">
          <div className={styles.editorialLeft}>
            <div className={styles.editorialPhotoWrap}>
              <MediaImage
                src={media.editorial}
                alt="Jeferson e Nicole"
                wrapperClassName={styles.editorialPhotoFigure}
                imgClassName={styles.mediaImg}
                placeholderClassName={styles.editorialPhotoPlaceholder}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className={styles.editorialCaption}>
              <span>{story.editorial.captionLeft}</span>
              <span>{story.editorial.captionRight}</span>
            </div>
          </div>

          <div className={styles.editorialRight}>
            <span className={styles.editorialNum}>{story.editorial.num}</span>
            <h2 className={styles.editorialTitle}>{story.editorial.title}</h2>
            {story.editorial.paragraphs.map((p, i) => (
              <p key={i} className={styles.editorialText}>
                {p}
              </p>
            ))}
            <div className={styles.editorialDate}>{story.editorial.dateLine}</div>
          </div>
        </section>

        <section className={styles.momentos}>
          <div className={styles.momentosHeader}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>Nossos momentos</h2>
          </div>

          <div className={styles.momentosGrid}>
            {story.momentos.map((m, idx) => {
              const thumb = media.momentoThumbs[idx];
              return (
                <article key={m.num} className={styles.momentoCard}>
                  <div className={styles.momentoPhoto}>
                    {thumb ? (
                      <MediaImage
                        src={thumb}
                        alt={m.title}
                        wrapperClassName={styles.momentoImageWrap}
                        imgClassName={styles.mediaImg}
                        placeholderClassName={styles.momentoPlaceholder}
                        sizes="(max-width: 900px) 100vw, 40vw"
                      />
                    ) : (
                      <div className={styles.momentoPlaceholder}>
                        <span>{m.num}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.momentoBody}>
                    <div className={styles.momentoTop}>
                      <span className={styles.momentoNum}>{m.num}</span>
                      <span className={styles.momentoTag}>{m.tag}</span>
                    </div>
                    <h3 className={styles.momentoTitle}>{m.title}</h3>
                    <p className={styles.momentoDesc}>{m.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.galeria} id="galeria">
          <div className={styles.galeriaHeader}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.sectionTitle}>Galeria de nós</h2>
          </div>

          <div
            className={`${styles.galeriaGrid} ${
              media.gallery.length > 5 ? styles.galeriaGridMany : ""
            }`}
          >
            {media.gallery.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className={galleryClassForIndex(i, media.gallery.length)}
              >
                <MediaImage
                  src={item.src}
                  alt={item.caption}
                  wrapperClassName={styles.galeriaMedia}
                  imgClassName={styles.mediaImg}
                  placeholderClassName={styles.galeriaPlaceholder}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.galeriaOverlay}>
                  <span>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {media.videos.length > 0 ? (
          <section className={styles.videoSection} id="videos">
            <div className={styles.videoHeader}>
              <span className={styles.sectionNum}>04</span>
              <h2 className={styles.sectionTitle}>Vídeos</h2>
            </div>
            <div className={styles.videoGrid}>
              {media.videos.map((v, i) => (
                <figure key={`${v.src}-${i}`} className={styles.videoFigure}>
                  <video className={styles.videoEl} src={v.src} controls playsInline preload="metadata" />
                  <figcaption className={styles.videoCaption}>{v.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.carta} id="carta">
          <div className={styles.cartaBlob} />
          <div className={styles.cartaWrap}>
            <span className={styles.sectionNum}>05</span>
            <h2 className={styles.cartaTitle}>
              Uma carta<br />
              <em>para você</em>
            </h2>
            <div className={styles.cartaLine} />
            <div className={styles.cartaText}>
              <p>{story.carta.greeting}</p>
              <br />
              {story.carta.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <br />
              <p className={styles.cartaAssinatura}>{story.carta.assinatura}</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBlob} />
          <div className={styles.footerInner}>
            <span className={styles.footerLogo}>J &amp; N</span>
            <p className={styles.footerTagline}>Feito com amor, para durar para sempre.</p>
            <div className={styles.footerDivider} />
            <span className={styles.footerYear}>♡ {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </>
  );
}
