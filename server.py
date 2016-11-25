import os.path
import tornado.ioloop
import tornado.web
import tornado.escape
import json
import urllib
import markdown
import base64
import uglipyjs
import hashlib
import cgi

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
        data = self.get_body_argument('data', False)
        decode = self.get_body_argument('decode', False)
        self.set_header("Content-Type", "text/plain")
        if decode:
            self.write(tornado.escape.xhtml_unescape(data))
        else:
            self.write(tornado.escape.xhtml_escape(data))

class MarkdownHandler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        response = markdown.markdown(data)
        self.set_header("Content-Type", "text/plain")
        self.write(response)

class Base64Handler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        decode = self.get_body_argument('decode', False)
        if(decode):
            response = base64.b64decode(data)
        else :
            response = base64.b64encode(data)

        self.set_header("Content-Type", "text/plain")
        self.write(response)

class BookmarkHandler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        response = uglipyjs.compile(data, {'compress': True})
        text_only = self.get_body_argument('text_only', False)
        bookmark = 'javascript:(function(){{ {} }})();'.format(response)
        if(text_only):
            self.set_header("content-type", "text/plain")
            self.write(bookmark)
        else:
            self.set_header("content-type", "text/html")
            self.write('<a href=\'{}\'>Drag me to bookmarks bar</a>'.format(bookmark))

class HashHandler(tornado.web.RequestHandler):
    def post(self):
        data = self.get_body_argument('data', False)
        sha1 = self.get_body_argument('sha1', False)
        if sha1:
            m = hashlib.sha1()
        else:
            m = hashlib.md5()

        m.update(data)
        self.set_header("content-type", "text/html")
        self.write(m.hexdigest())

def make_app():
    debug = True

    app_settings = {
        'debug' : debug,
        'static_path': os.path.join(BASE_DIR, 'static'),
        'template_path': os.path.join(BASE_DIR),
        'static_url_prefix' : '/static/',
    }

    if debug:
        app_settings['static_url_prefix'] = '//localhost:6121/static/'


    routes = [
        (r"/", MainHandler),
        (r"/api/json", JsonHandler),
        (r"/api/encode", EncodeHandler),
        (r"/api/entity", EntityHandler),
        (r"/api/markdown", MarkdownHandler),
        (r"/api/b64", Base64Handler),
        (r"/api/bookmark", BookmarkHandler),
        (r"/api/hash", HashHandler)
    ]

    return tornado.web.Application(routes, **app_settings)

if __name__ == "__main__":
    app = make_app()
    app.listen(10003)
    tornado.ioloop.IOLoop.current().start()
