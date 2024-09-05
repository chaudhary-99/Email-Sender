// src/components/DesignEmailForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailPreviewer from './EmailPreviewer';

const DesignEmailForm = () => {
  const [formData, setFormData] = useState({
    emailSubject: '',
    emailBody: '',
    senderName: '',
    senderDepartment: '',
    senderInstitution: '',
    linkedinProfile: '',
    githubProfile: '',
    facebookProfile: '',
    imageUrl: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const imageFetchUrl = '/backend-api/image-url';
    fetch(imageFetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: data.url,
        }));
      })
      .catch((error) => console.error('Error fetching image URL:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/send', { state: { emailDesign: formData } });
  };

  return (
    <div className="email-form-container">
      <h2 className="form-title">Design Your Email</h2>
      <form className="email-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Subject & Body</h3>
          <div className="form-group">
            <label htmlFor="emailSubject">Email Subject</label>
            <input
              id="emailSubject"
              name="emailSubject"
              type="text"
              required
              value={formData.emailSubject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailBody">Email Body</label>
            <textarea
              id="emailBody"
              name="emailBody"
              rows={8}
              required
              value={formData.emailBody}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Signature Details</h3>
          <div className="form-group">
            <label htmlFor="senderName">Your Name</label>
            <input
              id="senderName"
              name="senderName"
              type="text"
              required
              value={formData.senderName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senderDepartment">Your Department</label>
            <input
              id="senderDepartment"
              name="senderDepartment"
              type="text"
              required
              value={formData.senderDepartment}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senderInstitution">Your Institution</label>
            <input
              id="senderInstitution"
              name="senderInstitution"
              type="text"
              required
              value={formData.senderInstitution}
              onChange={handleChange}
            />
          </div>
          <div className="form-group social-links">
            <label>Social Profiles</label>
            <input
              id="linkedinProfile"
              name="linkedinProfile"
              type="url"
              placeholder="LinkedIn URL"
              value={formData.linkedinProfile}
              onChange={handleChange}
            />
            <input
              id="githubProfile"
              name="githubProfile"
              type="url"
              placeholder="GitHub URL"
              value={formData.githubProfile}
              onChange={handleChange}
            />
            <input
              id="facebookProfile"
              name="facebookProfile"
              type="url"
              placeholder="Facebook URL"
              value={formData.facebookProfile}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn primary-btn">
          Save & Continue
        </button>
      </form>

      <EmailPreviewer formData={formData} />
    </div>
  );
};

export default DesignEmailForm;
