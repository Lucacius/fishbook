import urllib.request
import urllib.error

urls = [
    './index.html',
    './js/components/navbar.js',
    '.assets/iscas/semfoto.png',
]

for p in urls:
    try:
        req = urllib.request.Request('http://127.0.0.1:8000/' + p.lstrip('./'), method='HEAD')
        with urllib.request.urlopen(req, timeout=5) as r:
            print(f'{p} => {r.status}')
    except urllib.error.HTTPError as e:
        print(f'{p} => {e.code}')
    except Exception as e:
        print(f'{p} => ERR ({e})')
