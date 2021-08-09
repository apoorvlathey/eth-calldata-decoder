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
  useToast,
} from "@chakra-ui/react";
import ABIInput from "./ABIInput";
import AddressInput from "./AddressInput";
import Output from "./Output";
import abiDecoder from "abi-decoder";
import axios from "axios";

function Body() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const toast = useToast();

  const [tabIndex, setTabIndex] = useState(0);
  const [calldata, setCalldata] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [abi, setAbi] = useState("");
  const [output, setOutput] = useState("");

  const [disableABIDecodeBtn, setDisableABIDecodeBtn] = useState(true);
  const [disableAddressDecodeBtn, setDisableAddressDecodeBtn] = useState(true);

  const decodeWithABI = () => {
    abiDecoder.addABI(JSON.parse(abi));
    let decoded;
    try {
      decoded = JSON.stringify(abiDecoder.decodeMethod(calldata), undefined, 2);
    } catch {
      toast({
        title: "Incorrect Calldata",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (decoded) {
      setOutput(decoded);
      toast({
        title: "Successfully Decoded",
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Can't Decode Calldata",
        status: "error",
        isClosable: true,
      });
    }
  };

  const decodeWithAddress = async () => {
    // get ABI
    const response = await axios.get(
      "https://api.etherscan.io/api?module=contract&action=getabi",
      {
        params: {
          address: contractAddress,
          apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
        },
      }
    );

    if (response.data.message === "OK") {
      const res_abi = response.data.result;
      setAbi(JSON.stringify(JSON.parse(res_abi), undefined, 2));
      toast({
        title: "ABI Fetched from Address",
        status: "success",
        isClosable: true,
      });
      setTabIndex(0);
      abiDecoder.addABI(JSON.parse(res_abi));
      let decoded;
      try {
        decoded = JSON.stringify(
          abiDecoder.decodeMethod(calldata),
          undefined,
          2
        );
      } catch {
        toast({
          title: "Incorrect Calldata",
          status: "error",
          isClosable: true,
        });
        return;
      }
      if (decoded) {
        setOutput(decoded);
        toast({
          title: "Successfully Decoded",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "Can't Decode Calldata",
          status: "error",
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "ABI Not found",
        status: "error",
        isClosable: true,
      });
    }
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
    <Container mt="16" minW="2xl">
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
      <Tabs
        mt="6"
        variant="enclosed"
        index={tabIndex}
        onChange={setTabIndex}
        isFitted
      >
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
              decode={decodeWithABI}
              bg={bgColor[colorMode]}
            />
          </TabPanel>
          <TabPanel>
            <AddressInput
              contractAddress={contractAddress}
              setContractAddress={setContractAddress}
              btnDisabled={disableAddressDecodeBtn}
              decode={decodeWithAddress}
              bg={bgColor[colorMode]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Divider />
      <Box mt="4" mb="40">
        <Output value={output} />
      </Box>
    </Container>
  );
}

export default Body;
