const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const REGISTERED_PATH = path.join(__dirname, 'information', 'parties_registered.json');

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/save-party', (req, res) => {
    const { abbr, name, description, primaryColor, secondaryColor, characteristics } = req.body;

    // Basic validation
    if (!abbr || !name) {
        return res.status(400).json({ error: 'Abbreviation and name are required.' });
    }
    if (!/^[A-Z]{1,6}$/.test(abbr)) {
        return res.status(400).json({ error: 'Abbreviation must be 1–6 uppercase letters.' });
    }

    // Read existing data
    let existing = {};
    if (fs.existsSync(REGISTERED_PATH)) {
        try {
            existing = JSON.parse(fs.readFileSync(REGISTERED_PATH, 'utf8'));
        } catch {
            return res.status(500).json({ error: 'Failed to read parties_registered.json.' });
        }
    }

    // Duplicate check
    if (existing[abbr]) {
        return res.status(409).json({ error: `Abbreviation "${abbr}" is already registered.` });
    }

    // Append new party
    existing[abbr] = { name, description, primaryColor, secondaryColor, characteristics };

    try {
        fs.writeFileSync(REGISTERED_PATH, JSON.stringify(existing, null, 2), 'utf8');
    } catch {
        return res.status(500).json({ error: 'Failed to write parties_registered.json.' });
    }

    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Aurelia server running at http://localhost:${PORT}`);
});
