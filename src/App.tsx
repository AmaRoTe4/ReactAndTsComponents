import { useState } from "react"
import GenericForm from "./components/form"

function App() {
  const [agente, setAgente] = useState({ nombre: "", apellido: "", apodo: 1 })

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <GenericForm
        setValues={setAgente}
        values={agente}
        submit={(e: React.FormEvent<HTMLFormElement>, validator: () => boolean) => { e.preventDefault(); validator() }}
        fields={[
          {
            name: "nombre",
            type: "text",
            label: "Nombre",
            required: true,
          },
          {
            name: "apellido",
            type: "text",
            label: "Apellido",
            required: true,
          },

          {
            name: "apodo",
            type: "select",
            label: "Apodo",
            required: true,
            options: [{ value: 0, name: "ninguno" }, { value: 1, name: "amaro" }, { value: 2, name: "fede" },]
          }
        ]}
        form={
          {
            className: "max-w-[300px] w-full",
            btnSubmit: {
              title: "Crear"
            }
          }}
      />
    </main>
  )
}

export default App
