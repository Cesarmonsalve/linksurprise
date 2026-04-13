'use client';

export default function Marquee() {
  const items = [
    'Cartas de Amor',
    'Cumpleaños',
    'Invitaciones',
    'Mensajes Secretos',
    'Aniversarios',
    'Pedidas de Mano',
    'Amistad',
    'Disculpas',
  ];

  const repeated = [...items, ...items]; // Double for seamless loop

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i}>
            {item}
            <span className="dot" />
          </span>
        ))}
      </div>
    </section>
  );
}
