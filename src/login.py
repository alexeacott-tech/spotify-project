from src._utils import http_request

res = http_request("GET", "https://google.com", 1)
print(res)
