import React, { useRef, useEffect, useState } from "react";
import Nav from "./Nav";
import "./jobhakplus.css";
import axios from "axios";
import defaultimg from "../assets/profileplus.png";
import redpaint from "../assets/redpaint.png";
import greenpaint from "../assets/greenpaint.png";
import blackpaint from "../assets/blackpaint.png";
import bluepaint from "../assets/bluepaint.png";
import fillpaint from "../assets/fillpaint.png";
import clearpaints from "../assets/clearpaints.png";
import { useNavigate } from "react-router-dom";

const Jobhakplus = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const [canvasBackgroundImageSrc, setCanvasBackgroundImageSrc] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [lineColor, setLineColor] = useState("#000000");
  const [resultimg, setResultImg] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    //console.log(canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    if (canvasBackgroundImageSrc) {
      const img = new Image();
      img.src = canvasBackgroundImageSrc;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        paths.forEach((path) => {
          ctx.strokeStyle = path.color;
          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          path.points.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.stroke();
        });

        if (currentPath.length > 0) {
          ctx.strokeStyle = lineColor;
          ctx.beginPath();
          ctx.moveTo(currentPath[0].x, currentPath[0].y);
          currentPath.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.stroke();
        }
      };
    } else {
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      paths.forEach((path) => {
        ctx.strokeStyle = path.color;
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        path.points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.stroke();
      });

      if (currentPath.length > 0) {
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(currentPath[0].x, currentPath[0].y);
        currentPath.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.stroke();
      }
    }
  }, [paths, currentPath, canvasBackgroundImageSrc, lineColor]);

  useEffect(() => {
    const imgElement = document.querySelector(".result-img");
    if (imgElement) {
      imgElement.onload = () => {
        imgElement.classList.add("loaded");
      };
    }
  }, [resultimg]);

  const encodeFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const sendImage = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setFileName(file.name);
    setFileExtension(file.name.split(".").pop());
    console.log(fileExtension);

    axios
      .post("http://localhost:12300/plus/image", formData, {
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setCanvasBackgroundImageSrc(url);
        // console.log(res.data);
        // console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
        navigate('/oops');
      });
  };

  const saveCanvasAsImage = (callback) => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      callback(blob);
    }, "image/png");
  };

  const sendGenerate = () => {
    saveCanvasAsImage((blob) => {
      const formData = new FormData();
      formData.append("canvas", blob, fileName);
      formData.append("extension", fileExtension);

      axios
        .post("http://localhost:12300/plus/generate", formData, {
          responseType: "blob",
        })
        .then((res) => {
          console.log(res.data);
          const result = URL.createObjectURL(res.data);
          setResultImg(result);
          //사진 그대로를 보여주는 것이 아닌 url로 도착
        })
        .catch((err) => {
          console.error(err);
          navigate('/oops');
        });
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      encodeFileToBase64(selectedFile);
      setCanvasBackgroundImageSrc("");
      clearCanvas();
      setResultImg("");
      setPreviewImageSrc("");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImageSrc(e.target.result);
      };
      reader.readAsDataURL(droppedFile);
      setFile(droppedFile);
      setCanvasBackgroundImageSrc("");
      clearCanvas();
      setResultImg("");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
    setResultImg("");
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    setCurrentPath([{ x: offsetX, y: offsetY }]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    setCurrentPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]);
    //console.log(nativeEvent.offsetX, nativeEvent.offsetY);
    //포인터가 왼쪽 상단에 나타나는 오류 발견
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const newPaths = [...paths, { color: lineColor, points: currentPath }];
    setPaths(newPaths);
    setCurrentPath([]);
  };

  const fillCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (canvasBackgroundImageSrc) {
      const img = new Image();
      img.src = canvasBackgroundImageSrc;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        paths.forEach((path) => {
          ctx.strokeStyle = path.color;
          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          path.points.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = path.color;
          ctx.fill();
        });

        if (currentPath.length > 0) {
          ctx.strokeStyle = lineColor;
          ctx.beginPath();
          ctx.moveTo(currentPath[0].x, currentPath[0].y);
          currentPath.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = lineColor;
          ctx.fill();
        }
      };
    } else {
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      paths.forEach((path) => {
        ctx.strokeStyle = path.color;
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        path.points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = path.color;
        ctx.fill();
      });

      if (currentPath.length > 0) {
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(currentPath[0].x, currentPath[0].y);
        currentPath.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = lineColor;
        ctx.fill();
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="app_container">
        <div
          className="plus_guide_container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {previewImageSrc ? (
            <img
              src={previewImageSrc}
              alt="preview-img"
              className="plus_img_preview"
            />
          ) : (
            <img
              src={defaultimg}
              alt="default-img"
              className="plus_img_default"
            />
          )}
          <label htmlFor="file" className="select_image">
            이미지 선택
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
          <button className="send_image" onClick={(e) => sendImage(e)}>
            사진 보내기
          </button>
          <button className="send_generate" onClick={(e) => sendGenerate(e)}>
            수정된 사진 보내기
          </button>
        </div>
        <div>
          <canvas
            className="canvas_container"
            width={500}
            height={600}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          />

          <div className="color-buttons">
            <div>
              <button
                className="color-button"
                onClick={() => setLineColor("#000000")}
              >
                <img src={blackpaint} className="black_paint" alt="검정" />
              </button>
              <br />
              <label>배경</label>
            </div>
            <div>
              <button
                className="color-button"
                onClick={() => setLineColor("#0000CC")}
              >
                <img src={bluepaint} className="blue_paint" alt="파랑" />
              </button>
              <br />
              <label>머리</label>
            </div>
            <div>
              <button
                className="color-button"
                onClick={() => setLineColor("#CC0000")}
              >
                <img src={redpaint} className="red_paint" alt="빨강" />
              </button>
              <br />
              <label>피부</label>
            </div>
            <div>
              <button
                className="color-button"
                onClick={() => setLineColor("#00CC00")}
              >
                <img src={greenpaint} className="green_paint" alt="초록" />
              </button>
              <br />
              <label>의상</label>
            </div>
            <div>
              <button className="clear-button" onClick={clearCanvas}>
                <img src={clearpaints} className="clear_paint" alt="초기화" />
              </button>
              <br />
              <label>초기화</label>
            </div>
            <div>
              <button className="fill-button" onClick={fillCanvas}>
                <img src={fillpaint} className="fill_paint" alt="채우기" />
              </button>
              <br />
              <label>채우기</label>
            </div>
          </div>
        </div>

        <div className="result_img_container">
        {resultimg && (
            <img src={resultimg} alt="result-img" className="result-img" />
          )}        </div>
      </div>
    </div>
  );
};

export default Jobhakplus;
