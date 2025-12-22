import ipaddress

BLACKLIST = [
    "1.2.3.4",
    "203.0.113.0/24",
    "192.168.1.100"
]

def is_ip_blocked(ip):
    """
    Check if IP is in blacklist networks.
    """
    target = ipaddress.ip_address(ip)
    
    for bad_net in BLACKLIST:
        if "/" in bad_net:
            if target in ipaddress.ip_network(bad_net):
                return True
        else:
            if target == ipaddress.ip_address(bad_net):
                return True
                
    return False

if __name__ == "__main__":
    print(f"Is 203.0.113.10 blocked? {is_ip_blocked('203.0.113.10')}")
