import Layout from "../../layout";
import Image from "next/image";
import Products from "../Products"
import Banner from "../Banner";

export default function Catalogue() {
  return (
    <div>
      <Banner/>
      <Products/>
    </div>
  );
}
