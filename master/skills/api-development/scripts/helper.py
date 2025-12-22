import requests

class APIClient:
    def __init__(self, base_url, api_key):
        self.base = base_url
        self.headers = {"Authorization": f"Bearer {api_key}"}

    def post(self, path, data):
        url = f"{self.base}{path}"
        try:
            r = requests.post(url, json=data, headers=self.headers)
            r.raise_for_status()
            return r.json()
        except Exception as e:
            print(f"API Error: {e}")
            return None

if __name__ == "__main__":
    client = APIClient("https://api.example.com", "sk_test_123")
    print(client.post("/v1/payments", {"amount": 100}))
