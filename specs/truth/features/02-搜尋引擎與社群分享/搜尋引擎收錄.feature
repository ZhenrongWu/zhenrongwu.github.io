# language: zh-TW
功能: 搜尋引擎收錄

  搜尋引擎與 AI 爬蟲不一定會執行 JavaScript。
  每個頁面的標題、摘要與正式網址都直接寫在 HTML 裡，爬蟲不必執行程式就分得出每一頁；
  sitemap 與 robots.txt 告訴爬蟲有哪些頁面可以收錄。

  Rule: 每個頁面有自己的標題、摘要與正式網址

    場景大綱: 爬蟲讀取 <網址>
      當 不執行 JavaScript 的爬蟲讀取 "<網址>"
      那麼 回應狀態碼是 200
      並且 網頁標題是 "<標題>"
      並且 網頁摘要是 "<摘要>"
      並且 正式網址是 "<正式網址>"
      並且 網頁允許搜尋引擎收錄

      例子:
        | 網址       | 標題                | 摘要                                                                                                         | 正式網址                               |
        | /          | ZHENRONG WU         | 吳振榮的個人網站，展示網頁開發、遊戲開發專案、技能與專業經歷。專注於前端技術、React、互動設計與數位產品開發。 | https://zhenrongwu.github.io/          |
        | /about     | 關於我 \| ZHENRONG WU | 認識吳振榮：遊戲與網頁開發者的專業簡介、接觸過的技能、常用工具與興趣。                                       | https://zhenrongwu.github.io/about     |
        | /portfolio | 作品集 \| ZHENRONG WU | 吳振榮的作品集：網頁開發、遊戲開發與自動化工具專案，包含使用技術與作品連結。                                 | https://zhenrongwu.github.io/portfolio |
        | /resume    | 履歷 \| ZHENRONG WU   | 吳振榮的履歷：學歷、工作經歷、專案經驗與技能，並可下載 PDF 版本。                                             | https://zhenrongwu.github.io/resume    |

    場景: 切換頁面後標題與正式網址跟著更新
      假設 訪客開啟 "/" 頁面
      當 他點選導覽列的 "作品集"
      那麼 網頁標題是 "作品集 | ZHENRONG WU"
      並且 網頁摘要是 "吳振榮的作品集：網頁開發、遊戲開發與自動化工具專案，包含使用技術與作品連結。"
      並且 正式網址是 "https://zhenrongwu.github.io/portfolio"
      並且 網頁只有一個正式網址

  Rule: 不執行 JavaScript 也讀得到頁面內容
    場景大綱: 爬蟲直接從 HTML 讀到 <網址> 的內容
      當 不執行 JavaScript 的爬蟲讀取 "<網址>"
      那麼 頁面主標題是 "<主標題>"
      並且 畫面顯示 "<內容>"
      並且 網頁作者是 "吳振榮"

      例子:
        | 網址          | 主標題         | 內容                                   |
        | /             | Hi! 我是吳振榮 | 每一個專案對我來說，都像是自己的孩子一樣珍貴 |
        | /about        | 關於我         | 接觸過的專業技能                       |
        | /portfolio    | 作品集         | 以下是我的部分作品                     |
        | /resume       | 履歷           | 工作經驗                               |
        | /no-such-page | 404            | 找不到頁面                             |

  Rule: 每頁只有一個主標題，標題層級不跳級
    場景大綱: <網址> 的標題結構
      當 不執行 JavaScript 的爬蟲讀取 "<網址>"
      那麼 頁面只有一個主標題
      並且 標題層級沒有跳級

      例子:
        | 網址          |
        | /             |
        | /about        |
        | /portfolio    |
        | /resume       |
        | /no-such-page |

  Rule: 找不到的頁面不被收錄

    場景: 爬蟲讀取不存在的網址
      當 不執行 JavaScript 的爬蟲讀取 "/no-such-page"
      那麼 回應狀態碼是 404
      並且 網頁要求搜尋引擎不要收錄
      並且 網頁沒有正式網址

  Rule: sitemap 與 robots.txt 引導爬蟲找到所有頁面

    場景: sitemap 列出所有頁面
      當 爬蟲讀取 "/sitemap.xml" 檔案
      那麼 sitemap 列出以下網址，且每個網址都有最後更新日期：
        | 網址                                   |
        | https://zhenrongwu.github.io/          |
        | https://zhenrongwu.github.io/about     |
        | https://zhenrongwu.github.io/portfolio |
        | https://zhenrongwu.github.io/resume    |

    場景: robots.txt 允許收錄並指出 sitemap 位置
      當 爬蟲讀取 "/robots.txt" 檔案
      那麼 robots.txt 允許所有爬蟲收錄全站
      並且 robots.txt 指出 sitemap 位於 "https://zhenrongwu.github.io/sitemap.xml"
