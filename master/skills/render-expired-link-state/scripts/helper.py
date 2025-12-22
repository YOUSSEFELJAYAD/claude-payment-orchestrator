def generate_error_html(title, message):
    """
    Generate static HTML for error page (fallback).
    """
    return f"""
<div style="text-align: center; padding: 40px;">
  <h1>{title}</h1>
  <p>{message}</p>
  <a href="/">Go Home</a>
</div>
"""

if __name__ == "__main__":
    print(generate_error_html("Link Expired", "Please ask the merchant for a new link."))
