from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, BackgroundTasks
from sqlalchemy.orm import Session
import time

from database import engine, SessionLocal
from models import Base, Submission
from gemini_service import generate_ai_output


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def home():

    return {
        "message": "Backend Running"
    }


@app.post("/submit")
def submit_prompt(
    data: dict,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    submission = Submission(
        username=data["username"],
        prompt=data["prompt"],
        status="queued",
        output="",
        score=0
    )

    db.add(submission)

    db.commit()

    db.refresh(submission)



    background_tasks.add_task(
        process_submission,
        submission.id
    )



    return submission


@app.get("/submissions")
def get_submissions(
    db: Session = Depends(get_db)
):

    submissions = db.query(Submission).all()

    return submissions


def process_submission(submission_id):

    db = SessionLocal()

    submission = db.query(Submission).filter(
        Submission.id == submission_id
    ).first()



    try:

        # RUNNING

        time.sleep(3)

        submission.status = "running"

        db.commit()

        db.refresh(submission)



        # GEMINI OUTPUT

        ai_output = generate_ai_output(
            submission.prompt
        )



        # COMPLETED

        submission.status = "completed"

        submission.output = ai_output

        submission.score = 9

        db.commit()

        db.refresh(submission)



    except Exception as e:

        submission.status = "failed"

        submission.output = str(e)

        db.commit()



    finally:

        db.close()