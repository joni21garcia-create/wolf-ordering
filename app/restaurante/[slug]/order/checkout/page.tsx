"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CheckoutPage() {

  const params = useParams();
  const slug = params.slug as string;

  console.log(
  "CHECKOUT PARAMS",
  params
);

console.log(
  "CHECKOUT SLUG",
  slug
);

console.log("CHECKOUT PARAMS", params);
console.log("CHECKOUT SLUG", slug);


const [order, setOrder] = useState<any>(null);

const router = useRouter();

const [configRestaurante, setConfigRestaurante] =
  useState<any>(null);

const [paymentMethod, setPaymentMethod] =
  useState("efectivo");

useEffect(() => {
  const cargarCheckout = async () => {

    const savedOrder =
      localStorage.getItem(
        "terracotaOrder"
      );

    if (!savedOrder) {
      router.push("/");
      return;
    }

    const parsed =
      JSON.parse(savedOrder);

    console.log(
      "ORDER FROM STORAGE",
      parsed
    );

    console.log(
      JSON.stringify(
        parsed,
        null,
        2
      )
    );

    setOrder(parsed);



    const { data: config } =
      await supabase
        .from(
          "configuracion_restaurante"
        )
        .select(
          "costo_delivery"
        )
        .eq(
          "restaurante_id",
          parsed.restaurantId
        )
        .single();

    console.log(
      "CONFIG DELIVERY",
      config
    );

    setConfigRestaurante(config);
  };

  cargarCheckout();

}, [router]);



const handleSubmit = async () => {

  console.log("ORDER", order);

  console.log(
    "RESTAURANT ID",
    order?.restaurantId
  );

    console.log("restaurantId =", order.restaurantId);
console.log("restauranteId =", order.restauranteId);

const total =
  order.cart.reduce(
    (acc: number, item: any) =>
      acc + item.price * item.quantity,
    0
  );

  const costoDelivery =
  order?.serviceType === "delivery"
    ? Number(
        configRestaurante?.costo_delivery || 0
      )
    : 0;

  const { data: config } = await supabase
  .from("configuracion_restaurante")
  .select(
    "comision_wolf, tipo_comision"
  )
  .single();

  const porcentaje =
  config?.comision_wolf || 0;

const tipo =
  config?.tipo_comision ||
  "aumentada";

const comisionWolf =
  Number(
    (
      total *
      (porcentaje / 100)
    ).toFixed(2)
  );

let totalCliente = total;

let totalRestaurante = total;

if (tipo === "aumentada") {
  totalCliente =
    total + comisionWolf +
    costoDelivery;

  totalRestaurante =
    total;
}

if (tipo === "descontada") {
  totalCliente =
    total +
    costoDelivery;

  totalRestaurante =
    total - comisionWolf +
    costoDelivery;
}

  console.log(
    "RESTAURANT SLUG",
    order?.restaurantSlug
  );

  if (!order) {
    alert("No existe pedido");
    return;
  }

  try {
    const orderNumber =
      "TC-" + Date.now();

    // =====================
    // CLIENTE
    // =====================

    const { data: cliente, error: clienteError } =
      await supabase
        .from("clientes")
        .insert([
          {
            nombre: order.customerName,
            telefono: order.customerPhone,
          },
        ])
        .select()
        .single();

    if (clienteError) throw clienteError;

    // =====================
    // PEDIDO
    // =====================

console.log("ORDER", order);

console.log(
  "RESTAURANT ID",
  order.restaurantId
);

console.log(
  "restaurantId =",
  order.restaurantId
);

const costoDelivery =
  order.serviceType === "delivery"
    ? Number(
        configRestaurante?.costo_delivery || 0
      )
    : 0;

console.log(
  "COSTO DELIVERY A GUARDAR:",
  costoDelivery
);

console.log("COSTO DELIVERY:", costoDelivery);
console.log("ORDER:", order);

console.log("TOTAL:", total);
console.log("DELIVERY:", costoDelivery);
console.log("TOTAL CLIENTE:", totalCliente);


    const { data: pedido, error: pedidoError } =
  await supabase
    .from("pedidos")
    .insert([
{
  restaurante_id: order.restaurantId,

  cliente_id: cliente.id,

  numero_orden: orderNumber,

  estado: "recibido",

  service_type: order.serviceType,

  subtotal: total,

  costo_delivery: costoDelivery,

  total_cliente: totalCliente,

  total_restaurante: totalRestaurante,

  comision_wolf: comisionWolf,

  metodo_pago: paymentMethod,

  telefono_cliente: order.customerPhone,

  nombre_cliente: order.customerName,

  token_seguimiento: crypto.randomUUID(),
}
])
    .select()
    .single();

    const trackingUrl =
`${window.location.origin}/seguimiento/${pedido.token_seguimiento}`;

console.log(
  "TRACKING URL",
  trackingUrl
);

    if (pedidoError) throw pedidoError;

    console.log("PEDIDO GUARDADO");
console.log(pedido);

    console.log("PEDIDO GUARDADO");
console.log(pedido);

    // =====================
    // ITEMS
    // =====================

const items = order.cart.map(
  (item: any) => ({
    pedido_id: pedido.id,



    nombre_producto: item.name,
    cantidad: item.quantity,
    precio_unitario: item.price,

    subtotal:
      item.price * item.quantity,
  })
);
console.log("CLIENTE", cliente);
console.log("PEDIDO", pedido);
console.log("ITEMS", items);

    const { error: itemsError } =
      await supabase
        .from("pedido_items")
        .insert(items);

    if (itemsError) throw itemsError;


localStorage.setItem(
  "lastOrder",
  JSON.stringify({
    ...order,
    orderNumber,
    paymentMethod,
    trackingUrl,
    trackingToken: pedido.token_seguimiento,

    deliveryCost: costoDelivery,
    costoDelivery: costoDelivery,
  })
);

console.log(
  "COSTO DELIVERY GUARDADO:",
  costoDelivery
);

alert(`SLUG = ${slug}`);         

window.location.href =
     `/restaurante/${slug}/order/success`

  } catch (error: any) {
    console.error("ERROR COMPLETO:", error);

    alert(
      JSON.stringify(error, null, 2)
    );
  }
};

