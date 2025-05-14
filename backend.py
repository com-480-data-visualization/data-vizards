import http.server

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    # serves current directory on port 8000
    http.server.test(HandlerClass=CORSRequestHandler,port=8000)