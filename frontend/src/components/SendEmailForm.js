import React, { useState, useEffect } from 'react';

const SendEmailForm = () => {
  const [formData, setFormData] = useState({
    senderEmail: '',
    senderPassword: '',
    receiverName: '',
    receiverEmail: '',
  });
  
  const [emailDesign, setEmailDesign] = useState({});

  useEffect(() => {
    const design = localStorage.getItem('emailDesign');
    if (design) {
      setEmailDesign(JSON.parse(design));
    }
  }, []);

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
    <div className="email-form">
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Send Email</button>
      </form>

      <div className="email-preview">
        <h3>Preview</h3>
        <div className="email-content">
          <h4>Subject: {emailDesign.emailSubject}</h4>
          <p>{emailDesign.emailBody}</p>
          <p>Best regards,</p>
          <p>{emailDesign.senderName}</p>
          <p>{emailDesign.senderDepartment}</p>
          <p>{emailDesign.senderInstitution}</p>
          {emailDesign.linkedinProfile && (
            <p>LinkedIn: <a href={emailDesign.linkedinProfile}>{emailDesign.linkedinProfile}</a></p>
          )}
          {emailDesign.githubProfile && (
            <p>GitHub: <a href={emailDesign.githubProfile}>{emailDesign.githubProfile}</a></p>
          )}
          {emailDesign.facebookProfile && (
            <p>Facebook: <a href={emailDesign.facebookProfile}>{emailDesign.facebookProfile}</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEmailForm;
