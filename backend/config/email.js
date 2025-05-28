const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Djewno Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};


// Send order confirmation email
const sendOrderConfirmationEmail = async (email, orderId, items, totalPrice) => {
  const subject = "Your Order Confirmation - Djewno";
  // const itemsList = items
  //   .map((item) => `<li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>`)
  //   .join("");

   // Check if items array is valid
   const itemsList = Array.isArray(items) && items.length > 0
   ? items
       .map((item) => {
         const name = item?.name || "Unknown Item";
         const quantity = item?.quantity || 1;
         const price = item?.price ? `₹${item.price * quantity}` : "Price not available";

         return `<li>${name} x ${quantity} - ${price}</li>`;
       })
       .join("")
   : "<p>No items found in your order.</p>";

  const html = `
    <h2>Thank You for Your Order!</h2>
    <p>Your order ID is <strong>#${orderId}</strong>.</p>
    <h3>Order Summary:</h3>
    <ul>${itemsList}</ul>
    <p><strong>Total: ₹${totalPrice}</strong></p>
    <p>We will notify you once your order is shipped.</p>
    <p>Best regards,<br><strong>Djewno Team</strong></p>
  `;

  await sendEmail(email, subject, html);
};

module.exports =  { sendEmail, sendOrderConfirmationEmail, };
