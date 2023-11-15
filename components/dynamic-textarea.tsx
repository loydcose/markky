"use client"

import React, { useState, useRef, useEffect, ChangeEvent, TextareaHTMLAttributes } from 'react';
import { Textarea } from './ui/textarea';

interface ResizableTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ResizableTextarea: React.FC<ResizableTextareaProps> = (props) => {
  const [value, setValue] = useState<string>('');
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateTextareaRows();
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const updateTextareaRows = () => {
    if (textareaRef.current) {
      const newRows = textareaRef.current.value.split('\n').length || 1;
      setTextareaRows(newRows + 1);
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleInputChange}
      rows={textareaRows}
      style={{resize: "none"}}
      className='outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none'
      {...props}
    />
  );
};

export default ResizableTextarea;
