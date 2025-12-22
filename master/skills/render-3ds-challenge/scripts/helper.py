def generate_mock_acs_html(callback_origin):
    """
    Generates an HTML string that simulates a 3DS ACS page.
    It posts a message back to parent after 2 seconds.
    """
    return f"""
<!DOCTYPE html>
<html>
<head>
  <style>body {{ font-family: sans-serif; text-align: center; padding: 50px; }}</style>
</head>
<body>
  <h2>Bank Authentication</h2>
  <p>Please wait while we verify your card...</p>
  <div class="loader">Loading...</div>
  <script>
    setTimeout(() => {{
      const msg = JSON.stringify({{ status: 'COMPLETED', transId: 'tx_123' }});
      window.parent.postMessage(msg, "{callback_origin}");
    }}, 2000);
  </script>
</body>
</html>
"""

if __name__ == "__main__":
    print(generate_mock_acs_html("http://localhost:3000"))
