import { motion } from 'framer-motion';
import { Rocket, Shield, LineChart } from 'lucide-react';
import TiltCard from './TiltCard';
import '../styles/Services.css';

const services = [
  {
    icon: <Rocket size={32} color="#D4AF37" />,
    title: "Growth Strategy",
    description: "Accelerate your business with data-driven strategies and innovative solutions."
  },
  {
    icon: <Shield size={32} color="#D4AF37" />,
    title: "Secure Operations",
    description: "Top-tier security protocols to ensure your enterprise assets remain protected."
  },
  {
    icon: <LineChart size={32} color="#D4AF37" />,
    title: "Market Analysis",
    description: "Deep insights into market trends to position your brand at the forefront."
  }
];

const Services: React.FC = () => {
  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our <span className="text-gold">Expertise</span></h2>
          <p className="section-subtitle">Delivering excellence across every dimension of your business.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <TiltCard key={index} className="service-tilt-wrapper">
              <motion.div 
                className="glass-card service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
