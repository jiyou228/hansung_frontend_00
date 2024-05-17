import imgSrc from '../assets/image copy.png';
import backgroundSrc from '../assets/image.png';
import React, { useRef, useEffect, useState } from 'react';

function ImageEditor() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePos, setImagePos] = useState({ x: 50, y: 50 }); // 이미지 초기 위치
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1); // 이미지 스케일

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = imgSrc; // 이미지 경로 설정
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    draw(ctx);
  }, [image, imagePos, scale]);

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 캔버스 클리어

    // 배경 이미지 그리기
    const background = new Image();
    background.src = backgroundSrc;
    ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // imgSrc 이미지 그리기
    if (image) {
      ctx.drawImage(image, imagePos.x, imagePos.y, image.width * scale, image.height * scale); // 이미지 그리기
    }
  };

  const handleMouseDown = (e) => {
    const mouseX = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = e.clientY - canvasRef.current.getBoundingClientRect().top;
    setIsDragging(true);
    setDragStartPos({ x: mouseX - imagePos.x, y: mouseY - imagePos.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const mouseX = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = e.clientY - canvasRef.current.getBoundingClientRect().top;
    setImagePos({ x: mouseX - dragStartPos.x, y: mouseY - dragStartPos.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="900"
        height="1200"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp} // 마우스가 캔버스 바깥으로 나갔을 때 드래그 종료
      ></canvas>
      <input type="range" min="1" max="5" step="1" value={scale} onChange={handleScaleChange} />
    </div>
  );
}

export default ImageEditor;
