import React from 'react';

const MapIframe = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.7271362322126!2d-46.89811772456867!3d-23.542314560892905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf01482ca8aa65%3A0x542dab365724d7!2sR.%20Nicolau%20Maevsky%2C%20612%20-%20Jardim%20Lindomar%2C%20Jandira%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1690210910244!5m2!1spt-BR!2sbr"
      style={{ border: 0,
        width: '380px',
        height: '270px',
        borderRadius: '0',
        marginTop: '0'}}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default MapIframe;
