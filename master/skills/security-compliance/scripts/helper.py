def generate_evidence_report():
    """
    Simulate gathering evidence for QSA.
    """
    checklist = {
        "Req 1.1 (Firewall Config)": "PASS",
        "Req 3.4 (PAN Masking)": "PASS",
        "Req 6.2 (Patching)": "PASS -- Last patched 2 days ago",
        "Req 10.2 (Audit Logs)": "PASS -- Logs shipping to S3"
    }
    
    for req, status in checklist.items():
        print(f"[{status[0:4]}] {req}: {status}")

if __name__ == "__main__":
    generate_evidence_report()
