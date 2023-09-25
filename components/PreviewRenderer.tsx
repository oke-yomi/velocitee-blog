// PreviewRenderer.tsx

import { Block } from "@/utils/constants";
import React from "react";

type PreviewRendererProps = {
  data: Block[];
};

interface Props {
  blocks: any[];
  time: any;
  version: string;
}

const PreviewRenderer = ({ data }: any) => {
  //   console.log(data);
  const [...blockData] = data.blocks;
  return (
    <div className="prose max-w-full" key={data.time}>
      {blockData.map((block: any, index: number) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p className="md:text-lg first-letter:capitalize mb-2">
                {block.data.text}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="mb-2">
                {block.data.items.map((item: string, subIndex: number) => (
                  <li
                    key={subIndex}
                    className={`mb-1 pl-2 ${
                      block.data.style === "ordered"
                        ? "list-decimal"
                        : "list-disc"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={index} className="">
                <p>{block.data.text}</p>
                <footer
                  dangerouslySetInnerHTML={{ __html: block.data.caption }}
                />
              </blockquote>
            );
          case "header":
            return (
              <blockquote key={index}>
                <p
                  className={`${
                    block.data.level === 2
                      ? "text-3xl"
                      : block.data.level === 3
                      ? "text-2xl"
                      : "text-xl"
                  } font-semibold mb-2 capitalize`}
                >
                  {block.data.text}
                </p>
              </blockquote>
            );
          case "embed":
            return (
              <p className="underline text-secondary font-medium inline-block">
                {block.data.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default PreviewRenderer;
