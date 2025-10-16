import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
