

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import AboutUs from '../components/Setting/AboutUs';
import RefundPolicy from '../components/Setting/RefundPolicy';
import PrivacyPolicy from '../components/Setting/PrivacyPolicy';
import TermsConditions from '../components/Setting/TermsConditions';
import AppSetting from '../components/Setting/AppSetting';
import AdPrice from '../components/Setting/AdPrice';
function AdvertisementModule() {
  return (
    <div className="App">
    
<Routes>


< Route path='/aboutus' element={AboutUs()}/>
< Route path='/privacypolicy' element={PrivacyPolicy()}/>
< Route path='/termsconditions' element={TermsConditions()}/>
< Route path='/refundpolicy' element={RefundPolicy()}/>
< Route path='/adprice' element={AdPrice()}/>
{/* < Route path='/UserLogs' element={<Layout children={UserLogs()}/>}/> */}

{/* < Route path='/UserLogDetails/*' element={<Layout children={UserLogDetails()}/>}/> */}


< Route path='/AppSetting' element={<Layout children={AppSetting()}/>}/>


      </Routes>
    </div>
  );
}

export default AdvertisementModule;