import csv
import json

# Define the input CSV file and output JSON file
csv_file = 'log.csv'
json_file = 'log.json'

# Read the CSV file and convert it to a list of dictionaries
with open(csv_file, 'r') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Write the list of dictionaries to the output JSON file
with open(json_file, 'w') as f:
    json.dump(rows, f, indent=4)