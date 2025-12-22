def luhn_check(card_number):
    """
    Validate card number using Luhn algorithm.
    Input: String of digits (spaces removed)
    """
    digits = [int(d) for d in str(card_number) if d.isdigit()]
    checksum = 0
    double = False
    
    # Iterate from right to left
    for digit in reversed(digits):
        if double:
            digit *= 2
            if digit > 9:
                digit -= 9
        checksum += digit
        double = not double
        
    return (checksum % 10) == 0

if __name__ == "__main__":
    print(luhn_check("4242424242424242")) # Valid?
