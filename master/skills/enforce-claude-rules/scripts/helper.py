def validate_rules(filename):
    """
    Check if rule file exists and is readable.
    """
    try:
        with open(filename, 'r') as f:
            content = f.read()
            if "NEVER" in content:
                print("Found critical constraints.")
            return True
    except FileNotFoundError:
        print(f"Warning: {filename} not found.")
        return False

if __name__ == "__main__":
    validate_rules("CLAUDE.md")
