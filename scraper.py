from bs4 import BeautifulSoup
import requests

headers = {'user-agent':'my-app/0.0.1'}
html = requests.get('https://pfaf.org/user/', headers=headers)

doc = BeautifulSoup(html.text, 'html.parser')

class Potato:
    def __init__(self, name,  )

print (doc.select('.GeneralDisclaimer'))