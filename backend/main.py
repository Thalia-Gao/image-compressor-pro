from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import base64

app = FastAPI()

# 允许前端跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/compress")
async def compress_image(file: UploadFile = File(...), ratio: int = Form(80)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        # 计算压缩质量
        quality = max(10, min(100, int(ratio)))
        # 转为RGB，兼容PNG
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
        # 压缩图片
        buf = io.BytesIO()
        image.save(buf, format="JPEG", quality=quality)
        compressed_bytes = buf.getvalue()
        # base64编码
        b64_img = base64.b64encode(compressed_bytes).decode()
        return JSONResponse({
            "image": b64_img,
            "size": len(compressed_bytes)
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500) 