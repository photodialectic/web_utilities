import os.path
import tornado.ioloop
import tornado.web
import json
import urllib
import markdown

BASE_DIR = os.path.dirname(__file__)

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html', message="Hello, world")

class JsonHandler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        sort_keys = self.get_body_argument('sort_keys', False)
        jsonData = json.loads(data);
        response = json.dumps(jsonData, sort_keys=sort_keys, indent=4, separators=(',',':'))
        self.set_header("Content-Type", "text/plain")
        self.write(response)

class EncodeHandler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        decode = self.get_body_argument('decode', False)
        if(decode) :
            response = urllib.unquote(data)
        else :
            response = urllib.quote(data,'')

        self.set_header("Content-Type", "text/plain")
        self.write(response)

class EntityHandler(tornado.web.RequestHandler):
    def post(self):
        self.write('Encode stuff')

class MarkdownHandler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        response = markdown.markdown(data)
        self.set_header("Content-Type", "text/plain")
        self.write(response)

def make_app():
    debug = True
    app_settings = {
        'debug' : debug,
        'static_path': os.path.join(BASE_DIR, 'static'),
        'template_path': os.path.join(BASE_DIR),
        'static_url_prefix' : '/static/',
    }

    if(debug):
        app_settings['static_url_prefix'] = '//localhost:6121/static/'


    routes = [
        (r"/", MainHandler),
        (r"/api/json", JsonHandler),
        (r"/api/encode", EncodeHandler),
        (r"/api/entity", EntityHandler),
        (r"/api/markdown", MarkdownHandler),
    ]

    return tornado.web.Application(routes, **app_settings)

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
