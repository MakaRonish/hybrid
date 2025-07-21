const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let contactLogs = [];

app.get('/', (req, res) => {
    const contactList = contactLogs.map((contact, i) => `
    <li>
      <strong>${i + 1}. ${contact.name}</strong> (${contact.role})<br/>
      📞 ${contact.phone}<br/>
      📧 ${contact.email}<br/>
      🏠 ${contact.address}
    </li>
  `).join('');

    res.send(`
    <html>
      <head>
        <title>📒 Contact Log</title>
        <style>
          body { font-family: Arial; padding: 20px; background: #fff; line-height: 1.6; }
          h2 { color: #007bff; }
          li { margin-bottom: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px; }
          ul { padding-left: 0; list-style: none; }
        </style>
      </head>
      <body>
        <h2>🚀 Express Server for Contact Manager</h2>
        <p>This server is running and receiving contact data from your Ionic app.</p>
        <h3>📋 Submitted Contacts:</h3>
        <ul>${contactList || '<li>No contacts submitted yet.</li>'}</ul>
      </body>
    </html>
  `);
});

app.post('/addContact', (req, res) => {
    console.log('📥 New contact added:', req.body);
    contactLogs.push(req.body);
    res.json({ message: 'Contact added successfully!' });
});

app.post('/updateContact', (req, res) => {
    console.log('✏️ Contact updated:', req.body);


    const index = contactLogs.findIndex(c => c.email === req.body.email);
    if (index !== -1) {
        contactLogs[index] = req.body;
    }

    res.json({ message: 'Contact updated successfully!' });
});

app.post('/deleteContact', (req, res) => {
    console.log('🗑️ Contact deleted:', req.body);


    contactLogs = contactLogs.filter(contact => contact.email !== req.body.email);

    res.json({ message: 'Contact deleted successfully!' });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
