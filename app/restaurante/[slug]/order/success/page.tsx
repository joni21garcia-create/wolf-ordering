"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function SuccessPage() {
  const [order, setOrder] =
    useState<any>(null);

    const [configuracion, setConfiguracion] =
  useState<any>(null);

useEffect(() => {
  const saved =
    localStorage.getItem("lastOrder");

  if (saved) {
    const parsed =
      JSON.parse(saved);

    console.log(
      "SUCCESS ORDER",
      parsed
    );

    console.log(
      "DELIVERY COST:",
      parsed.deliveryCost
    );

    console.log(
      "COSTO DELIVERY:",
      parsed.costoDelivery
    );

    console.log(
      "TRACKING URL:",
      parsed.trackingUrl
    );
    

    setOrder(parsed);
  }
}, []);


  useEffect(() => {
  async function cargarConfiguracion() {
    const { data, error } =
      await supabase
        .from(
          "configuracion_restaurante"
        )
        .select("*")
        .eq("id", 1)
        .single();

    if (error) {
      console.log(error);
      return;
    }

    setConfiguracion(data);
  }

  cargarConfiguracion();
}, []);

 const total =
  order?.cart?.reduce(
    (acc: number, item: any) =>
      acc +
      item.price * item.quantity,
    0
  ) || 0;

const costoDelivery =
  order?.serviceType ===
  "delivery"
    ? Number(
        order?.deliveryCost ||
        order?.costoDelivery ||
        0
      )
    : 0;
    

const totalFinal =
  total + costoDelivery;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <div
          style={{
            background: "#1c1c1c",
            padding: "35px",
            borderRadius: "20px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            ✅ Pedido Recibido
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#999",
              marginBottom: "30px",
            }}
          >
            Gracias por ordenar en nuestro restaurante
          </p>

          {/* DATOS */}

          <div
            style={{
              background: "#262626",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "25px",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
              }}
            >
              📋 Datos del Pedido
            </h3>

            <p>
              👤 {order?.customerName}
            </p>

            <p>
              📞 {order?.customerPhone}
            </p>

            <p>
              🛍️ {order?.serviceType}
            </p>

            {order?.customerAddress && (
              <p>
                📍 {order?.customerAddress}
              </p>
            )}
          </div>

          {/* RESUMEN */}

<div
  style={{
    background: "#262626",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "25px",
  }}
>
  <h2
    style={{
      marginBottom: "25px",
    }}
  >
    🧾 Resumen del Pedido
  </h2>

  {order?.cart?.map(
    (item: any) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          padding:
            "15px 0",
          borderBottom:
            "1px solid #333",
        }}
      >
        <div>
          <div
            style={{
              fontWeight:
                "bold",
              fontSize:
                "16px",
            }}
          >
            {item.name}
          </div>

          <div
            style={{
              color:
                "#999",
              marginTop:
                "5px",
              fontSize:
                "14px",
            }}
          >
            Cantidad:{" "}
            {item.quantity}
          </div>
        </div>

        <div
          style={{
            color:
              "#ff7b00",
            fontWeight:
              "bold",
            fontSize:
              "20px",
          }}
        >
          $
          {(
            item.price *
            item.quantity
          ).toFixed(2)}
        </div>
      </div>
    )
  )}

  <div
    style={{
      marginTop: "25px",
      paddingTop: "20px",
      borderTop:
        "2px solid #444",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        marginBottom:
          "10px",
      }}
    >
      <span>Subtotal</span>

      <span>
        ${total.toFixed(2)}
      </span>
    </div>

    {order?.serviceType ===
      "delivery" && (
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom:
            "10px",
        }}
      >
        <span>Delivery</span>

        <span>
          $
          {Number(
            order?.deliveryCost ||
              order?.costoDelivery ||
              0
          ).toFixed(2)}
        </span>
      </div>
    )}

    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        marginTop:
          "15px",
        paddingTop:
          "15px",
        borderTop:
          "2px solid #555",
      }}
    >
      <span
        style={{
          fontSize:
            "24px",
          fontWeight:
            "bold",
        }}
      >
        TOTAL
      </span>

      <span
        style={{
          color:
            "#ff7b00",
          fontSize:
            "34px",
          fontWeight:
            "bold",
        }}
      >
        $
        {(
          total +
          Number(
            order?.deliveryCost ||
              order?.costoDelivery ||
              0
          )
        ).toFixed(2)}
      </span>
    </div>
  </div>
</div>
          {/* ESTADO */}

          <div
            style={{
              background: "#262626",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "25px",
            }}
          >
            <h3>
              📦 Estado del Pedido
            </h3>

            <p
              style={{
                color:
                  "#4ade80",
                fontWeight:
                  "bold",
                marginTop:
                  "15px",
              }}
            >
              ● Pedido Recibido
            </p>

            <p
              style={{
                color: "#ccc",
                marginTop:
                  "10px",
              }}
            >
              Tu pedido fue enviado
              correctamente al
              restaurante.
            </p>

<p
  style={{
    color:
      "#ff7b00",
    fontWeight:
      "bold",
    marginTop:
      "10px",
  }}
>
  Tiempo estimado:{" "}
  {configuracion
    ? `${configuracion.tiempo_min} - ${configuracion.tiempo_max} minutos`
    : "Cargando..."}
</p>
        </div>
       <>
  <button
    onClick={() =>
      (window.location.href =
        `/restaurante/${order?.restaurantSlug}/order`)
    }
    style={{
      width: "100%",
      padding: "16px",
      background: "#ff7b00",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Realizar Otro Pedido
  </button>

  {order?.trackingUrl && (
    <button
      onClick={() =>
        window.open(
          order.trackingUrl,
          "_blank"
        )
      }
      style={{
        width: "100%",
        marginTop: "15px",
        padding: "16px",
        background: "#222",
        color: "white",
        border: "1px solid #444",
        borderRadius: "12px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      🔍 Consultar Mi Pedido
    </button>
  )}
</>
        </div>
      </div>
    </main>
  );
}
