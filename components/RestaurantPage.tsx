"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import HeroBanner from "./HeroBanner";

export default function RestaurantPage({
  slug,
}: {
  slug: string;
}) {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [caracteristicas, setCaracteristicas] = useState<any[]>([]);
  const [menuDestacado, setMenuDestacado] = useState<any[]>([]);
const [galeria, setGaleria] = useState<any[]>([]);
const [configuracion, setConfiguracion] = useState<any>(null);

  useEffect(() => {
    cargarRestaurant();
  }, [slug]);

  async function cargarRestaurant() {
const {
  data,
  error: restauranteError,
} = await supabase
  .from("restaurantes")
  .select("*")
  .eq("slug", slug)
  .single();


console.log("SLUG:", slug);
console.log("RESTAURANTE:", data);
console.log("ERROR:", restauranteError);

if (restauranteError || !data) {
  console.log(
    "No se encontró restaurante"
  );

  console.log(restauranteError);

  return;
}

setRestaurant(data);

console.log(
  "SET RESTAURANT EJECUTADO",
  data
);

  const { data: configData } = await supabase
  .from("configuracion_restaurante")
  .select("*")
  .eq("restaurante_id", data.id)
  .single();

if (configData) {
  setConfiguracion(configData);
}

    const { data: caracteristicasData } = await supabase
      .from("caracteristicas_restaurante")
      .select("*")
      .eq("restaurante_id", data.id)
      .eq("activo", true)
      .order("orden");

 if (caracteristicasData) {
  setCaracteristicas(caracteristicasData);
}

// Menú destacado
const {
  data: destacados,
  error: destacadosError,
} = await supabase
  .from("menu_destacado")
  .select(`
    *,
    productos (
      id,
      nombre,
      descripcion,
      precio,
      imagen_url
    )
  `)
  .eq("activo", true);


if (destacados && destacados.length > 0) {
  console.log(
    "PRIMER DESTACADO:",
    JSON.stringify(destacados[0], null, 2)
  );
}

if (destacados) {
  setMenuDestacado(destacados);
}

// Galería
const { data: galeriaData } = await supabase
  .from("galeria_restaurante")
  .select("*")
  .eq("restaurante_id", data.id)
  .eq("activo", true)
  .order("orden");

if (galeriaData) {
  setGaleria(galeriaData);
}
  }
  
  console.log(
  "RENDER RESTAURANT:",
  restaurant
);

  if (!restaurant) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Cargando restaurante...
      </div>
    );
  }

function calcularPrecio(precioBase: number) {
  if (!configuracion) return precioBase;

  const comision =
    configuracion.comision_wolf || 0;

  const tipo =
    configuracion.tipo_comision || "aumentada";

  if (tipo === "aumentada") {
    return precioBase + (precioBase * comision) / 100;
  }

  return precioBase;
}

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <HeroBanner slug={restaurant.slug} />

      {caracteristicas.length > 0 && (
        <section
          style={{
            maxWidth: "1200px",
            margin: "40px auto",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "18px",
          }}
        >
          {caracteristicas.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1b1b1b",
                borderRadius: "16px",
                padding: "18px",
                textAlign: "center",
                border: "1px solid #2c2c2c",
                minHeight: "140px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "8px",
                }}
              >
                {item.icono}
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  marginBottom: "5px",
                  color: "#fff",
                }}
              >
                {item.titulo}
              </h3>

              <p
                style={{
                  color: "#aaa",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                {item.valor}
              </p>
            </div>
          ))}
        </section>
      )}

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          Sobre Nosotros
        </h2>

        <p
          style={{
            color: "#d1d1d1",
            fontSize: "18px",
            lineHeight: "1.8",
            maxWidth: "900px",
          }}
        >
          {restaurant.descripcion}
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {restaurant.facebook && (
            <a
              href={restaurant.facebook}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#1f1f1f",
                color: "white",
                padding: "12px 18px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Facebook
            </a>
          )}

          {restaurant.instagram && (
            <a
              href={restaurant.instagram}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#1f1f1f",
                color: "white",
                padding: "12px 18px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Instagram
            </a>
          )}

          {restaurant.tiktok && (
            <a
              href={restaurant.tiktok}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#1f1f1f",
                color: "white",
                padding: "12px 18px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              TikTok
            </a>
          )}

{restaurant.whatsapp && (
  <a
    href={`/restaurante/${restaurant.slug}/order`}
    style={{
      background: "#25D366",
      color: "white",
      padding: "14px 26px",
      borderRadius: "14px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px",
      display: "inline-block",
    }}
  >
    Ordenar por WhatsApp
  </a>
)}
        </div>
   </section>

      {menuDestacado.length > 0 && (
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "25px",
            }}
          >
            Menú Destacado
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "20px",
            }}
          >
            {menuDestacado.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#1b1b1b",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #2a2a2a",
                }}
              >
                {item.productos?.imagen_url && (
                  <img
                    src={item.productos.imagen_url}
                    alt={item.productos.nombre}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div
                  style={{
                    padding: "18px",
                  }}
                >
                 <h3
  style={{
    marginBottom: "10px",
  }}
>
  {item.productos?.nombre}
</h3>
                  <p
                    style={{
                      color: "#bbb",
                      marginBottom: "15px",
                    }}
                  >
                    {item.productos?.descripcion}
                  </p>

<strong
  style={{
    color: "#f59e0b",
    fontSize: "20px",
  }}
>
  $
  {calcularPrecio(
    item.productos?.precio || 0
  ).toFixed(2)}
</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {galeria.length > 0 && (
        <section
          style={{
            maxWidth: "1200px",
            margin: "50px auto",
            padding: "0 20px 80px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "25px",
            }}
          >
            Galería
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "20px",
            }}
          >
            {galeria.map((foto) => (
              <div
                key={foto.id}
                style={{
                  overflow: "hidden",
                  borderRadius: "16px",
                }}
              >
                <img
                  src={foto.imagen_url}
                  alt={foto.titulo}
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
    );
}