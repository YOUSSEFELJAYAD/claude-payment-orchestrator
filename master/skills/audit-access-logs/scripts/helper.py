import json
import gzip

def parse_cloudtrail(file_path):
    """
    Parse a .json.gz CloudTrail file.
    """
    with gzip.open(file_path, 'rt') as f:
        data = json.load(f)
        
    records = data.get('Records', [])
    for rec in records:
        if rec.get('eventName') == 'ConsoleLogin':
            print(f"Login: {rec['userIdentity'].get('userName')} from {rec['sourceIPAddress']}")

if __name__ == "__main__":
    # parse_cloudtrail('dummy.json.gz')
    print("CloudTrail Parser Ready")
