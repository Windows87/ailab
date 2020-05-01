import os

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static")
app.config.from_object('config')

cors = CORS(app, resources={"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

@app.route('/')
def index():
    return send_from_directory('../static', 'index.html')

@app.route('/article')
def article():
    return send_from_directory('../static', 'article.html')

@app.route('/list')
def listRouter():
    return send_from_directory('../static', 'list.html')

@app.route('/admin')
def admin():
    return send_from_directory('../static', 'dashboard.html')

@app.route('/new-article')
def newArticle():
    return send_from_directory('../static', 'new-article.html')

@app.route('/<path:path>')
def serve(path):
    return send_from_directory('../static', path)


from app.controllers import tags
from app.controllers import topics