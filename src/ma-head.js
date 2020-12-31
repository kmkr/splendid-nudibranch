import Head from "next/head";

const MAHead = ({ title, keywords, meta }) => (
  <Head>
    <title>{title}</title>
    <meta name="keywords" content={keywords.join(", ")} />
    {Object.entries(meta).map(([key, value]) => (
      <meta key={key} property={key} content={value} />
    ))}
  </Head>
);

export default MAHead;
