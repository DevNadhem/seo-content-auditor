# 🔍 Automated SEO & Content Auditor

A full-stack diagnostic utility designed to extract, analyze, and visualize technical SEO metrics for target websites. This project bridges backend data extraction with an executive-level frontend dashboard, automatically generating actionable reports for technical audits.

## 🚀 Features

* **Automated Data Extraction:** A Python backend that parses live DOM structures to evaluate critical search engine optimization metrics.
* **Meta Data Analysis:** Validates title tags and meta descriptions against optimal character length constraints.
* **Heading Hierarchy Validation:** Scans for proper `H1` and `H2` structuring, flagging missing or duplicate primary tags.
* **Image Asset Auditing:** Identifies and extracts sources for unoptimized images missing crucial `alt` text attributes.
* **Executive Dashboard:** A polished, responsive dark-mode React UI that transforms raw JSON data into a client-facing diagnostic report using Tailwind CSS.

## 🛠 Architecture & Tech Stack

**Backend (Data Pipeline)**
* **Python 3:** Core extraction logic.
* **Requests & BeautifulSoup4:** For HTTP requests and HTML DOM parsing.
* **JSON:** Lightweight document structuring for frontend handoff.

**Frontend (Visualization)**
* **React & Vite:** Fast, modern component-based UI and build tooling.
* **Tailwind CSS v4:** Utility-first styling for the dark-mode aesthetic.
* **Framer Motion & Lucide React:** Smooth rendering and professional iconography.

## ⚙️ Quick Start Guide

### 1. Run the Diagnostic Scraper
Navigate to the root directory and install the Python dependencies:

```bash
pip install requests beautifulsoup4