
 
重点强化：
✅ 夜间必须先测试
✅ 光线不足百分百失效
✅ 明确化妆灯/柔光补光灯使用位置（面部正前/头顶前方）
✅ 强调摄像头硬件局限，不误导用户

FatigueDetector
 
一款基于手机前置摄像头的驾驶员疲劳与姿态监测APP，支持闭眼、低头、离脸离区检测，实时铃声报警，免费开源、离线可用。
 
 
 
目录 / Table of Contents
 
- 为什么开发本软件 / Project Origin
- 核心功能 / Core Features
- 夜间使用重点说明（必看）/ Night Usage Instructions
- 通用使用须知与安全准则 / General Safety Rules
- 免责声明 / Disclaimer
- 安装使用教程 / Installation Guide
- 项目开发历程 / Development Journey
 
 
 
💡 为什么开发本软件 / Project Origin
 
中文
 
我是一名常年跑长途的驾驶员，深知春运长途驾驶的煎熬与危险。
 
日常1200公里路程，正常只需12–14小时即可抵达，但每逢春节返乡高峰期，堵车严重，路程往往需要 20小时以上。春运期间高速服务区爆满，经常无法进入、无法停车休息，只能硬着头皮继续赶路。
 
尤其到了下半夜，人体极度疲惫，困意难以抵挡，多次出现半睡半醒、无意识开车的状态，时常猛然惊醒。现在回想十分后怕，万幸从未发生事故。
 
正因为亲身经历过这种极度危险的疲劳驾驶状态，我深知长途司机的无奈。市面专业车载预警设备价格昂贵，而手机人人都有。因此我零基础攻坚15天，免费开发、开源分享这款疲劳驾驶检测工具，希望能成为长途驾驶员的一道安全辅助护身符。
 
English
 
I am a long-distance driver. I deeply understand the suffering and danger of highway driving during the Chinese New Year travel rush.
 
A 1200km trip normally takes 12–14 hours, but during the Spring Festival traffic jam, it often takes more than 20 hours. Highway service areas are extremely crowded, and drivers often cannot stop to rest.
 
In the late midnight hours, extreme fatigue is unavoidable. I have experienced drowsy and half-asleep driving many times and woke up suddenly in fear. Fortunately, no accidents happened.
 
Based on my real dangerous driving experience, I developed this completely free and open-source fatigue detection app. It aims to provide every long-distance driver with a simple and practical safety auxiliary tool.
 
 
 
✨ 核心功能 / Core Features
 
中文
 
- 实时人脸监测：识别驾驶员低头、长时间闭眼、打瞌睡状态
- 离区检测：驾驶员离开镜头、脱离驾驶位置立即报警
- 本地离线运行：无需联网，保护个人隐私
- 双版本可选：纯中文版、中/英/日/韩四国多语言版
- 内置专属报警铃声，提醒及时、响应迅速
 
English
 
- Real-time face monitoring: detect head lowering, long-time eye closing and drowsiness
- Out-of-zone detection: alarm immediately when the driver leaves the monitoring area
- Fully offline operation, no network required, privacy-safe
- Two versions: pure Chinese version / multi-language version (CN/EN/JP/KR)
- Built-in alarm ringtone for instant reminder
 
 
 
🌙 夜间使用重点说明（必看）/ Night Usage Instructions
 
中文
 
本软件夜间检测极度依赖光线条件，光线不足直接失效！
 
1. 夜间光线昏暗，手机前置摄像头感光能力有限，无法正常捕捉面部特征，会导致检测失灵、不报警。
2. 夜间使用必须提前测试！ 上车开灯后，先打开软件静置测试1–2分钟，确认闭眼、低头可以正常触发报警，再上路使用。
3. 临时应急可打开化妆补光灯辅助照明。
4. 推荐固定搭配柔光小补光灯：放置在驾驶员面部正前方、头顶前方位置，光线柔和不刺眼、不影响开车视线，且能保证面部光线均匀，让摄像头稳定识别人脸。
5. 无充足光源、测试异常的情况下，禁止依赖本软件，直接放弃使用。
 
English
 
This app heavily depends on ambient light. It will fail completely in dark environments!
 
1. The front camera of mobile phones has limited low-light sensing ability. It cannot capture facial features clearly at night, resulting in detection failure.
2. Always test before night driving! Test for 1–2 minutes after turning on lights to confirm the alarm works normally.
3. You can use a makeup fill light for temporary lighting assistance.
4. A soft fill light placed in front of your face or above your head is strongly recommended. It provides uniform soft light without dazzling vision.
5. Do not use this app if the light is insufficient or the test fails.
 
 
 
⚠️ 通用使用须知与安全准则 / General Safety Rules
 
中文
 
1. 驾驶以人为本，工具仅为辅助，绝对不要过度依赖本软件。
2. 坚决杜绝疲劳驾驶，遵守国家交通法律法规。能停车休息务必停车休息。
3. 软件存在硬件局限：受手机性能、摄像头素质、逆光、暗光、遮挡等因素影响，存在漏检、不报警概率。
4. 本软件仅为个人公益辅助工具，不能替代人的安全判断，不能替代正规休息。
5. 行车过程务必专注路况，禁止因查看软件分心驾驶。
 
English
 
