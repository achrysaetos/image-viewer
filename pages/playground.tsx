import React, { Component } from "react";
import Image from "next/image";

import { TransformWrapper, TransformComponent, MiniMap } from "react-zoom-pan-pinch";

  
export default function Playground({ image }: { image: string }) {
  return (
    <div className="w-full h-full">
      <TransformWrapper>
        <TransformComponent>
          <Image src={image} alt="test" layout="responsive" width={100} height={100} className="w-full h-full" />
        </TransformComponent>
        <div className="absolute bottom-0 right-0">
          <MiniMap>
            <div className="relative">
              <Image src={image} alt="test" layout="responsive" width={100} height={100} />
              <div className="absolute inset-0 bg-white opacity-50"></div>
            </div>
          </MiniMap>
        </div>
      </TransformWrapper>
    </div>
  );
};
