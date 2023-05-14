#### TO RUN: pipenv run python main.py - the name of the main.py
# Import necessary packages including llama_index which will handle the indexing
from llama_index import GPTSimpleVectorIndex, Document, SimpleDirectoryReader, download_loader
import os
import gradio as gr
# your API key
os.environ['OPENAI_API_KEY'] = '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'

#obsidian loader
ObsidianReader = download_loader('ObsidianReader')

# Loading from a directory
# if you want to just read .txt or .pdf use the below to read from directory 'data' relative to root of this file
# documents = SimpleDirectoryReader('data').load_data()
# Lots of different connectors - but this is the one i use for my Obsidian files
documents = ObsidianReader('poems').load_data()

# Construct a simple vector index
index = GPTSimpleVectorIndex.from_documents(documents)
# Save your index to a index.json file
# this is the file that is of research interest to me for sentiment analysis
index.save_to_disk('index.json')
# Load the index from your saved index.json file
index = GPTSimpleVectorIndex.load_from_disk('index.json')
# Querying the index
# you can uncomment the below and it'll print out in console for a quick test
# response = index.query("What is data colonialism?")
# print(response)

# build the theme


# frontend stuff for the chatbot built using gradio
def chatbot(input_text):
    index = GPTSimpleVectorIndex.load_from_disk('index.json')
    response = index.query(input_text, response_mode="compact")
    return response.response
# The interface, customize at will
iface = gr.Interface(fn=chatbot,
                     inputs=gr.components.Textbox(label="What do you want to know?"),
                     outputs=gr.components.Textbox(label="This is what I can tell you"),
                     title="Trancestor.ai",
                     allow_flagging="manual",
                     flagging_options=["Trans"],
                     theme=gr.themes.Default(font=[gr.themes.GoogleFont("Inconsolata"), "Arial", "sans-serif"], primary_hue="neutral"))

iface.launch(share=True)