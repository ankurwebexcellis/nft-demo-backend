$COMMON_FILES = @("validations", "common", ".env", "package.json")

# Get the directory where the script is located
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# Loop over the list of apps and copy common files and folders to each subdirectory
$apps = Get-ChildItem -Path ".\apps" -Directory
foreach ($app_dir in $apps) {
    foreach ($common_item in $COMMON_FILES) {
        $src_item = Join-Path $SCRIPT_DIR $common_item  # Source file or directory path
        $dest_dir = $app_dir.FullName  # Destination directory path
        Write-Output $src_item
        Write-Output "$dest_dir\"
        if (Test-Path -PathType Leaf $src_item) {
            Copy-Item -Path $src_item -Destination $dest_dir -Force  # Copy regular files to destination
        }
        elseif (Test-Path -PathType Container $src_item) {
            Copy-Item -Path $src_item -Destination $dest_dir -Recurse -Force
        }
    }
} 
