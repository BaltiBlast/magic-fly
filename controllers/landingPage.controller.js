const transporter = require("../configs/nodemailer");
require("dotenv").config();
// const { GOOGLE_MAIL_USER } = process.env;

const landingPageController = {
  getLandingPage: (req, res) => {
    res.render("landingPage");
  },

  postContactFormOnLandingPage: async (req, res) => {
    const { email, subject, message, fullName } = req.body;
    const mailOptions = {
      from: "fougeray.florian@gmail.com",
      to: "fougeray.florian@gmail.com",
      subject: `${fullName} - ${subject}`,
      html: `
      <div>
        <p>
          <b>Nom : ${fullName}<br></b>
          <b>Email : ${email}<br /></b>
          <b>Sujet : ${subject}<br /></b>
          <br />
          ${message}
        </p>
      </div>
    `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.redirect("/");
  },
};

module.exports = landingPageController;
