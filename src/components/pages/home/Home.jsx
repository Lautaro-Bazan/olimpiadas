import { Button } from "../../../components/common/buttons/mainButton"
import imagebanner from "../../../../public/images/sistema-facturacion-agencia-viajes.png"

import './home.css';
export const Home = () => {
    return (
      <div class="parent">
        <div class="div1"> 
          <div className="div1-content">
            <div className="title">
              <h3>TodoIncluido</h3>
              <h1>Viaja a Donde Quieras</h1>
              <p>Viajá sin preocuparte por nada. Paquetes completos, recuerdos inolvidables.</p>
              <Button>Ver Paquetes</Button>
            </div>
            <div className="image">
              <img src="../../../../public/images/sistema-facturacion-agencia-viajes.png" alt="" />
            </div>
          </div>
        </div>
        <div class="div2">
          <div className="div2-content">
            <div className="image">
              <img src="../../../../public/images/airplane.png" alt="" />
            </div>
            <div className="text">
              <h2>Vuelos Internacionales</h2>
              <p>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
            </div>
          </div> 
        </div>
        <div class="div3"> </div>
        <div class="div4"> </div>
        <div class="div5"> </div>
      </div> 
  );
}