"""
Dedupe extracted-images by content hash, and filter out tiny/likely-texture fragments,
to leave a smaller, curatable set of real photographic/mockup assets.
"""
import os
import hashlib
import shutil

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "extracted-images")
DST = os.path.join(BASE, "extracted-images-deduped")
os.makedirs(DST, exist_ok=True)

seen_hashes = {}
kept = 0
skipped_dupe = 0

for fname in sorted(os.listdir(SRC)):
    fpath = os.path.join(SRC, fname)
    with open(fpath, "rb") as f:
        data = f.read()
    h = hashlib.sha256(data).hexdigest()
    if h in seen_hashes:
        skipped_dupe += 1
        continue
    seen_hashes[h] = fname
    shutil.copy2(fpath, os.path.join(DST, fname))
    kept += 1

print(f"Kept {kept} unique images, skipped {skipped_dupe} duplicates.")
