import React, { useState, useEffect } from 'react';
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
    facebookProfile: '',
    imageUrl: '', // New field for dynamic image URL
  });

  const navigate = useNavigate();

  // Dynamically fetch or update image URL
  useEffect(() => {
    const imageFetchUrl = '/backend-api/image-url'; // Backend URL to fetch the image
    fetch(imageFetchUrl)
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: data.url, // Assuming the URL comes from backend
        }));
      });
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
          <p>Dear {formData.receiverName},</p>
          <p>{formData.emailBody}</p>
          <br />
          <br />
          <table style={{ width: 'auto', border: 'none' }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'top', textAlign: 'right', paddingRight: '15px' }}>
                  <img
                    src={formData.institutionLogoUrl || 'https://lh5.googleusercontent.com/o5Hh7Uc4lwJQwq0OUUWVrR7Xfk1A8Dyr8u517DvPbzpvCBVXKhkyVIO3Qgl6fNmwm5Nse98bBzBUEE2u64JQanBUDXa9a0b6yxIYgOx4P_9HftA9JpRXRjiQhBlBMWmpvvRe7stW2TYkojY_lKFZ2Ds'}
                    alt={`${formData.senderInstitution} Logo`}
                    style={{ width: '100px' }}
                  />
                </td>
                <td style={{ verticalAlign: 'center', textAlign: 'left' }}>
                  <div><strong>{formData.senderName}</strong></div>
                  {/* <br /> */}
                  {formData.senderDepartment}
                  <br />
                  {formData.senderInstitution}
                  <br />
                  <div style={{display:'flex'}}>
                    {formData.linkedinProfile && (
                      <a href={formData.linkedinProfile}>
                        <img
                          src="https://lh4.googleusercontent.com/xilrOfvWrwtXPKoXLRQ95UouNY2W_wHCFLEFQ-5v9pTvxgFkH7tIQ0zZfXrG9IxcurQD9csairG9dE33SxQjzGe4hc8hveF7cm8dMgc6CPnCqB3WGbIWAeV6l1-kXW-ldSL_BHUP_VkU3YeFhHr_w38"
                          alt="LinkedIn"
                          style={{ width: '20px', marginRight: '7px' }}
                        />
                      </a>
                    )}
                    {formData.githubProfile && (
                      <a href={formData.githubProfile}>
                        <img
                          src="https://lh6.googleusercontent.com/740lrSb8xS8U-vikPArUHMVv0xutEv5hndjyWZ_bg4tKwpAKbI1ixIBAws9xzXaPSPDEMzzapzxAjqTMdffdrgyZ5eACH3eEamZ58HW8kvtTI03_AKky4FuWfWcvYwU29GY5J88MQYSOciVLmlmbdD4"
                          alt="GitHub"
                          style={{ width: '20px', marginRight: '7px' }}
                        />
                      </a>
                    )}
                    {formData.facebookProfile && (
                      <a href={formData.facebookProfile}>
                        <img
                          src="https://lh6.googleusercontent.com/YuHD1alrL9Op8iOwQvq0asAA3khiG88wk8GU2qKPawlodpsYEHgKuDEckHm3ZDUmq8omkB-2xCdMldzmqE_SUQ8wxOO-xcHY4lUd-_5J2EjklaI3vWvL6WWMB9rlasf7SMCo_jkzpoV_SZmww7ckWl0"
                          alt="Facebook"
                          style={{ width: '20px' }}
                        />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DesignEmailForm;
