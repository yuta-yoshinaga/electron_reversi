var reversiPlay = new ReversiPlay();
var reversiSetting = new ReversiSetting();
var storage = localStorage;
$(document).ready(function () {
    //storage.clear();
    var lReversiSetting = storage.getItem('appSetting');
    if(lReversiSetting != null) reversiSetting = JSON.parse(lReversiSetting);
    else                        storage.setItem('appSetting',JSON.stringify(reversiSetting));
    // *** 設定値をメニューに反映 *** //
    var ele;
    ele = $('#mMode input[value="' + Number(reversiSetting.mMode) + '"]').parent().addClass('active');
    ele = $('#mType input[value="' + Number(reversiSetting.mType) + '"]').parent().addClass('active');
    ele = $('#mPlayer input[value="' + Number(reversiSetting.mPlayer) + '"]').parent().addClass('active');
    ele = $('#mAssist input[value="' + Number(reversiSetting.mAssist) + '"]').parent().addClass('active');
    ele = $('#mGameSpd input[value="' + Number(reversiSetting.mGameSpd) + '"]').parent().addClass('active');
    ele = $('#mEndAnim input[value="' + Number(reversiSetting.mEndAnim) + '"]').parent().addClass('active');
    ele = $('#mMasuCntMenu input[value="' + Number(reversiSetting.mMasuCntMenu) + '"]').parent().addClass('active');
    ele = $('#mTheme input[value="' + reversiSetting.mTheme + '"]').parent().addClass('active');
    var oldTheme = reversiSetting.mTheme;
    $('head link[href=".\/css\/theme\/' + oldTheme + '\/bootstrap.min.css"]').remove();
    var addEle = '<link href=".\/css\/theme\/' + reversiSetting.mTheme + '\/bootstrap.min.css" rel="stylesheet" media="screen">';
    $('head').append(addEle);
    // *** マスを用意 *** //
    appInit();
    reversiPlay.setSetting(reversiSetting);
    reversiPlay.reset();
    // *** クリックイベント *** //
    $('.reversi_field').on('click', '.square-wrapper', function () {
        var curX = $(this).data('x');
        var curY = $(this).data('y');
        console.log('x = ' + curX + ',y = ' + curY);
        reversiPlay.reversiPlay(curY,curX);
    });
    $('.reversi_field').on('click', '.reset', function () {
        reversiPlay.reset();
    });
    $('#appMenuModal').on('click', '.btn-primary', function () {
        reversiSetting.mMode = $("#mMode .active input").val();
        reversiSetting.mType = $("#mType .active input").val();
        reversiSetting.mPlayer = $("#mPlayer .active input").val();
        reversiSetting.mAssist = $("#mAssist .active input").val();
        reversiSetting.mGameSpd = $("#mGameSpd .active input").val();
        if(reversiSetting.mGameSpd == DEF_GAME_SPD_FAST){
            reversiSetting.mPlayCpuInterVal = DEF_GAME_SPD_FAST_VAL2;
            reversiSetting.mPlayDrawInterVal = DEF_GAME_SPD_FAST_VAL;
        }else if(reversiSetting.mGameSpd == DEF_GAME_SPD_MID){
            reversiSetting.mPlayCpuInterVal = DEF_GAME_SPD_MID_VAL2;
            reversiSetting.mPlayDrawInterVal = DEF_GAME_SPD_MID_VAL;
        }else if(reversiSetting.mGameSpd == DEF_GAME_SPD_SLOW){
            reversiSetting.mPlayCpuInterVal = DEF_GAME_SPD_SLOW_VAL2;
            reversiSetting.mPlayDrawInterVal = DEF_GAME_SPD_SLOW_VAL;
        }
        reversiSetting.mEndAnim = $("#mEndAnim .active input").val();
        reversiSetting.mMasuCntMenu = $("#mMasuCntMenu .active input").val();
        if(reversiSetting.mMasuCntMenu == DEF_MASU_CNT_6){
            reversiSetting.mMasuCnt = DEF_MASU_CNT_6_VAL;
        }else if(reversiSetting.mMasuCntMenu == DEF_MASU_CNT_8){
            reversiSetting.mMasuCnt = DEF_MASU_CNT_8_VAL;
        }else if(reversiSetting.mMasuCntMenu == DEF_MASU_CNT_10){
            reversiSetting.mMasuCnt = DEF_MASU_CNT_10_VAL;
        }else if(reversiSetting.mMasuCntMenu == DEF_MASU_CNT_12){
            reversiSetting.mMasuCnt = DEF_MASU_CNT_12_VAL;
        }else if(reversiSetting.mMasuCntMenu == DEF_MASU_CNT_14){
            reversiSetting.mMasuCnt = DEF_MASU_CNT_14_VAL;
        }else if(reversiSetting.mMasuCntMenu == DEF_MASU_CNT_16){
            reversiSetting.mMasuCnt = DEF_MASU_CNT_16_VAL;
        }

        var oldTheme = reversiSetting.mTheme;
        reversiSetting.mTheme = $("#mTheme .active input").val();
        $('head link[href=".\/css\/theme\/' + oldTheme + '\/bootstrap.min.css"]').remove();
        var addEle = '<link href=".\/css\/theme\/' + reversiSetting.mTheme + '\/bootstrap.min.css" rel="stylesheet" media="screen">';
        $('head').append(addEle);
        
        storage.setItem('appSetting',JSON.stringify(reversiSetting));       
        appInit();
        reversiPlay.setSetting(reversiSetting);
        reversiPlay.reset();
        console.log(reversiSetting);      
    });
    // *** ダイアログクローズイベント *** //
    $('#appMenuModal').on('hidden.bs.modal', function () {
        console.log("appMenuModal close");
	});

    var rs_timer = false;
    $(window).resize(function() {
        if (rs_timer !== false) {
            clearTimeout(rs_timer);
        }
        rs_timer = setTimeout(function() {
            // *** 画面リサイズ処理 *** //
            set_masu_size_squer();
        }, 200);
    });
});

