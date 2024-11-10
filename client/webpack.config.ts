import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

// Определяем новый интерфейс для прокси-объекта
interface ProxyConfig {
  context?: string[];
  target?: string;
  changeOrigin?: boolean;
  secure?: boolean;
  pathRewrite?: { [key: string]: string };
}

// Определяем новый интерфейс для DevServerConfiguration
interface DevServerConfig extends DevServerConfiguration {
  host?: string;
  port?: number;
  static?: {
    directory?: string;
  };
  proxy?: Array<ProxyConfig>;
}

// Обновляем интерфейс Configuration
interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfig;
}

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    // proxy: [
    //   {
    //     context: ['/__/auth'],
    //     target: 'http://127.0.0.1:9099',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   {
    //     context: ['/__/firestore'],
    //     target: 'http://127.0.0.1:8080',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   {
    //     context: ['/__/functions'],
    //     target: 'http://127.0.0.1:5001',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   {
    //     context: ['/__/storage'],
    //     target: 'http://127.0.0.1:9199',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   // Добавляем прокси для Firebase Authentication
    //   {
    //     context: [
    //       '/identitytoolkit.googleapis.com',
    //       '/securetoken.googleapis.com',
    //     ],
    //     target: 'https://identitytoolkit.googleapis.com',
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: { '^/identitytoolkit.googleapis.com': '' },
    //   },
    // ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
};

export default config;
