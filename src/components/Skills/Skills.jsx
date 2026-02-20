import React from "react";
import "./Skills.css";

import htmlIcon from "../../assets/html5.png";
import cssIcon from "../../assets/css-3.png";
import jsIcon from "../../assets/js.png";
import reactIcon from "../../assets/react.svg";
import phpIcon from "../../assets/php.png";
import flutterIcon from "../../assets/icons8-flutter-96.png";
import physicsIcon from "../../assets/physics_753244.png";

const skills = [
  { name: "HTML5", icon: htmlIcon, level: 90 },
  { name: "CSS3", icon: cssIcon, level: 85 },
  { name: "JavaScript", icon: jsIcon, level: 80 },
  { name: "React", icon: reactIcon, level: 75 },
  { name: "PHP", icon: phpIcon, level: 70 },
  { name: "Flutter", icon: flutterIcon, level: 65 },
  { name: "Algoritmos", icon: physicsIcon, level: 80 },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">Nuestras Habilidades</h2>
        <p className="skills-subtitle">
          Dominamos un amplio abanico de tecnologías para construir soluciones completas y modernas.
        </p>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.name}>
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              <span className="skill-name">{skill.name}</span>
              <div className="skill-bar-bg">
                <div
                  className="skill-bar-fill"
                  style={{ "--skill-level": `${skill.level}%` }}
                />
              </div>
              <span className="skill-percent">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
