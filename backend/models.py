from sqlalchemy import Column, Integer, String

from database import Base


class Submission(Base):

    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String)

    prompt = Column(String)

    status = Column(String)

    output = Column(String)

    score = Column(Integer)