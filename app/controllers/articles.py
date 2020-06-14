from flask import jsonify, request
from app import app, db

from app.models.tables import Article, ArticleTag
from app.controllers.users import getAuthor
from flask_cors import cross_origin

@app.route('/api/articles/', methods = ['GET'])
@cross_origin()
def articlesGet():
  articles = Article.query.all()
  return jsonify(articles)


@app.route('/api/articles/', methods = ['POST'])
@cross_origin()
def articlesPost():
    author = getAuthor()

    if type(author) is dict:
      return jsonify(error = author['error'], id = author['id']), 401

    title = request.json['title']
    description = request.json['description']
    content = request.json['content']
    image = request.json['image']
    topic_id = request.json['topic_id']
    subtopic_id = request.json['subtopic_id']
    author_id = author.id
    tags = request.json['tags']

    article = Article(title, description, content, image, topic_id, subtopic_id, author_id)

    db.session.add(article)
    db.session.commit()

    for tag in tags:
      articleTag = ArticleTag(article.id, tag)
      db.session.add(articleTag)

    db.session.commit()

    return jsonify(article)