"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function SeguimientoPedido() {
  const params = useParams();

  const token = params.token as string;

  const [pedido, setPedido] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  cargarPedido();

  const channel = supabase
    .channel("pedido-tracking")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "pedidos",
      },
      (payload) => {
        if (
          payload.new.token_seguimiento ===
          token
        ) {
          console.log(
            "ACTUALIZACION",
            payload.new
          );

          setPedido(payload.new);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const cargarPedido = async () => {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .eq("token_seguimiento", token)
      .single();

      console.log("PEDIDO TRACKING", data);

    if (!error) {
      setPedido(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Cargando pedido...
      </main>
    );
  }

  if (!pedido) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Pedido no encontrado
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#1c1c1c",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
          }}
        >
          Seguimiento del Pedido
        </h1>

        <p>
          <strong>Orden:</strong>{" "}
          {pedido.numero_orden}
        </p>

        <p>
          <strong>Cliente:</strong>{" "}
          {pedido.nombre_cliente}
        </p>

        <p>
          <strong>Teléfono:</strong>{" "}
          {pedido.telefono_cliente}
        </p>

        <hr
          style={{
            margin: "25px 0",
            borderColor: "#333",
          }}
        />

        <h2>Estado Actual</h2>

       <div
  style={{
    marginTop: "20px",
    padding: "20px",
    borderRadius: "15px",
    background: "#111",
    border: "1px solid #333",
    fontSize: "20px",
    fontWeight: "bold",
  }}
>
          {pedido.estado === "recibido" && (
            <div style={{ color: "#38ef7d" }}>
              ✅ Pedido recibido
            </div>
          )}

          {pedido.estado === "aceptado" && (
            <div style={{ color: "#4facfe" }}>
              🍳 Pedido en preparación
            </div>
          )}

          {pedido.estado === "listo" && (
  <div style={{ color: "#38ef7d" }}>
    ✅ Pedido listo para recoger
  </div>
)}

          {pedido.estado === "en_camino" && (
            <div style={{ color: "#ff9500" }}>
              🛵 Pedido en camino
            </div>
          )}

          {pedido.estado === "entregado" && (
            <div style={{ color: "#00d084" }}>
              🎉 Pedido entregado
            </div>
          )}

          {![
  "recibido",
  "aceptado",
  "listo",
  "en_camino",
  "entregado",
].includes(pedido.estado) && (
  <div>
    Estado: {pedido.estado}
  </div>
)}
        </div>
      </div>
    </main>
  );
}