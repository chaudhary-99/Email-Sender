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
                    <img src="https://lh5.googleusercontent.com/o5Hh7Uc4lwJQwq0OUUWVrR7Xfk1A8Dyr8u517DvPbzpvCBVXKhkyVIO3Qgl6fNmwm5Nse98bBzBUEE2u64JQanBUDXa9a0b6yxIYgOx4P_9HftA9JpRXRjiQhBlBMWmpvvRe7stW2TYkojY_lKFZ2Ds" alt="{email_data['senderInstitution']} Logo" style="width: 85px;">
                </td>
                <td style="vertical-align: top; text-align: left;">
                    <strong>{email_data['senderName']}</strong><br>
                    {email_data['senderDepartment']}<br>
                    {email_data['senderInstitution']}<br>
                    <a href="{email_data['linkedinProfile']}">
                        <img src="https://lh4.googleusercontent.com/xilrOfvWrwtXPKoXLRQ95UouNY2W_wHCFLEFQ-5v9pTvxgFkH7tIQ0zZfXrG9IxcurQD9csairG9dE33SxQjzGe4hc8hveF7cm8dMgc6CPnCqB3WGbIWAeV6l1-kXW-ldSL_BHUP_VkU3YeFhHr_w38" alt="LinkedIn" style="width: 20px; margin-right: 7px;">
                    </a>
                    <a href="{email_data['githubProfile']}">
                        <img src="https://lh6.googleusercontent.com/740lrSb8xS8U-vikPArUHMVv0xutEv5hndjyWZ_bg4tKwpAKbI1ixIBAws9xzXaPSPDEMzzapzxAjqTMdffdrgyZ5eACH3eEamZ58HW8kvtTI03_AKky4FuWfWcvYwU29GY5J88MQYSOciVLmlmbdD4" alt="GitHub" style="width: 20px; margin-right: 7px;">
                    </a>
                    <a href="{email_data['facebookProfile']}">
                        <img src="https://lh6.googleusercontent.com/YuHD1alrL9Op8iOwQvq0asAA3khiG88wk8GU2qKPawlodpsYEHgKuDEckHm3ZDUmq8omkB-2xCdMldzmqE_SUQ8wxOO-xcHY4lUd-_5J2EjklaI3vWvL6WWMB9rlasf7SMCo_jkzpoV_SZmww7ckWl0" alt="Facebook" style="width: 20px;">
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