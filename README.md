# Improve Your Health Library

A growing collection of texts exploring ways to improve and maintain your health.

---

## Stay Healthy

This library is designed to help you take charge of your health. In our modern world, it’s important to be mindful of many hidden factors - from plastics and nanoparticles to water filtration and food preparation.  Each text provides practical insights and guidance. The library is updated regularly with new content to keep you informed.

## Installation

Usage Instructions

*Option 1: PHP Backend (DEFAULT. Recommended for most shared hosting)*

    Upload all files to your web server
    Make sure PHP is enabled (most hosting has this by default)
    Set backend to 'php' in markdown-reader.js (line 545):

    const reader = new MarkdownReader('./Documents/', 'php');

    Open index.html in your browser
    The PHP script will automatically scan the ./Documents/ directory

*Option 2: Node.js Backend*

    Install Node.js and npm
    Install Express: npm install express
    Set backend to 'node' in markdown-reader.js:

    const reader = new MarkdownReader('./Documents/', 'node');

    Start server: node js/server.js
    Open http://localhost:3000

*Option 3: Manual File List*

    Set backend to 'manual' in markdown-reader.js
    Edit the scanFilesManually() function to list your files
    Open index.html directly

Or simply manually browse the README.md files in each category.

---

## Disclaimer

This is not official medical advice. These texts are informal. Always consult a qualified professional when making significant health changes.  

We waive all liability resulting from use of these texts. Please use common sense, and seek expert advice for additional guidance. While precautions are taken and AI-reviewing methods help catch mistakes, errors may still occur.

---

## License

All texts are licensed under the [MIT License](https://opensource.org/licenses/MIT).
