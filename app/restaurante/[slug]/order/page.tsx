"use client";

import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

import { useParams } from "next/navigation";

export default function OrderPage() {

  const params = useParams();

  const slug = params.slug as string;

  if (!slug || slug === "[slug]") {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Restaurante no encontrado
    </div>
  );
}

    const [restaurant, setRestaurant] =
  useState<any>(null);

const [productos, setProductos] =
  useState<any[]>([]);


useEffect(() => {
  if (slug) {
    loadRestaurant();
  }
}, [slug]);

useEffect(() => {
  const interval = setInterval(() => {
    setPromoIndex((prev) => (prev === 0 ? 1 : 0));
  }, 4000);

  return () => clearInterval(interval);
}, []);

const loadRestaurant = async () => {
  try {
    const { data: restaurante } =
      await supabase
        .from("restaurantes")
        .select("*")
       .eq("slug", slug)
        .single();

    if (!restaurante) return;

     console.log(
      "RESTAURANTE ID",
      restaurante.id
    );
 
const {
  data: config,
  error: configError
} = await supabase
  .from("configuracion_restaurante")
  .select("comision_wolf,tipo_comision")
  .eq("restaurante_id", restaurante.id)
  .single();

console.log("CONFIG ERROR", configError);

console.log(
  "RESTAURANTE ID",
  restaurante.id
);

console.log(
  "CONFIG",
  config
);

console.log(
  "CONFIG ERROR",
  configError
);

console.log(
  "RESTAURANTE CONFIG",
  restaurante.configuracion
);
restaurante.configuracion = config;

alert(
  JSON.stringify(config)
);

console.log("CONFIG", config);

if (configError) {
  console.log("ERROR CONFIG", configError);
}

    console.log(
      "CONFIG",
      config
    );


    restaurante.configuracion =
      config;

    setRestaurant(restaurante);

    console.log(
  "RESTAURANTE COMPLETO",
  restaurante
);

    if (
      restaurante.pickup_enabled
    ) {
      setServiceType("pickup");
    } else if (
      restaurante.delivery_enabled
    ) {
      setServiceType("delivery");
    }

    const { data: productosDB } =
      await supabase
        .from("productos")
        .select("*")
        .eq(
          "restaurante_id",
          restaurante.id
        )
        .eq(
          "disponible",
          true
        );

let productosProcesados = productosDB || [];

if (
  config?.tipo_comision === "aumentada"
) {
  productosProcesados =
    productosProcesados.map(
      (producto: any) => ({
        ...producto,
        price:
          Number(producto.precio) *
          (
            1 +
            config.comision_wolf / 100
          ),
      })
    );
}

setProductos(productosProcesados);
  
  } catch (error) {
    console.log(error);
  }
};


  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [serviceType, setServiceType] = useState("pickup");
  const [customerName, setCustomerName] = useState("");
const [customerPhone, setCustomerPhone] = useState("");
const [customerAddress, setCustomerAddress] = useState("");
const [customerReference, setCustomerReference] = useState("");
const [promoIndex, setPromoIndex] = useState(0);
const [formError, setFormError] =
  useState("");

const [nameError, setNameError] =
  useState("");

const [phoneError, setPhoneError] =
  useState("");

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

const subtotal = cart.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);

const comision =
  restaurant?.configuracion?.comision_wolf || 0;

const tipoComision =
  restaurant?.configuracion?.tipo_comision;

let totalFinal = subtotal;


const total = totalFinal.toFixed(2);

console.log("SUBTOTAL", subtotal);
console.log("COMISION", comision);
console.log("TIPO", tipoComision);
console.log("TOTAL", total);

