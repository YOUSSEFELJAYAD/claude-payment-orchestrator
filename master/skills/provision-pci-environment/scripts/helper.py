import ipaddress

def check_cidr_overlap(network1, network2):
    """
    Check if two CIDR blocks overlap.
    """
    n1 = ipaddress.ip_network(network1)
    n2 = ipaddress.ip_network(network2)
    return n1.overlaps(n2)

def generate_subnets(vpc_cidr, count=3):
    """
    Generate subnets from a VPC CIDR.
    """
    vpc = ipaddress.ip_network(vpc_cidr)
    return list(vpc.subnets(prefixlen_diff=8))[:count]

if __name__ == "__main__":
    vpc = "10.0.0.0/16"
    subnets = generate_subnets(vpc)
    print(f"Subnets for {vpc}: {[str(s) for s in subnets]}")
