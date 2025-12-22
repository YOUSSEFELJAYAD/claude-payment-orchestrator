def generate_toast_snippet(type_name, message):
    """
    Generate React toast call.
    """
    if type_name == "promise":
        return f"toast.promise(myPromise, {{ loading: 'Loading...', success: '{message}', error: 'Error' }});"
    
    return f"toast.{type_name}('{message}');"

if __name__ == "__main__":
    print(generate_toast_snippet("success", "Done!"))
