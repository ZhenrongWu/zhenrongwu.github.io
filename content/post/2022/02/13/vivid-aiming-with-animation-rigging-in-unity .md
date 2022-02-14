+++
author = "Hugo Authors"
title = "使用 Unity 中的 Animation Rigging 讓瞄準動作更加自然"
date = "2022-02-13"
description = ""
tags = [
    "unity",
]
categories = [
    "C#",
]
archives = ["2022/02"]
+++

## 前言
由於畢業專題剛好有射擊功能，
而在瞄準動作上雖然有專屬的動作，
但當在不同角度時，
角色手臂和身體轉向並沒辦法跟著準心做改變，
而這個問題也卡了蠻久的，
剛好看到 Youtuber CodeMonkey 這位大大的教學，
因此，解決了我這個問題，
同時也順便學習 Animation Rigging 這個功能要怎麼使用，
對於這個功能本人目前還很陌生。

## 正文
步驟一：在 [Package Manager](https://i.imgur.com/MIaMUbY.png) 中下載 [Animation Rigging](https://i.imgur.com/11Bs9WI.png)

步驟二：在玩家身上添加 [Rig Builder](https://i.imgur.com/d3RkY1O.png) 跟 [Bone Renderer](https://i.imgur.com/NUePbQk.png) (Rig Builder：建置骨架，Bone Renderer 顯示骨架)

步驟三：在玩家底下添加一個空物件，此物件改名成 [AimRig](https://i.imgur.com/cGf1Zlz.png)，同時添加元件 [Rig](https://i.imgur.com/rvLggcL.png)

步驟四：在剛剛新增的 AimRig 物件底下，添加二個空物件，物件一為 [BodyAim](https://i.imgur.com/aRrTXLb.png)，物件二為 [Aim](https://i.imgur.com/tAQCNqc.png)，
而這兩個物件都要新增元件 [Multi-Aim Constraint](https://i.imgur.com/7FZVGgo.png)

步驟五：設定 BodyAim 跟 Aim 的 Multi-Aim Constraint 裡的 Constrained Object，這邊以 Aim 為[範例](https://i.imgur.com/pCUt8eE.png)，這個參數的功能是用來約束對象。

步驟六：這邊我們一樣是設定 Multi-Aim Constraint 裡的參數，這邊要設定的參數是 Axis，這邊是一個坑需要非常注意， Axis 看的是瞄準動作的[本地座標](https://i.imgur.com/pn1wYPX.png)，這邊非常的重要，請讀者在製作時務必弄懂。

步驟七：Multi-Aim Constraint 最後參數的設定，[Source Objects](https://i.imgur.com/bbr3grv.png) 這邊就是依照約束對象所要追隨的物件。

步驟八：為了讓 Animation Rigging 不要一開就影響玩家的動作，所以這邊我們需要寫個簡單的程式，不過這邊只會把關鍵的程式碼展示出來。

``` C#
using UnityEngine.Animations.Rigging;

public class ThirdPersonShooterController : MonoBehaviour
{
    [SerializeField] private Rig _aimRig;

    private float _aimRigWeight;

    private void Update()
    {
        if (/*觸發瞄準按鍵*/)
        {
            _aimRigWeight = 1;
        }
        else
        {
            _aimRigWeight = 0;
        }

        _aimRig.weight = Mathf.Lerp(_aimRig.weight, _aimRigWeight, Time.deltaTime * 100f);
}
```

## 結論
如果想知道更詳細的內容一樣可以點擊參考連結，影片中還有講到 Two Bone Ik Constraint，這邊的添加是為了讓左手動作更加自然，
如果瞄準本身的動作足夠自然的話，那這樣就不需要在製作此步驟，這就依自己的專案而定，但如果想練習的話，那還請務必實作一遍。

### 參考來源
- https://youtu.be/luBBz5oeR4Q