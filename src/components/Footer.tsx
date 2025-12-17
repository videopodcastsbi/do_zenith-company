import '../styles/Footer.css';
import VisitorCounter from './VisitorCounter';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} Do_Zenith. All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:suhat020855@gmail.com" className="email-link">suhat020855@gmail.com</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <center>
             <VisitorCounter />
        </center>
      </div>
    </footer>
  );
};

export default Footer;
