import requests

def check_headers(url):
    """
    Check for presence of security headers.
    """
    required = [
        "Strict-Transport-Security",
        "X-Frame-Options",
        "X-Content-Type-Options",
        "Content-Security-Policy"
    ]
    
    try:
        r = requests.head(url, timeout=2)
        headers = r.headers
        
        missing = []
        for h in required:
            if h not in headers:
                missing.append(h)
                
        return missing
    except:
        return ["ERROR: Connection Failed"]

if __name__ == "__main__":
    print(f"Missing Headers on Google: {check_headers('https://google.com')}")
