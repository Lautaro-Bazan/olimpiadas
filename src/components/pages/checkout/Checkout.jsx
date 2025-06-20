import { useState } from "react"

export const Checkout = () => { 
    const [userInfo, setUserInfo] = useState({
        nombre: "",
        telefono: "",
        email: "",
    });
    const comprar = (evento) => {
        evento.preventDefault(); //evita que se rompa
    }
    const capturarDatos = (evento) => {
        const {value, name} = evento.target;
        setUserInfo({...userInfo, [name]: value})
    }
    //clase 28 ultima parte
    return (
        <main>
            <form onSubmit={comprar}>
                <input type="text"  placeholder="nombre" name="nombre" onChange={capturarDatos}/>
                <input type="text"  placeholder="telefono" name="telefono" onChange={capturarDatos}/>
                <input type="text"  placeholder="email" name="email" onChange={capturarDatos}/>
                <button>comprar</button>
            </form>
        </main>
    )
}