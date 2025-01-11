FROM public.ecr.aws/docker/library/python:3.12.1-slim

# Install lambda web adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

COPY ./pyproject.toml ./poetry.lock ./

ENV POETRY_REQUESTS_TIMEOUT=10800
RUN python -m pip install --upgrade pip && \
    pip install poetry --no-cache-dir && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi --only main && \
    poetry cache clear --all pypi

COPY ./app ./app

CMD ["gunicorn", "-b=:8080", "-w=1", "app.app:app"]
