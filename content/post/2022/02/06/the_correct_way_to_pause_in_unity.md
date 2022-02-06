+++
author = "Hugo Authors"
title = "在 Unity 中正確的暫停方法"
date = "2022-02-06"
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
在初期大家一開始在學習 Unity 的暫停功能時，
相信大家最常用的就是 Time.timeScale，
而這個方法是藉由改變時間來達到此效果，
同時在小專案上也能快速實現，
但這個做法會有一些問題，
像是介面的動畫效果、場景加載、音效觸發等問題，
當然，用 Time.timeScale 也並非不能解決以上講的問題，
但當專案大時為了讓程式碼更乾淨，
同時能更好控管遊戲裡物件的狀態，
所以接下來要講的方法是，
藉由一個管理器來處理遊戲內暫停的功能，
而裡面有用到的知識有列舉、委派、事件，
以及最重要的單例模式。

## 程式碼
### GameState
```C#
public enum GameState
{
    Gameplay,
    Pause
}
```

### GameStateManager
```C#
public class GameStateManager
{
    private static GameStateManager _instance;

    public static GameStateManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new GameStateManager();
            }

            return _instance;
        }
    }

    public GameState CurrentGameState { get; private set; }

    public delegate void GameStateChangeHandler(GameState newGameState);

    public event GameStateChangeHandler OnGameStateChanged;

    private GameStateManager()
    {
    }

    public void SetState(GameState newGameState)
    {
        if (newGameState == CurrentGameState)
        {
            return;
        }

        CurrentGameState = newGameState;
        OnGameStateChanged?.Invoke(newGameState);
    }
}
```

### PauseController
```C#
public class PauseController : MonoBehaviour
{
    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            GameState currentGameState = GameStateManager.Instance.CurrentGameState;
            GameState newGameState = currentGameState == GameState.Gameplay
                ? GameState.Pause
                : GameState.Gameplay;

            GameStateManager.Instance.SetState(newGameState);
        }
    }
}
```

### PlayerMove
```C#
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    [SerializeField] private float _speed;

    private Rigidbody2D _rigidbody2D;

    private void Start()
    {
        _rigidbody2D = GetComponent<Rigidbody2D>();

        GameStateManager.Instance.OnGameStateChanged += OnGameStateChanged;
    }

    private void OnDestroy()
    {
        GameStateManager.Instance.OnGameStateChanged -= OnGameStateChanged;
    }

    private void Update()
    {
        Vector2 movement = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
        _rigidbody2D.velocity = movement * _speed * Time.deltaTime;
    }

    private void OnGameStateChanged(GameState newGameState)
    {
        enabled = newGameState == GameState.Gameplay;

        if (newGameState == GameState.Pause)
        {
            _rigidbody2D.velocity = Vector2.zero;
        }
    }
}
```

## 結論
如果今天是開發中大型專案，
建議使用此方式，
假如是講求速度和功能的呈現，
那用原本的 Time.TimeScale 會比較有效率，
以上個人的小小見解和學習紀錄。


### 參考來源
 - https://youtu.be/KPaEnLpu57s