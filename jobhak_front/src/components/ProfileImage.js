import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvas';
import { useDebounceEffect } from './useDebouce';

import 'react-image-crop/dist/ReactCrop.css';
import instance from '../axiosConfig';
import './ProfileImage.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function ProfileImage({ onSuccess }) {
  const [imgSrc, setImgSrc] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // 추가: 이미지 URL 상태 추가
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(1 / 1);
  const [isChecked, setIsChecked] = useState(false);

  // 추가: 이미지 URL을 사용하여 이미지 불러오기
  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
    }
  }, [imageUrl]);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString()),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // 추가: 이미지 URL 입력 핸들러
  function onImageUrlChange(e) {
    setImageUrl(e.target.value);
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onUploadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    const formData = new FormData();
    formData.append('files', blob, 'crop.png');
    instance
      .post('https://localhost:3000/user/image/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res) {
          console.log('프로필 등록 성공');
          onSuccess();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop],
  );

  const handleRadioChange = (e) =>{
    setIsChecked(e.target.value === '2');
  }
  return (
    <div className="profileImage_app">
      <h2>프로필 사진 업로드</h2>
    <div style={{display: 'flex', gap: '2vw'}}>
      <label>
      <input
        type="radio"
        value="1"
        checked={!isChecked}
        onChange={handleRadioChange}
      />
      기기에서 가져오기
    </label>
    <label>
      <input
        type="radio"
        value='2'
        checked = {isChecked}
        onChange={handleRadioChange}
      />
      이미지 주소로 가져오기
    </label>
    </div>
    <div className="Crop-Controls">
      {isChecked ? (
        <div>
          <label>이미지 주소 입력</label>
        <input
          type="text"
          placeholder="이미지 주소(URL)"
          value={imageUrl}
          onChange={onImageUrlChange}
        />
        </div>
      ) :
      (
      <div>
        <label>파일 업로드</label>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      )}
        
        
      </div>
      <div className='profileImage_crop'>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={onImageLoad}
            style={{height:'30vh' }}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <div className='profileImage_upload' style={{display:'none'}}>
          <div>
            <canvas ref={previewCanvasRef}/>
          </div>
          <div>
            
          </div>
        </div>
      )}
      </div>
      {!!completedCrop && (
      <button className = "profileImage_button" onClick={onUploadCropClick}>업로드</button>
      )}
    </div>
  );
}
