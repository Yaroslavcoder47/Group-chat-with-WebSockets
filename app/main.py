from fastapi import FastAPI
from uvicorn import run
from fastapi.staticfiles import StaticFiles
from api.router_page import router as router_page
from api.router_socket import router as router_socket

app = FastAPI()

app.mount('/static', StaticFiles(directory='app/static'), 'static')

app.include_router(router_page)
app.include_router(router_socket)

if __name__ == "__main__":
    run("main:app", host="0.0.0.0", port=8005, reload=True)