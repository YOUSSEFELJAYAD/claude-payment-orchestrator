def get_input_attrs(field_type):
    """
    Return dict of attributes for given field type.
    """
    if field_type == "card_number":
        return {
            "type": "text",
            "inputMode": "numeric",
            "pattern": "[0-9]*",
            "autoComplete": "cc-number"
        }
    if field_type == "otp":
        return {
            "type": "text",
            "inputMode": "numeric",
            "autoComplete": "one-time-code"
        }
    return {}

if __name__ == "__main__":
    print(get_input_attrs("card_number"))
