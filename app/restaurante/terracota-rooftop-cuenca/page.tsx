"use client";

export default function Page() {

  const galeria = [
    "/terracota/Bocata de carne.jpg",
    "/terracota/Casuela de pescado.jpg",
    "/terracota/Fresh Lemonade.jpg",
    "/terracota/Mix de empanaditas.jpg",
    "/terracota/Padrino.jpg",
    "/terracota/Pastre.jpg",
    "/terracota/Pulpo.jpg",
    "/terracota/Sautéed Veggies.jpg",
    "/terracota/Taco salad.jpg",
  ];
    const destacados = [
  {
    nombre: "Pulpo a la Parrilla",
    imagen: "/terracota/Pulpo.jpg",
  },
  {
    nombre: "Mix de Empanaditas",
    imagen: "/terracota/Mix de empanaditas.jpg",
  },
  {
    nombre: "Taco Salad",
    imagen: "/terracota/Taco salad.jpg",
  },
];
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.80)), url('/terracota/banner.jpg')",
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
        color: "white",
        fontFamily: "Arial Back",
      }}
    >
      {/* HERO */}
      <section
        style={{
          height: "90vh",
          backgroundImage:
            "url('/terracota/Fotohero1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            padding: "40px",
            borderRadius: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: "10px",
            }}
          >
            Terracota Rooftop
          </h1>

          <p
            style={{
              fontSize: "1.3rem",
            }}
          >
            Vista 360° del Centro Histórico de Cuenca
          </p>

          <a href="/restaurante/terracota-rooftop-cuenca/order">
            <button
              style={{
                marginTop: "20px",
                padding: "15px 40px",
                background: "#ff7b00",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              Ordenar Ahora/Order Now
            </button>
          </a>
        </div>
      </section>

      {/* INFORMACIÓN */}
      <section
        style={{
          padding: "60px 20px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h2>Sobre Nosotros</h2>

        <p
          style={{
            lineHeight: "1.8",
            marginTop: "20px",
          }}
        >
          Terracota Rooftop es un restaurante y bar ubicado en el Centro
          Histórico de Cuenca, reconocido por sus impresionantes vistas
          panorámicas y su ambiente exclusivo.
        </p>

        <p>
          Dirección: 
          Presidente Borrero y Juan Jaramillo, Edificio Pacífico,
          quinto piso.
        </p>

       
      </section>

<section
  style={{
    padding: "60px 20px",
    maxWidth: "1400px",
    margin: "auto",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "30px",
    }}
  >
    Galería Terracota Rooftop
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "20px",
    }}
  >
    {galeria.map((foto, index) => (
      <img
        key={index}
        src={foto}
        alt="Terracota"
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />
    ))}
  </div>
  
</section>

      {/* MENÚ */}
      <section
        style={{
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
         {/* MENÚ DESTACADO */}
<section
  style={{
    padding: "60px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "40px",
    }}
  >
    Menú Destacado
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "auto",
    }}
  >
    {destacados.map((item, index) => (
      <div
        key={index}
        style={{
          background: "#1c1c1c",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <img
          src={item.imagen}
          alt={item.nombre}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
          }}
        />

        <div style={{ padding: "20px" }}>
          <h3>{item.nombre}</h3>
        </div>
      </div>
    ))}
  </div>

</section>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          <div
            style={{
              background: "#1c1c1c",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
          </div>
        </div>
      </section>
    </main>
  );
}