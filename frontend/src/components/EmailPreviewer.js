// src/components/EmailPreviewer.js
import React from 'react';

const EmailPreviewer = ({ formData }) => {
  return (
    <div className="email-preview">
      <h3>Email Preview</h3>
      <div className="email-content">
        <p>Dear {formData.receiverName || 'Receiver'},</p>
        <p>{formData.emailBody || 'This is the body of the email.'}</p>
        <br />
        <br />
        <table className="signature-table" style={{width:'auto'}}>
          <tbody >
            <tr >
              <td className="signature-logo">
                <img
                  src={
                    formData.imageUrl ||
                    'https://lh5.googleusercontent.com/o5Hh7Uc4lwJQwq0OUUWVrR7Xfk1A8Dyr8u517DvPbzpvCBVXKhkyVIO3Qgl6fNmwm5Nse98bBzBUEE2u64JQanBUDXa9a0b6yxIYgOx4P_9HftA9JpRXRjiQhBlBMWmpvvRe7stW2TYkojY_lKFZ2Ds'
                  }
                  alt={`${formData.senderInstitution || 'Your'} Logo`}
                />
              </td>
              <td className="signature-details">
                <strong>{formData.senderName || 'Your Name'}</strong>
                <br />
                {formData.senderDepartment || 'Your Department'}
                <br />
                {formData.senderInstitution || 'Your Institution'}
                <br />
                <div className="social-icons">
                  {formData.linkedinProfile && (
                    <a href={formData.linkedinProfile} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                        alt="LinkedIn"
                        className="social-icon"
                      />
                    </a>
                  )}
                  {formData.githubProfile && (
                    <a href={formData.githubProfile} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        alt="GitHub"
                        className="social-icon"
                      />
                    </a>
                  )}
                  {formData.facebookProfile && (
                    <a href={formData.facebookProfile} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                        alt="Facebook"
                        className="social-icon"
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
  );
};

export default EmailPreviewer;
