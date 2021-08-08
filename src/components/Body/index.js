import React, { useState, useEffect } from "react";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  FormControl,
  useColorMode,
  FormLabel,
  Divider,
  Box,
} from "@chakra-ui/react";
import ABIInput from "./ABIInput";
import AddressInput from "./AddressInput";
import Output from "./Output";
import abiDecoder from "abi-decoder";

function Body() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };

  const [calldata, setCalldata] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [abi, setAbi] = useState("");
  const [output, setOutput] = useState("");

  const [disableABIDecodeBtn, setDisableABIDecodeBtn] = useState(true);
  const [disableAddressDecodeBtn, setDisableAddressDecodeBtn] = useState(true);

  const decode = () => {
    abiDecoder.addABI(JSON.parse(abi));
    setOutput(JSON.stringify(abiDecoder.decodeMethod(calldata), undefined, 2));
  };

  useEffect(() => {
    if (calldata && abi) {
      setDisableABIDecodeBtn(false);
    } else {
      setDisableABIDecodeBtn(true);
    }
  }, [calldata, abi]);

  useEffect(() => {
    if (calldata && contractAddress) {
      setDisableAddressDecodeBtn(false);
    } else {
      setDisableAddressDecodeBtn(true);
    }
  }, [calldata, contractAddress]);

  return (
    <Container mt="16">
      <FormControl>
        <FormLabel>Enter Calldata</FormLabel>
        <Textarea
          placeholder="Calldata"
          aria-label="Calldata"
          value={calldata}
          onChange={(e) => setCalldata(e.target.value)}
          bg={bgColor[colorMode]}
        />
      </FormControl>
      <Tabs mt="6" variant="enclosed" isFitted>
        <TabList>
          <Tab>Input ABI</Tab>
          <Tab>Enter Address</Tab>
        </TabList>
        <TabPanels mt="3">
          <TabPanel>
            <ABIInput
              abi={abi}
              setAbi={setAbi}
              btnDisabled={disableABIDecodeBtn}
              decode={decode}
              bg={bgColor[colorMode]}
            />
          </TabPanel>
          <TabPanel>
            <AddressInput
              contractAddress={contractAddress}
              setContractAddress={setContractAddress}
              btnDisabled={disableAddressDecodeBtn}
              bg={bgColor[colorMode]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Divider />
      <Box mt="4">
        <Output value={output} />
      </Box>
    </Container>
  );
}

export default Body;
