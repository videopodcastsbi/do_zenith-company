import { motion } from 'framer-motion';
import htmlIcon from '../assets/html.png';
import javaIcon from '../assets/java.png';
import pythonIcon from '../assets/python.png';
import TiltCard from './TiltCard';
import '../styles/About.css';

const techStack = [
  { icon: htmlIcon, name: "HTML5", delay: 0 },
  { icon: javaIcon, name: "Java", delay: 0.2 },
  { icon: pythonIcon, name: "Python", delay: 0.4 }
];

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">About <span className="text-gold">Do_Zenith</span></h2>
            <p className="about-text">
              We are a visionary company dedicated to pushing the boundaries of digital innovation. 
              Our name reflects our mission: to reach the zenith of performance and creativity in every project we undertake.
            </p>
            <p className="about-text">
              Specializing in high-performance software and immersive web experiences, we collaborate with creators 
              to bring their wildest ideas to life—including the vibrant world of Roblox gaming.
            </p>
          </motion.div>

          <div className="tech-stack-wrapper">
             <motion.h3
                className="tech-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
             >
                Our Portfolio Tech
             </motion.h3>
             <div className="tech-stack">
              {techStack.map((tech, index) => (
                <TiltCard key={index} className="tech-tilt-wrapper">
                  <motion.div 
                    className="tech-item glass-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: tech.delay, duration: 0.5 }}
                  >
                    <img src={tech.icon} alt={tech.name} className="tech-icon" />
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
