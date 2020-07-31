import os

from datetime import datetime
from flask import Flask, send_from_directory, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static")
app.config.from_object('config')

cors = CORS(app, resources={"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['url'] = 'http://localhost:5000'

db = SQLAlchemy(app)

months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
fullMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

@app.route('/login')
@app.route('/login/')
def login():
    return render_template('login.html', url=app.config['url'])

@app.route('/dashboard')
@app.route('/dashboard/')
def admin():
    return render_template('dashboard.html', url=app.config['url'])

@app.route('/new-article')
@app.route('/new-article/')
def newArticle():
    return render_template('new-article.html', url=app.config['url'])

@app.route('/upload')
@app.route('/upload/')
def upload():
    print(app.config)
    return render_template('upload.html', url=app.config['url'])

@app.route('/<path:path>')
def serve(path):
    return send_from_directory('templates', path)


from app.controllers import tags
from app.controllers import articles
from app.controllers import days
from app.controllers import users
from app.controllers import upload

from app.models.tables import Article, Day, Tag, Author, SocialNetwork

@app.route('/')
def index():
    tags = Tag.query.all()

    machineLearningArticles = Article.query.join(Article.tags).filter(Tag.name == 'Introdução a Machine Learning').order_by(Article.views.desc()).limit(3)
    computerVisionArticles = Article.query.join(Article.tags).filter(Tag.name == 'Introdução a Visão Computacional').order_by(Article.views.desc()).limit(3)
    pythonArticles = Article.query.join(Article.tags).filter(Tag.name == 'Introdução a Python').order_by(Article.views.desc()).limit(3)

    return render_template('index.html', fullMonths=fullMonths, tags=tags, machineLearningArticles=machineLearningArticles, computerVisionArticles=computerVisionArticles, pythonArticles=pythonArticles)

@app.route('/about-us')
@app.route('/about-us/')
def aboutUs():
    authors = Author.query.all()

    return render_template('about-us.html', url=app.config['url'], authors=authors)

@app.route('/register-author')
@app.route('/register-author/')
def registerAuthor():
    socialnetworks = SocialNetwork.query.all()

    return render_template('register-author.html', url=app.config['url'], socialnetworks=socialnetworks)

@app.route('/article/<id>')
@app.route('/article/<id>/')
def article(id):
    today = datetime.today()

    try:
        article = Article.query.filter_by(id=id).one()
        relatedArticles = Article.query.filter(Article.id != article.id).order_by(Article.views.desc()).limit(3)
        tags = Tag.query.all()

        article.views += 1
        db.session.commit()

        try:
            day = Day.query.filter_by(day=today.day, month=today.month, year=today.year).one()
            day.views += 1
            db.session.commit()
        except Exception as e:
            day = Day(today.day, today.month, today.year, 1)
            db.session.add(day)
            db.session.commit()

        return render_template('article.html', article=article, relatedArticles=relatedArticles, months=months, fullMonths=fullMonths, url=app.config['url'], tags=tags)
    except:
        return render_template('not-found.html', url=app.config['url'])

@app.route('/list/<type>/<id>/')
@app.route('/list/<type>/<id>/')
def listRouter(type, id):
    tags = Tag.query.all()
    info = {}
    articles = []

    try:
        if (type == 'author'):
            articles = Article.query.filter_by(author_id=id)
            info = Author.query.filter_by(id=id).one()
        else:
            articles = Article.query.join(Article.tags).filter(Tag.id == id)
            info = Tag.query.filter_by(id=id).one()           
         
        return render_template('list.html', url=app.config['url'], months=months, tags=tags, info=info, articles=articles)
    except Exception as e:
        print(e)
        return render_template('not-found.html', url=app.config['url'])