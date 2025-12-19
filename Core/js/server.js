const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('.'));

// API endpoint to list markdown files
app.get('/api/list-markdown-files', async (req, res) => {
    try {
        const files = await scanDirectory('../../');
        const mdFiles = files.filter(file => 
            file.endsWith('.md') && !file.endsWith('LICENSE.md')
        );
        res.json({ 
            success: true,
            files: mdFiles,
            count: mdFiles.length
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Recursively scan directory
async function scanDirectory(dir, fileList = []) {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);
        
        if (stat.isDirectory()) {
            await scanDirectory(filePath, fileList);
        } else {
            fileList.push(filePath.replace(/\\/g, '/'));
        }
    }
    
    return fileList;
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Using Node.js backend`);
});
