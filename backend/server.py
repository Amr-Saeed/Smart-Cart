import socketio
import uvicorn
import asyncio
import threading
import tkinter as tk
import base64
import os
import cv2
import numpy as np
import heapq

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def astar(grid, start, goal):
    rows, cols = grid.shape
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path

        neighbors = [(current[0] + dx, current[1] + dy) for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]]
        for neighbor in neighbors:
            x, y = neighbor
            if 0 <= x < rows and 0 <= y < cols:
                if grid[x][y] == 1:
                    tentative_g_score = g_score[current] + 1
                    if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                        came_from[neighbor] = current
                        g_score[neighbor] = tentative_g_score
                        f_score = tentative_g_score + heuristic(neighbor, goal)
                        heapq.heappush(open_set, (f_score, neighbor))
    return None

def draw_path_on_map(start_x, start_y, goal_x, goal_y, map_path='route.jpg'):
    image = cv2.imread(map_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 220, 255, cv2.THRESH_BINARY)

    binary_inverted = cv2.bitwise_not(binary)
    kernel = np.ones((10, 10), np.uint8)
    inflated = cv2.dilate(binary_inverted, kernel, iterations=1)
    inflated_binary = cv2.bitwise_not(inflated)

    grid = np.where(inflated_binary == 255, 1, 0)
    start = (start_y, start_x)
    goal = (goal_y, goal_x)

    if grid[start[0]][start[1]] != 1 or grid[goal[0]][goal[1]] != 1:
        print("🚫 Start or goal point is not walkable!")
        return None

    path = astar(grid, start, goal)
    if not path:
        print("🚫 No path found.")
        return None

    for i, (x, y) in enumerate(path):
        if i % 5 == 0:
            cv2.circle(image, (y, x), 1, (59, 191, 42), 2)

    cv2.putText(image, "You", (start_x - 15, start_y - 12), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)
    cv2.circle(image, (start_x, start_y), 5, (255, 0, 0), -1)
    cv2.circle(image, (goal_x, goal_y), 8, (7, 51, 227), -1)

    return image

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

# @sio.event
# async def product_location(sid, data):
#     print(f"Product Location is: {data}")
    
#     # Read the route.jpg file
#     image_path = os.path.join(os.path.dirname(__file__), "route.jpg")
    
#     if os.path.exists(image_path):
#         with open(image_path, "rb") as image_file:
#             encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
        
#         await sio.emit("route-image", {"imageData": encoded_image}, to=sid)
#     else:
#         print("❌ route.jpg not found.")

@sio.event
async def product_location(sid, data):
    print(f"📦 Received product location: {data}")
    
    try:
        start = [800, 100]              # 🟢 Fixed start point
        goal = data["goal"]             # 🔵 Received from frontend

        start_x, start_y = start
        goal_x, goal_y = goal

        image_path = os.path.join(os.path.dirname(__file__), "route.jpg")
        result_img = draw_path_on_map(start_x, start_y, goal_x, goal_y, image_path)

        if result_img is not None:
            _, buffer = cv2.imencode('.jpg', result_img)
            encoded_image = base64.b64encode(buffer).decode("utf-8")

            await sio.emit("route-image", {"imageData": encoded_image}, to=sid)
            print("✅ Path image sent back to client.")
        else:
            await sio.emit("route-image", {"error": "Could not generate path."}, to=sid)

    except Exception as e:
        print("❌ Error in product_location:", str(e))
        await sio.emit("route-image", {"error": str(e)}, to=sid)


def send_barcode():
    global loop
    data = {
        "name": "Peplossi",
        "code": "11278"
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






 