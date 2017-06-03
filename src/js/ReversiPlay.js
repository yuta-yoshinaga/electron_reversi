////////////////////////////////////////////////////////////////////////////////
/**	@file			ReversiPlay.ts
 *	@brief			リバーシプレイクラス実装ファイル
 *	@author			Yuta Yoshinaga
 *	@date			2017.06.01
 *	$Version:		$
 *	$Revision:		$
 *
 * (c) 2017 Yuta Yoshinaga.
 *
 * - 本ソフトウェアの一部又は全てを無断で複写複製（コピー）することは、
 *   著作権侵害にあたりますので、これを禁止します。
 * - 本製品の使用に起因する侵害または特許権その他権利の侵害に関しては
 *   当方は一切その責任を負いません。
 */
////////////////////////////////////////////////////////////////////////////////
/// <reference path="Reversi.ts" />
var DEF_MODE_ONE = 0; //!< 一人対戦
var DEF_MODE_TWO = 1; //!< 二人対戦
var DEF_TYPE_EASY = 0; //!< CPU 弱い
var DEF_TYPE_NOR = 1; //!< CPU 普通
var DEF_TYPE_HARD = 2; //!< CPU 強い
var DEF_COLOR_BLACK = 0; //!< コマ色 黒
var DEF_COLOR_WHITE = 1; //!< コマ色 白
var DEF_ASSIST_OFF = 0; //!< アシスト OFF
var DEF_ASSIST_ON = 1; //!< アシスト ON
var DEF_GAME_SPD_FAST = 0; //!< ゲームスピード 早い
var DEF_GAME_SPD_MID = 1; //!< ゲームスピード 普通
var DEF_GAME_SPD_SLOW = 2; //!< ゲームスピード 遅い
var DEF_GAME_SPD_FAST_VAL = 0; //!< ゲームスピード 早い
var DEF_GAME_SPD_MID_VAL = 50; //!< ゲームスピード 普通
var DEF_GAME_SPD_SLOW_VAL = 100; //!< ゲームスピード 遅い
var DEF_GAME_SPD_FAST_VAL2 = 0; //!< ゲームスピード 早い
var DEF_GAME_SPD_MID_VAL2 = 500; //!< ゲームスピード 普通
var DEF_GAME_SPD_SLOW_VAL2 = 1000; //!< ゲームスピード 遅い
var DEF_END_ANIM_OFF = 0; //!< 終了アニメーション OFF
var DEF_END_ANIM_ON = 1; //!< 終了アニメーション ON
var DEF_MASU_CNT_6 = 0; //!< マス縦横6
var DEF_MASU_CNT_8 = 1; //!< マス縦横8
var DEF_MASU_CNT_10 = 2; //!< マス縦横10
var DEF_MASU_CNT_12 = 3; //!< マス縦横12
var DEF_MASU_CNT_14 = 4; //!< マス縦横14
var DEF_MASU_CNT_16 = 5; //!< マス縦横16
var DEF_MASU_CNT_6_VAL = 6; //!< マス縦横6
var DEF_MASU_CNT_8_VAL = 8; //!< マス縦横8
var DEF_MASU_CNT_10_VAL = 10; //!< マス縦横10
var DEF_MASU_CNT_12_VAL = 12; //!< マス縦横12
var DEF_MASU_CNT_14_VAL = 14; //!< マス縦横14
var DEF_MASU_CNT_16_VAL = 16; //!< マス縦横16
var DEF_MASU_CNT_MAX_VAL = DEF_MASU_CNT_16_VAL; //!< マス縦横最大
var LC_MSG_DRAW = 0; //!< マス描画
var LC_MSG_ERASE = 1; //!< マス消去
var LC_MSG_DRAW_INFO = 2; //!< マス情報描画
var LC_MSG_ERASE_INFO = 3; //!< マス情報消去
var LC_MSG_DRAW_ALL = 4; //!< 全マス描画
var LC_MSG_ERASE_ALL = 5; //!< 全マス消去
var LC_MSG_DRAW_INFO_ALL = 6; //!< 全マス情報描画
var LC_MSG_ERASE_INFO_ALL = 7; //!< 全マス情報消去
var LC_MSG_DRAW_END = 8; //!< 描画終わり
var LC_MSG_CUR_COL = 9; //!< 現在の色
var LC_MSG_CUR_COL_ERASE = 10; //!< 現在の色消去
var LC_MSG_CUR_STS = 11; //!< 現在のステータス
var LC_MSG_CUR_STS_ERASE = 12; //!< 現在のステータス消去
var LC_MSG_MSG_DLG = 13; //!< メッセージダイアログ
var LC_MSG_DRAW_ALL_RESET = 14; //!< 全マスビットマップインスタンスクリア
////////////////////////////////////////////////////////////////////////////////
/**	@class		ReversiPlay
 *	@brief		メインアクティビティクラス
 */
