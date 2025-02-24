import { createServer as createViteServer, InlineConfig, mergeConfig, resolveConfig } from 'vite'
import { ResolvedSlidevOptions, SlidevServerOptions } from './options'
import { ViteSlidevPlugin } from './plugins/preset'

export async function createServer(
  options: ResolvedSlidevOptions,
  viteConfig: InlineConfig = {},
  serverOptions: SlidevServerOptions = {},
) {
  const rawConfig = await resolveConfig({}, 'serve')
  const pluginOptions = rawConfig.slidev || {}

  const server = await createViteServer(
    mergeConfig(
      viteConfig,
      <InlineConfig>({
        plugins: [
          await ViteSlidevPlugin(options, pluginOptions, serverOptions),
        ],
      }),
    ),
  )

  return server
}
