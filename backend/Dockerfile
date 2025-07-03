# Use official Python image
FROM public.ecr.aws/lambda/python:3.11

# Copy requirements file (we'll create below)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy your code
COPY model.py .

# By default, run the script
CMD ["model.handler"]