////////////////////////////////////////////////////////////////////////////////
var ReversiPlay = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			コンストラクタ
     *	@fn				public constructor()
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    function ReversiPlay() {
        this.mCurColor = 0; //!< 現在の色
        this.mMode = DEF_MODE_ONE; //!< 現在のモード
        this.mType = DEF_TYPE_HARD; //!< 現在のタイプ
        this.mPlayer = REVERSI_STS_BLACK; //!< プレイヤーの色
        this.mAssist = DEF_ASSIST_ON; //!< アシスト
        this.mGameSpd = DEF_GAME_SPD_MID; //!< ゲームスピード
        this.mEndAnim = DEF_END_ANIM_ON; //!< ゲーム終了アニメーション
        this.mMasuCntMenu = DEF_MASU_CNT_8; //!< マスの数
        this.mMasuCnt = DEF_MASU_CNT_8_VAL; //!< マスの数
        this.mPassEnaB = 0; //!< 黒のパス有効フラグ
        this.mPassEnaW = 0; //!< 白のパス有効フラグ
        this.mPlayCpuInterVal = DEF_GAME_SPD_MID_VAL2; //!< CPU対戦時のインターバル(msec)
        this.mPlayDrawInterVal = DEF_GAME_SPD_MID_VAL; //!< 描画のインターバル(msec)
        this.mEndDrawInterVal = 100; //!< 描画のインターバル(msec)
        this.mEndInterVal = 500; //!< 描画のインターバル(msec)
        this.mGameEndSts = 0; //!< ゲーム終了ステータス
        this.mPlayLock = 0; //!< プレイロック
        this.viewMsgDlgFunc = null; //!< メッセージコールバック
        this.drawSingleFunc = null; //!< 描画コールバック
        this.curColMsgFunc = null; //!< 現在の色メッセージコールバック
        this.curStsMsgFunc = null; //!< 現在のステータスメッセージコールバック
        this.mReversi = new Reversi(DEF_MASU_CNT_MAX_VAL, DEF_MASU_CNT_MAX_VAL);
        this.mCpu = new Array();
        this.mEdge = new Array();
        for (var i = 0; i < (DEF_MASU_CNT_MAX_VAL * DEF_MASU_CNT_MAX_VAL); i++) {
            this.mCpu[i] = new ReversiPoint();
            this.mEdge[i] = new ReversiPoint();
        }
        this.reset();
    }
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リバーシプレイ
     *	@fn				public reversiPlay(y : number, x : number) : void
     *	@param[in]		y : number			Y座標
     *	@param[in]		x : number			X座標
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.reversiPlay = function (y, x) {
        var update = 0;
        var cpuEna = 0;
        var tmpCol = this.mCurColor;
        var ret;
        var pass = 0;
        if (this.mReversi.getColorEna(this.mCurColor) == 0) {
            if (this.mReversi.setMasuSts(this.mCurColor, y, x) == 0) {
                if (this.mType == DEF_TYPE_HARD)
                    this.mReversi.AnalysisReversi(this.mPassEnaB, this.mPassEnaW);
                if (this.mAssist == DEF_ASSIST_ON) {
                    // *** メッセージ送信 *** //
                    this.execMessage(LC_MSG_ERASE_INFO_ALL, null);
                }
                this.sendDrawMsg(y, x); // 描画
                this.drawUpdate(DEF_ASSIST_OFF); // その他コマ描画
                if (this.mReversi.getGameEndSts() == 0) {
                    if (tmpCol == REVERSI_STS_BLACK)
                        tmpCol = REVERSI_STS_WHITE;
                    else
                        tmpCol = REVERSI_STS_BLACK;
                    if (this.mReversi.getColorEna(tmpCol) == 0) {
                        if (this.mMode == DEF_MODE_ONE) {
                            cpuEna = 1;
                        }
                        else {
                            this.mCurColor = tmpCol;
                            this.drawUpdate(this.mAssist); // 次のプレイヤーコマ描画
                        }
                    }
                    else {
                        // *** パスメッセージ *** //
                        this.reversiPlayPass(tmpCol);
                        pass = 1;
                    }
                }
                else {
                    // *** ゲーム終了メッセージ *** //
                    this.reversiPlayEnd();
                }
                update = 1;
            }
            else {
                // *** エラーメッセージ *** //
                this.viewMsgDlg('エラー', 'そのマスには置けません。');
            }
        }
        else {
            if (this.mReversi.getGameEndSts() == 0) {
                if (tmpCol == REVERSI_STS_BLACK)
                    tmpCol = REVERSI_STS_WHITE;
                else
                    tmpCol = REVERSI_STS_BLACK;
                if (this.mReversi.getColorEna(tmpCol) == 0) {
                    if (this.mMode == DEF_MODE_ONE) {
                        update = 1;
                        cpuEna = 1;
                    }
                    else {
                        this.mCurColor = tmpCol;
                    }
                }
                else {
                    // *** パスメッセージ *** //
                    this.reversiPlayPass(tmpCol);
                    pass = 1;
                }
            }
            else {
                // *** ゲーム終了メッセージ *** //
                this.reversiPlayEnd();
            }
        }
        if (pass == 1) {
            if (this.mMode == DEF_MODE_ONE) {
                if (this.mAssist == DEF_ASSIST_ON) {
                    // *** メッセージ送信 *** //
                    this.execMessage(LC_MSG_DRAW_INFO_ALL, null);
                }
            }
        }
        if (update == 1) {
            var waitTime = 0;
            if (cpuEna == 1) {
                waitTime = this.mPlayCpuInterVal;
            }
            var _this = this;
            setTimeout(function (cpuEna, tmpCol) {
                _this.reversiPlaySub(cpuEna, tmpCol);
            }, waitTime, cpuEna, tmpCol);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リバーシプレイサブ
     *	@fn				public reversiPlaySub(cpuEna: number, tmpCol: number): void
     *	@param[in]		cpuEna : number
     *	@param[in]		tmpCol : number
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.reversiPlaySub = function (cpuEna, tmpCol) {
        var ret;
        for (;;) {
            ret = this.reversiPlayCpu(tmpCol, cpuEna);
            cpuEna = 0;
            if (ret == 1) {
                if (this.mReversi.getGameEndSts() == 0) {
                    if (this.mReversi.getColorEna(this.mCurColor) != 0) {
                        // *** パスメッセージ *** //
                        this.reversiPlayPass(this.mCurColor);
                        cpuEna = 1;
                    }
                }
                else {
                    // *** ゲーム終了メッセージ *** //
                    this.reversiPlayEnd();
                }
            }
            if (cpuEna == 0)
                break;
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リバーシプレイ終了
     *	@fn				public reversiPlayEnd() : void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.reversiPlayEnd = function () {
        if (this.mGameEndSts == 0) {
            this.gameEndAnimExec(); // 終了アニメ実行
            // *** ゲーム終了メッセージ *** //
            var tmpMsg1, tmpMsg2, msgStr;
            var blk, whi;
            blk = this.mReversi.getBetCnt(REVERSI_STS_BLACK);
            whi = this.mReversi.getBetCnt(REVERSI_STS_WHITE);
            tmpMsg1 = '黒 = ' + String(blk) + ' 白 = ' + String(whi);
            if (this.mMode == DEF_MODE_ONE) {
                if (whi == blk)
                    tmpMsg2 = '引き分けです。';
                else if (whi < blk) {
                    if (this.mCurColor == REVERSI_STS_BLACK)
                        tmpMsg2 = 'あなたの勝ちです。';
                    else
                        tmpMsg2 = 'あなたの負けです。';
                }
                else {
                    if (this.mCurColor == REVERSI_STS_WHITE)
                        tmpMsg2 = 'あなたの勝ちです。';
                    else
                        tmpMsg2 = 'あなたの負けです。';
                }
            }
            else {
                if (whi == blk)
                    tmpMsg2 = '引き分けです。';
                else if (whi < blk)
                    tmpMsg2 = '黒の勝ちです。';
                else
                    tmpMsg2 = '白の勝ちです。';
            }
            msgStr = tmpMsg1 + tmpMsg2;
            this.viewMsgDlg('ゲーム終了', msgStr);
            if (this.mEndAnim == DEF_END_ANIM_ON) {
                // *** メッセージ送信 *** //
                this.execMessage(LC_MSG_CUR_COL, null);
                // *** メッセージ送信 *** //
                this.execMessage(LC_MSG_CUR_STS, null);
            }
            this.mGameEndSts = 1;
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リバーシプレイパス
     *	@fn				public reversiPlayPass(color : number) : void
     *	@param[in]		color : number		パス色
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.reversiPlayPass = function (color) {
        // *** パスメッセージ *** //
        if (this.mMode == DEF_MODE_ONE) {
            if (color == this.mCurColor)
                this.viewMsgDlg('', 'あなたはパスです。');
            else
                this.viewMsgDlg('', 'CPUはパスです。');
        }
        else {
            if (color == REVERSI_STS_BLACK)
                this.viewMsgDlg('', '黒はパスです。');
            else
                this.viewMsgDlg('', '白はパスです。');
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リバーシプレイコンピューター
     *	@fn				public reversiPlayCpu(color : number,cpuEna : number) : number
     *	@param[in]		color : number		CPU色
     *	@param[in]		cpuEna : number		CPU有効フラグ
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2014.06.26
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.reversiPlayCpu = function (color, cpuEna) {
        var update = 0;
        var setY;
        var setX;
        for (;;) {
            if (cpuEna == 1) {
                cpuEna = 0;
                // *** CPU対戦 *** //
                var pCnt = this.mReversi.getPointCnt(color);
                var pInfo = this.mReversi.getPoint(color, Math.floor(Math.random() * pCnt));
                if (pInfo != null) {
                    setY = pInfo.y;
                    setX = pInfo.x;
                    if (this.mType != DEF_TYPE_EASY) {
                        var cpuflg0, cpuflg1, cpuflg2, cpuflg3, mem, mem2, mem3, mem4, rcnt1, rcnt2, kadocnt, loop, pcnt, passCnt, othColor, othBet, ownBet, endZone;
                        cpuflg0 = 0;
                        cpuflg1 = 0;
                        cpuflg2 = 0;
                        cpuflg3 = 0;
                        mem = -1;
                        mem2 = -1;
                        mem3 = -1;
                        mem4 = -1;
                        rcnt1 = 0;
                        rcnt2 = 0;
                        kadocnt = 0;
                        loop = this.mMasuCnt * this.mMasuCnt;
                        pcnt = 0;
                        passCnt = 0;
                        if (color == REVERSI_STS_BLACK)
                            othColor = REVERSI_STS_WHITE;
                        else
                            othColor = REVERSI_STS_BLACK;
                        othBet = this.mReversi.getBetCnt(othColor); // 対戦相手のコマ数
                        ownBet = this.mReversi.getBetCnt(color); // 自分のコマ数
                        endZone = 0;
                        if ((loop - (othBet + ownBet)) <= 16)
                            endZone = 1; // ゲーム終盤フラグON
                        for (var i = 0; i < loop; i++) {
                            this.mCpu[i].x = 0;
                            this.mCpu[i].y = 0;
                            this.mEdge[i].x = 0;
                            this.mEdge[i].y = 0;
                        }
                        for (var i = 0; i < this.mMasuCnt; i++) {
                            for (var j = 0; j < this.mMasuCnt; j++) {
                                if (this.mReversi.getMasuStsEna(color, i, j) != 0) {
                                    // *** 角の一つ手前なら別のとこに格納 *** //
                                    if (this.mReversi.getEdgeSideOne(i, j) == 0) {
                                        this.mEdge[kadocnt].x = j;
                                        this.mEdge[kadocnt].y = i;
                                        kadocnt++;
                                    }
                                    else {
                                        this.mCpu[rcnt1].x = j;
                                        this.mCpu[rcnt1].y = i;
                                        rcnt1++;
                                    }
                                    if (this.mType == DEF_TYPE_NOR) {
                                        // *** 角に置けるなら優先的にとらせるため場所を記憶させる *** //
                                        if (this.mReversi.getEdgeSideZero(i, j) == 0) {
                                            cpuflg1 = 1;
                                            rcnt2 = (rcnt1 - 1);
                                        }
                                        // *** 角の二つ手前も優先的にとらせるため場所を記憶させる *** //
                                        if (cpuflg1 == 0) {
                                            if (this.mReversi.getEdgeSideTwo(i, j) == 0) {
                                                cpuflg2 = 1;
                                                rcnt2 = (rcnt1 - 1);
                                            }
                                        }
                                        // *** 角の三つ手前も優先的にとらせるため場所を記憶させる *** //
                                        if (cpuflg1 == 0 && cpuflg2 == 0) {
                                            if (this.mReversi.getEdgeSideThree(i, j) == 0) {
                                                cpuflg0 = 1;
                                                rcnt2 = (rcnt1 - 1);
                                            }
                                        }
                                    }
                                    // *** パーフェクトゲームなら *** //
                                    if (this.mReversi.getMasuStsCnt(color, i, j) == othBet) {
                                        setY = i;
                                        setX = j;
                                        pcnt = 1;
                                    }
                                    // *** 相手をパスさせるなら *** //
                                    if (pcnt == 0) {
                                        if (this.mReversi.getPassEna(color, i, j) != 0) {
                                            setY = i;
                                            setX = j;
                                            passCnt = 1;
                                        }
                                    }
                                }
                            }
                        }
                        if (pcnt == 0 && passCnt == 0) {
                            var badPoint = -1;
                            var goodPoint = -1;
                            var pointCnt = -1;
                            var ownPointCnt = -1;
                            var tmpAnz;
                            if (rcnt1 != 0) {
                                for (var i = 0; i < rcnt1; i++) {
                                    if (this.mType == DEF_TYPE_HARD) {
                                        tmpAnz = this.mReversi.getPointAnz(color, this.mCpu[i].y, this.mCpu[i].x);
                                        if (tmpAnz != null) {
                                            if (badPoint == -1) {
                                                badPoint = tmpAnz.badPoint;
                                                goodPoint = tmpAnz.goodPoint;
                                                pointCnt = tmpAnz.pointCnt;
                                                ownPointCnt = tmpAnz.ownPointCnt;
                                                mem2 = i;
                                                mem3 = i;
                                                mem4 = i;
                                            }
                                            else {
                                                if (tmpAnz.badPoint < badPoint) {
                                                    badPoint = tmpAnz.badPoint;
                                                    mem2 = i;
                                                }
                                                if (goodPoint < tmpAnz.goodPoint) {
                                                    goodPoint = tmpAnz.goodPoint;
                                                    mem3 = i;
                                                }
                                                if (tmpAnz.pointCnt < pointCnt) {
                                                    pointCnt = tmpAnz.pointCnt;
                                                    ownPointCnt = tmpAnz.ownPointCnt;
                                                    mem4 = i;
                                                }
                                                else if (tmpAnz.pointCnt == pointCnt) {
                                                    if (ownPointCnt < tmpAnz.ownPointCnt) {
                                                        ownPointCnt = tmpAnz.ownPointCnt;
                                                        mem4 = i;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (this.mReversi.getMasuStsEna(color, this.mCpu[i].y, this.mCpu[i].x) == 2) {
                                        mem = i;
                                    }
                                }
                                if (mem2 != -1) {
                                    if (endZone != 0) {
                                        if (mem3 != -1) {
                                            mem2 = mem3;
                                        }
                                    }
                                    else {
                                        if (mem4 != -1) {
                                            mem2 = mem4;
                                        }
                                    }
                                    mem = mem2;
                                }
                                if (mem == -1)
                                    mem = Math.floor(Math.random() * rcnt1);
                            }
                            else if (kadocnt != 0) {
                                for (var i = 0; i < kadocnt; i++) {
                                    if (this.mType == DEF_TYPE_HARD) {
                                        tmpAnz = this.mReversi.getPointAnz(color, this.mEdge[i].y, this.mEdge[i].x);
                                        if (tmpAnz != null) {
                                            if (badPoint == -1) {
                                                badPoint = tmpAnz.badPoint;
                                                goodPoint = tmpAnz.goodPoint;
                                                pointCnt = tmpAnz.pointCnt;
                                                ownPointCnt = tmpAnz.ownPointCnt;
                                                mem2 = i;
                                                mem3 = i;
                                                mem4 = i;
                                            }
                                            else {
                                                if (tmpAnz.badPoint < badPoint) {
                                                    badPoint = tmpAnz.badPoint;
                                                    mem2 = i;
                                                }
                                                if (goodPoint < tmpAnz.goodPoint) {
                                                    goodPoint = tmpAnz.goodPoint;
                                                    mem3 = i;
                                                }
                                                if (tmpAnz.pointCnt < pointCnt) {
                                                    pointCnt = tmpAnz.pointCnt;
                                                    ownPointCnt = tmpAnz.ownPointCnt;
                                                    mem4 = i;
                                                }
                                                else if (tmpAnz.pointCnt == pointCnt) {
                                                    if (ownPointCnt < tmpAnz.ownPointCnt) {
                                                        ownPointCnt = tmpAnz.ownPointCnt;
                                                        mem4 = i;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (this.mReversi.getMasuStsEna(color, this.mEdge[i].y, this.mEdge[i].x) == 2) {
                                        mem = i;
                                    }
                                }
                                if (mem2 != -1) {
                                    if (endZone != 0) {
                                        if (mem3 != -1) {
                                            mem2 = mem3;
                                        }
                                    }
                                    else {
                                        if (mem4 != -1) {
                                            mem2 = mem4;
                                        }
                                    }
                                    mem = mem2;
                                }
                                if (mem == -1)
                                    mem = Math.floor(Math.random() * kadocnt);
                                // *** 置いても平気な角があればそこに置く*** //
                                for (var i = 0; i < kadocnt; i++) {
                                    if (this.mReversi.checkEdge(color, this.mEdge[i].y, this.mEdge[i].x) != 0) {
                                        if ((cpuflg0 == 0) && (cpuflg1 == 0) && (cpuflg2 == 0)) {
                                            cpuflg3 = 1;
                                            rcnt2 = i;
                                        }
                                    }
                                }
                            }
                            if ((cpuflg1 == 0) && (cpuflg2 == 0) && (cpuflg0 == 0) && (cpuflg3 == 0)) {
                                rcnt2 = mem;
                            }
                            if (rcnt1 != 0) {
                                setY = this.mCpu[rcnt2].y;
                                setX = this.mCpu[rcnt2].x;
                            }
                            else if (kadocnt != 0) {
                                setY = this.mEdge[rcnt2].y;
                                setX = this.mEdge[rcnt2].x;
                            }
                        }
                    }
                    if (this.mReversi.setMasuSts(color, setY, setX) == 0) {
                        if (this.mType == DEF_TYPE_HARD)
                            this.mReversi.AnalysisReversi(this.mPassEnaB, this.mPassEnaW);
                        this.sendDrawMsg(setY, setX); // 描画
                        update = 1;
                    }
                }
            }
            else {
                break;
            }
        }
        if (update == 1) {
            this.drawUpdate(DEF_ASSIST_OFF);
            if (this.mAssist == DEF_ASSIST_ON) {
                // *** メッセージ送信 *** //
                this.execMessage(LC_MSG_DRAW_INFO_ALL, null);
            }
        }
        return update;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			マス描画更新
     *	@fn				public drawUpdate(assist : number) : void
     *	@param[in]		assist : number	アシスト設定
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.drawUpdate = function (assist) {
        if (assist == DEF_ASSIST_ON) {
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    this.sendDrawInfoMsg(i, j);
                }
            }
        }
        var waitTime = this.mPlayDrawInterVal;
        var _this = this;
        for (var i = 0; i < this.mMasuCnt; i++) {
            for (var j = 0; j < this.mMasuCnt; j++) {
                if (this.mReversi.getMasuSts(i, j) != this.mReversi.getMasuStsOld(i, j)) {
                    setTimeout(function (i, j) {
                        _this.sendDrawMsg(i, j);
                    }, waitTime, i, j);
                    waitTime += this.mPlayDrawInterVal;
                }
            }
        }
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_CUR_COL, null);
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_CUR_STS, null);
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			マス描画強制更新
     *	@fn				public drawUpdateForcibly(assist : number) : void
     *	@param[in]		assist : number	アシスト設定
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.drawUpdateForcibly = function (assist) {
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_DRAW_ALL, null);
        if (assist == DEF_ASSIST_ON) {
            // *** メッセージ送信 *** //
            this.execMessage(LC_MSG_DRAW_INFO_ALL, null);
        }
        else {
            // *** メッセージ送信 *** //
            this.execMessage(LC_MSG_ERASE_INFO_ALL, null);
        }
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_CUR_COL, null);
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_CUR_STS, null);
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リセット処理
     *	@fn				public reset() : void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.reset = function () {
        this.mPassEnaB = 0;
        this.mPassEnaW = 0;
        if (this.mGameSpd == DEF_GAME_SPD_FAST) {
            this.mPlayDrawInterVal = DEF_GAME_SPD_FAST_VAL; // 描画のインターバル(msec)
            this.mPlayCpuInterVal = DEF_GAME_SPD_FAST_VAL2; // CPU対戦時のインターバル(msec)
        }
        else if (this.mGameSpd == DEF_GAME_SPD_MID) {
            this.mPlayDrawInterVal = DEF_GAME_SPD_MID_VAL; // 描画のインターバル(msec)
            this.mPlayCpuInterVal = DEF_GAME_SPD_MID_VAL2; // CPU対戦時のインターバル(msec)
        }
        else {
            this.mPlayDrawInterVal = DEF_GAME_SPD_SLOW_VAL; // 描画のインターバル(msec)
            this.mPlayCpuInterVal = DEF_GAME_SPD_SLOW_VAL2; // CPU対戦時のインターバル(msec)
        }
        this.mCurColor = this.mPlayer;
        if (this.mMode == DEF_MODE_TWO)
            this.mCurColor = REVERSI_STS_BLACK;
        this.mReversi.setMasuCnt(this.mMasuCnt); // マスの数設定
        this.mReversi.reset();
        if (this.mMode == DEF_MODE_ONE) {
            if (this.mCurColor == REVERSI_STS_WHITE) {
                var pCnt = this.mReversi.getPointCnt(REVERSI_STS_BLACK);
                var pInfo = this.mReversi.getPoint(REVERSI_STS_BLACK, Math.floor(Math.random() * pCnt));
                if (pInfo != null) {
                    this.mReversi.setMasuSts(REVERSI_STS_BLACK, pInfo.y, pInfo.x);
                    if (this.mType == DEF_TYPE_HARD)
                        this.mReversi.AnalysisReversi(this.mPassEnaB, this.mPassEnaW);
                }
            }
        }
        this.mPlayLock = 1;
        this.mGameEndSts = 0;
        this.drawUpdateForcibly(this.mAssist);
        // *** 終了通知 *** //
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_DRAW_END, null);
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			ゲーム終了アニメーション
     *	@fn				public gameEndAnimExec() : void
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.gameEndAnimExec = function () {
        var bCnt, wCnt;
        if (this.mEndAnim == DEF_END_ANIM_ON) {
            bCnt = this.mReversi.getBetCnt(REVERSI_STS_BLACK);
            wCnt = this.mReversi.getBetCnt(REVERSI_STS_WHITE);
            // *** 色、コマ数表示消去 *** //
            // *** メッセージ送信 *** //
            this.execMessage(LC_MSG_CUR_COL_ERASE, null);
            // *** メッセージ送信 *** //
            this.execMessage(LC_MSG_CUR_STS_ERASE, null);
            var _this = this;
            setTimeout(function (bCnt, wCnt) {
                // *** マス消去 *** //
                for (var i = 0; i < _this.mMasuCnt; i++) {
                    for (var j = 0; j < _this.mMasuCnt; j++) {
                        _this.mReversi.setMasuStsForcibly(REVERSI_STS_NONE, i, j);
                    }
                }
                // *** メッセージ送信 *** //
                _this.execMessage(LC_MSG_ERASE_ALL, null);
                // *** マス描画 *** //
                var bCnt2, wCnt2, bEnd, wEnd;
                bCnt2 = 0;
                wCnt2 = 0;
                bEnd = 0;
                wEnd = 0;
                var waitTime = _this.mEndDrawInterVal;
                for (var i = 0; i < _this.mMasuCnt; i++) {
                    for (var j = 0; j < _this.mMasuCnt; j++) {
                        if (bCnt2 < bCnt) {
                            bCnt2++;
                            setTimeout(function (i, j) {
                                _this.mReversi.setMasuStsForcibly(REVERSI_STS_BLACK, i, j);
                                _this.sendDrawMsg(i, j);
                            }, waitTime, i, j);
                        }
                        else {
                            bEnd = 1;
                        }
                        if (wCnt2 < wCnt) {
                            wCnt2++;
                            setTimeout(function (i, j) {
                                _this.mReversi.setMasuStsForcibly(REVERSI_STS_WHITE, (_this.mMasuCnt - 1) - i, (_this.mMasuCnt - 1) - j);
                                _this.sendDrawMsg((_this.mMasuCnt - 1) - i, (_this.mMasuCnt - 1) - j);
                            }, waitTime, i, j);
                        }
                        else {
                            wEnd = 1;
                        }
                        if (bEnd == 1 && wEnd == 1) {
                            break;
                        }
                        else {
                            waitTime += _this.mEndDrawInterVal;
                        }
                    }
                }
            }, this.mEndInterVal, bCnt, wCnt);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			描画メッセージ送信
     *	@fn				public int sendDrawMsg(int y,int x)
     *	@param[in]		int y			Y座標
     *	@param[in]		int x			X座標
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2014.06.26
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.sendDrawMsg = function (y, x) {
        var mTmpPoint = new ReversiPoint();
        mTmpPoint.y = y;
        mTmpPoint.x = x;
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_DRAW, mTmpPoint);
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			情報描画メッセージ送信
     *	@fn				public int sendDrawInfoMsg(int y,int x)
     *	@param[in]		int y			Y座標
     *	@param[in]		int x			X座標
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2014.06.26
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.sendDrawInfoMsg = function (y, x) {
        var mTmpPoint = new ReversiPoint();
        mTmpPoint.y = y;
        mTmpPoint.x = x;
        // *** メッセージ送信 *** //
        this.execMessage(LC_MSG_DRAW_INFO, mTmpPoint);
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			メッセージコールバック設定
     *	@fn				public setViewMsgDlgFunc(func : any) : void
     *	@param[in]		func : any メッセージコールバック設定
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.setViewMsgDlgFunc = function (func) {
        this.viewMsgDlgFunc = func;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			メッセージ表示
     *	@fn				private viewMsgDlg(title: string, msg: string): void
     *	@param[in]		title: string	タイトル
     *	@param[in]		msg: string		メッセージ
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.viewMsgDlg = function (title, msg) {
        if (this.viewMsgDlgFunc != null) {
            this.viewMsgDlgFunc(title, msg);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			描画コールバック設定
     *	@fn				public setViewMsgDlgFunc(func : any) : void
     *	@param[in]		func : any 描画コールバック設定
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.setDrawSingleFunc = function (func) {
        this.drawSingleFunc = func;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			描画コールバック
     *	@fn				private drawSingle(y : number, x : number, sts : number, bk : number, text : string): void
     *	@param[in]		y : number		Y座標
     *	@param[in]		x : number		X座標
     *	@param[in]		sts : number	ステータス
     *	@param[in]		bk : number		背景種類
     *	@param[in]		text : string	表示テキスト
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.drawSingle = function (y, x, sts, bk, text) {
        if (this.drawSingleFunc != null) {
            if (text == '0')
                text = '';
            this.drawSingleFunc(y, x, sts, bk, text);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			現在の色コールバック設定
     *	@fn				public setCurColMsgFunc(func : any) : void
     *	@param[in]		func : any 現在の色コールバック設定
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.setCurColMsgFunc = function (func) {
        this.curColMsgFunc = func;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			現在の色コールバック
     *	@fn				public curColMsg(text : string): void
     *	@param[in]		text : string	表示テキスト
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.curColMsg = function (text) {
        if (this.curColMsgFunc != null) {
            this.curColMsgFunc(text);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			現在のステータスコールバック設定
     *	@fn				public setCurStsMsgFunc(func : any) : void
     *	@param[in]		func : any 現在のステータスコールバック設定
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.setCurStsMsgFunc = function (func) {
        this.curStsMsgFunc = func;
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			現在のステータスコールバック
     *	@fn				private curStsMsg(text : string): void
     *	@param[in]		text : string	表示テキスト
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.curStsMsg = function (text) {
        if (this.curStsMsgFunc != null) {
            this.curStsMsgFunc(text);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			メッセージ
     *	@fn				private execMessage(message : number) :void
     *	@param[in]		title: string	タイトル
     *	@param[in]		msg: string		メッセージ
     *	@return			ありません
     *	@author			Yuta Yoshinaga
     *	@date			2017.06.01
     */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiPlay.prototype.execMessage = function (what, obj) {
        var dMode, dBack, dCnt, exec = 0;
        if (what == LC_MSG_DRAW) {
            // *** マス描画 *** //
            var msgPoint = obj;
            dMode = this.mReversi.getMasuSts(msgPoint.y, msgPoint.x);
            dBack = this.mReversi.getMasuStsEna(this.mCurColor, msgPoint.y, msgPoint.x);
            dCnt = this.mReversi.getMasuStsCnt(this.mCurColor, msgPoint.y, msgPoint.x);
            this.drawSingle(msgPoint.y, msgPoint.x, dMode, dBack, String(dCnt));
        }
        else if (what == LC_MSG_ERASE) {
            // *** マス消去 *** //
            var msgPoint = obj;
            this.drawSingle(msgPoint.y, msgPoint.x, 0, 0, String(0));
        }
        else if (what == LC_MSG_DRAW_INFO) {
            // *** マス情報描画 *** //
            var msgPoint = obj;
            dMode = this.mReversi.getMasuSts(msgPoint.y, msgPoint.x);
            dBack = this.mReversi.getMasuStsEna(this.mCurColor, msgPoint.y, msgPoint.x);
            dCnt = this.mReversi.getMasuStsCnt(this.mCurColor, msgPoint.y, msgPoint.x);
            this.drawSingle(msgPoint.y, msgPoint.x, dMode, dBack, String(dCnt));
        }
        else if (what == LC_MSG_ERASE_INFO) {
            // *** マス情報消去 *** //
            var msgPoint = obj;
            dMode = this.mReversi.getMasuSts(msgPoint.y, msgPoint.x);
            this.drawSingle(msgPoint.y, msgPoint.x, dMode, 0, String(0));
        }
        else if (what == LC_MSG_DRAW_ALL) {
            // *** 全マス描画 *** //
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    dMode = this.mReversi.getMasuSts(i, j);
                    dBack = this.mReversi.getMasuStsEna(this.mCurColor, i, j);
                    dCnt = this.mReversi.getMasuStsCnt(this.mCurColor, i, j);
                    this.drawSingle(i, j, dMode, dBack, String(dCnt));
                }
            }
        }
        else if (what == LC_MSG_ERASE_ALL) {
            // *** 全マス消去 *** //
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    this.drawSingle(i, j, 0, 0, String(0));
                }
            }
        }
        else if (what == LC_MSG_DRAW_INFO_ALL) {
            // *** 全マス情報描画 *** //
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    dMode = this.mReversi.getMasuSts(i, j);
                    dBack = this.mReversi.getMasuStsEna(this.mCurColor, i, j);
                    dCnt = this.mReversi.getMasuStsCnt(this.mCurColor, i, j);
                    this.drawSingle(i, j, dMode, dBack, String(dCnt));
                }
            }
        }
        else if (what == LC_MSG_ERASE_INFO_ALL) {
            // *** 全マス情報消去 *** //
            for (var i = 0; i < this.mMasuCnt; i++) {
                for (var j = 0; j < this.mMasuCnt; j++) {
                    dMode = this.mReversi.getMasuSts(i, j);
                    this.drawSingle(i, j, dMode, 0, String(0));
                }
            }
        }
        else if (what == LC_MSG_DRAW_END) {
            this.mPlayLock = 0;
        }
        else if (what == LC_MSG_CUR_COL) {
            var tmpStr = '';
            if (this.mMode == DEF_MODE_ONE) {
                if (this.mCurColor == REVERSI_STS_BLACK)
                    tmpStr = 'あなたは黒です ';
                else
                    tmpStr = 'あなたは白です ';
            }
            else {
                if (this.mCurColor == REVERSI_STS_BLACK)
                    tmpStr = '黒の番です ';
                else
                    tmpStr = '白の番です ';
            }
            this.curColMsg(tmpStr);
        }
        else if (what == LC_MSG_CUR_COL_ERASE) {
            this.curColMsg('');
        }
        else if (what == LC_MSG_CUR_STS) {
            var tmpStr = '黒 = ' + this.mReversi.getBetCnt(REVERSI_STS_BLACK) + ' 白 = ' + this.mReversi.getBetCnt(REVERSI_STS_WHITE);
            this.curStsMsg(tmpStr);
        }
        else if (what == LC_MSG_CUR_STS_ERASE) {
            this.curStsMsg('');
        }
        else if (what == LC_MSG_MSG_DLG) {
        }
        else if (what == LC_MSG_DRAW_ALL_RESET) {
        }
    };
    return ReversiPlay;
}());
//# sourceMappingURL=ReversiPlay.js.map