"use client";

import Image from "next/image";
import {
  ShoppingCart,
  Laptop,
  Globe,
  Timer,
  MapPin,
  UtensilsCrossed,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";

export default function Home() {

  const handleWhatsApp = () => {
  const phone = "593989328777";

  const message = encodeURIComponent(
    "Hola, me gustaría recibir asesoría sobre Wolf Ordering para mi restaurante."
  );

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );
};

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();

  const form = e.currentTarget;

  const formData = {
    cargo: (form.elements.namedItem("cargo") as HTMLSelectElement)?.value,
    nombre: (form.elements.namedItem("nombre") as HTMLInputElement)?.value,
    apellido: (form.elements.namedItem("apellido") as HTMLInputElement)?.value,
    correo: (form.elements.namedItem("correo") as HTMLInputElement)?.value,
    telefono: (form.elements.namedItem("telefono") as HTMLInputElement)?.value,
    restaurante: (form.elements.namedItem("restaurante") as HTMLInputElement)?.value,
    mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement)?.value,
  };

  try {

    await fetch(
      "https://script.google.com/macros/s/AKfycbynzAevCtZpp--ldA8MdjIBkmXvnzkPx_ITU88uY2Bg5f-axnpOYrS0FkzF7iy1oX0O/exec",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    alert("Información enviada correctamente");

    form.reset(); // ← limpia todos los campos

  } catch (err) {

    console.log(err);

    alert("Error al enviar");

  }
};  
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        html{
          scroll-behavior:smooth;
        }

        body{
          background:#050505;
          font-family:Arial,sans-serif;
          overflow-x:hidden;
          color:white;
        }

        a{
          text-decoration:none;
        }

        img{
          max-width:100%;
          height:auto;
          display:block;
        }

        /* NAVBAR */

        .navbar{
          width:100%;
          position:fixed;
          top:0;
          left:0;
          z-index:999;

          display:flex;
          justify-content:space-between;
          align-items:center;

          padding:18px 55px;

          background:rgba(0,0,0,0.94);

          border-bottom:1px solid #141414;

          backdrop-filter:blur(10px);
        }

        .nav-left{
          display:flex;
          align-items:center;
          gap:16px;
        }

.nav-left{
  display:flex;
  align-items:center;
  gap:18px;
}

/* LOGO */

.wolf-logo{
  width:240px !important;
  height:auto !important;

  animation:pulseGlow 3s infinite;
}

@keyframes pulseGlow{

  0%{
    filter:drop-shadow(0 0 0px rgba(255,145,0,.2));
  }

  50%{
    filter:drop-shadow(0 0 18px rgba(255,145,0,.8));
  }

  100%{
    filter:drop-shadow(0 0 0px rgba(255,145,0,.2));
  }

}

/* CONTENEDOR NOMBRE */

.wolf-name-wrapper{
  position:relative;

  width:320px;
  height:95px;

  overflow:hidden;
}

/* IMAGEN NOMBRE */

.wolf-name{
  object-fit:contain;
  transition:.4s ease;
}

.wolf-name-wrapper:hover .wolf-name{
  transform:translateX(4px);
  filter:
    drop-shadow(0 0 12px rgba(255,145,0,.5));
}

        .nav-links{
          display:flex;
          align-items:center;
          gap:42px;
        }

        .nav-links a{
          color:white;
          font-size:17px;
          font-weight:600;
          transition:0.25s ease;
        }

        .nav-links a:hover{
          color:#ff9100;
        }

        .nav-button{
  background:linear-gradient(
    135deg,
    #ff7b00,
    #ff9900
  );

  color:white;

  border:none;

  padding:12px 20px;

  border-radius:12px;

  font-size:15px;
  font-weight:700;

  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;

  white-space:nowrap;

  box-shadow:
    0 8px 20px rgba(255,145,0,.25);

  transition:.3s;
}

