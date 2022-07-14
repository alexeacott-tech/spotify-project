import requests
from requests.exceptions import HTTPError


def http_request(verb, uri, timeout, **kwargs):

    calls = {"GET": requests.get, "POST": requests.post, "PUT": requests.put,
             "DELETE": requests.delete, "PATCH": requests.patch}

    try:
        res = calls[verb](uri, timeout=timeout, **kwargs)
        return res

    except HTTPError as e:
        print(e)
