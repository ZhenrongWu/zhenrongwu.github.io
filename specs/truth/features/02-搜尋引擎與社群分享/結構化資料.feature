# language: zh-TW
功能: 結構化資料

  首頁以 schema.org 的結構化資料描述網站與網站的主人，
  讓搜尋引擎把「吳振榮」「Zhenrong Wu」與 GitHub、LinkedIn 上的個人檔案連在一起。

  @need-clarification
  場景: 首頁描述網站的主人
    當 不執行 JavaScript 的爬蟲讀取 "/"
    那麼 結構化資料描述一個 "Person"，內容如下：
      | 欄位          | 值                                        |
      | name          | 吳振榮                                    |
      | alternateName | Zhenrong Wu                               |
      | jobTitle      | 遊戲與網頁開發者                          |
      | url           | https://zhenrongwu.github.io/             |
      | sameAs        | https://github.com/ZhenrongWu             |
      | sameAs        | https://www.linkedin.com/in/zhenrong-wu   |

  場景: 首頁描述網站本身
    當 不執行 JavaScript 的爬蟲讀取 "/"
    那麼 結構化資料描述一個 "WebSite"，內容如下：
      | 欄位       | 值                            |
      | name       | ZHENRONG WU                   |
      | url        | https://zhenrongwu.github.io/ |
      | inLanguage | zh-Hant                       |
    並且 網站的作者是結構化資料中的 "Person"
