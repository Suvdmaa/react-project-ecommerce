import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchResultPage() {
  const location = useLocation();
  console.log(location.state.data);
  return <div>{location.state.data}</div>;
}
