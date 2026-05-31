"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

    const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] =
    useState("efectivo");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    reference: "",
  });
useEffect(() => {

  const savedOrder =
    localStorage.getItem(
      "terracotaOrder"
    );

  if (savedOrder) {
    setOrder(
      JSON.parse(savedOrder)
    );
  }

}, []);
  const handleSubmit = () => {

  if (!order) {
    alert("No existe pedido");
    return;
  }

  const orderNumber =
    "TC-" + Date.now();

  localStorage.setItem(
    "lastOrder",
    JSON.stringify({
      ...order,
      orderNumber,
      paymentMethod,
      createdAt:
        new Date().toISOString(),
    })
  );

  window.location.href =
    "/restaurante/terracota-rooftop-cuenca/order/checkout/success";
};
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
        </h1>

    
          
        {/* PAGO */}

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

  <div
    style={{
      color: "#ff7b00",
      fontSize: "42px",
      fontWeight: "800",
    }}
  >
    $
    {order?.cart
      ?.reduce(
        (acc: number, item: any) =>
          acc + item.price * item.quantity,
        0
      )
      .toFixed(2)}
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