"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<any[]>([]);
const [notificacionesSonido, setNotificacionesSonido] =
  useState(true);

const ultimoTotalRef = useRef(0);

function tiempoTranscurrido(fecha: string) {
  const ahora = new Date();

  const fechaPedido = new Date(fecha);

  const minutos = Math.floor(
    (ahora.getTime() - fechaPedido.getTime()) /
      1000 /
      60
  );

  if (minutos < 1) {
    return "Ahora mismo";
  }

  if (minutos < 60) {
    return `${minutos} min`;
  }

  const horas = Math.floor(
    minutos / 60
  );

  return `${horas} h`;
}

function calcularTiempoProduccion(
  inicio: string,
  fin: string
) {
  const minutos = Math.floor(
    (new Date(fin).getTime() -
      new Date(inicio).getTime()) /
      1000 /
      60
  );

  return `${minutos} min`;
}

async function cargarConfiguracion() {
  const { data } = await supabase
    .from("configuracion_restaurante")
    .select("notificaciones_sonido")
    .single();

  if (data) {
    setNotificacionesSonido(
      data.notificaciones_sonido
    );
  }
}
  async function cargarPedidos() {
  const { data, error } = await supabase
    .from("pedidos")
    .select(`
      *,
      clientes (
        nombre,
        telefono
      ),
      pedido_items (
        id,
        nombre_producto,
        cantidad,
        precio_unitario,
        subtotal
      )
    `)
    .order("id", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return;
  }

  const totalActual =
  data?.length || 0;

console.log(
  "TOTAL ACTUAL:",
  totalActual
);

console.log(
  "ULTIMO TOTAL:",
  ultimoTotalRef.current
);
console.log(
  "COMPARANDO:",
  totalActual,
  ultimoTotalRef.current
);
if (
  notificacionesSonido &&
  ultimoTotalRef.current > 0 &&
  totalActual > ultimoTotalRef.current
) {
  const audio = new Audio(
    "/Notificacion/Sonidorestaurant.mp3"
  );

  audio.play().catch(console.error);

  alert("🔔 Nuevo pedido recibido");
}


ultimoTotalRef.current = totalActual;


  console.log("TOTAL ACTUAL:", totalActual);



  console.log("PEDIDOS CARGADOS:", data?.length);


  setPedidos(data || []);
}

async function cambiarEstado(
  id: number,
  estado: string
) {
  const { error } = await supabase
  .from("pedidos")
  .update({
    estado,
    ...(estado === "entregado"
      ? {
          completed_at: new Date().toISOString(),
        }
      : {}),
  })
  .eq("id", id);

  if (error) {
    console.error(error);
    alert("Error actualizando estado");
    return;
  }
}

