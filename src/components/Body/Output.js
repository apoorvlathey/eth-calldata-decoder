import React, { useState } from "react";
import { chakra, useColorMode, FormControl, FormLabel } from "@chakra-ui/react";
import JsonTextArea from "../common/JsonTextArea";

function Output({ value }) {
  return (
    <FormControl>
      <FormLabel>Output:</FormLabel>
      <JsonTextArea value={value} readOnly={true} ariaLabel="output" />
    </FormControl>
  );
}

export default Output;
