const config = {
  imageApi: process.env.NEXT_PUBLIC_IMAGE_URL_API,
  cookies_domain: {
    domain: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    path: "/",
  },
};

export default config;
