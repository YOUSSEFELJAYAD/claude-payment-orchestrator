import os

def create_component(name):
    """
    Scaffold a React component.
    """
    content = f"""
import React from 'react';

export const {name} = () => {{
    return (
        <div className="p-4 border rounded">
            <h2>{name}</h2>
        </div>
    );
}};
    """
    
    filename = f"{name}.tsx"
    with open(filename, "w") as f:
        f.write(content.strip())
    print(f"Created {filename}")

if __name__ == "__main__":
    create_component("PaymentSummary")
