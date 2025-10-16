import { combineReducers } from "redux";
import masters from "./masters";
import subscriptions from "./subscriptions";
import advertisementspay from "./advertisements_notInUse";
import customers from "./customers";
import merchandise from "./merchandise";
import movies from "./movies";
import report from "./report";
import transactions from "./transactions";
import webseries from "./webseries";
import setting from "./setting";
import dashboard from "./dashboard";
import layout from "./layout";
import promotion from "./promotion";
import distributors from "./distributors";
import producer from "./producer";
import reports from "./reports";
import otp from "./otpverify";
import setad from "./setadvertisement";
import complaints from "./complaints";
import highlight from "./highlight";
import advertisers from "./advertisers";
import analytics from "./analytics";
import distributorPanel from "./distributorPanel"
import comingsoon from "./comingsoon"
import song from "./song"
import distributor_dashboard from "./distributorDashboard" 
import contentLeaving from "./contentLeaving"
import live_stream from "./livestream"
export const reducers = combineReducers({
  masters,
  analytics,
  advertisers,
  complaints,
  otp,
  distributors,
  advertisementspay,
  highlight,
  layout,
  distributor_dashboard,
  distributorPanel,
  dashboard,
  reports,
  setting,
  subscriptions,
  customers,
  setad,
  song,
  merchandise,
  comingsoon,
  movies,
  report,
  transactions,
  live_stream,
  contentLeaving,
  promotion,
  producer,
  webseries,
});
