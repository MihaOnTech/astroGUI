import React from "react";
import { Box } from "@chakra-ui/react";
import { CartaAstralProvider } from "./contexts/CartaAstralContext";
import FlexLayout from "./layouts/FlexLayout";
import Header from "./components/Header";
import FileTree from "./components/FileTree";
import DibujoSVG from "./components/DibujoSVG";
import TextViewer from "./components/TextViewer";

const App = () => {

  return (
    <CartaAstralProvider>
      <Box h="100vh" w="100vw">
        <FlexLayout
          Header={Header}
          FileTree={FileTree}
          DibujoSVG={DibujoSVG}
          TextViewer={TextViewer}
        />
      </Box>
    </CartaAstralProvider>
  );
};

export default App;
