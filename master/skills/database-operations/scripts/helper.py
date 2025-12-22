import os

def check_migrations():
    """
    Check if migration folder exists.
    """
    if os.path.exists("./prisma/migrations"):
        count = len(os.listdir("./prisma/migrations"))
        print(f"Found {count} migration(s).")
    else:
        print("No migrations found.")

if __name__ == "__main__":
    check_migrations()
