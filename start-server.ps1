# Simple HTTP Server Script
# This script uses .NET's HttpListener to create a simple HTTP server

param(
    [int]$port = 8000
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server started at http://localhost:$port/"
Write-Host "Press Ctrl+C to stop the server"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Get the requested file path
        $filePath = [System.IO.Path]::Combine($PSScriptRoot, $request.Url.LocalPath.TrimStart('/'))
        
        # If path is a directory, try to serve index.html
        if ([System.IO.Directory]::Exists($filePath)) {
            $filePath = [System.IO.Path]::Combine($filePath, "index.html")
        }
        
        # Check if file exists
        if ([System.IO.File]::Exists($filePath)) {
            try {
                # Read file content
                $content = [System.IO.File]::ReadAllBytes($filePath)
                
                # Set content type based on file extension
                $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = "application/octet-stream" # Default type
                
                switch ($extension) {
                    ".html" { $contentType = "text/html" }
                    ".css" { $contentType = "text/css" }
                    ".js" { $contentType = "application/javascript" }
                    ".json" { $contentType = "application/json" }
                    ".png" { $contentType = "image/png" }
                    ".jpg" { $contentType = "image/jpeg" }
                    ".gif" { $contentType = "image/gif" }
                    ".svg" { $contentType = "image/svg+xml" }
                    ".txt" { $contentType = "text/plain" }
                }
                
                $response.ContentType = $contentType
                $response.ContentLength64 = $content.Length
                $response.OutputStream.Write($content, 0, $content.Length)
                Write-Host "200 $($request.Url.LocalPath)"
            } catch {
                $response.StatusCode = 500
                $errorContent = [System.Text.Encoding]::UTF8.GetBytes("Internal Server Error: $($_.Exception.Message)")
                $response.ContentLength64 = $errorContent.Length
                $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
                Write-Host "500 $($request.Url.LocalPath) - $($_.Exception.Message)"
            }
        } else {
            $response.StatusCode = 404
            $notFoundContent = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $notFoundContent.Length
            $response.OutputStream.Write($notFoundContent, 0, $notFoundContent.Length)
            Write-Host "404 $($request.Url.LocalPath)"
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "Server stopped"
}