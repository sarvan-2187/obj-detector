'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import { renderPredictions } from '@/utils/render-predictions';

let detectInterval;

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ useState moved to top level

  const runCoco = async () => {
    setIsLoading(true);
    const model = await cocoSSDLoad();
    setIsLoading(false);
    detectInterval = setInterval(() => {
      runObjectDetection(model);
    }, 10);
  };

  async function runObjectDetection(model){
    if(canvasRef.current !==null && webcamRef !==null && webcamRef.current.video?.readyState === 4){
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const detectedObjects = await model.detect(webcamRef.current.video,undefined,0.6);
      // console.log(detectedObjects);

      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, context);
    }
  }

  const showMyVideo = useCallback(() => {
    const video = webcamRef.current?.video;
    if (video && video.readyState === 4) {
      const myVideoWidth = video.videoWidth;
      const myVideoHeight = video.videoHeight;
      console.log("Video Width:", myVideoWidth, "Video Height:", myVideoHeight);
    }
  }, []);

  useEffect(() => {
    runCoco(); // Only run once on mount
    const interval = setInterval(() => {
      showMyVideo();
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(detectInterval);
    };
  }, [showMyVideo]);

  return (
    <div className='mt-6'>
      {isLoading ? (
        <div className='text-3xl pt-6 font-bold px-6 bg-gradient-to-b from-gray-400 via-gray-50 to-gray-400 tracking-tight text-transparent bg-clip-text'>
          Loading AI Model...
        </div>
      ) : (
        <div className='relative flex justify-center items-center rounded-md'>
          <Webcam ref={webcamRef} className='rounded-lg lg:h-[620px]' muted />
        </div>
      )}
      <canvas ref={canvasRef} className='absolute top-0 left-0 z-999999 w-full lg:h-[620px]'></canvas>
    </div>
  );
};

export default ObjectDetection;
