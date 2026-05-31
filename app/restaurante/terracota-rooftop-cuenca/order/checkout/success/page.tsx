"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "lastOrder"
      );

    if (saved) {
      setOrder(
        JSON.parse(saved)
      );
    }
  }, []);

  const total =
    order?.cart?.reduce(
      (acc: number, item: any) =>
        acc +
        item.price * item.quantity,
      0
    ) || 0;

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
            Gracias por ordenar en
            Terracota Rooftop
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
                      Cantidad:
                      {" "}
                      {
                        item.quantity
                      }
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
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
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
                {total.toFixed(
                  2
                )}
              </span>
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
              Tiempo estimado:
              25 - 35 minutos
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href =
                "/restaurante/terracota-rooftop-cuenca/order")
            }
            style={{
              width: "100%",
              padding: "16px",
              background:
                "#ff7b00",
              color: "white",
              border: "none",
              borderRadius:
                "12px",
              fontSize: "18px",
              fontWeight:
                "bold",
              cursor: "pointer",
            }}
          >
            Realizar Otro Pedido
          </button>
        </div>
      </div>
    </main>
  );
}