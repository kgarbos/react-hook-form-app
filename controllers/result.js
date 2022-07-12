const formidable = require('formidable');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require("fs");

const sendEmail = (req, res) => {
  const form = new formidable.IncomingForm();

  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, file) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.status(200).send('Email sent successfully');

    // console.log(file);

    const { firstName, lastName, email, phoneNumber } = fields;
    const { filepath, originalFilename, mimetype } = file.files;
    const attachment = fs.readFileSync(filepath).toString("base64");

    const msg = {
      to: email,
      from: 'kjgarbos@gmail.com',
      subject: 'Ultimate Form Challenge Email',
      text: `Hello ${firstName} ${lastName}, here's your attachment and email confirmation`,
      attachments: [
        {
          content: attachment,
          filename: originalFilename,
          type: mimetype,
          disposition: "attachment"
        }
      ]
    };
    
    sgMail.send(msg).catch(err => {
      console.log(err);
    });
    
  });
};

module.exports = { sendEmail };