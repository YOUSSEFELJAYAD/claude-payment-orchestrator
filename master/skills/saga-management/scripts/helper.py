class Saga:
    def __init__(self, id):
        self.id = id
        self.state = "CREATED"
        self.history = []

    def transition(self, new_state, data=None):
        print(f"Saga {self.id}: {self.state} -> {new_state}")
        self.state = new_state
        self.history.append({"state": new_state, "data": data})

    def fail(self, error):
        self.transition("FAILED", error)
        self.compensate()

    def compensate(self):
        print("Compensating transactions...")

if __name__ == "__main__":
    s = Saga("TX-123")
    s.transition("AUTHORIZED")
    s.fail("Capture Timeout")
