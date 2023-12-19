
echo copying files to apps;

# List of common files and directories to copy
#!/bin/bash

COMMON_FILES=("validations", "common", ".env", "package.json")

# Get the current directory where the script is located
SCRIPT_DIR=$(dirname "${BASH_SOURCE[0]}")

# Loop over the list of apps and copy common files and folders to each subdirectory
for app_dir in apps/*; do
  if [ -d "$app_dir" ]; then
    for common_item in "${COMMON_FILES[@]}"; do
      src_item="$SCRIPT_DIR/$common_item"  # Source file or directory path
      dest_dir="$app_dir"                 # Destination directory path
      echo $src_item
      echo "$dest_dir/"
      
      if [ -f "$src_item" ]; then
        cp "$src_item" "$dest_dir/"  # Copy regular files to destination
      elif [ -d "$src_item" ]; then
        cp -r "$src_item" "$dest_dir/"  # Copy directories to destination
      fi
    done
  fi
done



echo deploying to dev
echo building and uploading to lambda
sls deploy --max-concurrency 1 --verbose;
