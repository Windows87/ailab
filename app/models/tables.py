from datetime import datetime

from werkzeug.security import generate_password_hash

from dataclasses import dataclass
from sqlalchemy.orm import relationship
from app import db

@dataclass
class Article(db.Model):
    __tablename__ = "articles"

    id: int
    title: str
    description: str
    content: str
    image: str
    views: int
    tags: list
    author: dict
    created_at: datetime

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    views = db.Column(db.Integer, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    tags = relationship('Tag', secondary = 'article_tags')
    author = relationship('Author')

    def __init__(self, title, description, content, image, author_id):
        self.title = title
        self.description = description
        self.content = content
        self.image = image
        self.author_id = author_id
        self.created_at = datetime.now()
        self.views = 0
        self.tags = []

    def add_tags(self, items):
        for tag in items:
            self.tags.append(ArticleTag(article=self, tag=tag))


    def __repr__(self):
        return "<Article %r>" % self.title

@dataclass
class Tag(db.Model):
    __tablename__ = "tags"

    id: int
    name: str

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)

    def __init__(self, name):
        print(name)
        self.name = name

    def __repr__(self):
        return "<Tag %r>" % self.name

@dataclass
class Author(db.Model):
    __tablename__ = "authors"

    id: int
    name: str
    username: str
    password: str
    image: str
    description: str
    socialnetworks: list

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    socialnetworks = relationship('AuthorSocialNetwork')

    def __init__(self, name, image, description, username, password):
        self.name = name
        self.image = image
        self.description = description
        self.username = username
        self.password = generate_password_hash(password)
        self.socialnetworks = []

    def __repr__(self):
        return "<Author %r>" % self.name       

@dataclass
class SocialNetwork(db.Model):
    __tablename__ = "social_networks"

    id: int
    name: str
    icon: str

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    icon = db.Column(db.String, nullable=False)

    def __init__(self, name, icon):
        self.name = name
        self.icon = icon

    def __repr__(self):
        return "<SocialNetwork %r>" % self.name  

@dataclass
class ArticleTag(db.Model):
    __tablename__ = 'article_tags'

    id = db.Column(db.Integer, primary_key = True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

    article = relationship('Article', backref=db.backref('article_tags', cascade='all, delete-orphan' ))
    tag = relationship('Tag', backref=db.backref('article_tags', cascade='all, delete-orphan' ))

    def __init__(self, article_id, tag_id):
        self.article_id = article_id
        self.tag_id = tag_id

    def __repr__(self):
        return '<ArticleTag>'         

@dataclass
class AuthorSocialNetwork(db.Model):
    __tablename__ = 'author_social_networks'

    link: str
    socialnetwork: dict

    id = db.Column(db.Integer, primary_key = True)
    social_network_id = db.Column(db.Integer, db.ForeignKey('social_networks.id'), nullable=False)
    link = db.Column(db.String, nullable = False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)

    socialnetwork = relationship('SocialNetwork')
    author = relationship('Author')

    def __init__(self, social_network_id, link, author_id):
        self.social_network_id = social_network_id
        self.author_id = author_id
        self.link = link

    def __repr__(self):
        return '<AuthorSocialNetwork>'

@dataclass
class Day(db.Model):
    __tablename__ = 'days'

    day: int
    month: int
    year: int
    views: int

    id = db.Column(db.Integer, primary_key = True)
    day = db.Column(db.Integer, nullable = False)
    month = db.Column(db.Integer, nullable = False)         
    year = db.Column(db.Integer, nullable = False)
    views = db.Column(db.Integer, nullable = False)

    def __init__(self, day, month, year, views):
        self.day = day
        self.month = month
        self.year = year
        self.views = views    

    def __repr__(self):
        return '<Month>'