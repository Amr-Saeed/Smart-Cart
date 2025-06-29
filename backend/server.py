import socketio
import uvicorn
import asyncio
import threading
import tkinter as tk

# Create the Socket.IO server
sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
app = socketio.ASGIApp(sio)

connected_clients = set()
loop = None  # Global loop reference

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
    connected_clients.add(sid)

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
    connected_clients.discard(sid)

@sio.event
async def product_location(sid, data):
    print(f"Product Location is: {data}")

def send_barcode():
    global loop
    data = {
        "name": "Peplossi",
        "code": "325231234"
    }
    print(f"Sending scanner_data: {data}")
    if loop:
        asyncio.run_coroutine_threadsafe(
            sio.emit("scanner-data", data),
            loop
        )


def start_gui():
    root = tk.Tk()
    root.title("Barcode Scanner")
    root.geometry("200x100")

    button = tk.Button(root, text="Send Scanner Data", command=send_barcode)
    button.pack(expand=True)

    root.mainloop()

def start_server():
    uvicorn.run(app, host="0.0.0.0", port=3000)

if __name__ == "__main__":
    # Set the loop correctly before running server
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    # Run GUI in another thread
    threading.Thread(target=start_gui, daemon=True).start()

    # Run the uvicorn ASGI server using the real event loop
    loop.run_until_complete(
        asyncio.to_thread(start_server)
    )