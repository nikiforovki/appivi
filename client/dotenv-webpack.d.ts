declare module 'dotenv-webpack' {
  import { Plugin } from 'webpack';
  class DotenvWebpackPlugin extends Plugin {
    constructor(options?: {
      path?: string;
      safe?: boolean;
      allowEmptyValues?: boolean;
      systemvars?: boolean;
      silent?: boolean;
      expand?: boolean;
      defaults?: boolean;
    });
  }
  export = DotenvWebpackPlugin;
}
