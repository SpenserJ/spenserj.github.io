import React from 'react';
import Helmet from 'react-helmet';

import imageSpenser from '../../images/spenserj.jpg';

const organization = {
  '@id': 'https://spenserj.com/#identity',
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'Spenser Jones',
  url: 'https://spenserj.com',
  founder: 'Spenser Jones',
  logo: {
    '@type': 'ImageObject',
    url: imageSpenser,
  },
  sameAs: [
    'https://twitter.com/spenserj',
    'https://keybase.io/spenserj',
    'https://github.com/SpenserJ',
    'https://www.instagram.com/spenserj/',
  ],
};

const exportRef = (base) => ({ '@type': base['@type'], '@id': base['@id'] });

export const organizationRef = exportRef(organization);

export default () => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
    </Helmet>
  );
};
