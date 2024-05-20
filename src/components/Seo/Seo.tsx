import React from 'react';

import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
}

export const SEO = ({ title, description }: SeoProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
    </Helmet>
  );
};
