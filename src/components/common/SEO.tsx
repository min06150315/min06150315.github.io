import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}
const SEO = ({
  title = '민경빈의 개발 블로그',
  description = '컴퓨터공학 개발 여정 기록',
  image = '/default-thumbnail.png',
  url = window.location.href,
}: SEOProps) => {
  const siteTitle = `${title}`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
