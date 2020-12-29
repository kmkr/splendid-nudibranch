import Link from "next";
import ContactInfo from "./contact-info";

const TopLogo = () => (
  <div id="top-logo">
    <img src="/images/logo.svg" />
    <ContactInfo />
  </div>
);

export default TopLogo;
