import { ProductCard } from "../../common/productCard/ProductCard";
import { products } from "../../../products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const ItemListContainer = () => {
    const [ items, setItems] = useState([]);
    const { name } = useParams();
    useEffect(() => {
        let productsFiltered;
        if (name) {
            productsFiltered = products.filter(
            (elemento) => elemento.category === name
            );
        }
        
        //aca va la peticion d los productos para que solo la pida una vez
        setItems(!name ? products : productsFiltered);
        }, [name]);
    
    return(
        <main>
            {items.map ((elemento)=>{
                return <ProductCard key={elemento.id} {...elemento}/> //paso todos los elementos del array
            })}
        </main>
    )
}