$(window).load(function () {
    set_masu_size_squer();
});

function set_masu_size_squer() {
    var devHeight = $(window).height();
    var devWidth = $(window).width();
    var devOffset = 100;
    var masuSize;
    var viewSize;
    console.log('height : ' + devHeight + 'px');
    console.log('width : ' + devWidth + 'px');
    if(devHeight < devWidth){
        // *** 縦幅の方が狭い *** //
        viewSize = (devHeight - devOffset);
    }else{
        // *** 横幅の方が狭い *** //
        viewSize = (devWidth - devOffset);
    }
    masuSize = (viewSize / reversiSetting.mMasuCnt);
    $('.reversi_field').width((Math.ceil(masuSize * reversiSetting.mMasuCnt) + 1) + 'px');
    $('.reversi_field').height((Math.ceil(masuSize * reversiSetting.mMasuCnt) + 1) + 'px');
    $('.reversi_field .square-wrapper').each(function(){
        $(this).css('width', masuSize + 'px');
        $(this).css('height', masuSize + 'px');
    });
    $('.reversi_field .square-wrapper .content').each(function(){
        $(this).css('line-height', $(this).height() + 'px');
    });
}

function appInit() {
    $('.reversi_field').empty();
    for (var i = 0; i < reversiSetting.mMasuCnt; i++) {
        var row = $('<div class="my_row"><\/div>');
        row.addClass('pos_row' + String(i));
        $('.reversi_field').append(row);
        for (var j = 0; j < reversiSetting.mMasuCnt; j++) {
            var ele = $('<div class="square-wrapper"><div class="spacer"><div class="content"><\/div><\/div><\/div>');
            ele.addClass('pos_x' + String(j));
            ele.addClass('pos_y' + String(i));
            ele.attr('data-x', String(j));
            ele.attr('data-y', String(i));
            $('.pos_row' + String(i)).append(ele);
        }
    }
    $('.reversi_field').append('<div class="clearfix"><\/div>');
	// *** メッセージ領域配置 *** //
    $('.reversi_field').append('<div class="cur_col_msg"><\/div>');
    $('.reversi_field').append('<div class="cur_sts_msg"><\/div>');
	// *** ボタン配置 *** //
    $('.reversi_field').append('<div class="col-xs-3">&nbsp;<\/div>');
    $('.reversi_field').append('<div class="col-xs-3"><button type="button" class="btn btn-primary btn-sm reset">リセット<\/button><\/div>');
    $('.reversi_field').append('<div class="col-xs-3"><button type="button" class="btn btn-info btn-sm setting" data-toggle="modal" data-target="#appMenuModal">設定<\/button><\/div>');
    $('.reversi_field').append('<div class="col-xs-3">&nbsp;<\/div>');
    $('.reversi_field').append('<div class="clearfix"><\/div>');
    drawAll();
    set_masu_size_squer();   
}

function drawAll() {
    $('.reversi_field .square-wrapper').each(function (index, element) {
        var curX = $(this).data('x');
        var curY = $(this).data('y');
        drawSingle(curY, curX, REVERSI_STS_NONE, 0, '');
    });
}

function viewMsgDlg(title,msg) {
	alert(title + '\n' + msg);
}

function drawSingle(y, x, sts, bk, text) {
    var tgtEle = $('.reversi_field .square-wrapper[data-x="' + x + '"][data-y="' + y + '"]');
    var tgtEle2 = tgtEle.find('.content');
    // *** 石の状態変更 *** //
    if (sts == REVERSI_STS_NONE) {
        tgtEle2.removeClass('stone_white');
        tgtEle2.removeClass('stone_black');
    } else if (sts == REVERSI_STS_BLACK) {
        tgtEle2.removeClass('stone_white');
        tgtEle2.addClass('stone_black');
    } else if (sts == REVERSI_STS_WHITE) {
        tgtEle2.addClass('stone_white');
        tgtEle2.removeClass('stone_black');
    }
    // *** マスの状態変更 *** //
    if (bk == 1) {
        tgtEle.removeClass('cell_back_green');
        tgtEle.removeClass('cell_back_magenta');
        tgtEle.removeClass('cell_back_red');
        tgtEle.addClass('cell_back_blue');
    } else if (bk == 2) {
        tgtEle.removeClass('cell_back_green');
        tgtEle.removeClass('cell_back_magenta');
        tgtEle.addClass('cell_back_red');
        tgtEle.removeClass('cell_back_blue');
    } else if (bk == 3) {
        tgtEle.removeClass('cell_back_green');
        tgtEle.addClass('cell_back_magenta');
        tgtEle.removeClass('cell_back_red');
        tgtEle.removeClass('cell_back_blue');
    } else {
        tgtEle.addClass('cell_back_green');
        tgtEle.removeClass('cell_back_magenta');
        tgtEle.removeClass('cell_back_red');
        tgtEle.removeClass('cell_back_blue');
    }
    // *** テキストの状態変更 *** //
    tgtEle2.text(text);
}

function curColMsg(text) {
    $('.cur_col_msg').text(text);
}

function curStsMsg(text) {
    $('.cur_sts_msg').text(text);
}
// *** コールバック登録 *** //
reversiPlay.setViewMsgDlgFunc(viewMsgDlg);
reversiPlay.setDrawSingleFunc(drawSingle);
reversiPlay.setCurColMsgFunc(curColMsg);
reversiPlay.setCurStsMsgFunc(curStsMsg);
