interface Field {
    name: string;
    type: string;
    label: string;
    required: boolean;
    others?: any
    options?: any[]
}

interface FormProps {
    children?: React.ReactNode
    submit: (values: React.FormEvent<HTMLFormElement>, validate: () => boolean) => void;
    fields: Field[];
    values: any
    setValues: React.Dispatch<React.SetStateAction<any>>
    form: {
        className: string,
        btnSubmit: {
            title: string
        }
    },
}

const GenericForm: React.FC<FormProps> = ({ children, submit, fields, form = {
    className: "max-w-[300px] w-full",
    btnSubmit: {
        title: "Guardado",
    }
}, setValues, values }) => {
    const validationFunction = () => {
        let retorno = true;

        Object.keys(values).map((n, i) => {
            if (!retorno) return;
            const { type, required } = fields.find(m => m.name === n) ?? { type: undefined, required: undefined }

            if (type == null || required == null) alert("alerta de validacion")

            if (!required) return;

            const valor = Object.values(values)[i] as string

            if (valor == null) retorno = false;
            else if (type === "text") {
                if (valor.trim() === "")
                    retorno = false;
            }
            else if (type === "number") {
                if (Number(valor) === 0)
                    retorno = false;
            }
            else if (type === "select") {
                if (valor === "0")
                    retorno = false;
            }
        })

        alert(retorno.toString())
        return retorno
    }

    const renderFields = () => {
        return fields.map((field) => {
            if (field.type === "select") {
                return (
                    <span key={field.name} className="w-full flex justify-center items-center">
                        <select
                            className="py-2 px-3 border w-full border-black bg-gren"
                            name={field.name}
                            id={field.name}
                            onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                        >
                            {field.options && field.options.map((n, i) => {
                                return (
                                    <option selected={n.value === values[field?.name]} key={i} value={n.value}>
                                        {n.name}
                                    </option>
                                )
                            })}
                        </select>
                    </span>
                );
            }

            const inputType = {
                ...field.others,
                type: field.type,
                name: field.name,
                value: values[field?.name],
                required: true,
            };

            return (
                <span key={field.name} className="w-full flex justify-center items-center">
                    <input
                        className="py-2 px-3 border w-full border-black bg-gren"
                        {...inputType}
                        placeholder={field.label}
                        onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                    />
                </span>
            );
        });
    };

    return (
        <form onSubmit={(e) => submit(e, validationFunction)} className={`flex flex-col gap-2 justify-center items-center ${form.className}`}>
            {renderFields()}
            {children}
            <span className="w-full flex justify-center items-center">
                <button type="submit" className={`w-full py-2 px-3 border border-black text-center bg-green-500 color-white`}>
                    {form.btnSubmit.title}
                </button>
            </span>
        </form>
    );
};

export default GenericForm;

//use
//import { useState } from "react"
//import GenericForm from "./components/form"

//function App() {
//  const [agente, setAgente] = useState({ nombre: "", apellido: "", apodo: 1 })

//  return (
//    <main className="h-screen w-screen flex justify-center items-center">
//      <GenericForm
//        setValues={setAgente}
//        values={agente}
//        submit={(e: React.FormEvent<HTMLFormElement>, validator: () => boolean) => { e.preventDefault(); validator() }}
//        fields={[
//          {
//            name: "nombre",
//            type: "text",
//            label: "Nombre",
//            required: true,
//          },
//          {
//            name: "apellido",
//            type: "text",
//            label: "Apellido",
//            required: true,
//          },

//          {
//            name: "apodo",
//            type: "select",
//            label: "Apodo",
//            required: true,
//            options: [{ value: 0, name: "ninguno" }, { value: 1, name: "amaro" }, { value: 2, name: "fede" },]
//          }
//        ]}
//        form={
//          {
//            className: "max-w-[300px] w-full",
//            btnSubmit: {
//              title: "Crear"
//            }
//          }}
//      />
//    </main>
//  )
//}

//export default App