.nav-button:hover{
  transform:translateY(-2px);
}

        /* HERO */

        .hero{
          min-height:100vh;

          display:flex;
          align-items:center;
          justify-content:center;

          padding:
            160px 50px
            90px 50px;

          background:
            linear-gradient(
              rgba(0,0,0,0.78),
              rgba(0,0,0,0.80)
            ),
            url("https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1920&auto=format&fit=crop");

          background-size:cover;
          background-position:center;
        }

        .hero-content{
          width:100%;
          max-width:1400px;

          display:grid;
          grid-template-columns:
            1fr 450px;

          gap:70px;

          align-items:center;
        }

        .hero-left h1{
          font-size:82px;
          line-height:1.05;
          font-weight:300;

          margin-bottom:28px;
        }

        .hero-left strong{
          color:#ff9100;
          font-weight:bold;
        }

        .hero-left p{
          font-size:23px;
          line-height:1.7;

          color:#d2d2d2;

          max-width:720px;
        }

        .hero-buttons{
          margin-top:38px;

          display:flex;
          gap:18px;
          flex-wrap:wrap;
        }

.hero-btn{
  padding:16px 28px;

  border:none;
  border-radius:14px;

  font-size:16px;
  font-weight:bold;

  cursor:pointer;

  transition:0.25s ease;

  display:flex;
  align-items:center;
  gap:10px;
}

        .primary-btn{
          background:linear-gradient(
            90deg,
            #ff7b00,
            #ff9900
          );

          color:white;
        }

      .secondary-btn{
  background:#0f0f0f;
  border:2px solid #ff9100;
  color:#ff9100;
}

