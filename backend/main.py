from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import base64
import os

app = FastAPI(title="图片压缩工具API", version="2.0.0")

# 允许前端跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "图片压缩工具API服务运行正常", "version": "2.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "image-compressor-api"}

@app.post("/compress")
async def compress_image(file: UploadFile = File(...), ratio: int = Form(80)):
    try:
        # 验证文件类型
        if not file.content_type.startswith('image/'):
            return JSONResponse({"error": "只支持图片文件"}, status_code=400)
        
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
            "size": len(compressed_bytes),
            "original_size": len(contents),
            "compression_ratio": quality
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 