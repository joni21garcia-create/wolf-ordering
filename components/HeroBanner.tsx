"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function HeroBanner({
  slug,
}: {
  slug: string;
}) {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    cargarBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  async function cargarBanners() {
    const { data } = await supabase
      .from("banners")
      .select("*")
      .eq("activo", true)
      .order("orden");

    if (data) {
      setBanners(data);
    }
  }

  if (banners.length === 0) return null;

  const banner = banners[current];

  return (
    <section
      style={{
        height: "70vh",
        backgroundImage: `url(${banner.imagen_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        transition: "all 0.5s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          zIndex: 2,
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "10px",
          }}
        >
          {banner.titulo}
        </h1>

        <p
          style={{
            fontSize: "1.4rem",
            marginBottom: "25px",
          }}
        >
          {banner.subtitulo}
        </p>

        <a
          href={`/restaurante/${slug}/order`}
          style={{
            display: "inline-block",
            padding: "14px 30px",
            background: "#f59e0b",
            color: "white",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          🍽 Ordenar en Línea
        </a>
      </div>
    </section>
  );
}