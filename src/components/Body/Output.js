import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import JsonTextArea from "../common/JsonTextArea";

function Output({ value }) {
  return (
    <FormControl>
      <FormLabel>Output:</FormLabel>
      <JsonTextArea
        value={value}
        readOnly={true}
        ariaLabel="output"
        canResize={true}
      />
    </FormControl>
  );
}

export default Output;
