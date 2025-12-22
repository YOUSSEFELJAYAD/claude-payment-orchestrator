import json

def generate_waf_rule(name, priority, limit):
    """
    Generate AWS WAF Rate Based Rule JSON.
    """
    rule = {
        "Name": name,
        "Priority": priority,
        "Statement": {
            "RateBasedStatement": {
                "Limit": limit,
                "AggregateKeyType": "IP"
            }
        },
        "Action": { "Block": {} },
        "VisibilityConfig": {
            "SampledRequestsEnabled": True,
            "CloudWatchMetricsEnabled": True,
            "MetricName": name
        }
    }
    return json.dumps(rule, indent=2)

if __name__ == "__main__":
    print(generate_waf_rule("BlockHighVelocity", 50, 2000))
