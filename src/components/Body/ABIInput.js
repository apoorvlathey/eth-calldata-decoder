import React, { useState } from "react";
import { VStack, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";
import JsonTextArea from "../common/JsonTextArea";

function ABIInput({ abi, setAbi, btnDisabled, decode, bg }) {
  return (
    <VStack>
      <FormControl>
        <FormLabel>Input ABI</FormLabel>
        <JsonTextArea
          value={abi}
          setValue={setAbi}
          bg={bg}
          placeholder="JSON ABI"
          ariaLabel="json abi"
        />
      </FormControl>
      <Button
        onClick={decode}
        leftIcon={<UnlockIcon />}
        style={{ marginTop: "20px" }}
        colorScheme="blue"
        disabled={btnDisabled}
      >
        Decode
      </Button>
    </VStack>
  );
}

export default ABIInput;
