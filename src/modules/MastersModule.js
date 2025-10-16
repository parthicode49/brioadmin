import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SubAdmin from "../components/SubAdmin/SubAdmin";
// import SubCategoryModule from "./SubCategoryModule";
const CategoryModule = React.lazy(() => import("../components/Masters/Category/Category"));
const LanguageModule = React.lazy(() => import("../components/Masters/Language/Language"));
const CastModule = React.lazy(()=> import("../components/Masters/Cast/Cast"))
const SubCategoryModule = React.lazy(()=> import("../components/Masters/SubCategory/SubCategory"))
const Country = React.lazy(()=>import("../components/Masters/Country/Country"))
const ContentAdvisory = React.lazy(()=> import("../components/Masters/ContentAdvisory/ContentAdvisory"))
const SongCategory = React.lazy(()=> import("../components/Masters/SongCategory/SongCategory"))
const ComplaintType = React.lazy(() => import("../components/Masters/ComplaintType/ComplaintType"))
const SubAdmin = React.lazy(()=> import("../components/SubAdmin/SubAdmin") )
const LiveStrModule = React.lazy(() => import("../components/Masters/LiveStrCategory/Category") )

function MastersModule() {
  //   return (
  //     <div className="App">

  // <Routes>
  // < Route path='/Category/*' element={<CategoryModule key="Category"/>}/>
  // < Route path='/SubOtt/*' element={<SubOttModule key="SubOttModule"/>}/>
  // < Route path='/Avatar/*' element={<AvatarModule key="Avatar"/>}/>
  // < Route path='/SubCategory/*' element={<SubCategoryModule key="SubCategory"/>}/>
  // {/* < Route path='/Country/*' element={<Layout children={Country()}/>}/> */}
  // <Route path='/PaymentGateWay' element={<Layout children={PaymentGateWay()}/>}/>

  // < Route path='/Language/*' element={<LanguageModule key="Language"/>}/>
  // < Route path='/OttName/*' element={<OttNameModule key="OttName"/>}/>
  // < Route path='/Genre/*' element={<GenreModule key="Genre"/>}/>
  // < Route path='/Cast/*' element={<CastModule key="Cast"/>}/>
  // <Route path='/ContentAdvisory/*' element={<ContentAdvisoryModule key="ContentAdvisory" />}/>
  // {/* < Route path='/Distributors' element={<Layout children={Distributors()}/>}/> */}
  // < Route path='/SubAdmin/*' element={<SubAdminModule key="SubAdmin"/>}/>
  // {/* < Route path='/Subscriptions' element={<Layout children={Subscriptions()}/>}/> */}
  //       </Routes>
  //     </div>
  //   );

  return (
    <Routes>
      <Route path="/category" element={<CategoryModule />} />
      <Route path="/subcategory/*" element={<SubCategoryModule />} />
      <Route path="/language/*" element={<LanguageModule />} />
      <Route path="/songcategory" element={<SongCategory />} />
      <Route path="/cast/*" element={<CastModule />} />
      <Route path="/country" element={<Country />} />
      <Route path="/contentadvisory" element={<ContentAdvisory />} />
      <Route path="/complainttype" element={<ComplaintType />} />
      <Route path="/subadmin" element={<SubAdmin />} />
      <Route path="/livestreamcategory" element={<LiveStrModule />} />
      {/* Add other nested routes here */}
    </Routes>
  );
}

export default MastersModule;
