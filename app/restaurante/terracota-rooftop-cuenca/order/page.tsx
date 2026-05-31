"use client";

import { useState } from "react";
import { terracotaMenu } from "@/app/data/terracotamenu";

export default function OrderPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [serviceType, setServiceType] = useState("pickup");
  const [customerName, setCustomerName] = useState("");
const [customerPhone, setCustomerPhone] = useState("");
const [customerAddress, setCustomerAddress] = useState("");
const [customerReference, setCustomerReference] = useState("");

  const addToCart = (item: any) => {
    const exists = cart.find((p) => p.id === item.id);

    if (exists) {
      setCart(
        cart.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id: number) => {
    const exists = cart.find((p) => p.id === id);

    if (!exists) return;

    if (exists.quantity === 1) {
      setCart(cart.filter((p) => p.id !== id));
    } else {
      setCart(
        cart.map((p) =>
          p.id === id
            ? {
                ...p,
                quantity: p.quantity - 1,
              }
            : p
        )
      );
    }
  };

  const total = cart
    .reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    )
    .toFixed(2);

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #444",
  background: "#222",
  color: "white",
};

const goCheckout = () => {

  if (!customerName) {
    alert("Ingrese su nombre");
    return;
  }

  if (!customerPhone) {
    alert("Ingrese su teléfono");
    return;
  }

  localStorage.setItem(
    "terracotaOrder",
    JSON.stringify({
      cart,
      serviceType,
      customerName,
      customerPhone,
      customerAddress,
      customerReference,
    })
  );

  window.location.href =
    "/restaurante/terracota-rooftop-cuenca/order/checkout";
};
  return (
    <main
      style={{
        background: "#0f0f0f",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <section
        style={{
          padding: "40px 20px",
          background:
            "linear-gradient(135deg,#1a1a1a,#000)",
          borderBottom: "1px solid #222",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "auto",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Terracota Rooftop
          </h1>

          <p>
            📍 Presidente Borrero y Juan
            Jaramillo, Edificio Pacífico,
            quinto piso
          </p>

{/* MAPA */}

<section
  style={{
    padding: "30px 20px",
    maxWidth: "1400px",
    margin: "auto",
  }}
>
  <h2>Ubicación</h2>

  <div
    style={{
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid #333",
    }}
  >
    <iframe
      src="https://www.google.com/maps?q=Terracota+Rooftop+Cuenca&output=embed"
      width="100%"
      height="450"
      style={{
        border: 0,
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</section>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >
         
          </div>
        </div>
      </section>

      {/* HORARIOS */}

      <section
        style={{
          padding: "30px 20px",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >
        <h2>Horarios</h2>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <p>Domingo: Cerrado</p>
          <p>Lunes: Cerrado</p>
          <p>Martes: 4 PM - 12 AM</p>
          <p>Miércoles: 4 PM - 12 AM</p>
          <p>Jueves: 4 PM - 2 AM</p>
          <p>Viernes: 1 PM - 3 AM</p>
          <p>Sábado: 1 PM - 3 AM</p>
        </div>
      </section>

      {/* PICKUP DELIVERY */}

      <section
        style={{
          padding: "0 20px 30px",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() =>
              setServiceType("pickup")
            }
            style={{
              background:
                serviceType === "pickup"
                  ? "#ff7b00"
                  : "#222",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            PICKUP
          </button>

          <button
            onClick={() =>
              setServiceType("delivery")
            }
            style={{
              background:
                serviceType === "delivery"
                  ? "#ff7b00"
                  : "#222",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            DELIVERY
          </button>
        </div>

        <section
    style={{
      marginTop: "30px",
    }}
  >
    <h2>Información del Cliente</h2>

    <input
      type="text"
      placeholder="Nombre completo"
      value={customerName}
      onChange={(e) =>
        setCustomerName(e.target.value)
      }
      style={inputStyle}
    />

    <input
      type="text"
      placeholder="Teléfono"
      value={customerPhone}
      onChange={(e) =>
        setCustomerPhone(e.target.value)
      }
      style={inputStyle}
    />
{serviceType === "pickup" && (
  <div
    style={{
      background: "#1f1f1f",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px",
    }}
  >
    <h3>Retiro en Restaurante</h3>

    <select style={inputStyle}>
      <option>Lo antes posible</option>
      <option>30 minutos</option>
      <option>45 minutos</option>
      <option>1 hora</option>
    </select>
  </div>
)}

{serviceType === "delivery" && (
  <div
    style={{
      background: "#1f1f1f",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px",
    }}
  >
    <h3>Dirección de Entrega</h3>

    <input
      type="text"
      placeholder="Dirección"
      value={customerAddress}
      onChange={(e) =>
        setCustomerAddress(e.target.value)
      }
      style={inputStyle}
    />

    <input
      type="text"
      placeholder="Referencia"
      value={customerReference}
      onChange={(e) =>
        setCustomerReference(e.target.value)
      }
      style={inputStyle}
    />
  </div>
)}
   
  </section>




      </section>

      {/* BUSCADOR */}

      <section
        style={{
          maxWidth: "1400px",
          margin: "auto",
          padding: "0 20px 30px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar plato..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #333",
            background: "#181818",
            color: "white",
          }}
        />
      </section>

      {/* CONTENIDO */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 350px",
          gap: "30px",
          maxWidth: "1400px",
          margin: "auto",
          padding: "20px",
        }}
      >
        {/* MENU */}

        <div>
          {terracotaMenu.map((category) => (
            <div
              key={category.category}
              style={{
                marginBottom: "40px",
              }}
            >
              <h2
                style={{
                  color: "#ff7b00",
                }}
              >
                {category.category}
              </h2>

              {category.products
                .filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#1a1a1a",
                      borderRadius: "12px",
                      padding: "15px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <div>
                      <h4>{item.name}</h4>

  <p
    style={{
      color: "#bdbdbd",
      fontSize: "14px",
      marginTop: "5px",
      marginBottom: "8px",
    }}
  >
    {item.description}
  </p>

  <p
    style={{
      color: "#ff7b00",
      fontWeight: "bold",
    }}
  >
    ${item.price.toFixed(2)}
  </p>
</div>

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                      style={{
                        background:
                          "#ff7b00",
                        color: "white",
                        border: "none",
                        borderRadius:
                          "10px",
                        padding:
                          "10px 15px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* CARRITO */}

        <div
          style={{
            background: "#181818",
            borderRadius: "20px",
            padding: "20px",
            position: "sticky",
            top: "20px",
            height: "fit-content",
          }}
        >
          <h2>🛒 Tu Pedido</h2>

          {cart.length === 0 && (
            <p>
              No hay productos en el
              carrito
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "15px",
              }}
            >
              <strong>
                {item.name}
              </strong>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "8px",
                }}
              >
                <button
                  onClick={() =>
                    removeFromCart(
                      item.id
                    )
                  }
                >
                  -
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <hr />

          <h3>Total: ${total}</h3>

        
            <button
              onClick={goCheckout}
  style={{
                width: "100%",
                marginTop: "15px",
                padding: "15px",
                background: "#ff7b00",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
                
              Continuar Pedido
            </button>
        
        </div>
      </section>
    </main>
  );
}