from flask import Flask, abort, render_template, request
from werkzeug.exceptions import Forbidden, NotFound

app = Flask(__name__)


# TOPページ
@app.route("/")
def index():
    return render_template("top.html")


# フィルター：文全体
@app.route("/filter")
def show_filter_block():
    word = "pen"
    return render_template("filter/block.html", show_word=word)


# フィルター：特定の変数
@app.route("/filter-list")
def show_filter_list():
    hero_names = ["桃太郎", "金太郎", "浦島タロウ", "かぐや姫", "笠地蔵"]
    return render_template("filter/list.html", hero_names=hero_names)


# カスタムフィルター
@app.template_filter("truncate")
def str_truncate(value: str, length: int = 10) -> str:
    """文字列を指定した長さで切り詰めるカスタムフィルタ"""
    if len(value) > length:
        return value[:length] + "..."
    return value


# カスタムフィルタ2
@app.template_filter("pokemon_type")
def check_pokemon_type(pokemon_name: str) -> str:
    """ポケモンのタイプを返すカスタムフィルタ"""
    if pokemon_name == "ヒトカゲ":
        return "ほのお"
    elif pokemon_name == "フシギダネ":
        return "くさ"
    elif pokemon_name == "ゼニガメ":
        return "みず"
    raise NotImplementedError(f"未対応のポケモン名です：{pokemon_name}")


# カスタムフィルターの実行
@app.route("/filter-custom")
def show_custom_filter():
    long_word = "じゅげむじゅげむごこうのすりきれ"
    pokemons = ["ヒトカゲ", "フシギダネ", "ゼニガメ"]
    return render_template(
        "filter/custom_filter.html", long_word=long_word, pokemons=pokemons
    )


@app.route("/error-handling")
def show_error_handling():
    return render_template("errors/error_handling.html")


@app.route("/user-auth")
def show_user_auth():
    # クエリパラメータからユーザ名を取得
    name = request.args.get("user_name")
    if name not in ["inagaki", "nomura"]:
        abort(403, "このユーザはアクセス権限がありません")
    return render_template("errors/user_auth.html", user_name=name)


# エラーハンドリング
@app.errorhandler(NotFound)
def show_404_page(error):
    msg = error.description
    print("エラー内容：", msg)
    return render_template("errors/404.html"), 404


@app.errorhandler(Forbidden)
def show_403_page(error):
    msg = error.description
    print("エラー内容：", msg)
    return render_template("errors/403.html"), 403


# abort処理
@app.route("/abort")
def create_exception():
    abort(404, "要求されたページやファイルが見つからない")


if __name__ == "__main__":
    app.run(port=8080)
