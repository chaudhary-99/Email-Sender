import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DesignEmailForm = () => {
  const [formData, setFormData] = useState({
    emailSubject: '',
    emailBody: '',
    senderName: '',
    senderDepartment: '',
    senderInstitution: '',
    linkedinProfile: '',
    githubProfile: '',
    companyName: '',
    facebookProfile: '', // Added field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('emailDesign', JSON.stringify(formData));
    navigate('/send');
  };

  return (
    <div className="email-form">
      <h2>Design Email</h2>
      <form onSubmit={handleSubmit}>
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
            rows={10}
            required
            value={formData.emailBody}
            onChange={handleChange}
          />
        </div>

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
        <div className="form-group">
          <label htmlFor="linkedinProfile">LinkedIn Profile</label>
          <input
            id="linkedinProfile"
            name="linkedinProfile"
            type="text"
            value={formData.linkedinProfile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="githubProfile">GitHub Profile</label>
          <input
            id="githubProfile"
            name="githubProfile"
            type="text"
            value={formData.githubProfile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="facebookProfile">Facebook Profile</label>
          <input
            id="facebookProfile"
            name="facebookProfile"
            type="text"
            value={formData.facebookProfile}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save and Continue</button>
      </form>

      <div className="email-preview">
        <h3>Email Preview</h3>
        <div className="email-content">
          <h4>Subject: {formData.emailSubject}</h4>
          <p>{formData.emailBody}</p>
          <p>Best regards,</p>
          <p>{formData.senderName}</p>
          <p>{formData.senderDepartment}</p>
          <p>{formData.senderInstitution}</p>
          {formData.linkedinProfile && (
            <p>LinkedIn: <a href={formData.linkedinProfile}>{formData.linkedinProfile}</a></p>
          )}
          {formData.githubProfile && (
            <p>GitHub: <a href={formData.githubProfile}>{formData.githubProfile}</a></p>
          )}
          {formData.facebookProfile && (
            <p>Facebook: <a href={formData.facebookProfile}>{formData.facebookProfile}</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignEmailForm;
