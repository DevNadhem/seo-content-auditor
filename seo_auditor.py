"""
Module to perform automated technical SEO audits on target URLs.
"""
import json
import requests
from bs4 import BeautifulSoup

def audit_url(url):
    """
    Extracts SEO metrics from a given URL and returns a structured report.
    """
    print(f"Analyzing {url}...")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        return {"error": f"Failed to retrieve URL: {str(e)}"}

    soup = BeautifulSoup(response.content, 'html.parser')

    # 1. Title Analysis
    title_tag = soup.find('title')
    title = title_tag.text.strip() if title_tag else "Missing Title"
    title_length = len(title)
    title_status = (
        "Optimal" if 50 <= title_length <= 60
        else "Warning: Title should be 50-60 characters."
    )

    # 2. Meta Description Analysis
    meta_desc_tag = soup.find('meta', attrs={'name': 'description'})
    meta_desc = (
        meta_desc_tag['content'].strip()
        if meta_desc_tag and meta_desc_tag.has_attr('content')
        else "Missing Meta Description"
    )
    desc_length = len(meta_desc)
    desc_status = (
        "Optimal" if 150 <= desc_length <= 160
        else "Warning: Description should be 150-160 characters."
    )

    # 3. Heading Structure
    h1_tags = [h.text.strip() for h in soup.find_all('h1')]
    h2_tags = [h.text.strip() for h in soup.find_all('h2')]
    h1_status = (
        "Optimal" if len(h1_tags) == 1
        else "Warning: Page should have exactly one H1 tag."
    )

    # 4. Image Alt-Text Optimization
    images = soup.find_all('img')
    images_missing_alt = [
        img.get('src', 'Unknown Source')
        for img in images if not img.get('alt')
    ]

    return {
        "target_url": url,
        "seo_metrics": {
            "title": {
                "text": title,
                "length": title_length,
                "status": title_status
            },
            "meta_description": {
                "text": meta_desc,
                "length": desc_length,
                "status": desc_status
            },
            "headings": {
                "h1_count": len(h1_tags),
                "h1_status": h1_status,
                "h1_content": h1_tags,
                "h2_count": len(h2_tags)
            },
            "images": {
                "total_images": len(images),
                "missing_alt_count": len(images_missing_alt),
                "missing_alt_sources": images_missing_alt
            }
        }
    }

if __name__ == "__main__":
    target_input = input("Enter a URL to audit (e.g., https://example.com): ").strip()
    if not target_input.startswith("http"):
        target_input = "https://" + target_input

    audit_results = audit_url(target_input)

    with open('seo_audit.json', 'w', encoding='utf-8') as file:
        json.dump(audit_results, file, indent=4)

    print("\n✅ Audit complete! Results have been saved to seo_audit.json.")