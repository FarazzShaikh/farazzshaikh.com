import { Howl } from "howler";
import {
  EquirectangularReflectionMapping,
  LoadingManager,
  MeshStandardMaterial,
  Object3D,
  Texture,
  TextureLoader,
} from "three";
import { DRACOLoader, GLTF, GLTFLoader, RGBELoader } from "three-stdlib";

export type GltfWithNodes = GLTF & {
  nodes: {
    [key: string]: Object3D;
  };
  materials: {
    [key: string]: MeshStandardMaterial;
  };
};

export class Loader {
  gltfLoader: GLTFLoader;
  dracoLoader: DRACOLoader;
  textureLoader: TextureLoader;
  rgbeLoader: RGBELoader;
  manager: LoadingManager;

  gltfCache: {
    [key: string]: GltfWithNodes;
  };

  textureCache: {
    [key: string]: Texture;
  };

  audioCache: {
    [key: string]: Howl;
  };

  hasBeenLoadedOnce: {
    [key: string]: boolean;
  };

  constructor() {
    this.gltfCache = {};
    this.audioCache = {};
    this.textureCache = {};
    this.hasBeenLoadedOnce = {};
    this.manager = new LoadingManager();

    this.dracoLoader = new DRACOLoader(this.manager);
    this.dracoLoader.setDecoderPath("/draco/");
    this.dracoLoader.setDecoderConfig({ type: "js" });

    this.gltfLoader = new GLTFLoader(this.manager);
    this.textureLoader = new TextureLoader(this.manager);
    this.rgbeLoader = new RGBELoader(this.manager);

    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  async preloadAudio(paths: string[]) {
    for (const path of paths) {
      const audio = new Howl({
        src: path,
        volume: 1,
        html5: true,
        preload: true,
      });

      this.audioCache[path] = audio;
    }
  }

  async preloadTextures(paths: string[]) {
    for (const path of paths) {
      const ext = path.split(".").pop();

      let texture: Texture;
      switch (ext) {
        case "hdr":
          texture = await this.rgbeLoader.loadAsync(path);
          texture.colorSpace = "srgb-linear";
          texture.mapping = EquirectangularReflectionMapping;
          break;

        default:
          texture = await this.textureLoader.loadAsync(path);
          break;
      }

      this.textureCache[path] = texture;
    }
  }

  async preloadGLTF(paths: string[]) {
    for (const path of paths) {
      const loaded = (await this.gltfLoader.loadAsync(path)) as GltfWithNodes;
      this.gltfCache[path] = loaded;
    }
  }

  loadAudio(keyOrSrc: string): Howl {
    const audio = this.audioCache[keyOrSrc];
    if (!audio) throw new Error(`Audio ${keyOrSrc} not preloaded`);
    return audio;
  }

  loadTexture(keyOrSrc: string): Texture {
    const texture = this.textureCache[keyOrSrc];
    if (!texture) throw new Error(`Texture ${keyOrSrc} not preloaded`);
    return texture;
  }

  loadGltf(path: string): GLTF {
    const gltf = this.gltfCache[path];
    if (!gltf) throw new Error(`GLTF ${path} not preloaded`);
    return gltf;
  }

  set onProgress(fn: (url: string, loaded: number, total: number) => void) {
    this.manager.onProgress = fn;
  }

  destroy() {
    this.audioCache = {};
    this.textureCache = {};
    this.gltfCache = {};
    this.hasBeenLoadedOnce = {};
  }
}