if (!order) {
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
      Cargando pedido...
    </div>
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
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
<h1
  style={{
    fontSize: "42px",
    marginBottom: "30px",
  }}
>
  Checkout
</h1>

{order && (

  <div
    style={{
      background: "#1c1c1c",
      padding: "20px",
      borderRadius: "15px",
      marginBottom: "20px",
    }}
  >
    <div
  style={{
    background: "#1c1c1c",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "25px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      fontSize: "28px",
    }}
  >
    Datos del Pedido
  </h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      fontSize: "20px",
    }}
  >
    <div>
      👤 {order?.customerName}
    </div>

    <div>
      📞 {order?.customerPhone}
    </div>

    <div>
      🛍️{" "}
      {order?.serviceType === "pickup"
        ? "Retiro en Restaurante"
        : "Delivery"}
    </div>

    {order?.customerAddress && (
      <div>
        📍 {order?.customerAddress}
      </div>
    )}
  </div>
</div>

    {order.customerReference && (
      <p>
        <strong>Referencia:</strong>{" "}
        {order.customerReference}
      </p>
    )}
  </div>
)}
     
        <div
          style={{
            background: "#1c1c1c",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h2>Método de Pago</h2>

          <label style={radioStyle}>
            <input
              type="radio"
              checked={
                paymentMethod === "efectivo"
              }
              onChange={() =>
                setPaymentMethod("efectivo")
              }
            />
            Efectivo
          </label>

          <label style={radioStyle}>
            <input
              type="radio"
              checked={
                paymentMethod ===
                "transferencia"
              }
              onChange={() =>
                setPaymentMethod(
                  "transferencia"
                )
              }
            />
            Transferencia Banco Pichincha
          </label>

          <label style={radioStyle}>
            <input
              type="radio"
              checked={
                paymentMethod === "deuna"
              }
              onChange={() =>
                setPaymentMethod("deuna")
              }
            />
            Deuna
          </label>

          <label style={radioStyle}>
            <input
              type="radio"
              checked={
                paymentMethod ===
                "payphone"
              }
              onChange={() =>
                setPaymentMethod(
                  "payphone"
                )
              }
            />
            PayPhone
          </label>
        </div>

        {/* TRANSFERENCIA */}

        {paymentMethod ===
          "transferencia" && (
          <div style={boxStyle}>
            <h3>Banco Pichincha</h3>

            <p>
              Cuenta Corriente
            </p>

            <p>
              Número de Cuenta:
              XXXXXXXX
            </p>

            <p>
              Titular:
              Terracota Rooftop
            </p>
          </div>
        )}

        {/* DEUNA */}

        {paymentMethod === "deuna" && (
          <div style={boxStyle}>
            <h3>Pago por Deuna</h3>

            <p>
              Número:
              +593 99 292 6368
            </p>
          </div>
        )}

        {/* PAYPHONE */}

        {paymentMethod ===
          "payphone" && (
          <div style={boxStyle}>
            <h3>PayPhone</h3>

            <p>
              Realiza tu pago desde
              la App PayPhone.
            </p>
          </div>
        )}
        <hr
  style={{
    margin: "20px 0",
    borderColor: "#333",
  }}
/>

<div
  style={{
    background: "#1c1c1c",
    border: "1px solid #333",
    borderRadius: "20px",
    padding: "25px",
    marginTop: "25px",
  }}
>
  <h3
    style={{
      marginBottom: "25px",
      fontSize: "22px",
      fontWeight: "bold",
    }}
  >
    Resumen del Pedido
  </h3>

  {order?.cart?.map((item: any) => (
    <div
      key={item.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 0",
        borderBottom: "1px solid #2d2d2d",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {item.name}
        </div>

        <div
          style={{
            color: "#999",
            fontSize: "14px",
            marginTop: "5px",
          }}
        >
          Cantidad: {item.quantity}
        </div>
      </div>

      <div
        style={{
          color: "#ff7b00",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        $
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  ))}

  <div
  style={{
    marginTop: "25px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "15px",
    padding: "20px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
    <div>
    <div
      style={{
        color: "#999",
        fontSize: "14px",
      }}
    >
      Total a pagar
    </div>

    <div
      style={{
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
        <p
  style={{
    color: "#999",
    marginTop: "20px",
    fontSize: "14px",
  }}
>
  {order?.cart?.reduce(
    (acc: number, item: any) =>
      acc + item.quantity,
    0
  )} productos seleccionados
</p>
      TOTAL
    </div>
  </div>


<p
  style={{
    color: "#999",
    marginTop: "10px",
    fontSize: "14px",
  }}
>
  Delivery: $
  {order?.serviceType === "delivery"
    ? Number(
        configRestaurante?.costo_delivery || 0
      ).toFixed(2)
    : "0.00"}
</p>

  <div
    style={{
      color: "#ff7b00",
      fontSize: "42px",
      fontWeight: "800",
    }}
  >
 $
{(
  order?.cart?.reduce(
    (acc: number, item: any) =>
      acc + item.price * item.quantity,
    0
  ) +
  (
    order?.serviceType === "delivery"
      ? Number(
          configRestaurante?.costo_delivery || 0
        )
      : 0
  )
).toFixed(2)}
  </div>
</div>
</div>

<button
  onClick={handleSubmit}
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "25px",
    background:
      "linear-gradient(90deg,#ff7b00,#ff9500)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
  Confirmar Pedido
</button>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#222",
  color: "white",
};

const radioStyle = {
  display: "block" as const,
  marginTop: "15px",
};

const boxStyle = {
  background: "#1c1c1c",
  padding: "20px",
  borderRadius: "20px",
  marginBottom: "25px",
};