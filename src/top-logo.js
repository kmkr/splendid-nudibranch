import Link from "next";
import ContactInfo from "./contact-info";

const TopLogo = () => (
  <div id="top-logo">
    <div className="haiku-wrapper">
      <img src="/images/logo_plain.svg" />
      <div className="haiku">
        <p>Mostly animals</p>
        <p>Plus the occasional tree</p>
        <p>The slug welcomes you</p>
      </div>
    </div>
    <ContactInfo />
  </div>
);

export default TopLogo;
