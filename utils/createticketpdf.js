const html2pdf = require("html2pdf.js");
const fs = require("fs");

// Assuming you have extracted the HTML for the ticket section
const ticketHTML = ``;

const options = {
  filename: "airticket.pdf",
  margin: 0, // Adjust margins as needed
  scaling: 2, // Optional: Scale the content for better fit (adjust as needed)
};

html2pdf
  .html2pdf(ticketHTML, options)
  .then((pdfBuffer) => {
    fs.writeFileSync("airticket.pdf", pdfBuffer);
    console.log("PDF generated successfully!");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
