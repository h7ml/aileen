import path from 'node:path'
import { evConfig } from '@/config'
import type { CrawlHooksCallback, CrawlHooksOptions, CrawlPageResult } from '@/hooks'
import { useXcrawl } from '@/hooks'

const storeDirs = path.join(evConfig.store.storeDirs ?? __dirname, 'upload')

const options: CrawlHooksOptions = {
  maxRetry: 3,
  intervalTime: { max: 3000, min: 2000 },
  targets: ['https://www.airbnb.cn/s/experiences', 'https://www.airbnb.cn/s/plus_homes'],
  viewport: { width: 1920, height: 1080 },
  storeDirs,
  crawlPage: { launchBrowser: { headless: true } },
}

const callback: CrawlHooksCallback = (count, stopPolling, results) => {
  // 在某个条件下停止轮询
  if (count === 5 && stopPolling) {
    stopPolling()
    process.exit(0) // 退出程序
  }
  return results
}

export async function crawlAirbnb(): Promise<CrawlPageResult[]> {
  return await useXcrawl(options, callback)
}
