import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Gamepad2 } from 'lucide-react';
import TiltCard from './TiltCard';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Roblox Collaboration',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = formData;
    
    // Construct the mailto link
    const mailtoLink = `mailto:suhat020855@gmail.com?subject=Roblox Collaboration Request from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <TiltCard>
          <motion.div 
            className="contact-wrapper glass-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-info">
              <h2 className="section-title">Let's <span className="text-gold">Collaborate</span></h2>
              <p className="contact-desc">
                Ready to take your Roblox game to the next level? Partner with Do_Zenith today.
                Fill out the form to send us a direct message.
              </p>
              <div className="contact-highlight">
                <Gamepad2 size={48} color="#D4AF37" />
                <div>
                   <h3>Roblox Partnership</h3>
                   <p>Specialized Game Development Support</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name / Company</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Collaboration Proposal</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your game and how you'd like to collaborate..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Proposal <Send size={18} style={{ marginLeft: '8px' }} />
              </button>
              <p className="email-note">
                This will open your default email client to send to <strong>suhat020855@gmail.com</strong>
              </p>
            </form>
          </motion.div>
        </TiltCard>
      </div>
    </section>
  );
};

export default Contact;
