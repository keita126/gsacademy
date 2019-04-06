//潜在的なバグ減らす
'use strict';

//即時関数でスコープを閉じながら関数内の処理を即時実行
(() => {
        
    const HAND_FORMS = [
        0, // パー
        1, // グー
        2  // チョキ
    ];
    const HAND_X = [
        0,   // グー
        380, // チョキ
        750  // パー
    ];
    const HAND_WIDTH = [
        360, // グー
        340, // チョキ
        430  // パー
    ];
    const IMAGE_PATH = 'https://camo.qiitausercontent.com/df7875dfd7fe2ba34c0e7c8e43be0022fb400dd7/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3238393234382f39366266313362322d396539322d393964332d616661322d3637633737613339343834342e706e67';
    //1秒間10コマのアニメーション
    const FPS = 10;
    //loop関数内で呼び出しているdraw関数の実行をするかしないかを切り分けているフラグ
    //onclick関数　押下時にtrue
    let isPause = false;
    //%を使用  計算結果の余りによって結果が決まる
    let currentFrame = 0;
    
    //アニメーション
    function main() {
        const canvas = document.getElementById('screen');
        const context = canvas.getContext('2d');
        const imageObj = new Image();
        currentFrame = 0;
        //loop関数の無限ループ
        imageObj.onload = function () {
            function loop() {
                if (!isPause) draw(canvas, context, imageObj, currentFrame++);
                //FPSの値によってloop関数実行時間間隔が変わる 1000/10 
                setTimeout(loop, 1000 / FPS);
            }
            loop();
        };
        imageObj.src = IMAGE_PATH;
    }

    function draw(canvas, context, imageObject, frame) {
    //canvasをクリアする（画像を残さない）
        context.clearRect(0, 0, canvas.width, canvas.height);
        const handIndex = frame % HAND_FORMS.length;
        const sx = HAND_X[handIndex];
        const swidth = HAND_WIDTH[handIndex];
        context.drawImage(
            imageObject,
            sx,
            0,
            swidth,
            imageObject.height,
            0,
            0,
            swidth,
            canvas.height
        );
    }

    //ボタンクリック時の処理をまとめて行う関数
    function setButtonAction() {
        //クリック時に呼ばれる            
        function onClick(event) {
            const myHandType = parseInt(event.target.value, 10);
            const enemyHandType = parseInt(currentFrame % HAND_FORMS.length, 10);
            //trueでloop関数内で呼び出す draw関数が実行されなくなる
            isPause = true;
            judge(myHandType, enemyHandType);
        }
        
        document.getElementById('rock').addEventListener('click', onClick);
        document.getElementById('scissors').addEventListener('click', onClick);
        document.getElementById('paper').addEventListener('click', onClick);
        document.getElementById('restart').addEventListener('click', function () {
            window.location.reload();
        });
    }

    function judge(myHandType, enemyHandType) {
        const result = (myHandType - Math.abs(enemyHandType) + 3) % HAND_FORMS.length;
        if (result === 0) {
            alert('引き分けです!');
        } else if (result === 1) {
            alert('あなたの負けです!');
        } else {
            alert('あなたの勝ちです!');
        }
    }
    //ボタンクリック時の処理の定義を行ってから、アニメーションを開始する  
    setButtonAction();
    main();
})();