const inputStyle = {
  width: "100%",
  padding: "18px 20px",
  marginTop: "12px",
  borderRadius: "16px",
  border: "1px solid #2a2a2a",
  background: "#1b1b1b",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const validarYContinuar = () => {

   if (
    !cart ||
    cart.length === 0
  ) {
    setFormError(
      "Debe agregar al menos un producto"
    );
    return;
  }

  if (
    serviceType === "delivery" &&
    !customerAddress?.trim()
  ) {
    setFormError(
      "La dirección es obligatoria"
    );
    return;
  }

  if (
    !customerName ||
    customerName.trim().length < 3
  ) {
    setFormError(
      "Ingrese un nombre válido"
    );
    return;
  }

  const telefono =
    customerPhone?.replace(/\D/g, "");

  if (
    !telefono ||
    telefono.length < 10
  ) {
    setFormError(
      "Ingrese un teléfono válido"
    );
    return;
  }

  setFormError("");

  goCheckout();
};


const goCheckout = () => {

if (!customerName.trim()) {
  setNameError(
    "Ingrese su nombre"
  );
  return;
}

if (
  !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(
    customerName
  )
) {
  setNameError(
    "Solo letras permitidas"
  );
  return;
}

setNameError("");

if (!/^\d{10}$/.test(customerPhone)) {
  setPhoneError(
    "Debe tener exactamente 10 números"
  );
  return;
}

setPhoneError("");

if (
  serviceType === "delivery" &&
  !customerAddress.trim()
) {
  alert(
    "Ingrese la dirección de entrega"
  );
  return;
}

localStorage.setItem(
  "terracotaOrder",
  JSON.stringify({
    restaurantId: restaurant.id,
    restaurantSlug: restaurant.slug,

    cart,
    serviceType,
    customerName,
    customerPhone,
    customerAddress,
    customerReference,
  })
);

window.location.href =
`/restaurante/${slug}/order/checkout`;
};

if (!restaurant) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
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
    padding: "120px 20px 80px",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid #222",

backgroundImage: `
  linear-gradient(
    rgba(0,0,0,.85),
    rgba(0,0,0,.92)
    
  ),
  url(${restaurant?.banner_principal})
`,

backgroundAttachment: "fixed",

    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div
    style={{
      maxWidth: "1400px",
      margin: "auto",
    }}
  >
  <img
  src={restaurant?.logo_url}
  alt={restaurant?.nombre}
  style={{
    width: "220px",
    height: "220px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid rgba(255,123,0,.4)",
    boxShadow:
      "0 20px 50px rgba(255,123,0,.15)",
  }}
/>

   <div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "15px",
    color: "#d1d5db",
    fontSize: "15px",
  }}
>
   
  

</div>

</div>

</section>
{/* MAPA */}

<section
style={{
  marginTop: "50px",
  position: "relative",
  overflow: "hidden",

  backgroundImage: `
    linear-gradient(
      rgba(0,0,0,.75),
      rgba(0,0,0,.75)
    ),
    url(${restaurant?.fondo_premium})
  `,

  backgroundSize: "cover",
  backgroundPosition: "center",

  borderRadius: "30px",
  padding: "40px",
}}
>
  <div
  style={{
    marginBottom: "20px",
  }}
>
  <h2>
   📍 Ubicación
  </h2>


</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "30px",
    alignItems: "stretch",
  }}
>
   {/* MAPA */}

<div
  style={{
    width: "100%",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
  }}
>
  <div
    onClick={() =>
      window.open(
        "https://www.google.com/maps/search/?api=1&query=Terracota+Rooftop+Cuenca",
        "_blank"
      )
    }
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 10,
    }}
  />

  <iframe
    src="https://maps.google.com/maps?q=Terracota%20Rooftop%20Cuenca&t=&z=17&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="520"
    style={{
      border: 0,
      borderRadius: "20px",
      pointerEvents: "none",
    }}
    loading="lazy"
  />
</div>

<div
  style={{
    width: "100%",
  }}
>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
       "repeat(2, 1fr)",
    gap: "15px",
    marginTop: "15px",
  }}
>
{[
  restaurant?.promo_1,
  restaurant?.promo_2,
  restaurant?.promo_3,
  restaurant?.promo_4,
  restaurant?.promo_5,
  restaurant?.promo_6,
  restaurant?.promo_7,
]
.filter(Boolean)
.map((foto, index) => (

    <div
      key={index}
style={{
    gridRow:
      index === 0
        ? "span 2"
        : "span 1",

    height:
      index === 0
        ? "280px"
        : "130px",

    overflow: "hidden",
    borderRadius: "16px",
    border:
      "1px solid rgba(255,140,0,.18)",
    boxShadow:
      "0 15px 40px rgba(0,0,0,.45)",
      
          cursor: "pointer",
    position: "relative",
  }}
>
<div
  style={{
    position: "absolute",
    inset: 0,

    background:
      "linear-gradient(to top, rgba(0,0,0,.55), transparent 50%)",

    zIndex: 1,

    pointerEvents: "none",
  }}
/>

<img
  src={foto}
  alt="Galería"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",

    transition:
      "all .5s ease",

    transform:
      index === 0
        ? "scale(1.02)"
        : "scale(1)",
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "scale(1.08)";

    e.currentTarget.style.filter =
      "brightness(1.15)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      index === 0
        ? "scale(1.02)"
        : "scale(1)";

    e.currentTarget.style.filter =
      "brightness(1)";
  }}
/>
    </div>
  ))}
