"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<any>(null);

async function cargarConfiguracion() {
  const restauranteId =
    "4e33c1bc-21e7-4822-8e48-1556c2fe575e";

  const { data, error } = await supabase
    .from("configuracion_restaurante")
    .select("*")
    .eq("restaurante_id", restauranteId)
    .single();

  console.log(data);
  console.log(error);

  setConfig(data);
}

  async function guardar() {
    const { error } = await supabase
      .from("configuracion_restaurante")
.update({
  nombre: config.nombre,
  telefono: config.telefono,
  direccion: config.direccion,
  tiempo_min: config.tiempo_min,
  tiempo_max: config.tiempo_max,

  notificaciones_sonido:
    config.notificaciones_sonido,

  comision_wolf:
    config.comision_wolf,

  tipo_comision:
    config.tipo_comision,

      costo_delivery:
    config.costo_delivery,
})
    .eq(
    "restaurante_id",
    config.restaurante_id
  );

    if (error) {
      alert("Error guardando");
      return;
    }

    alert("Configuración guardada");
  }

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  if (!config) {
    return <p>Cargando...</p>;
  }

  return (
    <main
      style={{
        padding: 40,
        color: "white",
        background: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      <h1>Configuración Restaurante</h1>

      <br />

      <input
  value={config.nombre}
  onChange={(e) =>
    setConfig({
      ...config,
      nombre: e.target.value,
    })
  }
  style={{
    background: "white",
    color: "black",
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
  }}
/>

      <br />
      <br />

      <input
        value={config.telefono}
        onChange={(e) =>
          setConfig({
            ...config,
            telefono: e.target.value,
         })
  }
  style={{
    background: "white",
    color: "black",
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
  }}
      
      />

      <br />
      <br />

      <input
        value={config.direccion}
        onChange={(e) =>
          setConfig({
            ...config,
            direccion: e.target.value,
    })
  }
  style={{
    background: "white",
    color: "black",
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
  }}
      />

      <br />
      <br />

      <input
        type="number"
        value={config.tiempo_min}
        onChange={(e) =>
          setConfig({
            ...config,
            tiempo_min: Number(e.target.value),
    })
  }
  style={{
    background: "white",
    color: "black",
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
  }}
      />

      <br />
      <br />

      <input
        type="number"
        value={config.tiempo_max}
        onChange={(e) =>
          setConfig({
            ...config,
            tiempo_max: Number(e.target.value),
    })
  }
  style={{
    background: "white",
    color: "black",
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
  }}
      />
      <br />
<br />

<label
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <input
    type="checkbox"
    checked={
      config.notificaciones_sonido ?? true
    }
    onChange={(e) =>
      setConfig({
        ...config,
        notificaciones_sonido:
          e.target.checked,
      })
    }
  />

  Activar sonido de nuevos pedidos
</label>

<br />
<br />
<h2>Comisión Wolf</h2>

<br />
<br />

<h2>Costo Delivery</h2>

<input
  type="number"
  step="0.01"
  value={config.costo_delivery || 0}
  onChange={(e) =>
    setConfig({
      ...config,
      costo_delivery: Number(
        e.target.value
      ),
    })
  }
/>

<input
  type="number"
  value={config.comision_wolf || 5}
  onChange={(e) =>
    setConfig({
      ...config,
      comision_wolf: Number(
        e.target.value
      ),
    })
  }
/>

<br />
<br />

<select
  value={
    config.tipo_comision ||
    "aumentada"
  }
  onChange={(e) =>
    setConfig({
      ...config,
      tipo_comision:
        e.target.value,
    })
  }
>
  <option value="aumentada">
    Cliente paga comisión
  </option>

  <option value="descontada">
    Restaurante paga comisión
  </option>
</select>

<br />
<br />

      <br />
      <br />

      <button onClick={guardar}>
        Guardar Configuración
      </button>
    </main>
  );
}