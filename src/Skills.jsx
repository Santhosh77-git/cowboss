import React from "react";
import "./Skills.css";

export default function Skills() {
  return (
    <div className="skills-wrapper">

      {/* Technical Section Title */}
      <h2 className="section-title sticky-">Technical Skills</h2>

      {/* Technical Cards */}
      <div className="skills-section">

        {/* Skill 1 */}
        <div className="skill-card">
          <h3 className="skill-name">React.js, MySQL</h3>
          <h4 className="project-title">Edge-AI Verified QR for Track Assets</h4>

          <img
            src="/skills/qr.png"
            alt="qr project"
            className="skill-image"
          />

          <p className="skill-desc">
            bjbjvdfkjdklfsjdlfkjsklfdsnlfj
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
          <h3 className="skill-name">Supervised ML (XGBoost), FastAPI</h3>
          <h4 className="project-title">Risk Predictor</h4>

          <img
            src="/skills/mlpro.png"
            alt="risk predictor project"
            className="skill-image"
          />

          <p className="skill-desc">
            wjdposjdjdlksjdksjdldsdjskdjksd
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
      <h2 className="section-title sticky-title">Non-Technical Skills</h2>

      {/* Non-Technical Cards */}
      <div className="skills-section">

        {/* Leadership */}
        <div className="skill-card">
          <h3 className="skill-name">Team Leader – SIH</h3>

          <img
            src="/skills/lead.png"
            alt="leadership"
            className="skill-image"
          />

          <p className="skill-desc">
            Worked as a team lead in Smart India Hackathon and coordinated the entire project execution.
          </p>
        </div>

        {/* Marathon */}
        <div className="skill-card">
          <h3 className="skill-name">10 KM Marathon Participant</h3>

          <img
            src="/skills/marathon.png"
            alt="marathon"
            className="skill-image"
          />

          <p className="skill-desc">
            Actively participated in a 10KM marathon, showcasing discipline, persistence and enthusiasm.
          </p>
        </div>

      </div>
    </div>
  );
}