1. Driver safety comes first. This app is only an auxiliary tool, not a safety guarantee.
2. Never drive when you feel tired. Strictly abide by all traffic laws and regulations. Stop and rest whenever possible.
3. Detection may fail due to phone performance, camera quality, backlight, darkness or face occlusion.
4. This is a free public welfare auxiliary tool. It cannot replace human judgment or physical rest.
5. Always focus on road conditions while driving.
 
 
 
📜 免责声明 / Disclaimer
 
中文
 
1. 本软件为完全免费、开源的个人公益项目，仅用于个人学习，无任何商业用途。
2. 开发者不保证检测百分百准确，不承担任何因软件失效、漏报、误报、检测异常所导致的一切交通事故、财产损失、人身安全责任。
3. 所有使用风险全部由用户自行承担。
4. 任何情况下，用户必须以交通法规、自身安全判断为第一准则，不得以本软件为安全依据。
5. 严禁疲劳驾驶，本软件绝不作为规避安全驾驶责任的工具。
 
English
 
1. This is a free, open-source, non-commercial public welfare project for  learning only.
2. The developer does not guarantee 100% accuracy of detection. The developer assumes no liability for any traffic accidents, property loss or personal injury caused by detection failure, missing alarms or abnormal recognition.
3. All usage risks are borne entirely by the user.
4. Traffic laws and personal safety judgment always prevail over this software.
5. This tool shall never be used as a reason for fatigue driving.
 
 
 
📥 安装使用教程 / Installation Guide
 
中文
https://github.com/aiguimi/FatigueDetector/releases/tag/v5.0
 
1. 前往本仓库 Releases 下载对应APK
- 纯中文版：适合国内用户
- 多语言版：支持中、英、日、韩四国语言
2. 安装时开启「未知来源应用安装」权限
3. 首次运行允许摄像头权限
4. 白天可直接正常使用
5. 夜间必须补光 + 提前测试，确认功能正常再使用
 
English
https://github.com/aiguimi/FatigueDetector/releases/tag/v5.0
 
1. Download APK from Releases
2. Allow installation from unknown sources
3. Grant camera permission at first launch
4. Works stably in bright daylight
5. Light supplement and pre-test are mandatory for night use
 
⚠️ Known Issues & Notes / ⚠️ 已知问题与注意事项
 
1. Camera Black Screen After System Language Change / 系统语言切换后摄像头无画面
 
- 现象 / Symptom:
After changing your device's system language, the camera feed may appear black and fail to initialize.
切换设备系统语言后，摄像头画面可能出现黑屏，无法正常工作。

- 原因 / Cause:
The camera permission and device context are bound to the system language at the first installation. Changing the language afterward may cause the app to fail to match the camera resource.
应用首次安装时，摄像头权限与设备上下文会和当前系统语言绑定；切换语言后，可能导致应用无法匹配到已授权的摄像头资源。

- 临时解决方法 / Workaround:

1. Go to your phone's Settings → Apps → [Your App Name] → Storage.
进入手机 设置 → 应用 → [你的应用名称] → 存储。

2. Tap Clear Data (and optionally Clear Cache).
点击 清除数据（可同时清除缓存）。

3. Reopen the app. It will re-request camera permissions, and the camera should work normally.
重新打开应用，会重新请求摄像头权限，摄像头即可恢复正常。

- 说明 / Note:
This issue only affects users who frequently switch system languages. Regular users using a single language will not encounter this problem.
该问题仅在频繁切换系统语言的场景下触发，长期使用同一语言的普通用户不会遇到此问题。

- 后续计划 / Future Plan:
This will be fixed in a future update by changing the camera initialization logic to use the device's unique ID instead of localized names.
后续版本将通过修改摄像头调用逻辑（改用设备唯一ID而非本地化名称）彻底解决此问题。
 
 
🧑‍💻 项目开发历程 / Development Journey
 
中文
 
本人为零基础AI工具自学开发者，无专业编程基础，本项目完全依靠各大AI模型交叉验证、反复排错迭代完成。
 
- 主力开发：Trae Solo（DeepSeek V4 Pro）
- 辅助调试：豆包、通义千问、ChatGPT
- 迭代统计：DeepSeek 请求约1500次、豆包约500–600次、通义千问约20–30次、ChatGPT约7–8次
- 开发周期：历时15天，连续熬夜10天，日均睡眠仅5小时
 
纯粹因为自身长途驾驶的真实惊险经历，坚持免费开源做出这款工具，希望能帮助更多长途驾驶员规避风险。
 
English
 
I am a zero-beginner self-taught developer relying entirely on AI tools.
 
This project was completed through continuous debugging and cross-verification with multiple AI models:
 
- Main development: Trae Solo + DeepSeek V4 Pro
- Assistance & error fixing: Doubao, Tongyi Qianwen, ChatGPT
- Total iteration: 1500+ DeepSeek calls, 500+ Doubao calls
- Development period: 15 days of intensive work, 10 late nights, only 5 hours sleep per day
 
This open-source free tool is built from real dangerous driving experiences, hoping to bring safety assistance to all long-distance drivers.
 
 
 
⭐ 如果这个项目帮到了你，欢迎点亮Star，支持开发者持续优化公益项目
⭐ Star if this project helps you, your support is greatly appreciated!

