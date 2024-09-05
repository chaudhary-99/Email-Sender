// src/components/SendEmailForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmailPreviewer from './EmailPreviewer';

const SendEmailForm = () => {
  const [formData, setFormData] = useState({
    senderEmail: '',
    senderPassword: '',
    receiverName: '',
    receiverEmail: '',
  });

  const location = useLocation();
  const emailDesign = location.state?.emailDesign || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailData = {
      ...formData,
      ...emailDesign,
    };
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div className="email-form-container">
      <h2 className="form-title">Send Your Email</h2>
      <form className="email-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Sender Details</h3>
          <div className="form-group">
            <label htmlFor="senderEmail">Sender's Email</label>
            <input
              id="senderEmail"
              name="senderEmail"
              type="email"
              required
              value={formData.senderEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senderPassword">Sender's Password</label>
            <input
              id="senderPassword"
              name="senderPassword"
              type="password"
              required
              value={formData.senderPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Receiver Details</h3>
          <div className="form-group">
            <label htmlFor="receiverName">Receiver's Name</label>
            <input
              id="receiverName"
              name="receiverName"
              type="text"
              required
              value={formData.receiverName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiverEmail">Receiver's Email</label>
            <input
              id="receiverEmail"
              name="receiverEmail"
              type="email"
              required
              value={formData.receiverEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn primary-btn">
          Send Email
        </button>
      </form>

      <EmailPreviewer formData={emailDesign} />
    </div>
  );
};

export default SendEmailForm;
