Usage Instructions

Option 1: PHP Backend (Recommended for most shared hosting)

    Upload all files to your web server
    Make sure PHP is enabled (most hosting has this by default)
    Set backend to 'php' in markdown-reader.js (line 411):

    const reader = new MarkdownReader('/files/', 'php');

    Open index.html in your browser
    The PHP script will automatically scan the /files/ directory

Option 2: Node.js Backend

    Install Node.js and npm
    Install Express: npm install express
    Set backend to 'node' in markdown-reader.js:

    const reader = new MarkdownReader('/files/', 'node');

    Start server: node server.js
    Open http://localhost:3000

Option 3: Manual File List

    Set backend to 'manual' in markdown-reader.js
    Edit the scanFilesManually() function to list your files
    Open index.html directly
