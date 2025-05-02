// npm imports //
const transporter = require("../configs/nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// local imports //
const credentials = require("../magicflyCredentials.json");

// destructure / variables //
const { GOOGLE_MAIL_USER } = process.env;

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth: auth,
});

const landingPageController = {
  getLandingPage: async (req, res) => {
    try {
      const response = await drive.files.list({
        q: `'${FOLDER_DRIVE_ID}' in parents`,
        fields: "files(id, name, mimeType)",
      });

      // Rendre les fichiers publics
      // await Promise.all(
      //   response.data.files.map((file) =>
      //     drive.permissions.create({
      //       fileId: file.id,
      //       requestBody: {
      //         role: "reader",
      //         type: "anyone",
      //       },
      //     })
      //   )
      // );

      // Construire les URLs affichables
      const imageLinks = response.data.files.map((file) => ({
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000"`,
      }));

      console.log("Image links:", imageLinks);

      res.render("landingPage", { imageLinks });
    } catch (error) {
      console.error("Error getting Google Drive files:", error.message);
      // Afficher plus de détails sur l'erreur
      if (error.response) {
        console.error("Détails de l'erreur:", error.response.data);
      }
    }
  },

  postContactFormOnLandingPage: async (req, res) => {
    const { email, subject, message, fullName } = req.body;
    const mailOptions = {
      from: GOOGLE_MAIL_USER,
      // to: GOOGLE_MAIL_USER,
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
