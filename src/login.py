import requests

BASE_URI = "https://api.spotify.com/v1"


def spotify_user():

    uri = BASE_URI + "/authorize"
    params = {
        "client_id": "b184664583354febb800d48a0b7528d2",
        "response_type": "code",
        "redirect_uri": "http://localhost:3000",
        "state": "test123",
    }

    res = requests.get(uri, params=params)
