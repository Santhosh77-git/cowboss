import React from "react";
import "./Certificates.css";

export default function Certificates() {
  const certs = [
    {
      img: "/certificates/cert1.png",
      title: "Hackathon Winner",
      desc: "A badge earned for mastering the skies of the digital frontier.",
    },
    {
      img: "/certificates/cert2.png",
      title: "Debugging Winner",
      desc: "cndjdnjfahsjhaodshaldlaskjdlksajdlkjakldjajsljdkasdl",
    },
    {
      img: "/certificates/cert3.png",
      title: "AI Workshop",
      desc: "For understanding about Generative AI model.",
    },
    {
      img: "/certificates/cert4.png",
      title: "Paper Presentation",
      desc: "Presented a paper on AR vs VR Reality.",
    },
  ];

  return (
    <div className="certs-wrapper">

      {/* Centered Heading */}
      <h1 className="certs-title stick">Certificates</h1>

      {/* Centered Certificate Column */}
      <div className="certs-column">
        {certs.map((c, i) => (
          <div className="cert-item" key={i}>
            
            {/* Rope */}
            <div className="rope"></div>

            {/* Certificate Image */}
            <img src={c.img} alt={c.title} className="cert-image" />

            {/* Title */}
            <h2 className="cert-name">{c.title}</h2>

            {/* Description */}
            <p className="cert-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
