const SparkPost = require('sparkpost');
const dotenv = require('dotenv');

dotenv.config();
const client = new SparkPost(process.env.SPARKPOST_API_KEY);


const sendOtp = (email, name, otp) => {
    client.transmissions.send({
        options: {
            sandbox: false
        },
        content: {
            from: 'chatnow@mailer.jitenderkumar.in',
            subject: `Thankyou for Registering ${name}`,
            html: `<html><body>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Chat Now Authentication</a>
    </div>
    <p style="font-size:1.1em">Hi ${name},</p>
    <p>Thank you for registering on Chat Now. Use the following OTP to complete your Sign Up procedures.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Chat Now Mailer</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Chat Now</p>
      <p>A Product by Jitender Kumar</p>
      <p>www.JitenderKumar.In</p>
    </div>
  </div>
</div>
            </body></html>`
        },
        recipients: [
            { address: email }
        ]
    })
        .then(data => {
            console.log('Woohoo! You just sent your first mailing!');
            console.log(data);
        })
        .catch(err => {
            console.log('Whoops! Something went wrong');
            console.log(err);
        });
}

const sendSuccess = (email, name) => {
    client.transmissions.send({
        options: {
            sandbox: false
        },
        content: {
            from: 'chatnow@mailer.jitenderkumar.in',
            subject: `Email Verified, Yay`,
            html: `<html><body>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Chat Now Authentication</a>
    </div>
    <p style="font-size:1.1em">Hi ${name},</p>
    <p>Thankyou for verifying your email. you can now access Chat Now app and message your loved ones...🎉</p>
    <p style="font-size:0.9em;">Regards,<br />Chat Now Mailer</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Chat Now</p>
      <p>A Product by Jitender Kumar</p>
      <p>www.JitenderKumar.In</p>
    </div>
  </div>
</div>
            </body></html>`
        },
        recipients: [
            { address: email }
        ]
    })
        .then(data => {
            console.log('Woohoo! You just sent your first mailing!');
            console.log(data);
        })
        .catch(err => {
            console.log('Whoops! Something went wrong');
            console.log(err);
        });
}

module.exports = { sendOtp, sendSuccess };