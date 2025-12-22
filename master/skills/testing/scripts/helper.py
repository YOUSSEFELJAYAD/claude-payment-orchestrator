import sys

def run_tests(suite="all"):
    """
    Simulate running a test suite.
    """
    print(f"Running {suite} tests...")
    
    results = [
        {"test": "Unit: Fee Calc", "status": "PASS"},
        {"test": "Unit: Routing", "status": "PASS"},
        {"test": "Integ: POST /pay", "status": "PASS"},
        {"test": "E2E: Full Flow", "status": "PASS"},
    ]
    
    failed = False
    for r in results:
        print(f"[{r['status']}] {r['test']}")
        if r['status'] == "FAIL":
            failed = True
            
    return 1 if failed else 0

if __name__ == "__main__":
    sys.exit(run_tests())
