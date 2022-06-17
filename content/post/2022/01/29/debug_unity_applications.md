+++
author = "Hugo Authors"
title = "Rider Debug 模式在 Unity 的應用"
date = "2022-01-29"
categories = [
    "Rider",
    "Unity",
]
archives = ["2022/01"]
+++

## 前言

因為一直很懶的寫部落格，
再加上自己有點完美主義，
同時也不知道該寫甚麼內容，
而之所以會寫這篇，
是因為發覺自己並不熟悉 Rider Debug 模式要如何在 Unity 使用。

## 正文

第一步：將 [Attach to Unity Editor](https://i.imgur.com/dfncCpY.png) 改成 [Attch to Unity Editor & Play](https://i.imgur.com/TcCUo4w.png)，這樣的調整是為了讓 Unity 的 Play 鍵也能被啟用

第二步：在想要知道是否有被執行的那行程式碼中按下 [F9](https://i.imgur.com/1VLwxZp.png)

第三步：按下[F5](https://resources.jetbrains.com/help/img/rider/2021.3/icons.actions.startDebugger_dark.png) (這邊要說明一下，本人快捷鍵模式是選用 ReSharper，雖然官方文件和編輯器的提示是 Alt+F5，但本人這邊實作下來就是 F5)

第四步：當程式碼有被執行時，就會跳到 Rider，這時候可以按下 F10 看後續運行的流程

第五步：當知道問題後，就可以按下 Shift+F5 跳出 Debug Mode 模式

## 結語

如果想知道更詳細的操作內容，可以點擊下方的參考連結，希望本篇有幫助到需要的人。

### 參考來源
 - https://www.jetbrains.com/help/rider/Debugging_Unity_Applications.html 