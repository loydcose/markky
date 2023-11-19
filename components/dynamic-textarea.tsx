// DynamicTextarea.tsx

import React, { useState, useRef, useEffect, ChangeEvent, TextareaHTMLAttributes } from 'react';

interface DynamicTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const DynamicTextarea: React.FC<DynamicTextareaProps> = ({ onChange, value, ...props }) => {
  const [textareaRows, setTextareaRows] = useState<number>(2);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateTextareaRows();
  }, [value]);

  const updateTextareaRows = () => {
    if (textareaRef.current) {
      const newRows = textareaRef.current.value.split('\n').length || 1;
      setTextareaRows(newRows);
    }
  };

  return (
    <textarea
      className='leading-6 w-full mx-auto block max-w-[700px] bg-transparent text-zinc-400 resize-none outline-none placeholder:text-zinc-600 caret-yellow-600'
      ref={textareaRef}
      rows={textareaRows + 4}
      value={value}
      onChange={(e) => {
        onChange(e);
        updateTextareaRows();
      }}
      {...props}
    />
  );
};

export default DynamicTextarea;
