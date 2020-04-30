import datetime

from dataclasses import dataclass
from app import db

@dataclass
class Article(db.Model):
    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, title, description, image, topic_id, author_id):
        self.title = title
        self.description = description
        self.image = image
        self.topic_id = topic_id
        self.author_id = author_id
        self.created_at = datetime.now()

    def __repr__(self):
        return "<Article %r>" % self.title

@dataclass
class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Tag %r>" % self.name

@dataclass
class Topic(db.Model):
    __tablename__ = "topics"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    in_dropdown = db.Column(db.TinyInt, nullable=False)

    def __init__(self, name, in_dropdown):
        self.name = name
        self.in_dropdown = in_dropdown

    def __repr__(self):
        return "<Topic %r>" % self.name

@dataclass
class SubTopic(db.Model):
    __tablename__ = "subtopics"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    in_dropdown = db.Column(db.TinyInt, nullable=False)

    def __init__(self, name, in_dropdown):
        self.name = name
        self.in_dropdown = in_dropdown

    def __repr__(self):
        return "<SubTopic %r>" % self.name


@dataclass
class Author(db.Model):
    __tablename__ = "authors"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, name, image, description, username, password):
        self.name = name
        self.image = image
        self.description = description
        self.username = username
        self.password = password

    def __repr__(self):
        return "<Author %r>" % self.name       