"""
Extract high-res page renders and embedded raster images from the source PDFs.
Run once to populate assets/raw-pdf-pages (full page renders, for reference/cropping)
and assets/extracted-images (individual embedded images, for direct reuse).
"""
import pymupdf
import os

BASE = os.path.dirname(os.path.abspath(__file__))
PORTFOLIO_PDF = r"C:\Users\seanb\Downloads\Leila Banta - Portfolio - Graphic Design.pdf"
RESUME_PDF = r"C:\Users\seanb\Downloads\Leila Banta - Resume - Graphic Design.pdf"

PAGES_DIR = os.path.join(BASE, "raw-pdf-pages")
IMAGES_DIR = os.path.join(BASE, "extracted-images")

os.makedirs(PAGES_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

def render_pages(pdf_path, prefix, zoom=3.0):
    doc = pymupdf.open(pdf_path)
    mat = pymupdf.Matrix(zoom, zoom)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=mat, alpha=False)
        out_path = os.path.join(PAGES_DIR, f"{prefix}-page-{i+1:02d}.png")
        pix.save(out_path)
        print(f"Saved {out_path} ({pix.width}x{pix.height})")
    doc.close()

def extract_embedded_images(pdf_path, prefix):
    doc = pymupdf.open(pdf_path)
    count = 0
    for page_index in range(len(doc)):
        page = doc[page_index]
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
            except Exception as e:
                print(f"Skip xref {xref} on page {page_index+1}: {e}")
                continue
            image_bytes = base_image["image"]
            ext = base_image["ext"]
            w = base_image.get("width", 0)
            h = base_image.get("height", 0)
            # Skip tiny images (likely noise textures/icons we don't need individually)
            if w < 80 or h < 80:
                continue
            out_name = f"{prefix}-p{page_index+1:02d}-img{img_index+1:02d}-{w}x{h}.{ext}"
            out_path = os.path.join(IMAGES_DIR, out_name)
            with open(out_path, "wb") as f:
                f.write(image_bytes)
            count += 1
    doc.close()
    print(f"Extracted {count} embedded images with prefix '{prefix}'")

if __name__ == "__main__":
    print("=== Rendering full pages (portfolio) ===")
    render_pages(PORTFOLIO_PDF, "portfolio", zoom=3.0)
    print("=== Rendering full pages (resume) ===")
    render_pages(RESUME_PDF, "resume", zoom=3.0)
    print("=== Extracting embedded images (portfolio) ===")
    extract_embedded_images(PORTFOLIO_PDF, "portfolio")
    print("=== Extracting embedded images (resume) ===")
    extract_embedded_images(RESUME_PDF, "resume")
    print("Done.")
