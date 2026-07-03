import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Distributor from "../components/Distributor/Distributor";
function DistributorsModule() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={Distributor()} />

        {/* < Route path='/DistributerProducts' element={<Layout children={DistributorProducts()}/>}/>
< Route path='/CreateDistributerProducts' element={<Layout children={DistributorProducts()}/>}/>
< Route path='/EditDistributerProducts' element={<Layout children={DistributorProducts()}/>}/> */}
      </Routes>
    </div>
  );
}

export default DistributorsModule;
