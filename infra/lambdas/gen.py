import requests
from bs4 import BeautifulSoup
import re

def scrape_website_text(url):
    """
    Scrapes all text from a website given its URL.
    
    Parameters:
    - url: The URL of the website to scrape
    
    Returns:
    - The scraped text as a string on success
    - Raises exceptions on failure for the caller to handle
    """
    # Send HTTP request to the URL with a common user agent
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an exception for HTTP errors
    
    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Remove script and style elements
    for script_or_style in soup(['script', 'style', 'meta', 'noscript']):
        script_or_style.decompose()
    
    # Extract text from HTML
    text = soup.get_text(separator=' ', strip=True)
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Check if text is empty or too short
    if not text:
        raise ValueError("No text content found on the page")
    
    if len(text) < 20:
        raise ValueError(f"Scraped text is too short (only {len(text)} characters)")
    
    return text