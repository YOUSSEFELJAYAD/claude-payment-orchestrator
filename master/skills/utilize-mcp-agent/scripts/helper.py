import json

def mock_mcp_response(method, params):
    """
    Simulate MCP Server response.
    """
    if method == "tools/list":
        return {
            "tools": [
                {"name": "calculator", "description": "Add numbers"},
                {"name": "weather", "description": "Get weather"}
            ]
        }
    
    if method == "tools/call":
        if params["name"] == "calculator":
            return {"content": [{"type": "text", "text": "42"}]}
            
    return {"error": "Method not found"}

if __name__ == "__main__":
    req = {"name": "calculator"}
    print(mock_mcp_response("tools/call", req))
