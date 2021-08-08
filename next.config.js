const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
  },
  images: {
    domains: [
      "links.papareact.com",
      "a0.muscache.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiYW1hbi1qYW53YW5pIiwiYSI6ImNrczBpM2gxbTFrcm8ydXFqamtybzJtYW8ifQ.EcMfJu_XkFN2RMfGUvX8zw",
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
});
