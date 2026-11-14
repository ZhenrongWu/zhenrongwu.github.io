# language: zh-TW
功能: 社群分享預覽

  網址貼到 Facebook、LINE、X 等平台時，平台會讀取網頁上的分享資訊，
  以大圖卡片顯示該頁的標題、摘要與預覽圖。

  場景大綱: 分享 <網址> 時顯示該頁的標題與摘要
    當 不執行 JavaScript 的爬蟲讀取 "<網址>"
    那麼 分享預覽的標題是 "<標題>"
    並且 分享預覽的摘要與網頁摘要相同
    並且 分享預覽的網址是 "<正式網址>"
    並且 分享預覽以大圖卡片顯示 "https://zhenrongwu.github.io/og-image.jpg"

    例子:
      | 網址       | 標題                  | 正式網址                               |
      | /          | ZHENRONG WU           | https://zhenrongwu.github.io/          |
      | /about     | 關於我 \| ZHENRONG WU | https://zhenrongwu.github.io/about     |
      | /portfolio | 作品集 \| ZHENRONG WU | https://zhenrongwu.github.io/portfolio |
      | /resume    | 履歷 \| ZHENRONG WU   | https://zhenrongwu.github.io/resume    |
