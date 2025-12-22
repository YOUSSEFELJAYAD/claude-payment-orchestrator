class PaymentAdapter:
    def authorize(self, amount): pass

class StripeAdapter(PaymentAdapter):
    def authorize(self, amount):
        print(f"Stripe Charging {amount}")

class AdyenAdapter(PaymentAdapter):
    def authorize(self, amount):
        print(f"Adyen Charging {amount}")

def get_provider(name):
    if name == "stripe": return StripeAdapter()
    if name == "adyen": return AdyenAdapter()
    raise ValueError("Unknown Provider")

if __name__ == "__main__":
    p = get_provider("stripe")
    p.authorize(100)