</div>
  
</div>
  </div>
</section>

{/* PICKUP DELIVERY */}

<section
  style={{
background: "#171717",
padding: "25px",
borderRadius: "20px",
border: "1px solid #252525",
  }}
>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  {restaurant?.pickup_enabled && (
  <button
    onClick={() =>
      setServiceType("pickup")
    }
    style={{
      background:
        serviceType === "pickup"
          ? "linear-gradient(135deg,#ff7b00,#ff9d2e)"
          : "#1b1b1b",

      color: "white",

      border:
        serviceType === "pickup"
          ? "1px solid rgba(255,123,0,.4)"
          : "1px solid #2a2a2a",

      padding: "18px 35px",

      borderRadius: "18px",

      cursor: "pointer",

      fontWeight: "700",

      fontSize: "15px",

      boxShadow:
        serviceType === "pickup"
          ? "0 10px 25px rgba(255,123,0,.35)"
          : "none",
    }}
  >
    🍽️ Pickup
  </button>
)}

{restaurant?.delivery_enabled && (
  <button
    onClick={() =>
      setServiceType("delivery")
    }
    style={{
      background:
        serviceType === "delivery"
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : "#1b1b1b",

      color: "white",

      border:
        serviceType === "delivery"
          ? "1px solid rgba(34,197,94,.4)"
          : "1px solid #2a2a2a",

      padding: "18px 35px",

      borderRadius: "18px",

      cursor: "pointer",

      fontWeight: "700",

      fontSize: "15px",

      boxShadow:
        serviceType === "delivery"
          ? "0 10px 25px rgba(34,197,94,.35)"
          : "none",
    }}
  >
    🚚 Delivery
  </button>
)}
</div>
        </div>

        <section
style={{
    marginTop: "40px",
    background: "#121212",
    border: "1px solid #222",
    borderRadius: "24px",
    padding: "30px",
    boxShadow:
      "0 20px 50px rgba(0,0,0,.35)",
  }}
>
    <div
  style={{
    marginBottom: "25px",
  }}
>
  <h2
    style={{
      fontSize: "28px",
      marginBottom: "8px",
    }}
  >
    Información del Cliente
  </h2>

  <p
    style={{
      color: "#888",
      fontSize: "15px",
    }}
  >
    Completa tus datos para continuar el pedido
  </p>
</div>

    <input
      type="text"
      placeholder="Nombre completo"
      value={customerName}
      onChange={(e) =>
        setCustomerName(e.target.value)
      }
      style={inputStyle}
    />

{nameError && (
  <p
    style={{
      color: "#ff4d4f",
      marginTop: "5px",
    }}
  >
    {nameError}
  </p>
)}

    <input
      type="text"
      placeholder="Teléfono"
      value={customerPhone}
onChange={(e) =>
  setCustomerPhone(
    e.target.value.replace(
      /\D/g,
      ""
    )
  )
}
      style={inputStyle}
    />


{phoneError && (
  <p
    style={{
      color: "#ff4d4f",
      marginTop: "5px",
    }}
  >
    {phoneError}
  </p>
)}

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
    margin: "40px auto",
    padding: "0 20px",
  }}
