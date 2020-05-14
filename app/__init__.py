import os

from datetime import datetime
from flask import Flask, send_from_directory, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static")
app.config.from_object('config')

cors = CORS(app, resources={"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
url = 'http://localhost:5000'

@app.route('/')
def index():
    topics = Topic.query.filter_by(in_dropdown=True)
    return render_template('index.html', topics=topics)

@app.route('/dashboard')
@app.route('/dashboard/')
def admin():
    return render_template('dashboard.html', url=url)

@app.route('/new-article')
@app.route('/new-article/')
def newArticle():
    return render_template('new-article.html', url=url)

@app.route('/<path:path>')
def serve(path):
    return send_from_directory('templates', path)


from app.controllers import tags
from app.controllers import topics
from app.controllers import articles
from app.controllers import days
from app.models.tables import Article, Day, Topic, SubTopic, Tag, Author

@app.route('/article/<id>')
@app.route('/article/<id>/')
def article(id):
    today = datetime.today()

    try:
        article = Article.query.filter_by(id=id).one()
        topics = Topic.query.filter_by(in_dropdown=True)

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

        return render_template('article.html', article=article, months=months, url=url, topics=topics)
    except:
        return render_template('not-found.html', url=url)

@app.route('/list/<type>/<id>/')
@app.route('/list/<type>/<id>/')
def listRouter(type, id):
    topics = Topic.query.filter_by(in_dropdown=True)
    info = {}
    articles = []

    try:
        if(type == 'topic'):
            articles = Article.query.filter_by(topic_id=id)
            info = Topic.query.filter_by(id=id).one()
        elif (type == 'subtopic'):
            articles = Article.query.filter_by(subtopic_id=id)
            info = SubTopic.query.filter_by(id=id).one()
        elif (type == 'author'):
            articles = Article.query.filter_by(author_id=id)
            info = Author.query.filter_by(id=id).one()
        else:
            articles = Article.query.join(Article.tags).filter(Tag.id == id)
            info = Tag.query.filter_by(id=id).one()           
         
        return render_template('list.html', url=url, months=months, topics=topics, info=info, articles=articles)
    except Exception as e:
        print(e)
        return render_template('not-found.html', url=url)