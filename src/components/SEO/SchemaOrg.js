import React from 'react';
import Helmet from 'react-helmet';

export default () => {
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Person',
    'name': 'Spenser Jones',
    'url': 'https://spenserj.com',
    'sameAs': [
      'https://twitter.com/spenserj',
      'https://keybase.io/spenserj',
      'https://github.com/SpenserJ',
      'https://www.instagram.com/spenserj/',
    ],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
