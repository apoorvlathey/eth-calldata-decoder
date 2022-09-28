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
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";
import { toChecksumAddress } from "ethereum-checksum-address";
import { utils, BigNumber } from "ethers";
import ABIInput from "./ABIInput";
import AddressInput from "./AddressInput";
import Output from "./Output";
import abiDecoder from "abi-decoder";
import axios from "axios";
import networkInfo from "./networkInfo";

function Body() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const toast = useToast();

  const defaultABIPlaceholder = " \n \n \n \n \n \n \n \n \n ";

  const [tabIndex, setTabIndex] = useState(1);
  const [calldata, setCalldata] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [networkIndex, setNetworkIndex] = useState("");
  const [abi, setAbi] = useState(defaultABIPlaceholder);
  const [output, setOutput] = useState("");

  const [disableABIDecodeBtn, setDisableABIDecodeBtn] = useState(true);
  const [disableAddressDecodeBtn, setDisableAddressDecodeBtn] = useState(true);

  const decodeWithABI = () => {
    _decodeWithABI(abi, calldata);
  };

  const _decodeWithABI = (_abi, _calldata) => {
    abiDecoder.addABI(JSON.parse(_abi));
    let decoded;
    try {
      decoded = JSON.stringify(
        abiDecoder.decodeMethod(_calldata),
        undefined,
        2
      );
    } catch {
      toast({
        title: "Incorrect Calldata",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
      return;
    }
    if (decoded) {
      setOutput(decoded);
      toast({
        title: "Successfully Decoded",
        status: "success",
        isClosable: true,
        duration: 1000,
      });
    } else {
      toast({
        title: "Can't Decode Calldata",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  const decodeWithAddress = async () => {
    // get ABI
    let fetched_abi;
    // from Sourcify
    try {
      const response = await axios.get(
        `https://repo.sourcify.dev/contracts/full_match/${
          networkInfo[networkIndex].chainID
        }/${toChecksumAddress(contractAddress)}/metadata.json`
      );
      fetched_abi = JSON.stringify(response.data.output.abi);
    } catch {
      // from Etherscan API
      const response = await axios.get(networkInfo[networkIndex].api, {
        params: {
          address: contractAddress,
        },
      });

      if (response.data.message === "OK") {
        fetched_abi = response.data.result;
      } else {
        toast({
          title: "ABI Not found",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      }
    }

    setAbi(JSON.stringify(JSON.parse(fetched_abi), undefined, 2));
    toast({
      title: "ABI Fetched from Address",
      status: "success",
      isClosable: true,
      duration: 1000,
    });
    setTabIndex(0);

    _decodeWithABI(fetched_abi, calldata);
  };

  const recursiveBNToString = (args) => {
    return args.map((arg) =>
      BigNumber.isBigNumber(arg)
        ? arg.toString()
        : // if arg is a struct in solidity
        arg.constructor === Array
        ? recursiveBNToString(arg)
        : arg
    );
  };

  const decodeWithSelector = async () => {
    // from 4byte.directory
    const selector = calldata.slice(0, 10);
    const response = await axios.get(
      "https://www.4byte.directory/api/v1/signatures/",
      {
        params: {
          hex_signature: selector,
        },
      }
    );
    const results = response.data.results;
    if (results.length > 0) {
      // 4byte can have multiple entries with the same selector

      let allPossibleDecoded = [];
      for (var i = 0; i < results.length; i++) {
        const fn = results[i].text_signature;
        const _abi = [`function ${fn}`];

        const iface = new utils.Interface(_abi);
        try {
          let { args } = iface.parseTransaction({ data: calldata });
          allPossibleDecoded.push({
            function: fn,
            params: recursiveBNToString(args),
          });
        } catch {
          continue;
        }

        if (allPossibleDecoded.length > 0) {
          const decoded = JSON.stringify(
            {
              allPossibilities: allPossibleDecoded,
            },
            undefined,
            2
          );
          setOutput(decoded);
          toast({
            title: "Successfully Decoded",
            status: "success",
            isClosable: true,
            duration: 1000,
          });
        } else {
          toast({
            title: "Can't Decode Calldata",
            status: "error",
            isClosable: true,
            duration: 1000,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (calldata && abi && abi !== defaultABIPlaceholder) {
      setDisableABIDecodeBtn(false);
    } else {
      setDisableABIDecodeBtn(true);
    }
  }, [calldata, abi]);

  useEffect(() => {
    if (calldata && contractAddress && networkIndex) {
      setDisableAddressDecodeBtn(false);
    } else {
      setDisableAddressDecodeBtn(true);
    }
  }, [calldata, contractAddress, networkIndex]);

  return (
    <Container my="16" minW={["0", "0", "2xl", "2xl"]}>
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
          <Tab>No ABI</Tab>
          <Tab>Input ABI</Tab>
          <Tab>Enter Address</Tab>
        </TabList>
        <TabPanels mt="3">
          <TabPanel>
            <Text>
              <b>Note:</b> There might be multiple functions possible for the
              same 4byte signature. Showing all possiblities below on Decode
            </Text>
            <Center>
              <Button
                onClick={decodeWithSelector}
                leftIcon={<UnlockIcon />}
                style={{ marginTop: "20px" }}
                colorScheme="blue"
                disabled={!calldata}
              >
                Decode
              </Button>
            </Center>
          </TabPanel>
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
              networkInfo={networkInfo}
              setNetworkIndex={setNetworkIndex}
              btnDisabled={disableAddressDecodeBtn}
              decode={decodeWithAddress}
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
