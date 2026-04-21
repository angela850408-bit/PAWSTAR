Pawstar 專案：Header 組件開發變更日誌

1. 響應式佈局調整 (Responsive Design)
   需求：在手機版（小螢幕）隱藏「應援支持」按鈕以保持介面簡潔。
   修改內容：
   在導覽列中的「應援支持」<li> 標籤加上 Bootstrap 類別 d-none d-lg-block。
   結果：該按鈕現在僅在桌面版（螢幕寬度 ≥ 992px）顯示，手機版會自動收合。
2. 選單交互優化 (Offcanvas UX)
   需求：開啟導覽選單時，背景不應有黑色遮罩，且頁面必須能夠繼續捲動。
   修改內容：
   在 offcanvas 元件加上 data-bs-scroll="true"（允許背景捲動）。
   加上 data-bs-backdrop="false"（移除半透明黑色遮罩）。
   結果：選單開啟後呈現透明/半透明狀態，且使用者可以自由滑動後方網頁內容。
3. 解決導覽與關閉衝突 (Navigation & Auto-close Fix)
   問題：原先在 router-link 使用 data-bs-dismiss="offcanvas" 會導致點擊事件被 Bootstrap 攔截，造成無法正常換頁。
   解決方案：
   移除 HTML 標籤上的 data-bs-dismiss 屬性，交由 Vue 邏輯處理。
   引入 useRoute 並設定一個 watch 監聽 route.fullPath。
   邏輯：當偵測到路由路徑改變（代表跳轉成功）時，透過程式碼 document.querySelector("#offcanvasTop .btn-close")?.click() 手動觸發關閉動作。
   結果：修正了點擊選單連結不跳頁的問題，同時確保跳頁後選單會自動收回。
4. 樣式與視覺調整 (Styling)
   Header 定位：設定 position: fixed 並給予 z-index: 1000，確保 Header 始終固定在最上方。
   選單美化：
   為 Offcanvas 加入自定義類別 .dropdown-menu-custom。
   設定自定義背景圖片 drop-img-bg.png。
   調整選單寬度（桌面版固定為 565px）。
   細節優化：
   使用 CSS filter: invert(1) 將關閉按鈕（X）轉為白色，以適應深色背景。
   調整選單內連結的間距與底線樣式（border-bottom）。

  <!-- ===原本寫的banner=== -->
  <div id="Banner" v-if="false">
    <div class="container index-container">
      <!-- <h1>首頁</h1> -->
      <h1 ref="titleRef">本<span class="h1-span">月</span>人氣王</h1>
      <h2 class="second-title">
        浪浪練習生 出道爭霸戰<br />
        不必領養也能寵<br />
        你的一票，<br />
        讓你的本命浪浪站上人氣 C 位!
      </h2>
      <div class="votes-area">
        <h2>得票數</h2>
        <!-- <h2 class="vote-number">1,547,845</h2> -->
        <h2 ref="voteRef" class="vote-number odometer">0</h2>
      </div>
      <!-- 狗狗圖片 -->
      <div class="png-shine-container">
        <img
          src="/public/images/dog_banner1.png"
          alt=""
          class="dog-banner-img"
        />
        <div class="shine-layer"></div>
      </div>
      <!-- 名次&&名稱 -->
      <div ref="DogRef" class="dog-name-area">
        <h2 class="ranking">#TOP <span>01</span></h2>
        <h2 class="dog-name">花花</h2>
        <router-link to="/rank">
          <Button1 class="go-rank-btn"
            >前往投票<i class="fa-solid fa-arrow-right"></i></Button1
        ></router-link>
      </div>
    </div>
  </div>
  <!-- <span>總金額：${{ dog.totalAmount.toLocaleString() }}</span> -->
  <!-- ===隱藏end=== -->

#Banner 改用 display: grid:

移除固定的 height: 100vh 改為 min-height: 100vh。這確保了在內容較少時維持全螢幕，內容較多時（如小螢幕或高解析度縮放）能自動向下延伸。
grid-template-columns: 1fr 定義了一個單欄網格。
.index-container 改用 grid-area: 1 / 1:

這行指令讓所有的 Banner 容器都擠在同一個網格位置（第一列第一欄），實現了類似 absolute 的重疊效果。
將 position 從 absolute 改為 relative。在 Grid 內使用 relative 可以讓內容參與高度計算。
對 GSAP 的影響：這不會破壞你的 GSAP 動畫。GSAP 的 xPercent 是操作 transform 屬性，不論是 absolute 還是 relative 都能正常運作。而且因為有 z-index 的切換，層級邏輯依然有效。
移除響應式中的「手動修復」:

原本在 991px 以下手動將第一個容器設為 relative 的 hack 已經不再需要，因為現在所有容器都已經在 Grid 的自動佈局管理之下。
這樣修改後，當你的 h1 或其他內容因為螢幕寬度不足而換行導致高度增加時，#Banner 會自動變高，不會再出現內容被截斷的問題。

=================================================
部屬vercel.json 自動跳回原本頁面的問題 0410解決
當 Google 登入完畢，它會帶一個很長的路徑回到你的網站（例如 https://.../auth/callback#access_token=...）。

沒有 vercel.json： Vercel 會去找伺服器上有沒有一個資料夾叫 auth，找不到就噴出你看到的那個 404 NOT_FOUND。

有了 vercel.json： Vercel 會把所有請求通通導向 index.html，這時候你的 Vue Router 才能醒過來並解析網址裡的登入資訊。

======================
回復版本
D:\桌面\Pawstar>git push origin dev --force
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/lester89217/Pawstar.git

- f014f73...4f321d4 dev -> dev (forced update)

=====================
0412 回復版本
git fetch origin
git checkout dev
git reset --hard origin/dev

從你最新的 git log 截圖可以看到，現在的情況有點尷尬：

你的 HEAD -> dev 停留在 2ad5948。

但遠端分支 origin/vv 已經跑到最前面的 11258dc 了。

中間還夾了一個 origin/lester 在 a6c58a4。

如果你想讓你的 dev 變成真正的最新狀態（也就是跟 vivi 的 11258dc 同步），請依序輸入以下指令：

步驟 1：強制同步到最領先的分支
因為你的隊友可能把最新進度推到了 vv 分支，而遠端的 dev 還留在舊位子。我們先讓你的本地 dev 直接吃掉 origin/vv 的進度：

Bash
git reset --hard origin/vv

步驟 2：更新遠端的 dev 分支 (如果需要)
如果你有權限，且希望遠端的 dev 也跟上 vivi 的進度，你可以執行強制推送（因為你現在手上才是最新的）：

Bash
git push origin dev --force

執行步驟

1. 先把你的修改存成一個 Commit
   從截圖看，你有 Uncommitted Changes（未提交的修改）。要推送到雲端，必須先存起來：

Bash
git add .
git commit -m "feat: 以此版本為準重設遠端進度" 2. 強制推送到雲端
使用 --force (或 -f) 指令，這會告訴 GitHub：「不用管之前的衝突，直接把我的版本蓋上去」。

Bash
git push origin dev -f
