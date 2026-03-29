import React from 'react';
import { FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import './ContactInfo.css';

interface ContactInfoProps {
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  secondaryPhone: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  primaryEmail,
  secondaryEmail,
  primaryPhone,
  secondaryPhone
}) => {
  // Formatter base, adattalo se i numeri sono italiani (+39...)
  const formatPhone = (phone: string) => {
    return phone; 
  };

  return (
    <div className="contact-info-container">
      <div className="contact-header">
        <span className="header-icon">
          <FiMessageSquare size={24} />
        </span>
        <h2 className="contact-title">Contattaci</h2>
      </div>
      
      {/* Email Principale */}
      <div className="contact-item">
        <span className="contact-icon">
          <FiMail />
        </span>
        <div>
          <div className="contact-label">Email:</div>
          <a href={`mailto:${primaryEmail}`} className="contact-link">
            {primaryEmail}
          </a>
        </div>
      </div>

      {/* Email Secondaria */}
      {secondaryEmail && (
        <div className="contact-item">
          <span className="contact-icon">
            <FiMail />
          </span>
          <div>
          <div className="contact-label">Email:</div>
            <a href={`mailto:${secondaryEmail}`} className="contact-link">
              {secondaryEmail}
            </a>
          </div>
        </div>
      )}

      <div className="contact-divider"></div>
      
      {/* Telefono Principale */}
      <div className="contact-item">
        <span className="contact-icon">
          <FiPhone />
        </span>
        <div>
          <div className="contact-label">WhatsApp:</div>
          <a href={`https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=Ciao, vorrei informazioni sugli appartamenti di Laveno Lake House`} className="phone-number" target="_blank" rel="noopener noreferrer">
            {formatPhone(primaryPhone)}
          </a>
        </div>
      </div>

      {/* Telefono Secondario */}
      {secondaryPhone && (
        <div className="contact-item">
          <span className="contact-icon">
            <FiPhone />
          </span>
          <div>
          <div className="contact-label">WhatsApp:</div>
            <a href={`https://wa.me/${secondaryPhone.replace(/\D/g, '')}?text=Ciao, vorrei informazioni sugli appartamenti di Laveno Lake House`} className="phone-number" target="_blank" rel="noopener noreferrer">
              {formatPhone(secondaryPhone)}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
