"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "@/utils/editorTools";

const Editor = ({ data, onChange, holder }: any) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div
      id={holder}
      className="prose border-2 rounded-md px-3 py-2 mt-2 w-full h-fit"
    />
  );
};

export default Editor;
