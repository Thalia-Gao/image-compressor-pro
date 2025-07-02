import React, { useState } from 'react';
import { Upload, Button, Slider, Card, Row, Col, Typography, message } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import './App.css';

const { Title, Text } = Typography;

// 获取API地址，支持开发和生产环境
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function formatSize(size) {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / 1024 / 1024).toFixed(2) + ' MB';
}

const App = () => {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [originSize, setOriginSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [ratio, setRatio] = useState(80);
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    setFile(file);
    setImgUrl(URL.createObjectURL(file));
    setOriginSize(file.size);
    setCompressedUrl('');
    setCompressedSize(0);
    return false; // 阻止自动上传
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('ratio', ratio);
    try {
      const res = await fetch(`${API_BASE_URL}/compress`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        message.error(data.error);
      } else {
        setCompressedUrl('data:image/jpeg;base64,' + data.image);
        setCompressedSize(data.size);
        message.success('图片压缩成功！');
      }
    } catch (e) {
      message.error('压缩失败，请检查网络连接或后端服务！');
      console.error('压缩错误:', e);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = 'compressed.jpg';
    a.click();
  };

  return (
    <div className="container">
      <Title level={2} style={{ textAlign: 'center', margin: '32px 0 16px' }}>图片压缩工具 2.0</Title>
      <Row gutter={32} justify="center">
        <Col xs={24} md={10}>
          <Card className="apple-card" title="原图预览" bordered>
            <Upload
              accept="image/png,image/jpeg"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
            {imgUrl && (
              <>
                <img src={imgUrl} alt="原图" className="preview-img" />
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">文件大小：{formatSize(originSize)}</Text>
                </div>
              </>
            )}
          </Card>
        </Col>
        <Col xs={24} md={10}>
          <Card className="apple-card" title="压缩后预览" bordered>
            <div style={{ marginBottom: 16 }}>
              <Text>压缩比例：</Text>
              <Slider
                min={10}
                max={100}
                value={ratio}
                onChange={setRatio}
                tooltip={{ open: true, formatter: (v) => v + '%' }}
                style={{ width: 180, display: 'inline-block', marginLeft: 8 }}
              />
              <Button
                type="primary"
                loading={loading}
                onClick={handleCompress}
                disabled={!file}
                style={{ marginLeft: 16 }}
              >
                压缩图片
              </Button>
            </div>
            {compressedUrl && (
              <>
                <img src={compressedUrl} alt="压缩图" className="preview-img" />
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">文件大小：{formatSize(compressedSize)}</Text>
                  {originSize > 0 && (
                    <div>
                      <Text type="secondary">
                        压缩率：{((1 - compressedSize / originSize) * 100).toFixed(1)}%
                      </Text>
                    </div>
                  )}
                </div>
                <Button
                  icon={<DownloadOutlined />}
                  style={{ marginTop: 12 }}
                  onClick={handleDownload}
                  type="dashed"
                  block
                >
                  下载压缩图片
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default App;