.secondary-btn:hover{
  background:#ff9100;
  color:white;
}

        .hero-btn:hover{
          transform:translateY(-4px);
        }

        /* CONTACT PANEL */

        .contact-panel{
          background:rgba(8,8,8,0.92);

          border:1px solid #1c1c1c;

          border-radius:26px;

          padding:35px;

          backdrop-filter:blur(12px);

          box-shadow:
            0 0 40px rgba(0,0,0,0.5);
        }

        .contact-panel h2{
          font-size:42px;
          text-align:center;
          margin-bottom:10px;
        }

        .contact-panel p{
          text-align:center;
          color:#aaaaaa;
          margin-bottom:28px;
        }

        .form-group{
          margin-bottom:16px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select{
          width:100%;

          padding:15px;

          background:#101010;

          border:1px solid #232323;

          border-radius:12px;

          color:white;

          outline:none;

          font-size:15px;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus{
          border-color:#ff9100;
        }

        .submit-btn{
          width:100%;

          padding:16px;

          border:none;

          border-radius:14px;

          background:linear-gradient(
            90deg,
            #ff7b00,
            #ff9900
          );

          color:white;

          font-size:16px;
          font-weight:bold;

          cursor:pointer;

          transition:0.25s ease;
        }

        .submit-btn:hover{
          transform:translateY(-3px);
        }

        /* SERVICES */

        .services{
          padding:110px 50px;
          background:#070707;
        }

        .section-title{
          text-align:center;

          font-size:56px;
          font-weight:300;

          margin-bottom:20px;
        }

        .section-title strong{
          color:#ff9100;
        }

        .section-subtitle{
          text-align:center;

          max-width:850px;

          margin:auto auto 70px auto;

          color:#b7b7b7;

          font-size:20px;
          line-height:1.7;
        }

        .services-grid{
          max-width:1400px;

          margin:auto;

          display:grid;

          grid-template-columns:
            repeat(auto-fit,minmax(260px,1fr));

          gap:28px;
        }

        .service-card{
          background:#0c0c0c;

          border:1px solid #1b1b1b;

          border-radius:28px;

          padding:45px 30px;

          text-align:center;

          transition:0.3s ease;
        }

        .service-card:hover{
          transform:translateY(-8px);

          border-color:#ff9100;

          box-shadow:
            0 0 30px rgba(255,145,0,0.12);
        }

        .service-icon{
          width:78px;
          height:78px;

          margin:auto auto 24px auto;

          border-radius:22px;

          display:flex;
          justify-content:center;
          align-items:center;

          background:rgba(255,145,0,0.08);

          border:1px solid rgba(255,145,0,0.2);
        }

        .service-icon svg{
          width:38px;
          height:38px;
          color:#ff9100;
          stroke-width:2;
        }

        .service-card h3{
          font-size:32px;
          margin-bottom:18px;
        }

        .service-card p{
          color:#b9b9b9;
          line-height:1.8;
          font-size:18px;
        }

        /* ABOUT */

        .about{
          padding:120px 60px;

          background:
            linear-gradient(
              rgba(0,0,0,0.80),
              rgba(0,0,0,0.88)
            ),
            url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop");

          background-size:cover;
          background-position:center;
        }

        .about-content{
          max-width:1400px;

          margin:auto;

          display:grid;

          grid-template-columns:1fr 500px;

          gap:70px;

          align-items:center;
        }

        .about-text h2{
          font-size:70px;
          font-weight:300;

          margin-bottom:30px;
        }

        .about-text strong{
          color:#ff9100;
        }

        .about-text p{
          color:#d0d0d0;

          font-size:22px;

          line-height:1.8;

          margin-bottom:22px;
        }

        .about-image{
          border-radius:28px;
          overflow:hidden;

          border:1px solid #1f1f1f;
        }

        .about-image img{
          width:100%;
          height:600px;
          object-fit:cover;
        }

        /* FOOTER */

        .footer{
          background:#050505;

          border-top:1px solid #171717;

          padding:90px 40px 40px 40px;
        }

        .footer-grid{
          max-width:1350px;

          margin:auto;

          display:grid;

          grid-template-columns:
            repeat(auto-fit,minmax(240px,1fr));

          gap:45px;
        }

        .footer-column h3,
        .footer-column h4{
          color:#ff9100;
          margin-bottom:20px;
        }

        .footer-column p,
        .footer-column a{
          color:#b9b9b9;

          margin-bottom:12px;

          display:block;

          transition:0.25s ease;
        }

        .footer-column a:hover{
          color:#ff9100;
        }

        .socials{
          margin-top:50px;

          display:flex;
          justify-content:center;
          gap:18px;
        }

        .socials a{
          width:58px;
          height:58px;

          border-radius:50%;

          background:#101010;

          border:1px solid #222;

          display:flex;
          justify-content:center;
          align-items:center;

          transition:0.25s ease;
        }

        .socials a:hover{
          transform:translateY(-5px);
          border-color:#ff9100;
        }

        .socials img{
          width:24px;
          height:24px;
          object-fit:contain;
        }

        .footer-copy{
          text-align:center;

          margin-top:42px;

          color:#666;
        }
/* ORDEN ONLINE */

.order-online{
  max-width:1400px;
  margin:0 auto;
  background:
    linear-gradient(
      rgba(0,0,0,.75),
      rgba(0,0,0,.80)
    ),
    url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1800&auto=format&fit=crop");

  background-size:cover;
  background-position:center;
  border-radius:30px;
  padding:70px 40px;
  border:1px solid rgba(255,145,0,.15);
  text-align:center;
  box-shadow:0 0 40px rgba(255,145,0,.10);
}

.order-online h2{
  font-size:52px;
  margin-bottom:15px;
}

.order-online p{
  color:#d0d0d0;
  font-size:20px;
  margin-bottom:40px;
}

.order-steps{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:20px;
  flex-wrap:wrap;
}

.order-step{
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  border-radius:18px;
  padding:18px 24px;
  display:flex;
  align-items:center;
  gap:10px;
  font-size:17px;
}

.order-step svg{
  color:#ff9100;
}

.order-arrow{
  color:#ff9100;
}

.order-button{
  display:inline-block;
  margin-top:35px;
  padding:18px 34px;
  border-radius:16px;
  background:linear-gradient(
    90deg,
    #ff7b00,
    #ff9900
  );
  color:white;
  font-weight:bold;
  font-size:18px;
  transition:.3s;
}

.order-button:hover{
  transform:translateY(-4px);
}
  /* LOGOS STARTUP */

.logo-strip{
  background:#080808;
  padding:35px 0;
  overflow:hidden;
  border-top:1px solid #151515;
  border-bottom:1px solid #151515;
}

.logo-track{
  display:flex;
  align-items:center;
  gap:150px;

  width:max-content;

  animation:scrollLogos 25s linear infinite;
}
  /* TAMAÑO DE LOS EMOJIS */

.logo-track span{
  font-size:100px;
  transition:.3s;
}

.logo-track span:hover{
  transform:scale(1.2);
}


.logo-track img{
  width:240px;
  height:240px;
  object-fit:contain;
  opacity:1;

  transition:.3s;
}

.logo-track img:hover{
  transform:scale(1.1);
}
@keyframes scrollLogos{

  from{
    transform:translateX(0);
  }

  to{
    transform:translateX(-50%);
  }

}
.whatsapp-float{
  position:fixed;
  bottom:25px;
  right:25px;

  display:flex;
  align-items:center;
  gap:12px;

  text-decoration:none;
  z-index:9999;

  animation:floatWhatsapp 3s ease-in-out infinite;
  transition:all .3s ease;
}

.whatsapp-float:hover{
  transform:translateY(-5px) scale(1.05);
}

.whatsapp-icon{
  width:60px;
  height:60px;

  border-radius:50%;
  background:#25D366;

  display:flex;
  align-items:center;
  justify-content:center;

  box-shadow:
    0 4px 12px rgba(0,0,0,.25);

  animation:pulseWhatsapp 2s infinite;
}
  @keyframes pulseWhatsapp{

  0%{
    box-shadow:
      0 0 0 0 rgba(37,211,102,.7),
      0 4px 12px rgba(0,0,0,.25);
  }

  70%{
    box-shadow:
      0 0 0 18px rgba(37,211,102,0),
      0 4px 12px rgba(0,0,0,.25);
  }

  100%{
    box-shadow:
      0 0 0 0 rgba(37,211,102,0),
      0 4px 12px rgba(0,0,0,.25);
  }

}
  .whatsapp-icon:hover{
  transform:scale(1.12);
  transition:.3s ease;
}

.whatsapp-icon img{
  width:34px;
  height:34px;
}
@keyframes floatWhatsapp{

  0%{
    transform:translateY(0);
  }

  50%{
    transform:translateY(-8px);
  }

  100%{
    transform:translateY(0);
  }

}
.whatsapp-text{
  display:flex;
  flex-direction:column;

  color:white;

  font-size:15px;
  font-weight:600;

  line-height:1.1;

  text-align:right;
}
        /* RESPONSIVE */

        @media(max-width:1200px){

          .hero-content{
            grid-template-columns:1fr;
          }

          .hero-left{
            text-align:center;
          }

          .hero-left p{
            margin:auto;
          }

          .hero-buttons{
            justify-content:center;
          }

          .about-content{
            grid-template-columns:1fr;
          }

        }

        @media(max-width:900px){

          .navbar{
            padding:18px 22px;
            flex-wrap:wrap;
            gap:20px;
          }

          .nav-links{
            flex-wrap:wrap;
            justify-content:center;
            gap:20px;
          }

          .hero-left h1{
            font-size:54px;
          }

          .about-text h2{
            font-size:48px;
          }

          .section-title{
            font-size:44px;
          }

        }

        @media(max-width:600px){

.wolf-logo{
  width:80px !important;
}

.wolf-name-wrapper{
  width:220px;
  height:70px;
}

          .hero-left h1{
            font-size:42px;
          }

          .contact-panel{
            padding:24px;
          }

          .service-card h3{
            font-size:28px;
          }

        }
      `}</style>

      {/* NAVBAR */}

<nav className="navbar">

  <div className="nav-left">

    {/* LOGO */}

 <a href="#inicio">

  <Image
    src="/wolf-logo2.png"
    alt="Wolf Logo"
    width={140}
    height={140}
    className="wolf-logo"
    priority
  />

</a>

    {/* NOMBRE */}

    <div className="wolf-name-wrapper">

      <Image
        src="/wl nombre2.png"
        alt="Wolf Ordering"
        fill
        className="wolf-name"
        priority
      />

    </div>

  </div>

  <div className="nav-links">
    <a href="#servicios">Nuestros servicios</a>
    <a href="#quienes">Quiénes somos</a>
    <a href="#soporte">Soporte</a>
    <a href="#ordenar">Ordena en línea</a>
  </div>

<a
  href="https://calendly.com/davy-garcia-wolfordering/30min"
  target="_blank"
  rel="noopener noreferrer"
  className="nav-button"
>
  📅 Reservar demostración
</a>

</nav>

   {/* HERO */}

<section
  className="hero"
  id="inicio"
>

  <div className="hero-content">

    <div className="hero-left">

      <h1>
        Lleva tu restaurante al siguiente <strong>nivel</strong>
      </h1>

            <p>
              Wolf Ordering te ayuda a automatizar pedidos,
              vender online, recibir órdenes directas y
              mejorar la experiencia de tus clientes
              desde una plataforma moderna.
            </p>

            <div className="hero-buttons">

<button
  className="hero-btn primary-btn"
  onClick={handleWhatsApp}
>
  Digitalizar mi restaurante
</button>

<a
  href="#servicios-completos"
  className="hero-btn secondary-btn"
>
  Ver servicios
</a>

            </div>

          </div>

          {/* FORM */}

          <div className="contact-panel">

            <h2>Solicita información</h2>

            <p>
              Déjanos tus datos y te contactaremos.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <select name="cargo" required>
                  <option value="">
  ¿Eres dueño o gerente?
</option>

                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="restaurante"
                  placeholder="Nombre del restaurante"
                />
              </div>

              <div className="form-group">
                <textarea
                  rows={4}
                  name="mensaje"
                  placeholder="Cuéntanos sobre tu restaurante"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                Enviar información
              </button>

            </form>

          </div>

        </div>

      </section>
{/* LOGOS */}

<section className="logo-strip">

  <div className="logo-track">

    <span>🍔</span>
    <span>🍕</span>
    <span>🌮</span>
    <span>🍟</span>
    <span>🍣</span>
    <span>🥗</span>
    <span>🍜</span>
    <span>🥩</span>
    <span>🍤</span>
    <span>🍗</span>

  </div>

</section>

      {/* SERVICIOS */}

      <section
        className="services"
        id="servicios"
      >

        <h2 className="section-title">
          Nuestros <strong>Servicios</strong>
        </h2>

        <p className="section-subtitle">
          Soluciones modernas para restaurantes que desean
          automatizar pedidos, aumentar ventas y ofrecer
          una mejor experiencia digital a sus clientes.
        </p>

        <div className="services-grid">

          <div className="service-card">

            <div className="service-icon">
              <ShoppingCart />
            </div>

            <h3>Órdenes Directas</h3>

            <p>
              Recibe pedidos online sin intermediarios
              y aumenta tus ganancias.
            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">
              <Laptop />
            </div>

            <h3>Aliado Tecnológico</h3>

            <p>
              Plataforma moderna para administrar
              pedidos online y automatizar procesos.
            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">
              <Globe />
            </div>

            <h3>Página Web Personalizada</h3>

            <p>
              Tu restaurante tendrá una web profesional
              totalmente personalizada.
            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">
              <Timer />
            </div>

            <h3>Mejora Tiempos</h3>

            <p>
              Optimiza entregas y acelera la gestión
              de órdenes en tiempo real.
            </p>

          </div>

        </div>

      </section>

{/* ORDEN ONLINE */}

<section
  className="services"
  id="ordenar"
>
  <div className="order-online">

    <h2>
      ¿Hambre? ¡Evita la espera y ordena en línea ahora mismo!
    </h2>

    <p>
      Encuentra tu restaurante favorito y realiza tu pedido en pocos segundos.
    </p>

    <div className="order-steps">

      <div className="order-step">
        <MapPin />
        <span>Ingresa tu dirección</span>
      </div>

      <ChevronRight className="order-arrow" />

      <div className="order-step">
        <UtensilsCrossed />
        <span>Agrega productos</span>
      </div>

      <ChevronRight className="order-arrow" />

      <div className="order-step">
        <ShoppingCart />
        <span>Realizar pedido</span>
      </div>

    </div>

    <a
      href="https://tu-link-de-pedidos.com"
      className="order-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      🍔 Ordenar ahora
    </a>

  </div>
</section>

{/* QUIENES SOMOS */}

<section
  className="about"
  id="quienes"
>

  <div className="about-content">

    <div className="about-text">

      <h2>
        Quiénes <strong>Somos</strong>
      </h2>

      <p>
        En Wolf Ordering transformamos la manera en que los restaurantes
        gestionan sus pedidos y se conectan con sus clientes.
        Desarrollamos soluciones digitales modernas que permiten
        vender más, optimizar operaciones y ofrecer una experiencia
        rápida y sencilla.
      </p>

      <p>
        Nuestra plataforma integra pedidos online, páginas web
        personalizadas, automatización de procesos y herramientas
        tecnológicas diseñadas específicamente para restaurantes.
      </p>

      <p>
        Creemos que cada negocio gastronómico merece contar con
        tecnología profesional sin complicaciones, permitiéndole
        enfocarse en brindar una experiencia excepcional a sus clientes.
      </p>

      <p>
        Más que una plataforma tecnológica, somos un aliado estratégico
        para el crecimiento digital de restaurantes de cualquier tamaño.
      </p>

    </div>

    <div className="about-image">

      <img
        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop"
        alt="Wolf Ordering"
      />

    </div>

 </div>

</section>

{/* SERVICIOS COMPLETOS */}

<section
  className="services"
  id="servicios-completos"
>

  <h2 className="section-title">
    Todo lo que <strong>Wolf Ordering</strong> puede hacer por tu restaurante
  </h2>

  <p className="section-subtitle">
    Una plataforma diseñada para aumentar ventas,
    automatizar procesos y mejorar la experiencia
    de tus clientes.
  </p>

  <div className="services-grid">

    <div className="service-card">
      <h3>📱 Menú Digital</h3>
      <p>
        Menú moderno optimizado para celulares,
        tablets y computadoras.
      </p>
    </div>

    <div className="service-card">
      <h3>🛒 Pedidos Online</h3>
      <p>
        Recibe pedidos directos desde tu página web
        sin pagar comisiones a terceros.
      </p>
    </div>

    <div className="service-card">
      <h3>💳 Pagos Integrados</h3>
      <p>
        Permite pagos en línea de forma rápida
        y segura.
      </p>
    </div>

    <div className="service-card">
      <h3>🚚 Delivery Inteligente</h3>
      <p>
        Gestiona entregas y mejora los tiempos
        de despacho.
      </p>
    </div>

    <div className="service-card">
      <h3>📈 Reportes y Estadísticas</h3>
      <p>
        Analiza ventas, pedidos y comportamiento
        de clientes en tiempo real.
      </p>
    </div>

    <div className="service-card">
      <h3>🌐 Página Web Profesional</h3>
      <p>
        Diseño personalizado con identidad visual
        propia para tu restaurante.
      </p>
    </div>

  </div>
</section>


      {/* FOOTER */}

      <footer
        className="footer"
        id="soporte"
      >

        <div className="footer-grid">

          <div className="footer-column">

            <h3>Wolf Ordering</h3>

            <p>
              Plataforma moderna de pedidos online
              para restaurantes.
            </p>

          </div>

          <div className="footer-column">

            <h4>Empresa</h4>

            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Quiénes somos</a>
            <a href="#">Soporte</a>

          </div>

          <div className="footer-column">

            <h4>Legal</h4>

            <Link href="/terminos-y-condiciones">
              Términos y condiciones
            </Link>
            
            <Link href="/politica-de-privacidad">
              Políticas de privacidad
            </Link>

          </div>

          <div className="footer-column">

            <h4>Contacto</h4>

            <p>📞 +593 989 328 777</p>
            <p>📧 info@wolfordering.com</p>
            <p>📧 ventas@wolfordering.com</p>
            <p>📧 billing@wolfordering.com</p>
            <p>📧 demos@wolfordering.com</p>
          </div>

        </div>

        {/* REDES */}

        <div className="socials">

          {/* FACEBOOK */}

          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
              alt="Facebook"
            />
          </a>

          {/* INSTAGRAM */}

          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
            />
          </a>

          {/* LINKEDIN */}

          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
              alt="LinkedIn"
            />
          </a>

        </div>

        <div className="footer-copy">
          © 2025 Wolf Ordering.
          Todos los derechos reservados.
        </div>

      </footer>
<a
  href="https://wa.me/593989328777?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20Wolf%20Ordering"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-float"
>
  <div className="whatsapp-text">
    <span>💬 Habla con un</span>
    <span>especialista</span>
  </div>

  <div className="whatsapp-icon">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
    />
  </div>
</a>
    </>
  );
}