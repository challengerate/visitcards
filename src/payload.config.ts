// src/payload.config.ts
import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { Users } from './collections/Users'
import dotenv from 'dotenv'
import { Media } from './collections/Media'
import { DigitalBusinessCards } from './collections/DigitalBusinessCards'
import { VisitorResponses } from './collections/VisitorResponses'
import cloudinaryPlugin from "./plugins"
import Logo from './graphics/Logo';
import Icon from './graphics/Icon';
import { extensions } from '@tiptap/core'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Media, DigitalBusinessCards, VisitorResponses],
  plugins: [cloudinaryPlugin()],
  routes: {
    admin: '/admin',
  },
  admin: {
    user: 'users',
    css: path.resolve(__dirname, '../style.css'),
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules || []),
          {
            test: /\style.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        },
      },
    }),
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    meta: {
      titleSuffix: '- S R Jay',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})