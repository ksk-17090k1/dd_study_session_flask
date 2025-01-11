# dd_study_session_flask

勉強会用のリポジトリです。

## backend

ローカルで flask を実行するには以下を実行して`localhost:8080`にアクセスしてください。

```sh
cd backend
poetry install
poetry run python app/app.py
```

## infrastructure

インフラは AWS CDK で構築しています。  
以下でデプロイできます。

```sh
cd cdk
npm install
npm run deploy
```
