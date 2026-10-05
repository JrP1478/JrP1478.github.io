export const SITE = {
  name: "Biohebra",
  domain: "https://biohebra.uk",
  whatsapp: "51907553376",
  phoneDisplay: "+51 907 553 376",
  email: "biohebra240825@gmail.com",
  ruc: "10071028238",
  location: "Lurigancho-Chosica, Lima, Perú",
  facebook: "https://www.facebook.com/people/Biohebra/61577460609591/",
  tiktok: "https://www.tiktok.com/@biohebra",
  scheduleWeek: "Lunes a Viernes: 6:00 am – 8:00 pm",
  scheduleSaturday: "Sábados: 6:00 am – 3:00 pm",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d124873.10487333094!2d-77.01953152870857!3d-12.02392245470024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDU4JzUzLjkiUyA3NsKwNTMnNTIuMSJX!5e0!3m2!1ses!2spe!4v1773706995803!5m2!1ses!2spe",
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, quiero cotizar productos de Biohebra. ¿Me pueden brindar información, disponibilidad y condiciones de envío?";

export const whatsappLink = (message = DEFAULT_WHATSAPP_MESSAGE) =>
  "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(message);
