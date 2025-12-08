import React from "react";
import "./Certificates.css";

export default function Certificates() {
  const certs = [
    {
      img: "/certificates/cert1.png",
      title: "Hackathon Winner",
      desc: "Description:This gives a first win in my technical career and motivated me to do more such events.",
    },
    {
      img: "/certificates/cert2.png",
      title: "Debugging Winner",
      desc: "Description: Won first place and the preparation for this event improves my problem-solving skills and debugging work.",
    },
    {
      img: "/certificates/cert3.png",
      title: "AI Workshop",
      desc: "Description: Completed an intensive workshop on Artificial Intelligence and its applications.",
    },
    {
      img: "/certificates/cert4.png",
      title: "Paper Presentation",
      desc: "Description: Realized real-time conference and presented a paper on AR vs VR Reality.",
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

            {/* Title */}
            <h2 className="cert-name">{c.title}</h2>

            {/* Certificate Image */}
            <img src={c.img} alt={c.title} className="cert-image" />


            {/* Description */}
            <p className="cert-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
