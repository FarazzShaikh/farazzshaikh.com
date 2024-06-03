import { Box, Text } from "@chakra-ui/react";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import tunnel from "tunnel-rat";
import { Debug3D } from "./Debug3D";
import { useDebug } from "./store";

export const DebugTunnel = tunnel();

export function DebugProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "d") {
        useDebug.setState((s) => ({ isDebug: !s.isDebug }));
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return <>{children}</>;
}

function getUnmaskedInfo(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  var unMaskedInfo = {
    renderer: "",
    vendor: "",
  };

  var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (dbgRenderInfo != null) {
    unMaskedInfo.renderer = gl.getParameter(
      dbgRenderInfo.UNMASKED_RENDERER_WEBGL
    );
    unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
  }

  return unMaskedInfo;
}

export function Debug() {
  const gl = useThree((s) => s.gl);
  const viewport = useThree((s) => s.viewport);

  const [data, setData] = useState({
    paths: "<path>",
    lastModified: "<last modified>",
    title: "<title>",
    vendorInfo: "<vendor>",
    renderInfo: "<renderer>",
    gpuVendor: "<gpu vendor>",
    gpuRenderer: "<gpu renderer>",
  });

  const fpsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const context = gl.getContext();
    const unMaskedInfo = getUnmaskedInfo(context);

    const data = {
      paths: window.location.pathname,
      lastModified: document.lastModified,
      title: document.title,
      vendorInfo: context.getParameter(context.VERSION),
      renderInfo: context.getParameter(context.RENDERER),
      gpuInfo: unMaskedInfo.vendor,
      gpuRenderer: unMaskedInfo.renderer,
    };

    setData((prev) => ({ ...prev, ...data }));
  }, [gl]);

  return (
    <>
      <Perf />
      <Debug3D />

      <DebugTunnel.In>
        <Box
          position="fixed"
          top={0}
          left={0}
          p={4}
          zIndex="overlay"
          color="white"
          fontFamily="monospace"
          w="50%"
        >
          <Text fontWeight="bold">Page</Text>
          <Text>{data.paths}</Text>
          <Text>
            {data.title} ({data.lastModified})
          </Text>
          <br />
          <Text fontWeight="bold">WebGL</Text>
          <Text>
            {data.renderInfo} / {data.vendorInfo}
          </Text>
          <br />
          <Text fontWeight="bold">GPU</Text>
          <Text>
            {data.gpuVendor} / {data.gpuRenderer}
          </Text>
        </Box>
      </DebugTunnel.In>
    </>
  );
}
