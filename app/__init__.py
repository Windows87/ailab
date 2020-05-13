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

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/list')
def listRouter():
    return send_from_directory('templates', 'list.html')

@app.route('/dashboard')
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
from app.controllers import days
from app.models.tables import Article, Day

@app.route('/article/<id>')
def article(id):
    today = datetime.today()

    try:
        article = Article.query.filter_by(id=id).one()
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

        return render_template('article.html', article=article, months=months)
    except:
        return render_template('not-found.html')
