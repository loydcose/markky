// DynamicTextarea.tsx

import React, { useState, useRef, useEffect, ChangeEvent, TextareaHTMLAttributes } from 'react';

interface DynamicTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const DynamicTextarea: React.FC<DynamicTextareaProps> = ({ onChange, value, ...props }) => {
  const [textareaRows, setTextareaRows] = useState<number>(1);
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
      ref={textareaRef}
      rows={textareaRows}
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
