"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

export default function Home() {
  const [selectImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const worker = createWorker();

  const getTextFromImage = useCallback(
    (async) => {
      const getTextFromImage = async () => {
        if (!selectImage) return;
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");

        const { data } = await worker.recognize(selectImage);
        setTextResult(data.text);
      };
    },
    [worker, selectImage]
  );

  useEffect(() => {
    getTextFromImage();
  }, [selectImage, getTextFromImage]);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };
  //
  return (
    <>
      <h1>ImText</h1>
      <p>Gets Words</p>
      <div className="input-wrapper">
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>
      <div className="result">
        {selectImage && (
          <div className="box-image">
            <Image
              src={URL.createObjectURL(selectImage)}
              alt="thumb"
              width="100"
              height="100"
            />
          </div>
        )}
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}

        {/* <div className="box-p">
          <p>{textResult}</p>
        </div> */}
      </div>
    </>
  );
}
