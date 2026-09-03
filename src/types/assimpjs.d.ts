declare module "assimpjs" {
  interface AssimpFile {
    GetPath(): string;
    GetContent(): Uint8Array;
  }

  interface AssimpFileList {
    AddFile(name: string, content: Uint8Array): void;
  }

  interface AssimpFileListConstructor {
    new (): AssimpFileList;
  }

  interface AssimpConvertResult {
    IsSuccess(): boolean;
    FileCount(): number;
    GetFile(index: number): AssimpFile;
    GetErrorCode(): string;
  }

  interface AssimpJsModule {
    FileList: AssimpFileListConstructor;
    ConvertFileList(fileList: AssimpFileList, format: string): AssimpConvertResult;
  }

  interface AssimpJsConfig {
    locateFile?: (path: string) => string;
    wasmBinary?: ArrayBuffer;
  }

  function assimpjs(config?: AssimpJsConfig): Promise<AssimpJsModule>;
  export default assimpjs;
}