useEffect(() => {
  cargarConfiguracion();
  cargarPedidos();

  const channel = supabase
    .channel("admin-pedidos")

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "pedidos",
      },
      (payload) => {
        console.log(
          "CAMBIO PEDIDO",
          payload
        );

        cargarPedidos();
        
      }
    )

    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "pedido_items",
      },
      (payload) => {
        console.log(
          "CAMBIO ITEM",
          payload
        );

        cargarPedidos();
      }
    )

    .subscribe((status) => {
      console.log(
        "REALTIME STATUS:",
        status
      );
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  function colorEstado(estado: string) {
  switch (estado) {
    case "pendiente":
      return "#ef4444"; // rojo

    case "preparando":
      return "#3b82f6"; // azul

    case "listo":
      return "#f59e0b"; // naranja

    case "entregado_repartidor":
      return "#8b5cf6"; // morado

    case "en_camino":
      return "#06b6d4"; // cyan

    case "entregado":
      return "#22c55e"; // verde

    default:
      return "#666";
  }
}
const pedidosActivos = pedidos.filter(
  (p) =>
    p.estado !== "entregado" &&
    p.estado !== "cancelado"
);

const pedidosFinalizados = pedidos
  .filter(
    (p) =>
      p.estado === "entregado" ||
      p.estado === "cancelado"
  )
  .sort(
    (a, b) =>
      new Date(
        b.completed_at ||
          b.created_at
      ).getTime() -
      new Date(
        a.completed_at ||
          a.created_at
      ).getTime()
  );

  return (
    <main
      style={{
        padding: "40px",
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "15px",
        }}
      >
        Admin Pedidos
      </h1>

<button
  onClick={() => {
    const audio = new Audio(
      "/Notificacion/Sonidorestaurant.mp3"
    );

    audio.play().catch(console.error);
  }}
>
  
Sonido     
</button>
      <p
        style={{
          fontSize: "18px",
          color: "#aaa",
          marginBottom: "30px",
        }}
      >
        Total pedidos: {pedidos.length}
      </p>

      <p
  style={{
    fontSize: "18px",
    color: "#f59e0b",
    marginBottom: "30px",
    fontWeight: "bold",
  }}
>
  Pendientes: {
    pedidos.filter(
      (p) => p.estado === "pendiente"
    ).length
  }
</p>
<div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
<div
  style={{
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "15px",
    minWidth: "220px",
  }}
>
  <h3>Entregados</h3>

  <h1>
    {
      pedidos.filter(
        (p) =>
          p.estado === "entregado"
      ).length
    }
  </h1>
</div>

  <div
    style={{
      background: "#1a1a1a",
      padding: "20px",
      borderRadius: "15px",
      minWidth: "220px",
    }}
  >
    <h3>Total Pedidos</h3>

    <h1>{pedidos.length}</h1>
  </div>

  <div
    style={{
      background: "#1a1a1a",
      padding: "20px",
      borderRadius: "15px",
      minWidth: "220px",
    }}
  >
    <h3>Pendientes</h3>

    <h1>
      {
        pedidos.filter(
          (p) =>
            p.estado === "pendiente"
        ).length
      }
    </h1>
  </div>
</div>


      <h2
  style={{
    color: "#f59e0b",
    marginBottom: "20px",
  }}
>
🔥 Pedidos Activos ({pedidosActivos.length})
</h2>

{pedidosActivos.map((pedido) => (
  
        <div
          key={pedido.id}
          style={{
            background: "#1a1a1a",
            border: "1px solid #2c2c2c",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                color: "#f59e0b",
                margin: 0,
              }}
            >
              {pedido.numero_orden}
            </h2>

            <span
              style={{
                background: colorEstado(
                  pedido.estado
                ),
                padding: "8px 14px",
                borderRadius: "999px",
                fontWeight: "bold",
              }}
            >
              {pedido.estado}
            </span>
          </div>

          <p>
            <strong>ID:</strong> {pedido.id}
          </p>

          <p>
            <strong>Cliente:</strong>{" "}
            {pedido.clientes?.nombre}
          </p>

          <p>
            <strong>Teléfono:</strong>{" "}
            {pedido.clientes?.telefono}
          </p>

         <p>
  <strong>Subtotal:</strong> $
  {Number(
    pedido.subtotal || 0
  ).toFixed(2)}
</p>

<p>
  <strong>Delivery:</strong> $
  {Number(
    pedido.costo_delivery || 0
  ).toFixed(2)}
</p>

<p>
  <strong>Total Cliente:</strong> $
  {Number(
    pedido.total_cliente || 0
  ).toFixed(2)}
</p>

<p>
  <strong>Comisión Wolf:</strong> $
  {Number(
    pedido.comision_wolf || 0
  ).toFixed(2)}
</p>

<p>
  <strong>Total Restaurante:</strong> $
  {Number(
    pedido.total_restaurante || 0
  ).toFixed(2)}
</p>

          <p>
            <strong>Método Pago:</strong>{" "}
            {pedido.metodo_pago}
          </p>

<p>
  <strong>Servicio:</strong>{" "}
  {pedido.service_type}
</p>

          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(
              pedido.created_at
            ).toLocaleString()}
          </p>

<p
  style={{
    color: "#22c55e",
    fontWeight: "bold",
  }}
>
  ⏱ Tiempo:
  {" "}
  {tiempoTranscurrido(
    pedido.created_at
  )}
</p>

          <h3
            style={{
              color: "#f59e0b",
              marginTop: "25px",
            }}
          >
            Productos
          </h3>

          {pedido.pedido_items?.map(
            (item: any) => (
              <div
                key={item.id}
                style={{
                  background: "#222",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>
                    {item.nombre_producto}
                  </strong>
                </p>

                <p>
                  Cantidad: {item.cantidad}
                </p>

                <p>
                  Precio Unitario: $
                  {item.precio_unitario}
                </p>

                <p>
                  Subtotal: $
                  {item.subtotal}
                </p>
              </div>
            )
          )}

        <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <button
    onClick={() =>
      cambiarEstado(
        pedido.id,
        "pendiente"
      )
    }
    style={{
      padding: "10px 15px",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    }}
  >
    Pendiente
  </button>

  <button
    onClick={() =>
      cambiarEstado(
        pedido.id,
        "preparando"
      )
    }
    style={{
      padding: "10px 15px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    }}
  >
    Preparando
  </button>

  {pedido.service_type === "pickup" && (
    <>
      <button
        onClick={() =>
          cambiarEstado(
            pedido.id,
            "listo"
          )
        }
        style={{
          padding: "10px 15px",
          background: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Listo
      </button>

      <button
        onClick={() =>
          cambiarEstado(
            pedido.id,
            "entregado"
          )
        }
        style={{
          padding: "10px 15px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Entregado
      </button>
    </>
  )}

  {pedido.service_type === "delivery" && (
    <>
      <button
        onClick={() =>
          cambiarEstado(
            pedido.id,
            "listo"
          )
        }
        style={{
          padding: "10px 15px",
          background: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Listo
      </button>

      <button
        onClick={() =>
          cambiarEstado(
            pedido.id,
            "entregado_repartidor"
          )
        }
        style={{
          padding: "10px 15px",
          background: "#8b5cf6",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Repartidor
      </button>

      <button
        onClick={() =>
          cambiarEstado(
            pedido.id,
            "en_camino"
          )
        }
        style={{
          padding: "10px 15px",
          background: "#06b6d4",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        En Camino
      </button>

      <button
        onClick={() =>
          cambiarEstado(
            pedido.id,
            "entregado"
          )
        }
        style={{
          padding: "10px 15px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Entregado
      </button>
    </>
  )}
</div>    
 </div>
      ))}

      <h2
  style={{
    color: "#22c55e",
    marginTop: "40px",
    marginBottom: "20px",
  }}
>
✅ Pedidos Finalizados ({pedidosFinalizados.length})
</h2>

{pedidosFinalizados.map((pedido) => (
  <div
    key={pedido.id}
    style={{
      background: "#111",
      border: "1px solid #222",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "15px",
      opacity: 0.85,
    }}
  >
    <p>
      <strong>{pedido.numero_orden}</strong>
    </p>

    <p>
      {pedido.clientes?.nombre}
    </p>

    <p>
      {new Date(
        pedido.created_at
      ).toLocaleString()}
    </p>

<p>
  <strong>Finalizado:</strong>{" "}
  {pedido.completed_at
    ? new Date(
        pedido.completed_at
      ).toLocaleString()
    : "-"}
</p>

{pedido.completed_at && (
  <p
    style={{
      color: "#22c55e",
      fontWeight: "bold",
    }}
  >
    🍳 Tiempo Cocina:{" "}
    {calcularTiempoProduccion(
      pedido.created_at,
      pedido.completed_at
    )}
  </p>
)}

    <p
      style={{
        color: "#22c55e",
        fontWeight: "bold",
      }}
    >
      {pedido.estado}
    </p>
  </div>
))}
    </main>
  );
}