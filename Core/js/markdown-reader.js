class MarkdownReader {
    constructor(rootFolder = '../../', backend = 'php') {
        this.rootFolder = rootFolder;
        this.backend = backend; // 'php', 'node', or 'manual'
        this.files = [];
        this.currentFile = null;
    }

    // Initialize the reader
    async init() {
        await this.scanFiles();
        this.renderFileList();
    }

    // Scan files based on backend type
    async scanFiles() {
        switch(this.backend) {
            case 'php':
                await this.scanFilesWithPHP();
                break;
            case 'node':
                await this.scanFilesWithNode();
                break;
            case 'manual':
            default:
                await this.scanFilesManually();
                break;
        }
    }

    // Scan files using PHP backend
    async scanFilesWithPHP() {
        try {
            const response = await fetch('Core/php/list-files.php');
            const data = await response.json();
            
            if (data.success) {
                this.files = data.files;
                console.log(`Loaded ${data.count} markdown files using PHP`);
            } else {
                console.error('PHP Error:', data.error);
                this.files = [];
            }
        } catch (error) {
            console.error('Error fetching file list from PHP:', error);
            this.files = [];
        }
    }

    // Scan files using Node.js backend
    async scanFilesWithNode() {
        try {
            const response = await fetch('/api/list-markdown-files');
            const data = await response.json();
            this.files = data.files || [];
            console.log(`Loaded ${this.files.length} markdown files using Node.js`);
        } catch (error) {
            console.error('Error fetching file list from Node.js:', error);
            this.files = [];
        }
    }

    // Manual file list (fallback method)
    async scanFilesManually() {
        // Manually define your markdown files here
        this.files = [
            'files/document1.md',
            'files/document2.md',
            'files/subfolder/document3.md',
            // Add more files here...
        ];
        console.log(`Loaded ${this.files.length} markdown files manually`);
    }

    // Render the list of files
    renderFileList() {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';

        if (this.files.length === 0) {
            fileList.innerHTML = '<li style="color: #dc3545;">No markdown files found. Check console for errors.</li>';
            return;
        }

        // Group files by directory
        const grouped = this.groupFilesByDirectory(this.files);
        
        // Render grouped files
        this.renderGroupedFiles(fileList, grouped);
    }

    // Group files by their directory
    groupFilesByDirectory(files) {
        const grouped = {};
        
        files.forEach(file => {
            const parts = file.split('/');
            const fileName = parts[parts.length - 1];
            const directory = parts.slice(0, -1).join('/') || 'root';
            
            if (!grouped[directory]) {
                grouped[directory] = [];
            }
            
            grouped[directory].push({
                path: file,
                name: fileName.replace('.md', '')
            });
        });
        
        return grouped;
    }

    // Render grouped files with directory headers
    renderGroupedFiles(container, grouped) {
        Object.keys(grouped).sort().forEach(directory => {
            // Add directory header if not root
            if (directory !== 'root' && Object.keys(grouped).length > 1) {
                const header = document.createElement('li');
                header.className = 'directory-header';
                header.textContent = '📁 ' + directory.replace('files/', '');
                container.appendChild(header);
            }
            
            // Add files in this directory
            grouped[directory].forEach(file => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = file.name;
                a.dataset.file = file.path;
                a.title = file.path;
                
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.loadFile(file.path);
                    
                    // Update active state
                    document.querySelectorAll('.file-list a').forEach(link => {
                        link.classList.remove('active');
                    });
                    a.classList.add('active');
                });

                li.appendChild(a);
                container.appendChild(li);
            });
        });
    }

    // Extract filename from path
    getFileName(path) {
        const parts = path.split('/');
        return parts[parts.length - 1].replace('.md', '');
    }

    // Load and display a markdown file
    async loadFile(filePath) {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading">Loading...</div>';
        content.classList.remove('empty');

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('File not found');
            
            const markdown = await response.text();
            const html = this.parseMarkdown(markdown);
            
            content.innerHTML = html;
            this.currentFile = filePath;
            
            // Scroll to top of content
            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            content.innerHTML = `<p style="color: #dc3545;">Error loading file: ${error.message}</p>`;
        }
    }

	parseMarkdown(markdown) {
		// STEP 1: Extract and protect code blocks FIRST
		const codeBlocks = [];
		let codeBlockIndex = 0;
		
		let html = markdown.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
			const language = lang || 'text';
			const placeholder = `___CODE_BLOCK_${codeBlockIndex}___`;
			
			const escapedCode = this.escapeHtml(code);
			const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
			
			codeBlocks.push(`<div class="code-block-wrapper"><button class="copy-button" onclick="copyCode('${codeId}')">Copy</button><pre class="language-${language}" data-language="${language}"><code id="${codeId}">${escapedCode}</code></pre></div>`);
			
			codeBlockIndex++;
			return placeholder;
		});

		// STEP 1.5: Extract and protect tables (they're now outside code blocks)
		const tables = [];
		let tableIndex = 0;
		
		const lines = html.split('\n');
		const processedLines = [];
		let currentTable = [];
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			// Skip code block placeholders entirely
			if (line.trim().includes('___CODE_BLOCK_')) {
				// Save any pending table first
				if (currentTable.length > 0) {
					tables.push(this.processTable(currentTable));
					processedLines.push(`___TABLE_${tableIndex}___`);
					tableIndex++;
					currentTable = [];
				}
				processedLines.push(line);
				continue;
			}
			
			// Check if this is a table row
			if (/^\|(.+)\|$/.test(line.trim())) {
				currentTable.push(line.trim());
			} else {
				// Not a table line - save pending table if exists
				if (currentTable.length > 0) {
					tables.push(this.processTable(currentTable));
					processedLines.push(`___TABLE_${tableIndex}___`);
					tableIndex++;
					currentTable = [];
				}
				processedLines.push(line);
			}
		}
		
		// Handle table at end of document
		if (currentTable.length > 0) {
			tables.push(this.processTable(currentTable));
			processedLines.push(`___TABLE_${tableIndex}___`);
		}
		
		html = processedLines.join('\n');

		// STEP 2: Process inline code
		html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

		// STEP 3: Process everything else
		
		html = html.replace(/^###### (.*$)/gim, (match, content) => {
			const id = this.generateId(content);
			return `<h6 id="${id}">${content}</h6>`;
		});
		html = html.replace(/^##### (.*$)/gim, (match, content) => {
			const id = this.generateId(content);
			return `<h5 id="${id}">${content}</h5>`;
		});
		html = html.replace(/^#### (.*$)/gim, (match, content) => {
			const id = this.generateId(content);
			return `<h4 id="${id}">${content}</h4>`;
		});
		html = html.replace(/^### (.*$)/gim, (match, content) => {
			const id = this.generateId(content);
			return `<h3 id="${id}">${content}</h3>`;
		});
		html = html.replace(/^## (.*$)/gim, (match, content) => {
			const id = this.generateId(content);
			return `<h2 id="${id}">${content}</h2>`;
		});
		html = html.replace(/^# (.*$)/gim, (match, content) => {
			const id = this.generateId(content);
			return `<h1 id="${id}">${content}</h1>`;
		});

		// Bold, italic, strikethrough
		html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
		html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

		// Links
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

		// Images
		// html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

		// Blockquotes
		html = html.replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>');

		// Horizontal rules
		html = html.replace(/^---$/gim, '<hr>');
		html = html.replace(/^\*\*\*$/gim, '<hr>');

		// Task lists
		html = html.replace(/^\- \[ \] (.*$)/gim, '<label><input type="checkbox" disabled> $1</label>');
		html = html.replace(/^\- \[x\] (.*$)/gim, '<label><input type="checkbox" checked disabled> $1</label>');

		// Lists (unordered and ordered)
		html = html.replace(/^\* (.*$)/gim, '<li>$1</li>___NEWLINE___');
		html = html.replace(/^\- (.*$)/gim, '<li>$1</li>___NEWLINE___');
		html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>___NEWLINE___');
		
		html = html.replace(/((?:<li>.*<\/li>___NEWLINE___)+)/g, (match) => {
			const cleanMatch = match.replace(/___NEWLINE___/g, '');
			const lines = markdown.split('\n');
			const firstListLine = lines.find(line => 
				/^\* /.test(line.trim()) || 
				/^\- /.test(line.trim()) || 
				/^\d+\. /.test(line.trim())
			);
			
			if (firstListLine && /^\d+\./.test(firstListLine.trim())) {
				return `<ol>${cleanMatch}</ol>`;
			}
			return `<ul>${cleanMatch}</ul>`;
		});

		// Line breaks
		html = html.replace(/\n\n/g, '</p><p>');
		html = html.replace(/\n/g, '<br>');
		html = `<p>${html}</p>`;

		// Clean up: Remove <br> tags after closing tags
		html = html.replace(/(<\/li>)<br>/g, '$1');
		html = html.replace(/(<\/ul>)<br>/g, '$1');
		html = html.replace(/(<\/ol>)<br>/g, '$1');
		html = html.replace(/(<\/tr>)<br>/g, '$1');
		html = html.replace(/(<\/table>)<br>/g, '$1');
		html = html.replace(/(<\/h[1-6]>)<br>/g, '$1');
		html = html.replace(/(<hr>)<br>/g, '$1');
		html = html.replace(/(<\/blockquote>)<br>/g, '$1');

		// Clean up empty paragraphs
		html = html.replace(/<p><\/p>/g, '');
		html = html.replace(/<p>(<h[1-6])/g, '$1');
		html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
		html = html.replace(/<p>(<table>)/g, '$1');
		html = html.replace(/(<\/table>)<\/p>/g, '$1');
		html = html.replace(/<p>(<ul>)/g, '$1');
		html = html.replace(/(<\/ul>)<\/p>/g, '$1');
		html = html.replace(/<p>(<ol>)/g, '$1');
		html = html.replace(/(<\/ol>)<\/p>/g, '$1');
		html = html.replace(/<p>(<hr>)/g, '$1');
		html = html.replace(/(<hr>)<\/p>/g, '$1');
		html = html.replace(/<p>(<blockquote>)/g, '$1');
		html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

		// STEP 4: Restore tables FIRST
		tables.forEach((table, index) => {
			html = html.replace(`___TABLE_${index}___`, table);
		});

		// STEP 5: Restore code blocks LAST
		codeBlocks.forEach((block, index) => {
			html = html.replace(`___CODE_BLOCK_${index}___`, block);
		});

		return html;
	}

	// Helper method to process tables
	processTable(tableLines) {
		const rows = tableLines.map(line => {
			const cells = line.slice(1, -1).split('|').map(cell => cell.trim());
			return cells;
		});
		
		// Find separator row (like |---|---|)
		const sepIndex = rows.findIndex(row => 
			row.every(cell => /^:?-+:?$/.test(cell))
		);
		
		if (sepIndex === -1) {
			// No header separator - treat all as body
			const bodyRows = rows.map(cells => 
				'<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
			).join('\n');
			return `<table><tbody>${bodyRows}</tbody></table>`;
		}
		
		// Has header
		const headerCells = rows[sepIndex - 1];
		const header = '<tr>' + headerCells.map(cell => `<th>${cell}</th>`).join('') + '</tr>';
		
		const bodyRows = rows.slice(sepIndex + 1).map(cells =>
			'<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
		).join('\n');
		
		return `<table>\n<thead>${header}</thead>\n<tbody>${bodyRows}</tbody>\n</table>`;
	}


	escapeHtml(text) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, m => map[m]);
	}


    // Generate ID from text for anchor links
    generateId(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    }

    // Escape HTML special characters
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Merge adjacent tags
    mergeAdjacentTags(html, tag) {
        const regex = new RegExp(`</${tag}>\\s*<${tag}>`, 'g');
        return html.replace(regex, '\n');
    }

    // Wrap list items in ul/ol tags
    wrapLists(html) {
        // Wrap task lists
        html = html.replace(/(<li class="task-list-item">[\s\S]*?<\/li>(?:\s*(?=<li class="task-list-item">))*)/g, 
            '<ul class="task-list">$1</ul>');

        // Wrap regular lists
        html = html.replace(/(<li>(?:(?!<li class="task-list-item">)[\s\S])*?<\/li>(?:\s*(?=<li>(?!.*task-list)))*)/g, (match) => {
            return `<ul>${match}</ul>`;
        });

        // Clean up nested ul tags
        html = html.replace(/<\/ul>\s*<ul>/g, '');
        html = html.replace(/<\/ul>\s*<ul class="task-list">/g, '</ul><ul class="task-list">');

        return html;
    }

    // Parse markdown tables
    parseTables(html) {
        const lines = html.split('\n');
        let inTable = false;
        let tableHtml = '';
        let result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Check if line is a table row
            if (line.startsWith('|') && line.endsWith('|')) {
                const cells = line.split('|').slice(1, -1).map(cell => cell.trim());

                // Check if next line is separator
                if (!inTable && i + 1 < lines.length) {
                    const nextLine = lines[i + 1].trim();
                    if (nextLine.match(/^\|[\s:-]+\|/)) {
                        // Start table
                        inTable = true;
                        tableHtml = '<table><thead><tr>';
                        cells.forEach(cell => {
                            tableHtml += `<th>${cell}</th>`;
                        });
                        tableHtml += '</tr></thead><tbody>';
                        i++; // Skip separator line
                        continue;
                    }
                }

                if (inTable) {
                    tableHtml += '<tr>';
                    cells.forEach(cell => {
                        tableHtml += `<td>${cell}</td>`;
                    });
                    tableHtml += '</tr>';
                }
            } else {
                if (inTable) {
                    tableHtml += '</tbody></table>';
                    result.push(tableHtml);
                    tableHtml = '';
                    inTable = false;
                }
                result.push(line);
            }
        }

        if (inTable) {
            tableHtml += '</tbody></table>';
            result.push(tableHtml);
        }

        return result.join('\n');
    }

    // Wrap text in paragraph tags
    wrapParagraphs(html) {
        const lines = html.split('\n');
        const result = [];
        let paragraph = '';

        for (let line of lines) {
            line = line.trim();

            // Skip if line is already wrapped in a tag
            if (line.match(/^<(h[1-6]|ul|ol|blockquote|pre|table|hr|div)/i) || 
                line.match(/<\/(h[1-6]|ul|ol|blockquote|pre|table|hr|div)>$/i) ||
                line === '') {
                
                if (paragraph) {
                    result.push(`<p>${paragraph}</p>`);
                    paragraph = '';
                }
                result.push(line);
            } else {
                if (paragraph) {
                    paragraph += ' ' + line;
                } else {
                    paragraph = line;
                }
            }
        }

        if (paragraph) {
            result.push(`<p>${paragraph}</p>`);
        }

        return result.join('\n');
    }
}
