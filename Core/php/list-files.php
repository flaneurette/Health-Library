<?php
/**
 * PHP Script to list all markdown files in the /files/ directory
 * Excludes LICENSE.md files
 */

header('Content-Type: application/json');

// Configuration
$rootFolder = __DIR__ . '/../../';
$excludeFiles = ['LICENSE.md', 'LICENSE', 'DISCLAIMER.md','INSTALLATION.md','.htaccess','index.html','../'];

/**
 * Recursively scan directory for markdown files
 */
function scanMarkdownFiles($dir, $baseDir, $excludeFiles = []) {
    $files = [];
    
    // Check if directory exists
    if (!is_dir($dir)) {
        return $files;
    }
    
    // Scan directory
    $items = scandir($dir);
    
    foreach ($items as $item) {
        // Skip . and ..
        if ($item === '.' || $item === '..') {
            continue;
        }
        
        $path = $dir . '/' . $item;
        
        // If it's a directory, scan recursively
        if (is_dir($path)) {
            $files = array_merge($files, scanMarkdownFiles($path, $baseDir, $excludeFiles));
        } 
        // If it's a markdown file
        else if (pathinfo($path, PATHINFO_EXTENSION) === 'md') {
            // Check if file should be excluded
            if (!in_array($item, $excludeFiles)) {
                // Get relative path from base directory
                $relativePath = str_replace($baseDir . '/', '', $path);
                $relativePath = str_replace('\\', '/', $relativePath); // Windows compatibility
                $files[] = $relativePath;
            }
        }
    }
    
    return $files;
}

try {
    // Scan for markdown files
    $markdownFiles = scanMarkdownFiles($rootFolder, $rootFolder, $excludeFiles);
    
    // Sort files alphabetically
    sort($markdownFiles);
    
    // Return JSON response
    echo json_encode([
        'success' => true,
        'files' => $markdownFiles,
        'count' => count($markdownFiles)
    ]);
    
} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
