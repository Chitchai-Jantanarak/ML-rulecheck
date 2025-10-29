#!/usr/bin/env python
# ml_models/merge_model.py

import os
import sys
import glob

def merge_files(fragment_dir, output_file, pattern="bert_model.bin.part_*"):
    """Merges file fragments from a directory into a single output file."""
    if os.path.exists(output_file):
        print(f"Output file {output_file} already exists. Skipping merge.")
        return

    fragment_pattern = os.path.join(fragment_dir, pattern)
    fragments = sorted(glob.glob(fragment_pattern))

    if not fragments:
        print(f"No fragments found in {fragment_dir} with pattern {pattern}. Cannot merge.")
        return

    print(f"Merging {len(fragments)} fragments into {output_file}...")

    try:
        with open(output_file, 'wb') as outfile:
            for fragment in fragments:
                with open(fragment, 'rb') as infile:
                    outfile.write(infile.read())
        print("Merge complete.")
    except IOError as e:
        print(f"Error during merge: {e}")
        # Clean up partial file if merge fails
        if os.path.exists(output_file):
            os.remove(output_file)
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python merge_model.py <fragment_directory> <output_file_path>")
        sys.exit(1)
    
    fragment_dir = sys.argv[1]
    output_file = sys.argv[2]
    
    merge_files(fragment_dir, output_file)
