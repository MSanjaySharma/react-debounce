import React from "react";

interface TextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ onChange }: TextInputProps) {
  return <input onChange={onChange} />;
}

export default TextInput;
