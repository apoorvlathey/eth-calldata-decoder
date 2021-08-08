import React from "react";
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

function AddressInput({
  contractAddress,
  setContractAddress,
  btnDisabled,
  bg,
}) {
  return (
    <VStack>
      <FormControl>
        <FormLabel>Contract Address</FormLabel>
        <Input
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Address"
          aria-label="contract address"
          bg={bg}
        />
      </FormControl>
      <Button
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

export default AddressInput;
