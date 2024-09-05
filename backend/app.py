from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage
import ssl

app = Flask(__name__)
CORS(app)

def send_email(sender_email, sender_password, email_data):
    msg = EmailMessage()
    msg['From'] = sender_email
    msg['To'] = email_data['receiverEmail']
    msg['Subject'] = email_data['emailSubject']

    # Create HTML body
    html_body = f"""
    <html>
    <body>
        <p>Dear {email_data['receiverName']},</p>
        {email_data['emailBody']}
        <br><br>
        <!-- Signature Section -->
        <table style="width: auto; border: none;">
            <tr>
                <td style="vertical-align: top; text-align: right; padding-right: 15px;">
                    <img src="https://example.com/your-institution-logo.png" alt="{email_data['senderInstitution']} Logo" style="width: 100px;">
                </td>
                <td style="vertical-align: top; text-align: left;">
                    <strong>{email_data['senderName']}</strong><br>
                    {email_data['senderDepartment']}<br>
                    {email_data['senderInstitution']}<br>
                    <a href="{email_data['linkedinProfile']}">
                        <img src="https://example.com/linkedin-icon.png" alt="LinkedIn" style="width: 20px; margin-right: 7px;">
                    </a>
                    <a href="{email_data['githubProfile']}">
                        <img src="https://example.com/github-icon.png" alt="GitHub" style="width: 20px; margin-right: 7px;">
                    </a>
                    <a href="{email_data['facebookProfile']}">
                        <img src="https://example.com/facebook-icon.png" alt="Facebook" style="width: 20px;">
                    </a>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    msg.set_content(html_body, subtype='html')

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(sender_email, sender_password)
            smtp.send_message(msg)
        print(f"Email sent successfully to {email_data['receiverName']} at {email_data['receiverEmail']}!")
        return True
    except Exception as e:
        print(f"Error sending email to {email_data['receiverName']}: {e}")
        return False

@app.route('/send-email', methods=['POST'])
def handle_send_email():
    data = request.get_json()
    sender_email = data['senderEmail']
    sender_password = data['senderPassword']
    
    email_data = {
        'receiverName': data['receiverName'],
        'receiverEmail': data['receiverEmail'],
        'companyName': data['companyName'],
        'emailSubject': data['emailSubject'],
        'emailBody': data['emailBody'],
        'senderName': data['senderName'],
        'senderDepartment': data['senderDepartment'],
        'senderInstitution': data['senderInstitution'],
        'linkedinProfile': data['linkedinProfile'],
        'githubProfile': data['githubProfile'],
        'facebookProfile': data['facebookProfile'],
    }

    success = send_email(sender_email, sender_password, email_data)
    
    if success:
        return jsonify({'message': 'Email sent successfully!'})
    else:
        return jsonify({'message': 'Failed to send email'}), 500

if __name__ == '__main__':
    app.run(debug=True)