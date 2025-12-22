def mock_search(query):
    """
    Simulate a search result.
    """
    return [
        {
            "title": "Cybersource REST API Reference",
            "link": "https://developer.cybersource.com/api/reference",
            "snippet": "Complete documentation for the CyberSource REST API..."
        },
        {
            "title": "Payment Gateway Integration Guide",
            "link": "https://docs.example.com/guide",
            "snippet": "Learn how to integrate payment gateways..."
        }
    ]

if __name__ == "__main__":
    print(mock_search("Cybersource API"))
