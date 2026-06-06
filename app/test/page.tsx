"use client";

import { supabase } from "../lib/supabase";

export default function TestPage() {

  const crearPedido = async () => {

    const { data, error } = await supabase
      .from("clientes")
      .insert([
        {
          nombre: "Cliente Prueba",
          telefono: "0999999999",
          email: "prueba@test.com"
        }
      ])
      .select();

    console.log(data);
    console.log(error);

    alert(error ? error.message : "Cliente creado");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={crearPedido}>
        Crear Cliente
      </button>
    </div>
  );
}