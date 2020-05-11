import datetime

from dataclasses import dataclass
from sqlalchemy.orm import relationship
from app import db

@dataclass
class Article(db.Model):
    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    subtopic_id = db.Column(db.Integer, db.ForeignKey('subtopics.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    tags = relationship('Tag', secondary = 'article_tags')

    def __init__(self, title, description, image, topic_id, subtopic_id, author_id):
        self.title = title
        self.description = description
        self.image = image
        self.topic_id = topic_id
        self.subtopic_id = subtopic_id
        self.author_id = author_id
        self.created_at = datetime.now()
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
class Topic(db.Model):
    __tablename__ = "topics"

    id: int
    name: str
    in_dropdown: bool
    subtopics: list

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    in_dropdown = db.Column(db.Boolean, nullable=False)
    subtopics = relationship('SubTopic', secondary = 'topic_subtopics')

    def __init__(self, name, in_dropdown):
        self.name = name
        self.in_dropdown = in_dropdown
        self.subtopics = []

    def add_subtopics(self, items):
        for subtopic in items:
            self.subtopics.append(TopicSubtopic(topic=self, subtopic=subtopic))

    def __repr__(self):
        return "<Topic %r>" % self.name

@dataclass
class SubTopic(db.Model):
    __tablename__ = "subtopics"

    id: int
    name: str
    in_dropdown: bool

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    in_dropdown = db.Column(db.Integer, nullable=False)

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

@dataclass
class SocialNetwork(db.Model):
    __tablename__ = "social_networks"

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

    def __init__(self, article, tag):
        self.article = article
        self.tag = tag

    def __repr__(self):
        return '<ArticleTag>'   

@dataclass
class TopicSubtopic(db.Model):
    __tablename__ = 'topic_subtopics'

    topic_id: int
    subtopic_id: int

    id = db.Column(db.Integer, primary_key = True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    subtopic_id = db.Column(db.Integer, db.ForeignKey('subtopics.id'), nullable=False)

    def __init__(self, topic_id, subtopic_id):
        self.topic_id = topic_id
        self.subtopic_id = subtopic_id

    def __repr__(self):
        return '<TopicSubtopic>'        

@dataclass
class AuthorSocialNetwork(db.Model):
    __tablename__ = 'author_social_networks'

    id = db.Column(db.Integer, primary_key = True)
    social_network_id = db.Column(db.Integer, db.ForeignKey('social_networks.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)

    social_network = relationship('SocialNetwork', backref=db.backref('author_social_networks', cascade='all, delete-orphan' ))
    author = relationship('Author', backref=db.backref('author_social_networks', cascade='all, delete-orphan' ))

    def __init__(self, social_network, author):
        self.social_network = social_network
        self.author = author

    def __repr__(self):
        return '<AuthorSocialNetwork>'         