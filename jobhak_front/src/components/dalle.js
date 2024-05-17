// import React, { useState } from "react";
// import axios from "axios";

// function Dalle() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [prompt, setPrompt] = useState("");
//   const apiKey = process.env.REACT_APP_API_KEY;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const generateImage = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("image", selectedImage);
//       formData.append("prompt", prompt); // 사용자가 입력한 prompt 추가

//       const response = await axios.post(
//         "https://api.openai.com/v1/images/generations",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setGeneratedImage(response.data.data[0].url);
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>DALL-E 2 Image Editor</h1>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter prompt"
//       />
//       <button onClick={generateImage} disabled={!selectedImage}>
//         Generate Image
//       </button>
//       {selectedImage && (
//         <div>
//           <h2>Selected Image</h2>
//           <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
//         </div>
//       )}
//       {generatedImage && (
//         <div>
//           <h2>Generated Image</h2>
//           <img src={generatedImage} alt="Generated" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dalle;
import React, { useState } from "react";
import axios from "axios";

function Dalle() {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const generateImage = async () => {
    try {
      const formData = new FormData(); // FormData 객체 생성

      if (imageFile) {
        // Convert image file to base64 string
        const imageData = await getBase64(imageFile);
        formData.append("image", imageData); // 이미지 데이터를 FormData에 추가
      }

      // API 요청을 위한 데이터 설정
      formData.append("prompt", prompt);
      formData.append("n", 1);
      formData.append("size", "1024x1024");

      // API 요청 보내기
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        formData, // 수정된 부분: FormData 객체 전달
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data", // 수정된 부분: multipart/form-data로 설정
          },
        }
      );
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // Function to convert file to base64 string
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        console.log(base64String); // 변환된 base64 문자열을 콘솔에 출력
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <h1>DALL-E 2 Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
      />
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}

export default Dalle;
