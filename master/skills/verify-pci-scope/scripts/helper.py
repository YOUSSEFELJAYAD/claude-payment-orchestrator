import socket

def check_port(ip, port, timeout=1):
    """
    Attempt to connect to a port.
    Returns: 'Open' or 'Closed/Filtered'
    """
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((ip, port))
        sock.close()
        
        if result == 0:
            return "OPEN (FAIL)"
        else:
            return "CLOSED (PASS)"
            
    except Exception:
        return "ERROR"

if __name__ == "__main__":
    # Check CDE Database Port from "Office Network"
    print(f"Checking CDE Port 5432: {check_port('10.0.20.5', 5432)}")
