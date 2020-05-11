import os

from flask import Flask, send_from_directory, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static")
app.config.from_object('config')

cors = CORS(app, resources={"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/list')
def listRouter():
    return send_from_directory('templates', 'list.html')

@app.route('/admin')
def admin():
    return send_from_directory('templates', 'dashboard.html')

@app.route('/new-article')
def newArticle():
    return send_from_directory('templates', 'new-article.html')

@app.route('/<path:path>')
def serve(path):
    return send_from_directory('templates', path)


from app.controllers import tags
from app.controllers import topics
from app.controllers import articles
from app.models.tables import Article

@app.route('/article/<id>')
def article(id):
    article = Article.query.filter_by(id=id).one()
    return render_template('article.html', article=article)
    #return send_from_directory('../static', 'article.html')
