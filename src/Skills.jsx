import React from "react";
import "./Skills.css";

export default function Skills() {
  return (
    <div className="skills-wrapper">

      {/* Technical Section Title */}
      <h2 className="section-title">Technical Skills</h2>

      {/* Technical Cards */}
      <div className="skills-section">

        {/* Skill 1 */}
        <div className="skill-card">
          <h3 className="skill-name">Language:React.js, MySQL</h3>
          <h4 className="project-title">Project:Edge-AI Verified QR for Track Assets</h4>

          <img
            src="/qr.png"
            alt="qr project"
            className="skill-image"
          />

          <p className="skill-desc">
            Description:This project implements a QR code system for tracking assets using React.js for the frontend and MySQL for the database. It allows users to scan QR codes to verify asset authenticity and track their movement.
          </p>

          <div className="links-row">
            <a href="https://github.com/Santhosh77-git/railtrack-id-26.git" target="_blank">
              GitHub 🔗
            </a>
            <a href="https://youtube.com/shorts/SVoQUZSiXzw?si=qQsDJXSNm7VX43_u" target="_blank">
              YouTube ▶
            </a>
          </div>
        </div>

        {/* Skill 2 */}
        <div className="skill-card">
          <h3 className="skill-name">Language:Supervised ML (XGBoost), FastAPI</h3>
          <h4 className="project-title">Project:Risk Predictor</h4>

          <img
            src="/mlpro.png"
            alt="risk predictor project"
            className="skill-image"
          />

          <p className="skill-desc">
            Description: This project uses supervised machine learning with XGBoost to predict risks in various scenarios. The backend is built using FastAPI, providing a robust API for the model.
          </p>

          <div className="links-row">
            <a href="https://github.com/Santhosh77-git/powergrid-backend.git" target="_blank">
              GitHub (Backend) 🔗
            </a>
            <a href="https://github.com/Santhosh77-git/pro-2-front.git" target="_blank">
              GitHub (Frontend) 🔗
            </a>
            <a href="https://youtube.com/shorts/8zpanSbCNyk" target="_blank">
              YouTube ▶
            </a>
          </div>
        </div>

      </div>

      {/* Non-Technical Section Title */}
      <h2 className="section-title">Non-Technical Skills</h2>

      {/* Non-Technical Cards */}
      <div className="skills-section">

        {/* Leadership */}
        <div className="skill-card">
          <h3 className="skill-name">Team Leader – SIH</h3>

          <img
            src="/lead.png"
            alt="leadership"
            className="skill-image"
          />

          <p className="skill-desc">
            Descripton:Worked as a team lead in Smart India Hackathon and This Hackathon has been a great learning experience for me. From technical growth to leadership lessons, SIH 2025 has made a lasting impact on my professional paths.
          </p>
        </div>

        {/* Marathon */}
        <div className="skill-card">
          <h3 className="skill-name">10 KM Marathon</h3>

          <img
            src="/marathon.png"
            alt="marathon"
            className="skill-image"
          />

          <p className="skill-desc">
            Description:Actively participated in a 10KM marathon, showcasing discipline, persistence and enthusiasm.
          </p>
        </div>

      </div>
    </div>
  );
}
