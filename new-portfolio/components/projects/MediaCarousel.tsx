"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MediaItem } from "./types";

interface MediaCarouselProps {
  media: MediaItem[];
  projectTitle: string;
}

export const MediaCarousel = ({ media, projectTitle }: MediaCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [autoplayRef.current],
  );

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !thumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, thumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !thumbsApi) return;
    const selected = emblaApi.selectedScrollSnap();
    thumbsApi.scrollTo(selected);
    setSelectedIndex(selected);
  }, [emblaApi, thumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !thumbsApi) return;

    const syncThumbnails = () => {
      const selected = emblaApi.selectedScrollSnap();
      thumbsApi.scrollTo(selected);
    };

    syncThumbnails();
    emblaApi.on("select", syncThumbnails);

    return () => {
      emblaApi.off("select", syncThumbnails);
    };
  }, [emblaApi, thumbsApi]);

  // Manejar videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Intersection Observer para detectar cuando el carrusel es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // Controlar autoplay basado en visibilidad
        if (entry.isIntersecting) {
          autoplayRef.current.play();
        } else {
          autoplayRef.current.stop();
        }
      },
      {
        threshold: 0.3, // El carrusel debe estar al menos 30% visible
      },
    );

    if (carouselContainerRef.current) {
      observer.observe(carouselContainerRef.current);
    }

    // Detener autoplay inicialmente
    autoplayRef.current.stop();

    return () => {
      if (carouselContainerRef.current) {
        observer.unobserve(carouselContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelectVideo = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      const currentItem = media[selectedIndex];

      // Si el slide actual es un video, pausar autoplay
      if (currentItem?.type === "video") {
        autoplayRef.current.stop();
      } else {
        // Si es una imagen, reanudar autoplay
        autoplayRef.current.play();
      }

      // Pausar todos los videos
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === selectedIndex && currentItem?.type === "video") {
            video.currentTime = 0;
            video.play();
          } else {
            video.pause();
          }
        }
      });
    };

    onSelectVideo();
    emblaApi.on("select", onSelectVideo);

    return () => {
      emblaApi.off("select", onSelectVideo);
    };
  }, [emblaApi, media]);

  if (media.length === 1) {
    const item = media[0];
    return (
      <div ref={carouselContainerRef} className="relative mt-4">
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-border/50 bg-linear-to-br from-primary/20 via-primary/10 to-primary/5">
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={projectTitle}
              className="w-full h-auto object-contain"
            />
          ) : (
            <video
              src={item.src}
              className="w-full h-auto object-contain"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={carouselContainerRef} className="relative mt-4">
      {/* Main Carousel */}
      <div
        className="overflow-hidden rounded-2xl shadow-2xl border border-border/50"
        ref={emblaRef}
      >
        <div className="flex">
          {media.map((item, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative bg-linear-to-br from-primary/20 via-primary/10 to-primary/5">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`${projectTitle} - ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.src}
                    className="w-full h-auto object-contain"
                    muted
                    playsInline
                    onEnded={() => {
                      // Cuando el video termina, pasar al siguiente slide
                      emblaApi?.scrollNext();
                      // Reanudar autoplay para las siguientes imágenes
                      autoplayRef.current.play();
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4">
        <div className="overflow-hidden" ref={thumbsRef}>
          <div className="flex gap-3">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className="flex-[0_0_30%] min-w-0 relative cursor-pointer"
              >
                <div
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                    selectedIndex === index
                      ? "border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="relative w-full h-full bg-linear-to-br from-primary/10 to-primary/5">
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/10">
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "bg-primary w-6"
                : "bg-muted-foreground/50 w-2 hover:bg-muted-foreground/70"
            }`}
            aria-label={`Ir a media ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
