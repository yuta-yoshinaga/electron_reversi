var reversiPlay = new ReversiPlay();
$(document).ready(function () {
    // *** マスを用意 *** //
    appInit();
    reversiPlay.reset();
    // *** クリックイベント *** //
    $('.reversi_field .square-wrapper').on('click', function () {
        var curX = $(this).data('x');
        var curY = $(this).data('y');
        console.log('x = ' + curX + ',y = ' + curY);
        reversiPlay.reversiPlay(curY,curX);
    });
    $('.reversi_field .reset').on('click', function () {
        reversiPlay.reset();
    });
    $('.reversi_field .setting').on('click', function () {
    });
});

$(window).load(function () {
});

function appInit() {
    for (var i = 0; i < 8; i++) {
        var row = $('<div class="row"><\/div>');
        row.addClass('pos_row' + String(i));
        $('.reversi_field').append(row);
        for (var j = 0; j < 8; j++) {
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
    $('.reversi_field').append('<div class="col-xs-3"><button type="button" class="btn btn-primary btn-lg reset">リセット<\/button><\/div>');
    $('.reversi_field').append('<div class="col-xs-3"><button type="button" class="btn btn-info btn-lg setting">設定<\/button><\/div>');
    $('.reversi_field').append('<div class="col-xs-3">&nbsp;<\/div>');
    $('.reversi_field').append('<div class="clearfix"><\/div>');
    drawAll();
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
