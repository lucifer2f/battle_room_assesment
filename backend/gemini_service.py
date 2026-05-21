import os

import google.generativeai as genai

from dotenv import load_dotenv


load_dotenv()


genai.configure(
    api_key=os.getenv("AIzaSyDcku1rMGWbs_o0EdkbBZk8-1va3xYK8Zo")
)


model = genai.GenerativeModel(
    "gemini-3.1-flash-lite"
)



def generate_ai_output(user_prompt):

    response = model.generate_content(
        f"""
        Create a creative luxury campaign response
        for this prompt:

        {user_prompt}

        Keep it cinematic and futuristic.
        """
    )

    return response.text