import React from "react";
import "./Skills.css";

import htmlIcon from "../../assets/html5.png";
import cssIcon from "../../assets/css-3.png";
import jsIcon from "../../assets/js.png";
import reactIcon from "../../assets/react.svg";
import phpIcon from "../../assets/php.png";
import flutterIcon from "../../assets/icons8-flutter-96.png";

const categories = [
  {
    name: "Frontend",
    icons: [
      { src: htmlIcon, alt: "HTML5" },
      { src: cssIcon, alt: "CSS3" },
      { src: jsIcon, alt: "JavaScript" },
      { src: reactIcon, alt: "React" },
    ],
    description: "HTML5, CSS3, JavaScript, React",
  },
  {
    name: "Backend",
    icons: [
      { src: phpIcon, alt: "PHP" },
      { fa: "fas fa-code" },
    ],
    description: "PHP, APIs REST, arquitecturas escalables",
  },
  {
    name: "Mobile",
    icons: [
      { src: flutterIcon, alt: "Flutter" },
      { fa: "fab fa-android" },
    ],
    description: "Flutter, Android, multiplataforma",
  },
  {
    name: "Bases de Datos",
    icons: [
      { fa: "fas fa-database" },
      { fa: "fas fa-server" },
    ],
    description: "MySQL, bases relacionales, consultas y reportes",
  },
  {
    name: "Herramientas",
    icons: [
      { fa: "fab fa-git-alt" },
      { fa: "fab fa-github" },
    ],
    description: "Git, GitHub, VS Code, Postman y más",
  },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">Tecnologías que dominamos</h2>
        <p className="skills-subtitle">
          Dominamos un amplio abanico de tecnologías para construir soluciones completas y modernas.
        </p>

        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="skill-card" key={cat.name}>
              <div className="skill-icons">
                {cat.icons.map((icon, i) =>
                  icon.fa ? (
                    <i key={i} className={icon.fa}></i>
                  ) : (
                    <img key={i} src={icon.src} alt={icon.alt} />
                  )
                )}
              </div>
              <span className="skill-name">{cat.name}</span>
              <p className="skill-description">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
