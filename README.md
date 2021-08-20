# The Timekeeper App

## Pre-Requisites

The application requires python 3.7 or later to run. You can install directly from python or via brew:

* [Brew Install Instructions](https://formulae.brew.sh/formula/python@3.7)
* [Python.oorg Installer](https://www.python.org/downloads/release/python-379/)

## Development Setup

Run the following command to get DEV environment setup

```bash
> git clone https://github.com/spham92/the-timekeeper-app.git
> cd the-timekeeper-app
> python3 -m venv venv
> source venv/bin/activate
> pip3 install -r requirements.txt
```

After getting the above environment setup, you can simply run the following to launch the webb app:

```bash
# In project folder
> source venv/bin/activate
> python app.py

# visit localhost:5000 in your browser
```

## Libraries / Frameworks Used

* [Python Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [Twitter Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
* [Momentjs](https://momentjs.com/)