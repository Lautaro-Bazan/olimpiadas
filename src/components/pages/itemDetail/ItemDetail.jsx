import { useEffect, useState } from "react"
import { products } from "../../../products";
import { useParams } from "react-router-dom";
import { Counter } from "../../common/counter/Counter";

export const ItemDetail = () => {
    const [item, setItem] = useState({});
    const {id} = useParams();

    useEffect(() => {
        let productSelected = products.find((product) => product.id === id);
        setItem(productSelected);
    }, [id])
    return (
        <div>
            <h3>{item.title}</h3>
            <h3>{item.price}</h3>
            <Counter item={item}/>
        </div>
    )
}