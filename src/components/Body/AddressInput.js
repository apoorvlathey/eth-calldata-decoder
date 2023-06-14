import React from "react";
import {
  VStack,
  Input,
  Select,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

function AddressInput({
  contractAddress,
  setContractAddress,
  networkInfo,
  networkIndex,
  setNetworkIndex,
  btnDisabled,
  decode,
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
      <Select
        placeholder="Select Network"
        variant="filled"
        _hover={{ cursor: "pointer" }}
        value={networkIndex}
        onChange={(e) => setNetworkIndex(e.target.value)}
      >
        {networkInfo.map((network, i) => (
          <option value={i} key={i}>
            {network.name}
          </option>
        ))}
      </Select>
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

export default AddressInput;
