import { Link } from "react-router-dom"

export const Home = () => {
    return(
        <main>
            <h3>aca el home</h3>
            <Link to="/tienda/familiar">familiar</Link>
            <Link to="/tienda/individual">individual</Link>
        </main>
        
    )
}