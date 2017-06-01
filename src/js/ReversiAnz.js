////////////////////////////////////////////////////////////////////////////////
/**	@file			ReversiAnz.ts
*	@brief			リバーシ解析クラス実装ファイル
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
////////////////////////////////////////////////////////////////////////////////
/**	@class		ReversiAnz
*	@brief		リバーシ解析クラス
*/
////////////////////////////////////////////////////////////////////////////////
var ReversiAnz = (function () {
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			コンストラクタ
    *	@fn				public constructor()
    *	@return			ありません
    *	@author			Yuta Yoshinaga
    *	@date			2017.06.01
    */
    ////////////////////////////////////////////////////////////////////////////////
    function ReversiAnz() {
        this.reset();
    }
    ////////////////////////////////////////////////////////////////////////////////
    /**	@brief			リセット
    *	@fn				public reset() : void
    *	@return			ありません
    *	@author			Yuta Yoshinaga
    *	@date			2017.06.01
    */
    ////////////////////////////////////////////////////////////////////////////////
    ReversiAnz.prototype.reset = function () {
        this.min = 0;
        this.max = 0;
        this.avg = 0.0;
        this.pointCnt = 0;
        this.edgeCnt = 0;
        this.edgeSideOneCnt = 0;
        this.edgeSideTwoCnt = 0;
        this.edgeSideThreeCnt = 0;
        this.edgeSideOtherCnt = 0;
        this.ownMin = 0;
        this.ownMax = 0;
        this.ownAvg = 0.0;
        this.ownPointCnt = 0;
        this.ownEdgeCnt = 0;
        this.ownEdgeSideOneCnt = 0;
        this.ownEdgeSideTwoCnt = 0;
        this.ownEdgeSideThreeCnt = 0;
        this.ownEdgeSideOtherCnt = 0;
        this.badPoint = 0;
        this.goodPoint = 0;
    };
    return ReversiAnz;
})();
