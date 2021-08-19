from flask import Flask, redirect, render_template, url_for

app = Flask(__name__)


@app.route('/')
def index():
    return redirect(url_for('screen_a'))


@app.route('/screenA')
def screen_a():
    return render_template('pages/screen_a.html')


@app.route('/screenB')
def screen_b():
    return render_template('pages/screen_b.html')


@app.route('/screenC')
def screen_c():
    return render_template('pages/screen_c.html')


if __name__ == '__main__':
    app.run()