>
  <div
    style={{
      background: "#111",
      border: "1px solid #222",
      borderRadius: "20px",
      padding: "18px 25px",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      boxShadow:
        "0 10px 30px rgba(0,0,0,.25)",
    }}
  >
    <span
      style={{
        fontSize: "22px",
      }}
    >
      🔍
    </span>

    <input
      type="text"
      placeholder="Buscar hamburguesas, pizzas, bebidas..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        flex: 1,
        background: "transparent",
        border: "none",
        color: "white",
        fontSize: "17px",
        outline: "none",
      }}
    />
  </div>
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
  {productos
    .filter((item) =>
      item.nombre
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((item) => (
<div
  key={item.id}
  style={{
 background: "#171717",
  border: "1px solid #262626",
  borderRadius: "22px",
  padding: "22px",
  marginBottom: "18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: ".3s",
}}
>
       <div>
  <h4
    style={{
      fontSize: "22px",
      marginBottom: "8px",
      fontWeight: "700",
    }}
  >
    {item.nombre}
  </h4>

         <p
    style={{
      color: "#bdbdbd",
      fontSize: "14px",
      marginTop: "5px",
      marginBottom: "8px",
    }}
  >
    {item.descripcion}
  </p>

  <div
    style={{
      color: "#ff7b00",
      fontSize: "22px",
      fontWeight: "700",
      marginTop: "10px",
    }}
  >
   
   ${
(
restaurant?.configuracion?.tipo_comision ===
"aumentada"
  ? Number(item.precio) *
    (
      1 +
      (restaurant?.configuracion?.comision_wolf || 0) /
        100
    )
  : Number(item.precio)
).toFixed(2)
}

  </div>
</div>

<button
  onClick={() =>
    addToCart({
      id: item.id,
      name: item.nombre,
      price:
        restaurant?.configuracion?.tipo_comision === "aumentada"
          ? Number(item.precio) *
            (
              1 +
              (restaurant?.configuracion?.comision_wolf || 0) /
                100
            )
          : Number(item.precio),
    })
  }
  style={{
    background:
      "linear-gradient(135deg,#ff7b00,#ff9d2e)",
    color: "white",
    border: "none",
    borderRadius: "16px",
    width: "55px",
    height: "55px",
    fontSize: "24px",
    fontWeight: "700",
    cursor: "pointer",
  }}
>
  +
</button>
      </div>
    ))}
</div>

        {/* CARRITO */}

       <div
  style={{
    background: "#151515",
    border: "1px solid #2a2a2a",
    borderRadius: "28px",
    padding: "25px",
    position: "sticky",
    top: "20px",
    height: "fit-content",
    boxShadow:
      "0 20px 50px rgba(0,0,0,.45)",
  }}
>
  <h2
    style={{
      fontSize: "28px",
      marginBottom: "20px",
    }}
  >
    🛒 Tu Pedido
  </h2>

  <div
    style={{
      background: "#1d1d1d",
      borderRadius: "16px",
      padding: "12px 15px",
      marginBottom: "20px",
      color: "#ff7b00",
      fontWeight: "700",
    }}
  >
    {cart.length} productos agregados
  </div>

  {cart.length === 0 && (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        color: "#888",
      }}
    >
      Tu carrito está vacío
    </div>
  )}

  {cart.map((item) => (
    <div
      key={item.id}
      style={{
        background: "#1b1b1b",
        borderRadius: "18px",
        padding: "15px",
        marginBottom: "15px",
        border: "1px solid #262626",
      }}
    >
      <strong
        style={{
          fontSize: "17px",
        }}
      >
        {item.name}
      </strong>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "10px",
              border: "none",
              background: "#252525",
              color: "white",
              cursor: "pointer",
            }}
          >
            −
          </button>

          <span
            style={{
              fontWeight: "700",
            }}
          >
            {item.quantity}
          </span>

          <button
            onClick={() =>
              addToCart(item)
            }
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(135deg,#ff7b00,#ff9d2e)",
              color: "white",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>

        <strong
          style={{
            color: "#ff7b00",
          }}
        >
          $
          {(
            item.price *
            item.quantity
          ).toFixed(2)}
        </strong>
      </div>
    </div>
  ))}

  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      borderRadius: "18px",
      background:
        "linear-gradient(135deg,#1d1d1d,#252525)",
      border: "1px solid #333",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
      }}
    >
      <span>Total</span>

      <strong
        style={{
          fontSize: "26px",
          color: "#ff7b00",
        }}
      >
        ${total}
      </strong>
    </div>
  </div>
{formError && (
  <div
    style={{
      position: "fixed",
      bottom: "95px",
      right: "20px",
      background: "#7f1d1d",
      color: "white",
      padding: "12px 16px",
      borderRadius: "12px",
      fontWeight: "bold",
      zIndex: 9999,
      maxWidth: "300px",
    }}
  >
    ⚠ {formError}
  </div>
)}
<button
  onClick={validarYContinuar}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background:
      "linear-gradient(135deg,#ff7b00,#ff9d2e)",
    color: "white",
    border:
      "1px solid rgba(255,255,255,.12)",
    borderRadius: "18px",
    padding: "12px 18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontWeight: "700",
    boxShadow:
      "0 10px 30px rgba(255,123,0,.35)",
    zIndex: 9999,
  }}
>
  Continuar Pedido →
</button>
</div>
      </section>
    </main>
  );
}