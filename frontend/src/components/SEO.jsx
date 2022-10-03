import { Helmet } from 'react-helmet';
import React from 'react';

const Seo = ({ title, description, pathSlug, keywords }) => {
    const url = `https://malikgabroun.com/${pathSlug}`
      return (
  <Helmet htmlAttributes={{ lang: 'en' }} title={title} meta={[
          {
            name: "Content-Security-Policy",
            content: "upgrade-insecure-requests",
            httpEquiv: "Content-Security-Policy",
          },
        ]}
      />
   );
  }
  export default Seo;