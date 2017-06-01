var reversi = new Reversi(8, 8);
var curColor = REVERSI_STS_BLACK;
$(document).ready(function () {
    // *** マスを用意 *** //
    appInit();
    console.log(reversi);
    // *** クリックイベント *** //
    $('.reversi_field .square-wrapper').on('click', function () {
        var curX = $(this).data('x');
        var curY = $(this).data('y');
        console.log('x = ' + curX + ',y = ' + curY);
        if (reversi.getMasuStsEna(curColor, curY, curX) != 0) {
            reversi.setMasuSts(curColor, curY, curX);
            draw();
            if (curColor == REVERSI_STS_BLACK) {
                if (reversi.getColorEna(REVERSI_STS_WHITE) == 0){
                    curColor = REVERSI_STS_WHITE;
                }
            } else if (curColor == REVERSI_STS_WHITE) {
                if (reversi.getColorEna(REVERSI_STS_BLACK) == 0){
                    curColor = REVERSI_STS_BLACK;
                }
            }
        }
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
    draw();
}

function draw() {
    $('.reversi_field .square-wrapper').each(function (index, element) {
        var curX = $(this).data('x');
        var curY = $(this).data('y');
        var sts = reversi.getMasuSts(curY, curX);
        var tgtEle = $(this).find('.content');
        if (sts == REVERSI_STS_NONE) {
            tgtEle.removeClass('stone_white');
            tgtEle.removeClass('stone_black');
        } else if (sts == REVERSI_STS_BLACK) {
            tgtEle.removeClass('stone_white');
            tgtEle.addClass('stone_black');
        } else if (sts == REVERSI_STS_WHITE) {
            tgtEle.addClass('stone_white');
            tgtEle.removeClass('stone_black');
        }
    });
}