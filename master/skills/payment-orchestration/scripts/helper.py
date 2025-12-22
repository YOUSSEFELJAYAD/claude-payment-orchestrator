class MockRouter:
    def route(self, amount):
        return "stripe" if amount < 100 else "adyen"

class MockOrchestrator:
    def __init__(self):
        self.router = MockRouter()
        
    def process(self, amount):
        psp = self.router.route(amount)
        print(f"Routing ${amount} to {psp}...")
        
        # Simulate Failover
        if psp == "stripe" and amount == 99:
            print("Stripe Failed. Failing over to Adyen...")
            return "SUCCESS (Adyen)"
            
        return f"SUCCESS ({psp})"

if __name__ == "__main__":
    engine = MockOrchestrator()
    engine.process(99)
