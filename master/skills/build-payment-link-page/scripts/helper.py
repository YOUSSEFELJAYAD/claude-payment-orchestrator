def generate_layout_html(theme_color):
    """
    Generate basic HTML/Tailwind structure.
    """
    # Just a partial snippet generator
    return f"""
<div class="grid md:grid-cols-2 h-screen">
  <div class="bg-{theme_color}-900 p-10 text-white">
     <!-- Summary -->
  </div>
  <div class="flex items-center justify-center p-6">
     <!-- Form -->
  </div>
</div>
"""

if __name__ == "__main__":
    print(generate_layout_html("blue"))
