import emailjs from "@emailjs/browser";

const emailService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = ({ name, email, password }) => {
  const templateParams = {
    name: name,
    email: email,
    message: `Tu contraseña es: ${password}`,
  };

  return emailjs.send(emailService, emailTemplate, templateParams, emailKey)
    .then(() => {
      console.log('¡Correo enviado exitosamente!');
    })
    .catch((error) => {
      console.error('Error al enviar el correo:', error);
    });
};
