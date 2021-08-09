import React from "react";
import { chakra, useColorMode } from "@chakra-ui/react";
import SimpleEditor from "react-simple-code-editor";

import "../../styles/scroll.css";
import "highlight.js/styles/obsidian.css";
// only import the required language support
import hljs from "highlight.js/lib/core";
hljs.registerLanguage("json", require("highlight.js/lib/languages/json"));

const ChakraSimpleEditor = chakra(SimpleEditor);

function JsonTextArea({
  value,
  setValue,
  bg,
  placeholder,
  ariaLabel,
  readOnly,
  canResize,
}) {
  const { colorMode } = useColorMode();
  const borderColor = { light: "gray.500", dark: "gray.400" };

  return (
    <ChakraSimpleEditor
      placeholder={placeholder}
      aria-label={ariaLabel}
      value={value}
      onValueChange={setValue}
      readOnly={readOnly}
      bg={bg}
      h="60"
      style={{
        overflowY: "scroll",
      }}
      className="scroll"
      highlight={(contents) =>
        hljs.highlight(contents, { language: "json" }).value
      }
      border="1px"
      borderColor={borderColor[colorMode]}
      roundedLeft="md"
      roundedRight="4px"
      fontFamily={"SFMono-Regular,Menlo,Monaco,Consolas,monospace"}
      resize={canResize ? "both" : "none"}
    />
  );
}

export default JsonTextArea;
