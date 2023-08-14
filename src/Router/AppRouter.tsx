import {Routes, Route} from "react-router-dom";
import Mainnet from "../views/Mainnet";
import Testnet from "../views/Testnet";
import Liquid from "../views/Liquid";
import Liquidtestnet from "../views/Liquidtestnet";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<h1>Hola mundo</h1>}/>
            <Route path="/" element={<Mainnet/>}/>
            <Route path="/Testnet" element={<Testnet/>}/>
           {/*  <Route path="/Liquid" element={<Liquid/>}/>
            <Route path="/Liquidtestnet" element={<Liquidtestnet/>}/> */}
            
            <Route path="/*" element={ <h1>404</h1> }/>
        </Routes>
    )
}

export default AppRouter
