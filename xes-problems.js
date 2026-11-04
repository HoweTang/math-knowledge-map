// ============= 学而思秘籍 · 例题与练习 (OCR 提取) =============
// 由 _tools/parse_xes_ocr.js 根据 _tools/xes_ocr/*.json 自动生成 (2026-11-04), 请勿手改
// 文字来自对扫描 PDF 的 OCR: 插图内容读不出来, 个别字可能有误, 请以原书 PDF (page 字段) 为准

const XES_PROBLEM_TYPES = { example: '例题', practice: '举一反三', challenge: '挑战自我', peak: '探索知识巅峰' };

const xesProblems = [
    {"id":"xesq_01_16_e1","lecture":"xes_01_16","type":"example","num":1,"method":1,"methodTitle":"等量代换（1）","methodHint":"相等的量之间可以相互交换","page":7,"text":"换一换，填一填。(1)1颗龙珠可以换2个桃子。2颗龙珠可以换（ )个桃子。3颗龙珠可以换（ )个桃子。(2)—→4颗珍珠可以换1根香蕉。8颗珍珠可以换（ )根香蕉。12颗珍珠可以换（ )根香蕉。(3)1颗龙珠可以换3个椰子。3颗龙珠可以换（ )个椰子。要想换6个椰子需要（ )颗龙珠。","solution":"(1)已知1颗龙珠=2个桃子，那么2颗龙珠，就是2+2=4（个）桃子，3颗龙珠，就是2+2+2=6（个)桃子。(2）已知4颗珍珠=1根香蕉，那么8颗珍珠，就是1+1=2(根)香蕉，12颗珍珠,就是1+1+1=3(根)香蕉。(3）已知1颗龙珠=3个椰子，那么3颗龙珠，就是3+3+3=9(个)椰子，6个椰子，就是1+1=2(颗)龙珠。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_p1","lecture":"xes_01_16","type":"practice","num":1,"method":1,"methodTitle":"等量代换（1）","methodHint":"相等的量之间可以相互交换","page":9,"text":"换一换，填一填。练习本","solution":"1个练习本=2支铅笔，2个练习本=2+2=4（支）铅笔，3个练习本=2+2+2=6(支)铅笔。","answer":"4;6。","answerPage":32,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_p2","lecture":"xes_01_16","type":"practice","num":2,"method":1,"methodTitle":"等量代换（1）","methodHint":"相等的量之间可以相互交换","page":9,"text":"换一换,填一填。","solution":"3个羽毛球=1个皮球，6个羽毛球=1+1=2（个）皮球，9个羽毛球=1+1+1=3(个)皮球。","answer":"2;3。","answerPage":32,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_c3","lecture":"xes_01_16","type":"challenge","num":3,"method":1,"methodTitle":"等量代换（1）","methodHint":"相等的量之间可以相互交换","page":10,"text":"田田和丁丁在抢着玩闯关游戏，谁也不让谁，乐乐老师看见了，打算让他们二人PK，胜出的人可以玩，比赛开始：下面的括号里分别填几？）个","solution":"1个苹果=2个珍珠，那么4个珍珠=2个苹果，8个珍珠=4个苹果。","answer":"2;4。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_e2","lecture":"xes_01_16","type":"example","num":2,"method":2,"methodTitle":"等量代换（2）","methodHint":"①找到中间量，再进行替换","page":11,"text":"观察下图，你知道一个大红苹果的质量等于几个小黄苹果的质量吗？请把答案填在括号里。","solution":"抓住中间量来进行推理。因为1个的质量=（2)个的质量，1个的质量=（2）个的质量，那么2个的质量=（4）个的质量,替换掉所以1个的质量=（ 4)个的质量。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_p4","lecture":"xes_01_16","type":"practice","num":4,"method":2,"methodTitle":"等量代换（2）","methodHint":"①找到中间量，再进行替换","page":13,"text":"观察下图，请把答案填在括号里。","solution":"抓住中间量来进行推理。个的水=（2）个的水，的水=（4）个的水，2个的水=（8）个的水，替换掉所以1个的水=（8）个的水。","answer":"8。","answerPage":32,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_p5","lecture":"xes_01_16","type":"practice","num":5,"method":2,"methodTitle":"等量代换（2）","methodHint":"①找到中间量，再进行替换","page":13,"text":"买一个苹果的钱可以买几个桃子？","solution":"一个苹果=2根香蕉，1根香蕉=2个桃子，2根香蕉=4个桃子，替换掉香蕉，1个苹果=4个桃子。","answer":"4。","answerPage":32,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_c6","lecture":"xes_01_16","type":"challenge","num":6,"method":2,"methodTitle":"等量代换（2）","methodHint":"①找到中间量，再进行替换","page":14,"text":"丁丁马上给出答案，田田建议再出一题，2人再来PK一次，乐乐老师拿来第二题：","solution":"根据问题发现苹果是中间量，变一样，换掉苹果。1个梨=3个苹果，1个苹果=2个樱桃，那么3个苹果=6个樱桃，即1个梨=3个苹果=6个樱桃，1个梨=6个樱桃，12个樱桃=2个梨。","answer":"2。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_e3","lecture":"xes_01_16","type":"example","num":3,"method":3,"methodTitle":"等量代换（3）","methodHint":"①找到中间量，再进行替换","page":15,"text":"第三个盘子应放（ )个草莓才能使天平保持平衡。","solution":"1串葡萄的质量=（2)个鸭梨的质量，1个鸭梨的质量=（3）个草莓的质量，把鸭梨的质量变成2个，然后替换掉。2个鸭梨的质量=（6）个草莓的质量，1串葡萄的质量=（6 )个草莓的质量。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_p7","lecture":"xes_01_16","type":"practice","num":7,"method":3,"methodTitle":"等量代换（3）","methodHint":"①找到中间量，再进行替换","page":17,"text":"观察下图，你知道1只小猫和几只小鸡一样重吗？请把答案填在括号处。","solution":"1只的重量=（2）只重量，1只的重量=（3）只的重量， 92 只的重量=（6)只的重量。所以，1只的重量=（6）只的重量。","answer":"6。","answerPage":32,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_p8","lecture":"xes_01_16","type":"practice","num":8,"method":3,"methodTitle":"等量代换（3）","methodHint":"①找到中间量，再进行替换","page":17,"text":"观察下图，把答案填到括号里。","solution":"根据问题，发现没有苹果，那么苹果为中间量，变一样，替换掉：2个苹果=4颗草莓，2个苹果=8根香蕉，替换掉苹果，4颗草莓=8根香蕉，那么1颗草莓=2根香蕉。","answer":"2。","answerPage":33,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_c9","lecture":"xes_01_16","type":"challenge","num":9,"method":3,"methodTitle":"等量代换（3）","methodHint":"①找到中间量，再进行替换","page":18,"text":"田田抢着回答了上一题，这样两个人各对1题，PK比赛继续进行，乐乐老师找来一道有意思的题目，小朋友猜猜看，答案是怎样的？","solution":"根据问题发现香蕉是中间量，3根香蕉=6个苹果，那么1根香蕉=2个苹果，1个梨=1根香蕉十1个苹果，换掉香蕉，所以1个梨=2+1=3个苹果，即1个梨=3个苹果。","answer":"3。","answerPage":33,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_01_16_e4","lecture":"xes_01_16","type":"example","num":4,"method":4,"methodTitle":"等量代换（4）","methodHint":"找到中间量，再进行替换","page":19,"text":"要使跷跷板保持平衡，右边还要加几个橘子？请把答案填在括号处。","solution":"1个桃子的质量=3个苹果的质量，1个苹果的质量=2个橘子的质量，3个苹果的质量=6个橘子的质量，那么1个桃子的质量一6个橘子的质量。要使晓跷板左右平衡，右边应该有6个，而现在已经有3个，还差6−3=3（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_p10","lecture":"xes_01_16","type":"practice","num":10,"method":4,"methodTitle":"等量代换（4）","methodHint":"找到中间量，再进行替换","page":21,"text":"要使天平保持平衡，右边还要加几个圆形？","solution":"1个正方形=3个圆形，2个正方形=3+3=6（个）圆形，一个三角形=2个正方形，等量替换掉正方形，1个三角形=6个圆形，减去题目中2个，6−2=4（个），所以还需要加4个圆形。","answer":"4。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_p11","lecture":"xes_01_16","type":"practice","num":11,"method":4,"methodTitle":"等量代换（4）","methodHint":"找到中间量，再进行替换","page":21,"text":"要使跷跷板保持平衡，右边还要加（ )只猫。E+△","solution":"根据问题找中间量，没有狗，狗为中间量，变一样，替换掉。1只羊=2只狗，1只狗=3只猫，那么2只狗=6只猫，替换掉狗，则1只羊=6只猫。题目中已经有1只猫，6−1=5（只），所以再添加5只猫就可以保持平衡。","answer":"5。","answerPage":33,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_01_16_c12","lecture":"xes_01_16","type":"challenge","num":12,"method":4,"methodTitle":"等量代换（4）","methodHint":"找到中间量，再进行替换","page":22,"text":"牛牛同学不愧为学霸，刚读完题目，就报出答案，田田不服气，催着乐乐老师继续出题。看图填空，认真想想，括号里应该填几？","solution":"根据问题发现羊和猪都是中间量，一步一步看。1只羊=2只鸡，那么2只羊=4只鸡；2只羊=1只鸡十1只猪，所以2只羊=4只鸡=1只鸡十1只猪，即3只鸡=1只猪（换掉了羊）；1只牛=3只猪，1只猪=3只鸡，所以3只猪=9只鸡，1只牛=3只猪=9只鸡（换掉猪），即1只牛=9只鸡。","answer":"9。","answerPage":33,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_e5","lecture":"xes_01_16","type":"example","num":5,"method":5,"methodTitle":"等量代换（5）","methodHint":"找到中间量，再进行替换","page":23,"text":"观察下面的图，算一算，一根香蕉的质量等于几个青苹果的质量？请把答案填在括号里。","solution":"1根的质量=（3）个的质量，2个的质量=（4）个的质量，的质量=（6）个的质量，1根的质量=（6）个〇的质量。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_p13","lecture":"xes_01_16","type":"practice","num":13,"method":5,"methodTitle":"等量代换（5）","methodHint":"找到中间量，再进行替换","page":25,"text":"想一想，括号里应该填几才能使天平保持平衡？请把答案填在括号里。","solution":"2根香蕉=4个苹果，1根香蕉=2个苹果，3根香蕉=6个苹果，3根香蕉=2个桃子，6个苹果=2个桃子，3个苹果=1个桃子。","answer":"3。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_p14","lecture":"xes_01_16","type":"practice","num":14,"method":5,"methodTitle":"等量代换（5）","methodHint":"找到中间量，再进行替换","page":25,"text":"下面的括号里应该填几？","solution":"根据问题发现樱桃是中间量，变一样，替换掉。2个苹果=8个樱桃，1个苹果=4个樱桃，3个苹果=12个樱桃，1个西瓜=3个苹果，所以替换掉苹果，1个西瓜=12个樱桃。","answer":"12。","answerPage":33,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_c15","lecture":"xes_01_16","type":"challenge","num":15,"method":5,"methodTitle":"等量代换（5）","methodHint":"找到中间量，再进行替换","page":26,"text":"上一道题太难了，两个人都没有解答出来，乐乐老师为了鼓励两人，又找来一道有意思的题目。小朋友，认真思考，快速解答出来。","solution":"根据问题发现苹果是中间量，变一样，换掉。2个苹果=6个樱桃，所以1个苹果=3个樱桃；3个苹果=9个樱桃，3个苹果=1个梨，换掉苹果，3个苹果=9个樱桃=1个梨，即1个梨=9个樱桃，那么2个梨=9+9=18个樱桃。","answer":"18。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_e6","lecture":"xes_01_16","type":"example","num":6,"method":6,"methodTitle":"等量代换（6）","methodHint":"找到中间量，再进行替换","page":27,"text":"填一填，一个西瓜的重量等于几个石榴的重量？","solution":"从问题入手，先看西瓜。1个西瓜=2个哈密瓜，再去看哈密瓜，1个哈密瓜十1个石榴=3个柚子，再去看柚子和石榴，1个柚子=2个石榴，3个柚子=6个石榴。1个哈密瓜=5个石榴，2个哈密瓜=10个石榴，1个西瓜=10个石榴。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_p16","lecture":"xes_01_16","type":"practice","num":16,"method":6,"methodTitle":"等量代换（6）","methodHint":"找到中间量，再进行替换","page":29,"text":"仔细观察下面的图，请把答案填在括号里。","solution":"问一个梨等于几个青苹果，那么从梨出发：1个梨=1个红苹果十1个青苹果，再去找红苹果，2个红苹果=4个青苹果，1个红苹果=2个青苹果，1个梨=3个青苹果。","answer":"3。","answerPage":33,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_p17","lecture":"xes_01_16","type":"practice","num":17,"method":6,"methodTitle":"等量代换（6）","methodHint":"找到中间量，再进行替换","page":29,"text":"观察下图，把答案填到括号里。","solution":"根据问题发现，桃和苹果都是中间量，变一样，替换掉。2个桃子=2个梨，1个桃子=2个苹果，那么2个桃子=4个苹果，替换掉桃，所以2个梨=4个苹果，1个苹果=3个草莓，那么4个苹果=12个草莓，替换掉苹果，2个梨=12个草莓。所以1个梨=6个草莓。","answer":"6。","answerPage":34,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_01_16_c18","lecture":"xes_01_16","type":"challenge","num":18,"method":6,"methodTitle":"等量代换（6）","methodHint":"找到中间量，再进行替换","page":30,"text":"田田说：“这个题目太简单了吧，乐乐老师，有没有难一点的题考验一下。”乐乐老师说：“请看下面的晓晓板，括号里要填几？”","solution":"根据问题找到中间量为鸭和狗。先看第三个跷跷板，1只鸭=2只鸡，那么3只鸭=6只鸡。再看第2个，1只狗=3只鸭十1只鸡，换掉鸭，1只狗=6+1=7(只)鸡。第一个晓晓板，1只兔十1只鸭=2只狗，把其中的鸭和狗都换成鸡，即1只兔十2只鸡=14只鸡，14−2=12(只），所以1只兔=12只鸡。","answer":"12。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_01_16_k19","lecture":"xes_01_16","type":"peak","num":19,"method":6,"methodTitle":"等量代换（6）","methodHint":"找到中间量，再进行替换","page":30,"text":"比一比,算一算。","solution":"因为=●所以十=十●=AAA+AAA+AAA+AAA;得出：十=（12)个。因为=，所以 -●==6个，得出：-=（6)个。","answer":"12;6。","answerPage":34,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_e1","lecture":"xes_02_08","type":"example","num":1,"method":1,"methodTitle":"数小方块","methodHint":"①分层数","page":7,"text":"下图所示的“塔”由4层没有缝隙的小方块垒成，这个塔一共有多少个小方块？","solution":"在数的时候首先要找准方向，可以从下到上、从左到右、从前往后等，这里选择从上到下。观察到从上往下一共4层，最上层有1块，第二层看见的有2块，但是还有一块被上层压着看不见，所以第二层有2+1=3（块）；第三层看见的有3块，但是还有3块被上层压着，所以有3+3=6(块）；第4层看见的有4块，但是被上层压着6块，所以一共有4+6=10（块），那么一共有1+3+6+10=20（块）。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_p1","lecture":"xes_02_08","type":"practice","num":1,"method":1,"methodTitle":"数小方块","methodHint":"①分层数","page":9,"text":"数一数，下面每一组都有几块小正方形体？)块（ )块（ )块","solution":"（1)从上往下，第一层1块，第二层：1+3=4(块)，一共1+4=5(块）。(2)一共4+4=8(块）。(3)一共1+4+4=9(块)。","answer":"5,8,9。","answerPage":21,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p2","lecture":"xes_02_08","type":"practice","num":2,"method":1,"methodTitle":"数小方块","methodHint":"①分层数","page":9,"text":"下图中共有多少个“×”？XXXXXXXXXX XXXXXXXXXX xxxxxxxxx XXX XXXXX XXX xXXx XXX Xxx XXX XX xXXXXXXXXx XXXXXXXXXX xxXxXXxXxx","solution":"观察发现一共有10行，除了中间空缺的地方外每行都是10个，所以可以先把中间空缺的地方补上，后面再减去。列式为：(0+0+0+0+0+0+0+0+0+0)(1+2+3+4+5)=100-15=85。","answer":"85个。","answerPage":21,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_02_08_c3","lecture":"xes_02_08","type":"challenge","num":3,"method":1,"methodTitle":"数小方块","methodHint":"①分层数","page":10,"text":"丁丁用了很多一样的小方块垒成了下面的图形。小朋友，你来数一数，他一共用了多少个小方块呢？","solution":"可以从上往下看，一共有三层：第一层有4个；第二层有4+2=6（个）；第三层有6+3=9（个）；一共有4+6+9=19(个)。","answer":"19个。","answerPage":21,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_e2","lecture":"xes_02_08","type":"example","num":2,"method":2,"methodTitle":"数圆柱体","methodHint":"①从上向下，分层数","page":11,"text":"数一数，下面的图形中一共有多少个圆柱体？","solution":"认真观察，发现这些木头摆放的很有规律，从上往下每层多一根，一共有8层，所以每层的木头数分别是：1、2、3、4、5、6、7、8，一共有1+2+3+4+5+6+7+8。在计算得数的时候可以将数从左向右逐个相加，也可以用凑十法：1+2+3+4+5+6+7+8，最后相加的和为36根。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p4","lecture":"xes_02_08","type":"practice","num":4,"method":2,"methodTitle":"数圆柱体","methodHint":"①从上向下，分层数","page":13,"text":"数一数，下面图中一共有多少个小圆点？","solution":"认真观察发现一共有5层，而且从上往下每层多2个，那么这5层的圆点数分别是：1、3、5、7、9，一共有1+3+5+7+9=25(个)。","answer":"25个。","answerPage":21,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_p5","lecture":"xes_02_08","type":"practice","num":5,"method":2,"methodTitle":"数圆柱体","methodHint":"①从上向下，分层数","page":13,"text":"下面的图形中，一共有多少个圆点？","solution":"此题可以分层去数，也可以斜着看，斜着看更有规律一些。因为斜着看一共有10行，每行都是10个，所以有100个。","answer":"100个。","answerPage":21,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_c6","lecture":"xes_02_08","type":"challenge","num":6,"method":2,"methodTitle":"数圆柱体","methodHint":"①从上向下，分层数","page":14,"text":"田田拿来了很多的火柴棒，长度都相同，然后田田把这些火柴棒摆成下面的图形。照这样摆下去，摆第5个图需要用多少根火柴棒?","solution":"首先观察前三个图，找规律，可以发现第三个图有三行，第二个图有两行，第一个图有一行，那么第五个图就有五行。这五行火柴棒摆放得也有规律。横着看一共有：1+3+5+7+9+9=34(根)。竖着看有：1+2+3+4+5+5+4+3+2+1=30(根)。一共有30+34=64(根)。","answer":"64根。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_e3","lecture":"xes_02_08","type":"example","num":3,"method":3,"methodTitle":"数圆点","methodHint":"①分层数：找规律，列算式","page":15,"text":"数一数，下面的图形中一共有多少个圆点？","solution":"这个图我们可以从不同的方向来数。\n方法一：可以从上往下一层一层地数，这样就会发现先每层多1，然后是每层少1,列式为：1+2+3+4+5+6+7+6+5+4+3+2+1=49（个）。\n方法二：可以斜着一层一层地数，发现斜着看每层都是7个，一共是7层，所以可以列式为：7+7+7+7+7+7+7=49（个），也可以列成乘法算式：7×7=49（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p7","lecture":"xes_02_08","type":"practice","num":7,"method":3,"methodTitle":"数圆点","methodHint":"①分层数：找规律，列算式","page":17,"text":"数一数，下面图中一共有多少个圆点？","solution":"方法一：从上往下一层一层的数，列式为：1+2+3+4+5+4+3+2+1=25（个）。方法二：斜着看，每层都是5个，一共有5层，列式为：5+5+5+5+5=5×5=25（个）。","answer":"25个。","answerPage":22,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_p8","lecture":"xes_02_08","type":"practice","num":8,"method":3,"methodTitle":"数圆点","methodHint":"①分层数：找规律，列算式","page":17,"text":"下面的图形中，一共有多少个三角形？△△△△△△","solution":"通过观察，发现从上往下每行比上一行都多2个，所以列式为：2+4+6+8+10=30(个）。","answer":"30个。","answerPage":22,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_02_08_c9","lecture":"xes_02_08","type":"challenge","num":9,"method":3,"methodTitle":"数圆点","methodHint":"①分层数：找规律，列算式","page":18,"text":"阿普用圆点画成了下面这幅图，你能用快速的方法数出下图中一共有多少个圆点吗？","solution":"数这个图可以一个一个地数，也可以一层一层地去数。也可以这样数，这个正方形的四个角都是三角形，每个三角形都有1+2+3+4=10（个），一共有40个，可是这四个三角形共用了4个圆点，所以多数了4个，那么一共有40−4=36(个)。","answer":"36个。","answerPage":22,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_e4","lecture":"xes_02_08","type":"example","num":4,"method":4,"methodTitle":"数爱心","methodHint":"分层数","page":19,"text":"请你数一数，下图中共有多少颗心？","solution":"这道题可以一个一个地数清楚总数，当然还有很多方法，下面介绍三种方法。\n方法一：观察一下，这个图的规律是从上往下每层多2个，但是有几层中间空出来了一部分。所以可列式为：1+3+5+7+9+6+10+14+17计算：1+3+5+7+9+6+10+14+1710 20=10+10+20+5+10+17=72\n方法二：可以先把空缺的那部分填上当成一个实心，然后再减去增加的部分。计算：(1+3+5+7+9+11+13+15+17)−(5+3+1)=(20+20+20+20+1)−9=81-9=72\n方法三：如下图，将整个图形分成3个一样的三角形，但是这三个三角形共用了3颗，在数的时候也会多数3颗，所以最后再减去。每个三角形都有：1+3+5+7+9=25（颗）。三个三角形共有：25+25+25=75（颗）。减去多数的三颗：75−3=72（颗）。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_p10","lecture":"xes_02_08","type":"practice","num":10,"method":4,"methodTitle":"数爱心","methodHint":"分层数","page":22,"text":"请你数一数，下图中共有多少个金元宝？","solution":"要想知道一共有多少个金元宝，可以一个一个按顺序地数清楚，也有很多别的方法来数，这里介绍两种方法。方法一：从上往下分层数，因为有些层数目一样多。列式为：10+10+8+6+4+2+10+10=60（个）。方法二：先把中间缺的部分补出来，当成一个实心的长方形，每层数目都一样丨2+4+6+8+10+12+14+16=72(颗），多，然后再减去补的部分。列式为：10+10十=8 -9 -0+0+ 0+ 0+ 0+080−(2+4+6+8)=80−20=60(个）。","answer":"60个。","answerPage":22,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_p11","lecture":"xes_02_08","type":"practice","num":11,"method":4,"methodTitle":"数爱心","methodHint":"分层数","page":22,"text":"下图是由小方块构成的“宝塔”，请你数一数共有多少块。","solution":"从上往下看，一共有3层，而且摆放得非常整齐。所以可以分层数：第一层：1块；第二层：有3行，每行3块，一共有3+3+3=9块；第三层：有5行，每行5块，一共有5+5+5+5+5=25块；所以一共有1+9+25=35（块）。","answer":"35块。","answerPage":22,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_02_08_c12","lecture":"xes_02_08","type":"challenge","num":12,"method":4,"methodTitle":"数爱心","methodHint":"分层数","page":23,"text":"牛牛拿来了很多豆子在桌上摆图形，他第一排摆了1颗豆子，以后每排依次增加2颗豆子，一共摆了6排。他一共用了多少颗豆子摆图形？","solution":"根据题意列式为：1+3+5+7+9+11=36(颗)。","answer":"36颗。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_e5","lecture":"xes_02_08","type":"example","num":5,"method":5,"methodTitle":"数梨","methodHint":"分层数：找规律，列算式","page":24,"text":"在下面的图画中，最下面一排有9个梨，以上每排逐次少一个梨，算一算，图画中一共有多少梨？","solution":"最下面一排9个梨，依次从下往上数，以后每排少一个，所以第二排8个，第三排7个，第四排6个，第五排5个，第六排4个，第七排3个，第八排2个，第九排1个，一共有：9+8+7+6+5+4+3+2+1=45（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p13","lecture":"xes_02_08","type":"practice","num":13,"method":5,"methodTitle":"数梨","methodHint":"分层数：找规律，列算式","page":26,"text":"有55个人，站成倒三角的队形跳舞，最前面一排站一个人，以后每排都比前一排多站一个人，想一想，最后面一排站有几个人？","solution":"最前面一排站1个人，以后每排都多一个人，所以后面每排依次有2、3、4、5.…….人，一共有55个人站队，那就说明1+2+3+4+5+…**+？=55，显然1+2+3+4+5+6+7+8+9+10=55（人），所以最后一排为10人。","answer":"10人。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p14","lecture":"xes_02_08","type":"practice","num":14,"method":5,"methodTitle":"数梨","methodHint":"分层数：找规律，列算式","page":26,"text":"一年级同学参加演出，第一排站1名同学，以后每排都多站一名同学，一共站了10排，算一算参加演出的一共有多少名同学。","solution":"根据题意，第一排有1名同学，以后每排多1名同学，共站了10排，所以一共有：1+2+3+4+5+6+7+8+9+10=55（名）。","answer":"55名。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_c15","lecture":"xes_02_08","type":"challenge","num":15,"method":5,"methodTitle":"数梨","methodHint":"分层数：找规律，列算式","page":26,"text":"乐乐老师和阿普一起玩拿弹珠的游戏，阿普拿1颗，乐乐老师拿2颗；阿普拿3颗，乐乐老师拿4颗；接着阿普拿了5颗、7颗、9颗、11颗、13颗、15颗，乐乐老师依次拿6颗、8颗、10颗、12颗、14颗、16颗。最后谁得到的弹珠多，多几颗？","solution":"这道题有两种方法。方法一：先算出阿普共拿了多少颗：1+3+5+7+9+11+13+15=64(颗)，再算出乐乐老师共拿了多少颗：最后比较谁多谁少，多多少：72−64=8(颗)。方法二：先算出每次乐乐老师比阿普多拿几颗，发现每一次乐乐老师都比阿普多拿1颗，一共分别拿了8次，所以一共多拿8颗。","answer":"乐乐老师多，多8颗。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_e6","lecture":"xes_02_08","type":"example","num":6,"method":6,"methodTitle":"分糖","methodHint":"拆数法","page":27,"text":"田田、丁丁、牛牛、阿普和6个同学一起分54颗糖，要求每个人都要分到糖，但分到的糖又不能一样多，怎么分？如果不能分，至少应该有多少颗才能够分呢？","solution":"首先要清楚一共有几个人分糖，一共有4+6=10（个）人分糖，条件是每个人都得分到，而且分到的糖的数量都不一样多，所以符合这些条件所需的糖最少为：1+2+3+4+5+6+7+8+9+10=55（块）（10个人从少到多都是相差1块，既可以保证不一样多，又可以保证总数最少）。但是现在只有54块糖，所以不能按照题目的要求分糖。至少要55颗糖才能够分。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p16","lecture":"xes_02_08","type":"practice","num":16,"method":6,"methodTitle":"分糖","methodHint":"拆数法","page":29,"text":"将一堆苹果分别分给8个小朋友，要使每个小朋友都分到苹果，而且每个小朋友分到的苹果的个数又不同，那么，这堆苹果至少要有多少个？","solution":"要想使8个小朋友都得到苹果，而且每个人得到的都不一样多，那么至少需要1+2+3+4+5+6+7+8=36（个)苹果。","answer":"36个。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_p17","lecture":"xes_02_08","type":"practice","num":17,"method":6,"methodTitle":"分糖","methodHint":"拆数法","page":29,"text":"将20个橘子分给6个小朋友，要使每个小朋友都分到橘子，而且每个小朋友分到的橘子的个数不一样多，那么，20个橘子够分吗？如果不够分，至少要多少个才够呢？","solution":"要分给6个小朋友，而且每个人分到的不一样多，所以至少要有1+2+3+4+5+6=21（个）橘子。但是现在只有20个橘子，所以不能按照题目要求分。","answer":"不够分，至少要21个橘子才够分。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_c18","lecture":"xes_02_08","type":"challenge","num":18,"method":6,"methodTitle":"分糖","methodHint":"拆数法","page":30,"text":"自行车车行工作人员开始摆自行车，第一排摆2辆，第二排摆4辆，第三排摆6辆，第四排摆8辆···照这样摆下去，第八排摆几辆呢？","solution":"后面一排比前一排多2辆，依次是2，4，6，8,10,12，14,16，所以第八排是16辆。","answer":"16辆。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_02_08_k19","lecture":"xes_02_08","type":"peak","num":19,"method":6,"methodTitle":"分糖","methodHint":"拆数法","page":30,"text":"时钟1时敲1下,2时敲2下,3时敲3下·…····照这样敲下去，当共敲80下的时候是几时呢？","solution":"从1开始连续加，1+2+3+4+5+6+7+8+9+10+11+12=78（下），但是现在总共敲了80下，比78多2下，但是过了12时之后是1时，敲1下，然后到2时的时候要敲2下，所以最后一下应该是在2时的时候敲的第一下，所以敲第80下的时候应该是2时。","answer":"2时。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_e1","lecture":"xes_03_04","type":"example","num":1,"method":1,"methodTitle":"汉字计数","methodHint":"①确定每行汉字的个数","page":7,"text":"你还记得这首诗吗？请问去掉标点后，这首诗一共有几个字？鹅、鹅、鹅，曲项向天歌，白毛浮绿水，红掌拨清波。十=","solution":"第一排有3个字，后面的三排每排有5个字，我们这样计数比较简单：5×3+3=18（个）或3×5+3=18（个）。还可以把第一排也看成5个，然后把多数的两个减掉，5×4−2=18（个）或4×5−2=18（个），在这道题中，引导学生把“变加为乘”的速算方法灵活地应用到计数中来。所以一共有18个字。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p1","lecture":"xes_03_04","type":"practice","num":1,"method":1,"methodTitle":"汉字计数","methodHint":"①确定每行汉字的个数","page":9,"text":"下面是李白的《静夜思》，问全诗共用了多少个字？床前明月光，疑是地上霜。举头望明月，低头思故乡。","solution":"4×5=20个。","answer":"20个。","answerPage":7,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p2","lecture":"xes_03_04","type":"practice","num":2,"method":1,"methodTitle":"汉字计数","methodHint":"①确定每行汉字的个数","page":9,"text":"看图列算式，算一算下图是由多少个小三角形组成的。","solution":"5×7=35（个）。或7×5=35（个）","answer":"5，7，35。或7，5，35","answerPage":7,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_c3","lecture":"xes_03_04","type":"challenge","num":3,"method":1,"methodTitle":"汉字计数","methodHint":"①确定每行汉字的个数","page":10,"text":"班里举行图形拼摆大赛，牛牛用火柴棒摆成下面的长方形。牛牛一共用了多少根小棒？","solution":"横着数一共有8×4=32（根），竖着数一共有3×9=27(根)，一共有32+27=59(根)。","answer":"59根。","answerPage":7,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_e2","lecture":"xes_03_04","type":"example","num":2,"method":2,"methodTitle":"平面图形计数","methodHint":"①每行/列相同","page":11,"text":"小朋友，请你数一数下面的图形里面有多少个。","solution":"首先我们来看横行，每一横行能数出3个，例：共有3个。4横行一共能数出，3×4=12个再来看竖列，每一竖列能数出3个，4竖列一共能数出，3×4=12个。所以这样在这个图形中，一共能数出12+12=24个","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p4","lecture":"xes_03_04","type":"practice","num":4,"method":2,"methodTitle":"平面图形计数","methodHint":"①每行/列相同","page":13,"text":"下面的图形中你能数出多少个？","solution":"在一个田字格中包含有4个上图中共有4个田字格，这样一共有4×4=16(个)这样的图形。","answer":"16个。","answerPage":7,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_p5","lecture":"xes_03_04","type":"practice","num":5,"method":2,"methodTitle":"平面图形计数","methodHint":"①每行/列相同","page":13,"text":"看图列算式，算一算下图是由多少个小长方体组成的？","solution":"3×6=18（个）。或6×3=18（个）","answer":"6，3，18。或3，6，18","answerPage":7,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_c6","lecture":"xes_03_04","type":"challenge","num":6,"method":2,"methodTitle":"平面图形计数","methodHint":"①每行/列相同","page":14,"text":"丁丁把棋子摆成了下图，他让同学们围正方形，共可以围出多少个","solution":"如下图，一共可以围6个正方形。","answer":"6个。","answerPage":7,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_e3","lecture":"xes_03_04","type":"example","num":3,"method":3,"methodTitle":"小棒计数","methodHint":"①观察小棒是横放还是竖放","page":15,"text":"像下图这样摆出一个长方形，一共用了多少根小棒？","solution":"横着的小棒有8×2=16(根），竖着的小棒有9根，合起来一共有16+9=25（根）。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_p7","lecture":"xes_03_04","type":"practice","num":7,"method":3,"methodTitle":"小棒计数","methodHint":"①观察小棒是横放还是竖放","page":17,"text":"如下图所示，摆出一个正方形，一共用了多少根小棒？","solution":"横着的小棒有3×4=12(根)，竖着的小棒有3×4=12(根），合起来一共有12+12=24(根)。","answer":"24根。","answerPage":7,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_p8","lecture":"xes_03_04","type":"practice","num":8,"method":3,"methodTitle":"小棒计数","methodHint":"①观察小棒是横放还是竖放","page":17,"text":"下图每个图中看不见的小方块各有几个？","solution":"第(1)个图中看不见的有3个小方块；第(2)个图中看不见的有4个小方块。","answer":"（1)3个；(2)4个。","answerPage":7,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_c9","lecture":"xes_03_04","type":"challenge","num":9,"method":3,"methodTitle":"小棒计数","methodHint":"①观察小棒是横放还是竖放","page":18,"text":"田田觉得丁丁摆的图形过于简单，她增加了几枚棋子，也让同学们围正方形，共可以围出多少个？","solution":"先看正着的正方形如下图（1)，可以得到8个正方形，再看斜着的正方形如下图（2），可以得到2个正方形。这样一共可以得到10个正方形。(1) (2)","answer":"10个。","answerPage":7,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_e4","lecture":"xes_03_04","type":"example","num":4,"method":4,"methodTitle":"分散图形计数","methodHint":"按部分分类，变成相同图形","page":19,"text":"小朋友们都玩过跳棋吧！你知道跳棋棋盘上有多少个圆洞吗？","solution":"\n方法一：如图来分割，分成外面6个一样的三角形和里面一个正六边形，里面正六边形共有61个，外面每个三角形有10个洞，6个三角形一共有60个洞。合起来一共是61+60=121（个)洞。\n方法二：如图来分割，然后来计算。六个平行四边形一共有16×6=96（个），六条线段一共有4×6=24（个），中心有1个洞，合起来一共是96+24+1=121（个）洞。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p10","lecture":"xes_03_04","type":"practice","num":10,"method":4,"methodTitle":"分散图形计数","methodHint":"按部分分类，变成相同图形","page":21,"text":"小小飞天王，吐丝织罗网，摆开八卦阵，蚊蝇美美尝。如下图所示，如果蜘蛛网织到第八层，问一共有多少个点？有讲解","solution":"因为每层都是8个点，8层就是64个点，再加上正中心的一个点，蜘蛛网织到第八层一共就有65个点。列式：8×8+1=65（个）。","answer":"65个。","answerPage":8,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_p11","lecture":"xes_03_04","type":"practice","num":11,"method":4,"methodTitle":"分散图形计数","methodHint":"按部分分类，变成相同图形","page":21,"text":"数一数，下图中有多少个？","solution":"一共有15+15+5=35（个）；或15×2+5=35(个）。","answer":"35个。","answerPage":8,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_c12","lecture":"xes_03_04","type":"challenge","num":12,"method":4,"methodTitle":"分散图形计数","methodHint":"按部分分类，变成相同图形","page":22,"text":"乐乐老师拿出中国象棋棋盘，让同学们计算整个棋盘的大小一共相当于多少个小方格？汉界楚河","solution":"每层有8个方格，整个有9层（算大小还要包括中间的河界部分)，这样这个象棋棋盘的大小就相当于8×9=72（个）小方格子的大小。","answer":"72个。","answerPage":8,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_e5","lecture":"xes_03_04","type":"example","num":5,"method":5,"methodTitle":"正方形数","methodHint":"正方形数特点：nXn","page":23,"text":"古希腊学者发现了一些特殊的数，他们用图形表示这些数。你能说出：第7个正方形数是多少吗？","solution":"在正方形数中，第一个是1，第二个每边2个，是2×2=4，第三个每边3个，是3×3=9，依次类推第7个正方形数就是：7×7=49。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p13","lecture":"xes_03_04","type":"practice","num":13,"method":5,"methodTitle":"正方形数","methodHint":"正方形数特点：nXn","page":25,"text":"如下图所示，第8个三角形数是多少？","solution":"通过观察可以发现，在三角形数中，从第二个图形起后一个图形比前一个图形一次增加的点有2，3，4，，那么第8个三角形数是：1+2+3+4+5+6+7+8=36。","answer":"36。","answerPage":8,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_p14","lecture":"xes_03_04","type":"practice","num":14,"method":5,"methodTitle":"正方形数","methodHint":"正方形数特点：nXn","page":25,"text":"数数看，下面这张床是由多少个小正方体组成的？","solution":"我们可以一部分一部分地来数，先数床头部分，一共有4×7=28（个)；再数床身中间部分，4×8+4×8=64（个）；最后数床尾，有4×3=12（个）。合起来这张床一共有28+64+12=104（个），即104个小正方体。","answer":"104个。","answerPage":8,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_c15","lecture":"xes_03_04","type":"challenge","num":15,"method":5,"methodTitle":"正方形数","methodHint":"正方形数特点：nXn","page":26,"text":"阿普用圆片摆了“中国”两个字，你知道这两个字各用了多少个“。”吗？","solution":"通过找规律用简便方法来计算。每个字我们都可以分组来数：“中”一共有：7×2+11+11+12=48（个）或13+13+5×2+12=48（个）。“国”—共有：11+11+10+10+8×3+7=73（个）或12+12+9×2+8×3+7=73(个）。在这个题中有几个相同的数，如果这个数字超过了10，我们就直接加，不用乘法计算。","answer":"48个，73个。","answerPage":8,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_e6","lecture":"xes_03_04","type":"example","num":6,"method":6,"methodTitle":"三角形数","methodHint":"三角形数特点：1+2+3+4+5+6··.","page":27,"text":"非常凑巧，二年级乙班的同学人数恰是一个三角形数，又是一个正方形数。问二年级乙班有多少名同学？（一个班的人数在30人与60人之间)","solution":"因为全班人数在30和60之间，这之间的正方形数只有：6×6=36，7×7=49。检查它们能不能写成三角形数：第8个三角形数是：1+2+3+4+5+6+7+8=36；第9个三角形数是：1+2+3+4+5+6+7+8+9=45<49。第10个三角形数是：1+2+3+4+5+6+7+8+9+10=55>49。所以这个班的人数是36人，36是一个三角形数，也是一个正方形数。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p16","lecture":"xes_03_04","type":"practice","num":16,"method":6,"methodTitle":"三角形数","methodHint":"三角形数特点：1+2+3+4+5+6··.","page":29,"text":"大家知道5050是三角形数吗？如果是，它是第几个？","solution":"1+2+3十*十100=5050，所以5050是三角形数。是第100个三角形数。","answer":"是，第100个三角形数。","answerPage":8,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_04_p17","lecture":"xes_03_04","type":"practice","num":17,"method":6,"methodTitle":"三角形数","methodHint":"三角形数特点：1+2+3+4+5+6··.","page":29,"text":"小圆圈拼图形，数一数有几个小圆圈。ooooo oooooo ooooooo","solution":"把较大的图形分成若干个小图形来数。如下图：可以把这个图形分成相同的6个三角形来计算。一个三角形里有10个，6个三角形就是60个圆圈。还要加上中间的一个就是61个。列式6×10+1=61(个）。dooαQoo","answer":"61个。","answerPage":8,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_03_04_c18","lecture":"xes_03_04","type":"challenge","num":18,"method":6,"methodTitle":"三角形数","methodHint":"三角形数特点：1+2+3+4+5+6··.","page":30,"text":"大家用火柴棒摆成了下面的图形，图中用很多根火柴摆成了一个中空的大三角形。已知大三角形外沿上每条边都是8根火柴，摆成这个图共需要根火柴。","solution":"这个大三角形最外面三条边每边是8根火柴，三条边一共有8×3=24（根）火柴。剩下的就是18个小三角形，每个小三角形由3根火柴摆成，18个小三角形就是18×3=54（根），这样一共就需要24+54=78(根）火柴。","answer":"78。","answerPage":8,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_03_04_k19","lecture":"xes_03_04","type":"peak","num":19,"method":6,"methodTitle":"三角形数","methodHint":"三角形数特点：1+2+3+4+5+6··.","page":30,"text":"在钉子板上围正方形，共可以围出多少个？","solution":"先看正着的正方形如下图（1)，可以得到9+4+1=14（个）正方形，再看斜着的正方形如下图（2)，可以得到4个正方形，如下图(3)，可以得到2个正方形。这样一共可以得到14+4+2=20（个）正方形。(1) (2) (3)","answer":"20个。","answerPage":8,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_e1","lecture":"xes_03_14","type":"example","num":1,"method":1,"methodTitle":"植树问题中的间隔","methodHint":"①种树类型：不封闭型、封闭型","page":7,"text":"植树问题中的间隔有四种不同的情况，只有准确判断，才能找到解决问题的方法（树的宽度忽略不计）。(1)在一条长100米的公路一侧种树，每隔10米种一棵，两端都种，一共要种多少棵树？(2)两座塔之间的距离是50米，现在要在这两座塔之间种树，每隔5米种一棵，一共需要种多少棵树？(3)在一座城堡门前，有一条通往城堡的公路，长40米，现在要在公路的一侧种树，每两棵树之间相隔5米，一共要种几棵树？(4)广场中的圆形花坛一周长80米，现在要在花坛边每隔8米摆一盆花，一共可以摆几盆花？","solution":"对于植树问题，可以通过画图的方法加深对于题目的(1)因为两端都种↑↑ ，段数=总长÷每段长，所以棵数=段数十1,列式：100÷10+1=11（棵）。(2)因为两端是塔介↑↑↑.↑，两端都不种，段数=总长÷每段长，所以棵数=段数一1,列式：50÷5−1=9（棵）。(3)因为一端种树介↑个.个，另一端不种（靠近门的一端），段数=总长÷每段长，所以棵数=段数，列式：40÷5=8（棵）。(4)因为是封闭图形 ，段数=总长÷每段长，所以棵数=段数，列式：80÷8=10（盆）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p1","lecture":"xes_03_14","type":"practice","num":1,"method":1,"methodTitle":"植树问题中的间隔","methodHint":"①种树类型：不封闭型、封闭型","page":10,"text":"两座楼房之间相距40米，每隔4米栽一棵雪松，一共能栽多少棵雪松？（树的宽度忽略不计）","solution":"两座楼房之间栽树，两端都不栽↑↑↑↑…↑,棵数=间隔数一1,列式：40÷4−1=9(棵)，一共能栽9棵。","answer":"9棵。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p2","lecture":"xes_03_14","type":"practice","num":2,"method":1,"methodTitle":"植树问题中的间隔","methodHint":"①种树类型：不封闭型、封闭型","page":10,"text":"在“少年儿童活动中心”的门前，有一条笔直的公路，在公路的一侧种树，两端都种，共种30棵，每两棵树相隔5米，那么这条公路有多长？（树的宽度忽略不计）","solution":"在这段公路的一侧种树，两端都种，所以间隔数=棵数一1。列式：(30-1)×5=145（米），这条公路有145米。","answer":"145米。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_c3","lecture":"xes_03_14","type":"challenge","num":3,"method":1,"methodTitle":"植树问题中的间隔","methodHint":"①种树类型：不封闭型、封闭型","page":11,"text":"乐乐老师组织学生们植树，在一条长120米的马路两边每隔30米种一棵梧桐树（两端都种），在每相邻的2棵梧桐树之间又补种1棵香樟树。这条马路两边一共种了多少棵树？（树的宽度忽略不计)","solution":"120÷30=4（个），一边梧桐树：4+1=5（棵），每个间隔里补种一棵香樟树，一边共有香樟树：1×4=4(棵），马路一边共种了5+4=9（棵），两边共种了9×2=18(棵）。","answer":"18棵。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_e2","lecture":"xes_03_14","type":"example","num":2,"method":2,"methodTitle":"两端都种的植树问题求总长","methodHint":"①段数=棵数—1","page":12,"text":"城墙上从一端到另一端共站了7个士兵两头都站，相邻的两个士兵相隔3米。问：城墙长多少米？（士兵的宽度忽略不计)","solution":"求总长，要用到：总长一间隔长×间隔数；两端都种（都有士兵），要用到：间隔数=棵数（士兵人数）−1。求总长数列式:3×（7−1)=18（米），所以城墙长18米。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p4","lecture":"xes_03_14","type":"practice","num":4,"method":2,"methodTitle":"两端都种的植树问题求总长","methodHint":"①段数=棵数—1","page":14,"text":"一条林荫道上有5只兔子排队做操，相邻两只兔子相隔2米，兔子做操的队伍长多少米？（兔子的宽度忽略不计)","solution":"求总长，要用到：总长=间隔长×间隔数，两端都种（都有兔子），要用到：间隔数=棵数（兔子个数）−1。列式：2×（5−1）=8（米），所以兔子做操的队伍长8米。","answer":"8米。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p5","lecture":"xes_03_14","type":"practice","num":5,"method":2,"methodTitle":"两端都种的植树问题求总长","methodHint":"①段数=棵数—1","page":14,"text":"校园的圆形花坛上放了8盆鲜花，每两盆鲜花之间距离为5米，这个圆形花坛的周长是多少米？（鲜花的宽度忽略不计）","solution":"封闭图形：间隔数=棵数。列式：5×8=40（米)，这个圆形花坛的周长是40米。","answer":"40米。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_c6","lecture":"xes_03_14","type":"challenge","num":6,"method":2,"methodTitle":"两端都种的植树问题求总长","methodHint":"①段数=棵数—1","page":15,"text":"丁丁回家后，给爸爸出了一道植树问题，在一条长45米的公路两边种树，两端都种，共种了20棵树，每隔几米种一棵？（树的宽度忽略不计)","solution":"求间隔长，要用到：间隔长=总长一间隔数；两端都种，要用到：间隔数=棵数一1。间隔数：20÷2−1=9（个），间隔长：45÷9=5(米)。","answer":"5米。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_e3","lecture":"xes_03_14","type":"example","num":3,"method":3,"methodTitle":"封闭型植树问题求总长","methodHint":"①棵数=段数","page":16,"text":"要新建一个圆形喷泉，如果沿喷泉的一周放置雕像，每隔2米放一座，刚好可以放8座，问：这个圆形喷泉一周长是多少米？(雕像的宽度忽略不计)","solution":"求总长，要用到：总长一间隔长×间隔数；封闭图形，要用到：间隔数=棵数（雕像座数）。列式：2×8=16（米），所以这个圆形喷泉一周长是16米。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p7","lecture":"xes_03_14","type":"practice","num":7,"method":3,"methodTitle":"封闭型植树问题求总长","methodHint":"①棵数=段数","page":18,"text":"一个圆形养鱼池，一周总长为42米，要在养鱼池的一周每隔6米种一棵桃树，一共能种多少棵桃树？（树的宽度忽略不计）","solution":"求棵数，先得求间隔数，要用到：间隔数=总长一间隔长，封闭图形，要用到：棵数=间隔数。列式：42÷6=7（棵），所以一共能种7棵桃树。","answer":"7棵。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p8","lecture":"xes_03_14","type":"practice","num":8,"method":3,"methodTitle":"封闭型植树问题求总长","methodHint":"①棵数=段数","page":18,"text":"公园的一条林荫大道长300米，在它的一侧每隔30米放一个垃圾桶，两端都放，一共能放多少个垃圾桶？（垃圾桶的宽度忽略不计)","solution":"两端都要放，垃圾桶的个数=间隔数十1,列式：300÷30+1=11(个）。","answer":"11个。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_c9","lecture":"xes_03_14","type":"challenge","num":9,"method":3,"methodTitle":"封闭型植树问题求总长","methodHint":"①棵数=段数","page":19,"text":"牛牛和爷爷一起从1楼开始爬楼梯锻炼身体，牛牛走得快，爷爷走得慢。牛牛到5楼时，爷爷才到3楼。照这样的速度，牛牛到15楼的时候，爷爷到几楼？","solution":"牛牛爬到5楼，爬了5−1=4（层），爷爷爬到3楼，爬了3−1=2（层），说明爷爷每爬一层，牛牛可以爬2层，那么牛牛到15楼，爬了15−1=14（层），爷爷爬了14÷2=7（层），到了7+1=8(楼)。","answer":"8楼。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_e4","lecture":"xes_03_14","type":"example","num":4,"method":4,"methodTitle":"两端都种的植树问题求棵数","methodHint":"①棵数=段数十1","page":20,"text":"在一条长50米的公路两边种树，每隔10米种一棵，两端都种，这条公路上一共能种多少棵树？(树的宽度忽略不计)","solution":"求棵数，先得求间隔数，要用到：间隔数一总长一间隔长；两端都种，要用到：棵数=间隔数十1。列式：一边：50÷10+1=6（棵），两边：6×2=12（棵）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p10","lecture":"xes_03_14","type":"practice","num":10,"method":4,"methodTitle":"两端都种的植树问题求棵数","methodHint":"①棵数=段数十1","page":22,"text":"一个圆形花坛一周长60米，沿花坛一周每隔3米栽一棵柳树，再在每两棵柳树之间栽2株月季花，花坛一周一共能栽多少株月季花？（树和花的宽度忽略不计）","solution":"求棵数，先得求间隔数，要用到：间隔数一总长一间隔长，封闭图形，要用到：棵数=间隔数。列式：60÷3=20（棵），2×20=40(株)。","answer":"40株。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p11","lecture":"xes_03_14","type":"practice","num":11,"method":4,"methodTitle":"两端都种的植树问题求棵数","methodHint":"①棵数=段数十1","page":22,"text":"圆形花圃的周长是27米，现在每隔3米栽一棵树，一共能栽多少棵树？（树的宽度忽略不计）","solution":"圆形的花圃，棵数=间隔数。列式：27÷3=9(棵)。","answer":"9棵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_c12","lecture":"xes_03_14","type":"challenge","num":12,"method":4,"methodTitle":"两端都种的植树问题求棵数","methodHint":"①棵数=段数十1","page":22,"text":"丁丁和爸爸比赛爬楼梯，两人同时从1楼出发，丁丁到5层时，爸爸到3层，如此算来，丁丁到9层时，爸爸到几层了？","solution":"丁丁到5层实际爬了4个间隔，爸爸到3层实际爬了2个间隔，丁丁到9层需爬8个间隔，所以丁丁爬了8÷4=2（组）4个间隔，爸爸同时爬2组2个间隔。列式：8÷4×2+1=5（层）。","answer":"5层。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_e5","lecture":"xes_03_14","type":"example","num":5,"method":5,"methodTitle":"封闭型植树问题求棵数","methodHint":"①棵数=段数","page":23,"text":"有一块三角形的地，三条边分别为30米，40米，60米，每10米种一棵树，三个角都种，那么三条边上共种多少棵树？（树的宽度忽略不计）","solution":"求棵数，先得求间隔数，要用到：间隔数一总长一间隔长；封闭图形，要用到：棵数=间隔数。列式：总长：30+40+60=130（米），棵数：130÷10=13（棵），所以三条边上共种13棵树。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p13","lecture":"xes_03_14","type":"practice","num":13,"method":5,"methodTitle":"封闭型植树问题求棵数","methodHint":"①棵数=段数","page":25,"text":"森林公园中心有一个圆形鱼塘，一周长是60米，每隔6米种一棵柳树，每相邻两棵柳树之间，均匀地栽种两棵夹竹桃，问：这个圆形鱼塘的一周可以栽种多少棵夹竹桃？ (树的宽度忽略不计)","solution":"求棵数，先得求间隔数，要用到：间隔数=总长一间隔长，封闭图形，要用到：棵数=间隔数。列式：间隔数：60÷6=10（个），央竹桃：10×2=20（棵）。","answer":"20棵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p14","lecture":"xes_03_14","type":"practice","num":14,"method":5,"methodTitle":"封闭型植树问题求棵数","methodHint":"①棵数=段数","page":25,"text":"一个圆形池塘，它的周长是150米，一共种了30棵树，每两棵树之间的距离一样。求每隔多少米种一棵树。（树的宽度忽略不计)","solution":"圆形的池塘，棵数=间隔数。列式：150−30=5(米)。","answer":"5米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_c15","lecture":"xes_03_14","type":"challenge","num":15,"method":5,"methodTitle":"封闭型植树问题求棵数","methodHint":"①棵数=段数","page":26,"text":"马路的一边，每隔8米有1棵杨树。小明乘汽车从学校回家，从看到第一棵树数起到第51棵树为止，共用时2分。小明从学校到家共坐了半小时的汽车。小明的家距学校有多远？（树的宽度忽略不计)","solution":"每两棵相邻的树之间是长8米的一段路，从第1棵树起到第51棵树为止，共有50段路。汽车2分钟走的路程就是8×50=400（米），汽车每分钟走400÷2=200（米），那么汽车半小时一共走了：200×30=6000（米）。","answer":"6000米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_e6","lecture":"xes_03_14","type":"example","num":6,"method":6,"methodTitle":"两端都种的植树问题求段数","methodHint":"①段数=棵数-1","page":27,"text":"在一条长48米的公路一旁种树，两端都种，共种了9棵树，算一算每隔几米种一棵。(树的宽度忽略不计)","solution":"求棵数，先得求间隔数，要用到：间隔长一总长一间隔数；两端都种，要用到：间隔数一棵数一1。列式：间隔数：9−1=8（个），间隔长：48÷8=6（米），所以每隔6米种一棵。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p16","lecture":"xes_03_14","type":"practice","num":16,"method":6,"methodTitle":"两端都种的植树问题求段数","methodHint":"①段数=棵数-1","page":29,"text":"爷爷从1楼到4楼用时12分钟，照这样的速度，他从1楼到5楼需要用时多少分钟？","solution":"爬楼梯问题跟植树问题相似，从1楼到4楼实际走了3个间隔，走3个间隔用时12分钟，那么每个间隔需要用时4分钟。从而1楼到5楼中间有4个间隔，1个间隔需要用时4分钟，4个间隔就需要用时16分钟。列式：12−(4−1)=4(分钟），4×（5−1)=16（分钟）。","answer":"16分钟。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_p17","lecture":"xes_03_14","type":"practice","num":17,"method":6,"methodTitle":"两端都种的植树问题求段数","methodHint":"①段数=棵数-1","page":29,"text":"学校有一条长60米的小道，计划在小道两旁栽树，每隔10米栽一棵（一端栽一端不栽），一共需要多少棵树？（树的宽度忽略不计)","solution":"一边的棵数：60÷10=6（棵）；一共的棵数：6×2=12(棵），共需12棵树。","answer":"12棵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_c18","lecture":"xes_03_14","type":"challenge","num":18,"method":6,"methodTitle":"两端都种的植树问题求段数","methodHint":"①段数=棵数-1","page":30,"text":"几个孩子星期天一起逛公园，在公园中心有一个正方形池塘，在池塘边距离池边3米处围绕池塘种树，一共种了40棵(四个角都种)也围成了一个正方形。如果相邻两棵树之间的距离是2米，那么这个正方形池塘的边长是多少米？（树的宽度忽略不计)","solution":"树围成的正方形周长：40×2=80（米），边长：80÷4=20（米），那么正方形池塘的边长为20−3−3=14(米）。","answer":"14米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_03_14_k19","lecture":"xes_03_14","type":"peak","num":19,"method":6,"methodTitle":"两端都种的植树问题求段数","methodHint":"①段数=棵数-1","page":30,"text":"在一条小路的一侧种树，每隔5米种一棵，两端都种，共种了21棵，这条路有多长？后来小路又加长了30米，仍然每隔5米种一棵，现在这条路上一共种了多少棵树？（树的宽度忽略不计）","solution":"在一条小路的一侧种树，每隔5米种一棵，共种了21棵，可知在这21棵树中有20个间隔，每个间隔长是5米，所以原来这段路长：5×20=100（米）。后来小路又加长了30米，仍然每隔5米种一棵，因为这条路是接着原来修的，所以种树的时候我们也要接着最后一棵来种，这样在30米长的这段路上，第一棵树就是原来最后的那棵树，因此在这段路上种树就变成了一端种树一端不种的问题，在这种情况下间隔数就等于棵数，这样就还需要种30÷5=6（棵），所以现在这段路一共种了21+6=27(棵）。还可以这样想，现在这段路总长是100+30=130（米），一共种树的棵数就是：130÷5+1=27（棵）。","answer":"100米；27棵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_e1","lecture":"xes_04_02","type":"example","num":1,"method":1,"methodTitle":"求被除数","methodHint":"被除数=除数×商十余数","page":7,"text":"根据要求填空。1.( ）÷4=3······2 2.( )÷9=2··..··33.( ）÷5=3.··.….4","solution":"总数=用去的十剩下不够分的=除数×商十余数(1)被除数=4×3+2=14(2)被除数=9×2+3=21(3)被除数=3×5+4=19","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_p1","lecture":"xes_04_02","type":"practice","num":1,"method":1,"methodTitle":"求被除数","methodHint":"被除数=除数×商十余数","page":9,"text":"根据要求填空。(1)( ）÷8=3······4(2)( )÷9=2···.·.5(3)( ）÷5=6··.···4","solution":"总数=用去的十剩下不够分的；被除数=除数×商十余数(1)被除数=8×3+4=28；（2)被除数=9×2+5=23；(3)被除数=5×6+4=34。","answer":"（1)28；(2)23；(3)34。","answerPage":4,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_p2","lecture":"xes_04_02","type":"practice","num":2,"method":1,"methodTitle":"求被除数","methodHint":"被除数=除数×商十余数","page":9,"text":"看图填算式。（个）","solution":"小朋友往往忽视这两道题中单位名称，不同的单位名称的两个除法算式分别表示了除法平均分和包含除两种意义。","answer":"17÷5=3（盘）.….2（个）；17÷3=5（个）·…···2（个）。","answerPage":4,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_04_02_c3","lecture":"xes_04_02","type":"challenge","num":3,"method":1,"methodTitle":"求被除数","methodHint":"被除数=除数×商十余数","page":10,"text":"小朋友带着今天的收获，在乐乐老师的带领下高兴地走在回家的路上，这不，插花姑娘的巧手居然也被他们看成填空的素材，按要求快来试试吧！(1)( )÷6=4······2(2)( ）÷8=5······3(3)59÷( )=8·····3(4)19÷（ ）=3····.4","solution":"被除数=除数×商十余数，除数=（被除数一余数）÷商。列式为：(1)6×4+2=26;(2)8×5+3=43；（3）（59-3)÷8=7；(4)(19-4)÷3=5。","answer":"(1)26；(2)43；(3)7；(4)5。","answerPage":4,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_e2","lecture":"xes_04_02","type":"example","num":2,"method":2,"methodTitle":"求除数","methodHint":"除数=（被除数一余数)÷商","page":11,"text":"根据要求填空。(1)23÷（ )=3····.2 (2)21÷( )=2·...·3(3)22÷（ )=3......4","solution":"除数=（被除数一余数)÷商（1）除数=（23−2）÷3=7；\n（2）除数=（21−3）÷2=9；\n(3）除数=（22−4）÷3=6。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_p4","lecture":"xes_04_02","type":"practice","num":4,"method":2,"methodTitle":"求除数","methodHint":"除数=（被除数一余数)÷商","page":13,"text":"根据要求填空。(1)43÷（ ）=5······3(2)83÷( )=9.·.·.2(3)22÷（ )=3······1","solution":"除数=（被除数一余数)一商（1）除数=（43−3）÷5=8；（2）除数=（83−2)÷9=9；(3）除数=（22-1)÷3=7。","answer":"(1)8；(2)9；(3)7。","answerPage":4,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_p5","lecture":"xes_04_02","type":"practice","num":5,"method":2,"methodTitle":"求除数","methodHint":"除数=（被除数一余数)÷商","page":13,"text":"在里填上“>”“<”或“=”24÷8○14÷4","solution":"小朋友容易认为这两道算式的商都是3，那么就是相等的。其实14÷4=3….2，表示14里面最多有3个4，但是比3个4多点，所以14÷4比3大。","answer":"<。","answerPage":4,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_04_02_c6","lecture":"xes_04_02","type":"challenge","num":6,"method":2,"methodTitle":"求除数","methodHint":"除数=（被除数一余数)÷商","page":14,"text":"小朋友刚做完上一组题,还没有做够，要求插花姑娘再编几个。根据要求在（ )里填上合适的数。(1)下面（ )里最小能填几?)÷（ )=2······4( )÷（ )=5......5(2)下面（ )里最大能填几?)÷9=2······（)÷4=4······(","solution":"知余数，想除数；知除数，想余数。余数一定小于除数。","answer":"（1)（14)÷（5)=2.….4（35）÷（6)=5…·5(2)（26)÷9=2··….（8)（19)÷44····（3)","answerPage":4,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_e3","lecture":"xes_04_02","type":"example","num":3,"method":3,"methodTitle":"余数和除数的关系（1）","methodHint":"①余数<除数","page":15,"text":"根据要求在( )里填上合适的数。(1)下面（ )里最小能填几。)÷（ )=5.·...4 )÷（ )=4··.···9(2)下面（ )里最大能填几。）÷4=5····· ÷9=4······","solution":"想成用火柴棍摆图形：(1)知余数想除数剩下4根不够摆一个图形，所以摆一个图形最少也得5根火柴棍，所以除数最小是5，最小的被除数=5×5+4=29；同理：余数是9，除数最小是10，最小被除数=10×4+9=49。(2）知除数想余数每4根火柴棍摆一个图形，所以剩下不够分的火柴棍可能是1、2、3,所以余数最大是3，最大的被除数=4×5+3=23；同理：除数是9，余数最大是8，最大被除数=9×4+8=44。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_p7","lecture":"xes_04_02","type":"practice","num":7,"method":3,"methodTitle":"余数和除数的关系（1）","methodHint":"①余数<除数","page":17,"text":"根据要求在（ )里填上合适的数。(1)下面（ )里最小能填几。( )÷（ )=3.....·.9( )÷（ )=10.····.2(2)下面（ )里最大能填几。)÷6=5.··..()÷7=4······","solution":"（1)用火柴棍摆图形的方法；剩下9根不够摆一个图形，所以摆一个图形最少也得10根火柴棍，所以除数最小是10，最小的被除数=10×3+9=39；同理：余数是2，除数最小是3，最小被除数=10×3+2=32。(2)知除数想余数：每6根火柴棍摆一个图形，所以剩下不够分的火柴棍可能是1、2、3、4、5，所以余数最大是5，最大的被除数=6×5+5=35；同理：除数是7，余数最大是6，最大被除数=7×4+6=34。","answer":"（1)39,10;32,3。（2)35，5；34，6。","answerPage":4,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_02_p8","lecture":"xes_04_02","type":"practice","num":8,"method":3,"methodTitle":"余数和除数的关系（1）","methodHint":"①余数<除数","page":17,"text":"中余数最大可以填几？余数最小又可以填几？","solution":"求余数看除数，余数一定要比除数小。此题中，余数比6小，那么可以是1，2，3，4，5。注意0不可以哦，因为剩余0就是没有剩余，即没有余数。","answer":"余数最大是5；最小是1。","answerPage":4,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_c9","lecture":"xes_04_02","type":"challenge","num":9,"method":3,"methodTitle":"余数和除数的关系（1）","methodHint":"①余数<除数","page":18,"text":"乐乐老师看到同学们这么用心地交流学习、巩固知识，决定要把手中的卡片平均分给7个小朋友，每人分6个后，发现剩下的卡片不够分了，问乐乐老师手中最少要有多少张卡片？最多能有多少张卡片？","solution":"","answer":"最少有43张；最多有48张。【解祈】题目简化算式如下：（）÷7=6.………（）余数必须小于除数，所以余数最小是1，最大是6。最小数：（）÷7=6…··…1最大数：（）÷7=6..6分出去的卡片的数即商与除数的乘积一定，余数小则被除数小，余数大则被除数大。最少有：7×6+1=43(张）；最多有：7×6+6=48(张)。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_e4","lecture":"xes_04_02","type":"example","num":4,"method":4,"methodTitle":"求最大被除数和最小被除数","methodHint":"①除数一定，余数小则被除数小","page":19,"text":"乐乐老师为了奖励同学们的优秀表现，决定要把手中的苹果分给小朋友吃，平均分给11个人，每人分6个后，剩下的苹果不够分了，乐乐老师手中最少有多少个苹果？最多有多少个苹果?","solution":"题目简化算式如下：)÷11=6.·.··.余数必须小于除数，所以余数最小是1，最大是10。最小数：（ )÷11=6.·...·1最大数：（ )÷11=6.·...·10用去的数，即商×除数的乘积一定，余数小则被除数小，余数大则被除数大。所以结果为：最小数：11×6+1=67（个）；最大数：11×6+10=76（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_p10","lecture":"xes_04_02","type":"practice","num":10,"method":4,"methodTitle":"求最大被除数和最小被除数","methodHint":"①除数一定，余数小则被除数小","page":21,"text":"田田拿出自己的一堆玻璃球，要平均分给8个好朋友，每个小朋友得到7个后，剩下的玻璃球不够分了，问：田田的玻璃球最少有多少个？最多有多少个？","solution":"题目简化算式如下：( ）÷87.…··（ ）被除数=商×除数十余数，商和除数固定，余数小则被除数小，余数大则被除数大。最小数：（ ）÷8=7.….….1最大数：（ ）÷87.….….7所以结果为：最小数：8×7+1=57（个）；最大数：8×7+7=63(个）。","answer":"最少有57个，最多有63个。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_p11","lecture":"xes_04_02","type":"practice","num":11,"method":4,"methodTitle":"求最大被除数和最小被除数","methodHint":"①除数一定，余数小则被除数小","page":21,"text":"·\"·6中除数可以是哪些数？最小的是几？","solution":"求除数看余数，除数一定大于余数。但除数没有最大，只要小朋友举出最大，别人总可以找到比这个小朋友举出的大的数，比如在他基础上加1。","answer":"除数可以是7,8,9…；除数最小是7。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_c12","lecture":"xes_04_02","type":"challenge","num":12,"method":4,"methodTitle":"求最大被除数和最小被除数","methodHint":"①除数一定，余数小则被除数小","page":22,"text":"热心的阿普决定帮助20只小动物找房子，每6只小动物住一间小房子，如果要让小动物都能住进去，阿普至少需要找几间小房子？","solution":"20只小动物，每6只住一间房，可以列式：20−6=3（间）….2（只），小朋友容易简单地认为至少要找3间房，而没有联系实际考虑剩下的2只也要住一间房，所以至少需要3+1=4（间）。总结：租船、坐车等“至少”问题常常要联系实际，「余下也要考虑。","answer":"4间。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_e5","lecture":"xes_04_02","type":"example","num":5,"method":5,"methodTitle":"带余除法应用","methodHint":"①先求每个人分到的玻璃块数和剩下不","page":23,"text":"田田带领7个小朋友一起去擦27块玻璃，先平均分，每个小朋友擦若干块，剩下的不够分，就由田田再擦剩下的玻璃，那么田田一共需要擦多少块玻璃才能完成任务？","solution":"因为是田田带领7个小朋友去擦玻璃，所以27块玻璃平均分给8个小朋友，简化为算式：27÷（7+1)=3·····3可知每个小朋友平均分到3块玻璃，还剩下3块玻璃不田田不仅分到了3块玻璃，而且还要擦剩下不够分的，所以田田一共擦的玻璃数：3+3=6（块）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_p13","lecture":"xes_04_02","type":"practice","num":13,"method":5,"methodTitle":"带余除法应用","methodHint":"①先求每个人分到的玻璃块数和剩下不","page":25,"text":"牛牛决定也把自己手中的卡片和好朋友共同分享，他把23张卡片平均分给5个小朋友，剩下不够分的卡片才留给自己，请问：牛牛最后手中有卡片多少张？","solution":"根据牛牛把23张卡片平均分给5个小朋友，可以列式：23÷5=4……·3（张）；由牛牛把“剩下不够分的卡片才留给自己”可知：牛牛最后的卡片数即余数3张。","answer":"3张。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_p14","lecture":"xes_04_02","type":"practice","num":14,"method":5,"methodTitle":"带余除法应用","methodHint":"①先求每个人分到的玻璃块数和剩下不","page":25,"text":"安装一辆车用4个轮子，现有30个轮子，求最多能安装成几辆车。","solution":"4个轮子一辆车，可以简化为算式：30−4=7（辆）…….2（个），小朋友容易被最多欺骗，误以为可以安装8辆，其实剩余2个轮子是没法安装一辆车的。","answer":"7辆。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_c15","lecture":"xes_04_02","type":"challenge","num":15,"method":5,"methodTitle":"带余除法应用","methodHint":"①先求每个人分到的玻璃块数和剩下不","page":26,"text":"为了感谢阿普和它的朋友们，小动物们拿出了48个梨，每7个装一大盘，剩下的每2个装一小盘，问要装多少大盘和多少小盘？API","solution":"48个梨每7个装一大盘，可以列式：48−7=6（盘）…….6（个），装入小盘的不是全部的梨，而是剩下的梨，列式为：6÷2=3（盘）。","answer":"大盘：6个；小盘：3个。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_e6","lecture":"xes_04_02","type":"example","num":6,"method":6,"methodTitle":"余数和除数的关系（2）","methodHint":"①余数<除数","page":27,"text":"“数”“学”分别代表一个非零的自然数，请你将所有满足下列等式的“数”“学”所代表的数分别列出来。数÷5=8······学","solution":"由于余数<除数，所以“学”可为1，2，3，4。由被除数一除数×商十余数，可求出“数”代表的数。所以结果为：学=1 数=5×8+1=41学=2 数=5×8+2=42学=3 数=5×8+3=43学=4 数=5×8+4=44","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_p16","lecture":"xes_04_02","type":"practice","num":16,"method":6,"methodTitle":"余数和除数的关系（2）","methodHint":"①余数<除数","page":29,"text":"字母A、B分别代表一个非零的自然数，请你将所有满足A÷4=5·…··…·B的AB所代表的数分别列出来。","solution":"由于余数<除数，所以B可为：1、2、3；被除数=除数×商十余数，可求出A。所以结果为：B=1 A=4×5+1=21;B=2 A=4×5+2=22；B=3 A=4×5+3=23。","answer":"B=1 A=21;B=2 A=22；B=3 A=23。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_p17","lecture":"xes_04_02","type":"practice","num":17,"method":6,"methodTitle":"余数和除数的关系（2）","methodHint":"①余数<除数","page":29,"text":"老师带领6个小朋友去春游，他们共带了15瓶水，问平均每人分到了几瓶？最后还剩多少瓶？","solution":"这道题目中小朋友容易误以为一共有6个人，把老师忽略了。列式：15÷（6+1)=2（瓶）…..1（瓶），所以平均每人分到2瓶水，最后还剩1瓶。","answer":"2瓶；1瓶。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_c18","lecture":"xes_04_02","type":"challenge","num":18,"method":6,"methodTitle":"余数和除数的关系（2）","methodHint":"①余数<除数","page":30,"text":"小动物们又拿出了一些苹果，这些苹果不到20个，平均分给6个同学或者平均分给4个同学，发现都剩下2个，问小动物们拿出了多少个苹果？","solution":"小朋友一般无从下手，可用枚举的方法找出20以内分别符合这两个条件（一6余数是2；÷4余数也是2)的数（可从19，18，17，.….，8，从大到小比较好找），再从中找出两个条件都符合的那个数，也就是14。","answer":"14个。","answerPage":5,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_02_k19","lecture":"xes_04_02","type":"peak","num":19,"method":6,"methodTitle":"余数和除数的关系（2）","methodHint":"①余数<除数","page":30,"text":"8个队员围成一圈做传球游戏，从1号开始循环传球，1号传给2号，然后2号传给3号，3号传给4号，4号传给5号*当传到23次时，问球在几号队员的手中？","solution":"8个队员依次传球，不断重复，把8个队员看成一组，看23个数可以分为几组：23−8=2（组）.…..7（次），球正好传到8号队员手中。","answer":"8号。","answerPage":6,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_e1","lecture":"xes_04_06","type":"example","num":1,"method":1,"methodTitle":"基础鸡兔同笼问题（1）","methodHint":"数小，列表法","page":7,"text":"丁丁把鸡、兔关在同一个笼子里，数了数，共有6个头，16条腿，你知道有几只鸡，几只兔吗？","solution":"因为一共有6个头和16条腿，我们可以进行列表尝试，看哪种组合是符合题意的，具体列表如下：鸡只数 6 5兔只数 0 3是否符合题意鸡只数 2 1 0兔只数 4 5 6总腿数 2×2+4×4=201×2+5×4=22 6×4=24是否符合题意根据列表尝试可知，最后的结果是4只鸡，2只兔。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p1","lecture":"xes_04_06","type":"practice","num":1,"method":1,"methodTitle":"基础鸡兔同笼问题（1）","methodHint":"数小，列表法","page":9,"text":"1角硬币和5角硬币一共有6枚，一共2元6角，两种硬币各有多少枚？","solution":"2元6角=26角，因为一共有6枚，我们可以进行列表尝试，看哪种组合是符合题意的，具体列表如下：1角硬币枚数5角硬币枚数5×1+ 4 ×1+ 3×1+总钱数 6×11× 5 2×5 3×5（角） =6 =10 =14 =18是否符X ×合题意1角硬币2 0枚数5角硬币枚数总钱数 2×1+ 4 1×1+56×5=30（角）×5=22×5=26是否符× √合题意根据列表尝试可知，最后的结果是1枚1角硬币,5枚5角硬币。","answer":"1枚；5枚。","answerPage":14,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p2","lecture":"xes_04_06","type":"practice","num":2,"method":1,"methodTitle":"基础鸡兔同笼问题（1）","methodHint":"数小，列表法","page":9,"text":"鸡兔同笼，共有7个头，22条腿，问笼中有几只鸡？几只兔？","solution":"若假设所有的7只动物都是兔子，那么一共应该有4×7=28（条）腿，比实际多算28−22=6(条)腿。而每将一只鸡算做一只兔子会多算4−2=2(条）腿，所以有6÷2=3(只)鸡被当作了兔子，所以共有3只鸡，有7−3=4(只)兔子。","answer":"3只；4只。","answerPage":14,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_c3","lecture":"xes_04_06","type":"challenge","num":3,"method":1,"methodTitle":"基础鸡兔同笼问题（1）","methodHint":"数小，列表法","page":10,"text":"暑假到了，丁丁、牛牛和田田要去野外参加军训，军训营一共有30间宿舍，大宿舍每间住6人，小宿舍每间住4人。已知这些宿舍共住了168人，那么大宿舍有多少间呢？","solution":"如果30间都是小宿舍，那么只能住4×30=120（人），而实际上住了168人。大宿舍比小宿舍每间多住6−4=2（人)，所以大宿舍有(168−120)÷2=24（间）。","answer":"24间。","answerPage":14,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_e2","lecture":"xes_04_06","type":"example","num":2,"method":2,"methodTitle":"基础鸡兔同笼问题（2）","methodHint":"数大，画图法","page":11,"text":"牛牛把鸡、兔关在同一个笼子里，数了数，共有10个头、26条腿，你知道这个笼子里有几只鸡？几只兔？","solution":"因为这道题只和动物的头和腿有关，那么可以画出直观图进行分析。我们可以用“○”表示头，画10个“○”；用“”表示一条腿。\n方法一：先把它们全部看作是腿较少的动物，也就是全部画成鸡。从图中可以看出10只鸡只有20条腿，而条件中说“共有26条腿”，显然少画了26−20=6（条）腿，由于1只兔子比1只鸡多2条腿，6÷2=3（只），所以我们应该在3只鸡的图上再分别加上2条腿，把鸡换成兔子，那么兔子有3只，则鸡有10−3=7（只）。从图中可以看出，笼中有3只兔、7只鸡。\n方法二：先把它们全部看作是腿较多的动物，也就是全部画成兔。从图中可以看出10只兔有4×10=40（条)腿，而条件中说“共有26条腿”，显然多画了40−26=14（条）腿，由于1只兔子比1只鸡多2条腿，14÷2=7（只），所以我们应该在7只兔子的图上再分别减去2条腿，使它们成为鸡，那么鸡就有7只，则兔子有10−7=3（只）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p4","lecture":"xes_04_06","type":"practice","num":4,"method":2,"methodTitle":"基础鸡兔同笼问题（2）","methodHint":"数大，画图法","page":14,"text":"鸡、兔关在同一个笼子里，共有11个头，28条腿，这个笼子里有几只鸡？几只兔？","solution":"我们可以用“”表示头，画11个“”；用“”表示1条腿。把它们全部看作是腿较少的动物，也就是全部画成鸡。从图中可以看出11只鸡有22条腿，而条件中说“共有28条腿”，显然少画了28−22=6（条）腿，由于1只兔子比1只鸡多2条腿，6÷2=3(只)，所以我们应该在3只鸡的图上再分别加上2条腿，把鸡换成兔子，那么兔子有3只，则鸡有11−3=8(只）。从图中可以看出，笼中有8只鸡，3只兔。","answer":"8只鸡；3只兔。","answerPage":14,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p5","lecture":"xes_04_06","type":"practice","num":5,"method":2,"methodTitle":"基础鸡兔同笼问题（2）","methodHint":"数大，画图法","page":14,"text":"鸡兔同笼，共有16个头，42条腿，问笼中有几只鸡？几只兔？","solution":"若假设所有的16只动物都是兔，那么一共应该有4×16=64（条）腿，比实际多算64−42=22(条)腿。而每将一只鸡算做一只兔子会多算4−2=2(条）腿，所以有22÷2=11（只）鸡被当作了兔子，所以共有11只鸡，有16−11=5（只)兔子。","answer":"11只；5只。","answerPage":14,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_c6","lecture":"xes_04_06","type":"challenge","num":6,"method":2,"methodTitle":"基础鸡兔同笼问题（2）","methodHint":"数大，画图法","page":14,"text":"军训的地点非常偏僻，手机没有通信网络信号，只能写信给家里。丁丁需要购买邮票，他用10元钱买了面值5角和2角的邮票，共买了23张，问两种邮票各有多少张？","solution":"我们可以这样想，假如这23张邮票全部是2角的，那么要用2角×23=4元6角，比已知条件少用10元一4元6角=5元4角。由于1张5角的邮票比一张2角的邮票多3角钱，用5元4角÷3角=18（张)，就能求出5角邮票的张数。再用23−18=5（张），求出2角邮票的张数。最后得出买了18张5角的邮票，5张2角的邮票。","answer":"18张；5张。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_e3","lecture":"xes_04_06","type":"example","num":3,"method":3,"methodTitle":"生活中的鸡兔同笼问题（1）","methodHint":"数大，画图法","page":15,"text":"1只蛐蛐6条腿，1只蜘蛛8条腿。有蛐蛐和蜘蛛共10只，共68条腿，蛐蛐和蜘蛛各有多少只？","solution":"通过本题，让学生再练习一下画图法，并通过画图法理解“换”的过程。\n方法一：从图中可以看出10只蛐蛐一共有60条腿，比已知条件少了68−6×10=8(条)腿，而1只蜘蛛比1只蛐蛐多2条腿，8÷2=4（只）。只要在4只蛐蛐的图上再各添2条腿，使它们成为蜘蛛的表示图就可以了。所以共有4只蜘蛛，10−4=6（只）蛐蛐。\n方法二：从图中可以看出10只蜘蛛一共有80条腿，比已知条件多了8×10−68=12(条)腿，而1只蜘蛛比1只蛐蛐多2条腿，12÷2=6（只）。只要在6只蜘蛛的图上再各减去2条腿，就正好是68条腿，这样可知有6只蛐蛐，则蜘蛛有10−6=4（只）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false,"fixed":true},
    {"id":"xesq_04_06_p7","lecture":"xes_04_06","type":"practice","num":7,"method":3,"methodTitle":"生活中的鸡兔同笼问题（1）","methodHint":"数大，画图法","page":17,"text":"1瓶可乐6元，1瓶雪碧8元。牛牛共买这两种饮料8瓶，共花58元。可乐和雪碧各有多少瓶？","solution":"从图中可以看出8瓶可乐一共48元，比已知条件少了58−6×8=10（元），而1瓶雪碧比1瓶可乐多2元，10÷2=5（瓶）。只要在5瓶可乐的图上再各添2元，使它们成为雪碧的表示图就可以了。所以共有5瓶雪碧，8−5=3(瓶)可乐。3瓶可乐5瓶雪碧","answer":"3瓶；5瓶。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p8","lecture":"xes_04_06","type":"practice","num":8,"method":3,"methodTitle":"生活中的鸡兔同笼问题（1）","methodHint":"数大，画图法","page":17,"text":"鸡兔同笼，头共有46个，脚共有128只，问鸡和兔各有几只？","solution":"若假设46只都是兔，一共应有4×46=184（只）脚，这和已知的128只脚相比多了184−128=56（只）脚，这是因为我们把鸡当成了兔子，如果把1只鸡当成1只兔，就要比实际多4−2=2（只）脚，那么56只脚是我们把56÷2=28（只）鸡当成了兔子，所以鸡的只数就是28只，兔子的只数是46−28=18（只）。","answer":"28只；18只。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_c9","lecture":"xes_04_06","type":"challenge","num":9,"method":3,"methodTitle":"生活中的鸡兔同笼问题（1）","methodHint":"数大，画图法","page":18,"text":"虽然军训非常艰苦，但是可喜的是军训场地在茂密的丛林里，这里面有很多动物，其中最可爱的就是小松鼠了。小松鼠最喜爱采松果，晴天时每天可以采10个，雨天时每天只能采6个。它一连几天采了80个松果，平均每天采8个。那么请问其中有几天是雨天呢？","solution":"小松鼠一共采了80÷8=10（天），假设每天都是晴天，那么一共可以采10×10=100（个），而实际上少采了100−80=20（个），少1天晴天，就少采10−6=4（个），所以雨天一共有：20÷4=5（天）。","answer":"5天。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_e4","lecture":"xes_04_06","type":"example","num":4,"method":4,"methodTitle":"基础鸡兔同笼问题（3）","methodHint":"假设法","page":19,"text":"笼子里有一些鸡和兔，共20个头，50条腿。算一算，笼子里有几只鸡？几只兔？","solution":"20个头太多了，再用画图法就很麻烦了，通过分析画图法的算式，引出假设法。如果每只鸡和兔子的腿数相同，那么问题就很简单了，这个我们可以假设所有的动物都是鸡和兔子之中的一种，然后发现和题目中的总腿数不同，那么只要进行最重要的“换”就可以了，具体解法如下：\n方法一：（1)假设全是鸡，应该有几条腿？2×20=40（条）；\n（2)比已知条数少了几条腿？50−40=10（条）；\n(3)一只兔子换一只鸡少几条腿？4−2=2（条）；\n(4)要换几次？10÷2=5（次）；\n(5)共换了几只兔子？5×1=5（只）；\n（6)有几只鸡？20−5=15（只）。\n方法二：(1)假设全是兔子，应该有几条腿？4×20=80(条）；\n（2)比已知条数多了几条腿？80−50=30（条）；\n(3)一只鸡换一只兔子多几条腿？4−2=2（条）；\n（4)要换几次？30÷2=15（次）；\n(5)共换了几只鸡？15×1=15（只）；\n（6)有几只兔子？20−15=5（只）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p10","lecture":"xes_04_06","type":"practice","num":10,"method":4,"methodTitle":"基础鸡兔同笼问题（3）","methodHint":"假设法","page":21,"text":"鸡和兔共有45只，关在同一个笼子中。每只鸡有2条腿，每只兔子有4条腿，笼中共有100条腿。算一算，笼中有鸡多少只？兔子多少只？","solution":"若假设所有的45只动物都是兔子，那么一共应该有4×45=180（条）腿，比实际多算180−100=80(条）腿。而每将1只鸡算做1只兔子会多算2条腿，所以有80÷2=40（只）鸡被当作了兔子，所以共有40只鸡，有45−40=5（只）兔子。","answer":"鸡40只；兔子5只。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p11","lecture":"xes_04_06","type":"practice","num":11,"method":4,"methodTitle":"基础鸡兔同笼问题（3）","methodHint":"假设法","page":21,"text":"和蜘蛛共8只，54条腿，问和蜘蛛各有几只？","solution":"若假设所有的8只动物都是蜘蛛，那么一共应该有8×8=64（条）腿，比实际多算64−54=10(条)腿。而每将一只算做一只蜘蛛会多算8−6=2（条）腿，所以有10÷2=5（只）被当作了蜘蛛，所以共有5只，有8−5=3(只)蜘蛛。","answer":"5只；3只。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_c12","lecture":"xes_04_06","type":"challenge","num":12,"method":4,"methodTitle":"基础鸡兔同笼问题（3）","methodHint":"假设法","page":22,"text":"除了小松鼠，这里还有大型的动物，离军训营不远处有一群舵鸟和大象，它们共有36只眼晴和52只脚，问舵鸟和大象各有多少？","solution":"由于每只动物有两只眼晴，由题意知，舵鸟和大象的总数为36÷2=18（只），假设舵鸟和大象一样也有4只脚，则应该有4×18=72（只）脚，多了72−52=20（只）脚，由假设引起的差值4−2=2（只），则舵鸟数为20÷2=10（只），大象数为18−10=8(头）。","answer":"10只；8头。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_e5","lecture":"xes_04_06","type":"example","num":5,"method":5,"methodTitle":"生活中的鸡兔同笼问题（2）","methodHint":"假设法","page":23,"text":"一辆卡车有6个轮子，一辆小汽车有4个轮子，停车场一共有14辆车，现在一共有72个轮子，你知道卡车和小汽车各有几辆吗？","solution":"\n方法一：(1)假设全都是小汽车，应该有几个轮子？4×14=56(个)；\n（2）比已知轮子数少了几个？72−56=16（个）；\n(3)一辆卡车换一辆小汽车少几个轮子？6−4=2(个）；\n(4)要换几次？16÷2=8(次）；\n(5)共换了几辆卡车？8×1=8(辆）；\n（6)有几辆小汽车？14−8=6(辆）。\n方法二：(1)假设全都是卡车，应该有几个轮子？6×14=84（个）；\n（2)比已知轮子数多了几个？84−72=12（个）；\n(3)一辆小汽车换一辆卡车多几个轮子？6−4=2(个）；\n（4)要换几次？12÷2=6（次）；\n(5)共换了几辆小汽车？6×1=6（辆）；\n（6)有几辆卡车？14−6=8(辆）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p13","lecture":"xes_04_06","type":"practice","num":13,"method":5,"methodTitle":"生活中的鸡兔同笼问题（2）","methodHint":"假设法","page":25,"text":"在一个停车场上，现有车辆41辆，其中汽车有4个轮子，三轮摩托车有3个轮子，这些车共有127个轮子，那么三轮摩托车有多少辆？","solution":"假设都是三轮摩托车，应有3×41=123（个）轮子，少了127−123=4（个）轮子。每把一辆汽车假设为三轮摩托车，会减少4−3=1(个)轮子。汽车有4÷1=4(辆）；从而求出三轮摩托车有41−4=37（辆）。或者假设都是汽车，应有4×41=164（个)轮子，多了164−127=37（个）轮子；所以三轮摩托车有37÷（4−3)=37(辆)。","answer":"37辆。","answerPage":15,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p14","lecture":"xes_04_06","type":"practice","num":14,"method":5,"methodTitle":"生活中的鸡兔同笼问题（2）","methodHint":"假设法","page":25,"text":"三轮车和自行车共有9辆，一共有22个轮子，问三轮车和自行车各有几辆？","solution":"如果让每辆车都抬起1个轮子，那自行车就变成1个轮子，三轮车就变成2个轮子，一共剩下22−9=13(个)轮子；接着再让每辆车都抬起1个轮子，那自行车就变成0个轮子，三轮车就变成1个轮子，一共剩下13−9=4（个)轮子，这些剩下的轮子就都是三轮车的了，一辆三轮车现在还剩下1个轮子，一共4个轮子，那么三轮车有4÷1=4(辆），则自行车有9−4=5(辆）。","answer":"4辆；5辆。","answerPage":16,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_c15","lecture":"xes_04_06","type":"challenge","num":15,"method":5,"methodTitle":"生活中的鸡兔同笼问题（2）","methodHint":"假设法","page":26,"text":"军训了一整天，大家都很饿了，100个同学要分140个馍，大同学1人分3个馍，小同学1人分1个馍。问大同学和小同学各有多少人？","solution":"该题由中国古代算术名题“百僧分馍问题”演变而来。如果将大同学、小同学分别看作鸡和兔，馍看作腿，那么就成了鸡兔同笼问题，可以用假设法来解。算出小同学有80人，大同学有20人。列式：100×3=300（个）300−140=160(个）小同学：160÷（31)=80（人）大同学：100−80=20（人）。","answer":"20人；80人。","answerPage":16,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_e6","lecture":"xes_04_06","type":"example","num":6,"method":6,"methodTitle":"基础鸡兔同笼问题（4）","methodHint":"抬腿法","page":27,"text":"鸡兔同笼，共有14个头，38条腿，有几只鸡？几只兔？","solution":"鸡兔同笼问题的难点在于1只鸡和1只兔子的腿数是不相同的，如果鸡没有腿，兔有腿，那么这个问题就简单了。这样我们可以想一个办法，让鸡没有腿。现在一共是38条腿，如果让每只动物都抬起1条腿，那鸡就变成1条腿，兔子变成3条腿，一共剩下38−14=24（条）腿；接着再让每只动物都抬起1条腿，现在鸡变成0条腿，兔子变成2条腿，一共剩下24−14=10（条）腿，这些剩下的腿就都是兔子的了。1只兔子现在还剩下2条腿，一共10条腿，那么兔子有10÷2=5（只），则鸡有14−5=9（只）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p16","lecture":"xes_04_06","type":"practice","num":16,"method":6,"methodTitle":"基础鸡兔同笼问题（4）","methodHint":"抬腿法","page":29,"text":"1辆自行车有2个轮子，1辆三轮车有3个轮子。车棚里放着的自行车和三轮车共8辆，共20个轮子。自行车、三轮车各有多少辆？","solution":"我们的目标是让其中一种车变成0个轮子。现在一共是20个轮子，如果让每辆车都抬起1个轮子，那自行车就变成1个轮子，三轮车就变成2个轮子，一共剩下20−8=12(个)轮子；接着再让每辆车都抬起1个轮子，那自行车就变成0个轮子，三轮车就变成1个轮子，一共剩下12−8=4（个)轮子，这些剩下的轮子就都是三轮车的了，1辆三轮车现在还剩下1个轮子，一共4个轮子，那么三轮车有4÷1=4（辆），则自行车有8−4=4（辆）。","answer":"4辆；4辆。","answerPage":16,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_p17","lecture":"xes_04_06","type":"practice","num":17,"method":6,"methodTitle":"基础鸡兔同笼问题（4）","methodHint":"抬腿法","page":29,"text":"乐乐老师给幼儿园里的10个小女孩戴漂亮的卡子，一部分小女孩每人戴了2个卡子，另一部分小女孩每人戴了4个卡子。如果这些小女孩一共戴了26个卡子，你知道戴了2个卡子的小女孩有几个吗？","solution":"若假设全部女孩都戴4个卡子，一共有4×10=40（个)卡子，卡子总数比实际多40−26=14(个），戴2个卡子的女孩有14÷(4−2)=7(个）。","answer":"7个。","answerPage":16,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_c18","lecture":"xes_04_06","type":"challenge","num":18,"method":6,"methodTitle":"基础鸡兔同笼问题（4）","methodHint":"抬腿法","page":30,"text":"军训最后一天，牛牛参加结业考试，做对一道题得5分，做错或者没做扣3分。这份卷子一共15道题，牛牛考了35分，你知道他做对了几道题吗？","solution":"该题的难点是做对和做错的题相差的分数是多少，做对得5分，做错扣3分，也就是相差5+3=8（分）。算出做对和做错的题相差的分数以后，就可以用前面学过的任意一种方法解答。算出牛牛做对了10道题。列式：15×5=75（分），75-35=40（分）。错题数：40÷（5+3)=5（道），对题数：15−5=10(道)。","answer":"10道。","answerPage":16,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_06_k19","lecture":"xes_04_06","type":"peak","num":19,"method":6,"methodTitle":"基础鸡兔同笼问题（4）","methodHint":"抬腿法","page":30,"text":"骆驼有两种：背上只有一个驼峰的单峰骆驼和背上有两个驼峰的双峰骆驼。单峰骆驼比较高大，四肢较长，在沙漠中能走能跑；双峰骆驼四肢短粗，更适合在砂砾和雪地上行走。有一群骆驼有23个驼峰，60只脚，那么请问这群骆驼共有多少只？其中双峰骆驼有几只？","solution":"先算出这群骆驼一共有多少只。无论单峰骆驼或者双峰骆驼都是4只脚，所以这群骆驼一共有60÷4=15（只）。然后再进行计算，算出双峰骆驼有8只。列式：15×2=30（个），30-23=7（个）。单峰骆驼：7÷(2-1)=7(只）；双峰骆驼：15-7=8（只）。","answer":"15只，8只。","answerPage":16,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_e1","lecture":"xes_04_12","type":"example","num":1,"method":1,"methodTitle":"基础和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":7,"text":"牛牛说：“要不玩玻璃球？”丁丁说：“不服气就比一比。”阿普帮忙统计了以后只记着：牛牛和丁丁总共有46个玻璃球，丁丁比牛牛多6个。请大家帮忙算一算，牛牛和丁丁各有多少个玻璃球？","solution":"本题是和差问题的基本类型，已知两数的和与两数的差，然后求大小数各是多少。和差问题的思想是把不同变为相同，就可用除法解决问题，用线段图会更形象。(1)小数加差变大数牛牛：L 共46个丁丁：L丁丁：(46+6)÷2=26(个）；牛牛：26−6=20（个）。(2)大数减差变小数牛牛：L丁丁： 46个牛牛：(46−6)÷2=20（个）；丁丁：20+6=26（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p1","lecture":"xes_04_12","type":"practice","num":1,"method":1,"methodTitle":"基础和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":9,"text":"今年姐姐和妹妹的年龄和是14岁，姐姐比妹妹大4岁，问姐姐、妹妹今年各多少岁？","solution":"妹妹：L 4岁 14岁姐姐：(1)去掉4岁，姐姐变得跟妹妹一样大→去差（推荐使用，先求小数更简单）。(2)加上4岁，妹妹变得跟姐姐一样大→加差。妹妹：（14−4)÷2=5(岁）；姐姐：5+4=9(岁)。","answer":"妹妹：5岁；姐姐：9岁。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p2","lecture":"xes_04_12","type":"practice","num":2,"method":1,"methodTitle":"基础和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":9,"text":"丁丁比爸爸小30岁，今年两人年龄和是36，请问今年丁丁和爸爸的年龄各是多少？","solution":"丁丁：36岁 30岁爸爸：列式爸爸：（36+30)÷2=33（岁）；丁丁：36−33=3（岁）。","answer":"丁丁今年3岁；爸爸今年33岁。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_c3","lecture":"xes_04_12","type":"challenge","num":3,"method":1,"methodTitle":"基础和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":10,"text":"几位小朋友学会了和差问题太开心了，决定出发寻找身边的这类问题：瞧，路边有一对双胞胎姐妹，已知她们的身高一共是198厘米，姐姐比妹妹高2厘米，姐姐和妹妹各有多高？","solution":"最基本的和差问题。姐姐高：（198+2)÷2=100（厘米），妹妹高：100−2=98（厘米）。","answer":"姐姐高100厘米；妹妹高98厘米。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_e2","lecture":"xes_04_12","type":"example","num":2,"method":2,"methodTitle":"暗和型和差问题（1）","methodHint":"①先求暗和","page":11,"text":"牛牛和丁丁写大字的速度不变，两人两天一共写了120个字，已知牛牛每天比丁丁多写10个，请问丁丁和牛牛每天各写几个大字？","solution":"首先要弄清楚两天共写了120个大字，那么丁丁和牛牛两人每天写120÷2=60（个）大字，这样对应的和差就找到了。丁丁：1 10个 60个牛牛：L丁丁每天写的大字数为：（60−10)÷2=25（个）；牛牛每天写的大字数为：25+10=35（个）。（注意：此题方法不唯一。)","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p4","lecture":"xes_04_12","type":"practice","num":4,"method":2,"methodTitle":"暗和型和差问题（1）","methodHint":"①先求暗和","page":13,"text":"牛牛和丁丁保持自己相同的速度折飞机，牛牛每小时比丁丁多折10个，他们两人用了3小时共折飞机150个，牛牛和丁丁每小时各折多少个飞机？","solution":"3小时共折飞机150个，那么两人一小时共折：150÷3=50（个）。两数和减去相差数，即可求出：丁丁：(50-10)÷2=20(个）；牛牛：20+10=30（个）。","answer":"丁丁：20个；牛牛：30个。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p5","lecture":"xes_04_12","type":"practice","num":5,"method":2,"methodTitle":"暗和型和差问题（1）","methodHint":"①先求暗和","page":13,"text":"牛牛和丁丁两人用时10分钟折120个飞机，已知牛牛每分钟比丁丁多折2个。请问：丁丁和牛牛每分钟各折几个飞机？","solution":"首先要弄清楚10分钟折了120个飞机，那么丁丁和牛牛两人1分钟折120÷10=12（个）飞机，这样对应的和差就找到了。丁丁：（12−2）÷2=5（个），牛牛：5+2=7（个）。","answer":"丁丁：5个；牛牛：7个。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_c6","lecture":"xes_04_12","type":"challenge","num":6,"method":2,"methodTitle":"暗和型和差问题（1）","methodHint":"①先求暗和","page":14,"text":"双胞胎姐妹手中有许多彩纸，已知平均每人手中有60张，姐姐比妹妹多10张，那么姐姐、妹妹各有多少张？","solution":"姐姐和妹妹手中平均有60张彩纸，可以求出两人手中的彩纸总和为60×2=120（张）；又知道两人手中彩纸相差10张；根据和差思想，求得妹妹的彩纸有：（120−10）÷2=55（张），姐姐的彩纸有：55+10=65（张）。","answer":"姐姐的彩纸有65张；妹妹的彩纸有55张。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_e3","lecture":"xes_04_12","type":"example","num":3,"method":3,"methodTitle":"长方形中的和差问题","methodHint":"找到长和宽对应的和差","page":15,"text":"动物学校有个长方形操场，它的长与宽相差80米，沿操场跑一圈是400米，动物学校操场的长与宽各是多少？","solution":"操场的一圈是指操场的周长，即长与宽的和的二倍。由条件可知：长十宽=400÷2=200(米)；长一宽=80(米)；根据和差问题可知：宽：（400÷2−80)÷2=60（米）；长：60+80=140（米）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p7","lecture":"xes_04_12","type":"practice","num":7,"method":3,"methodTitle":"长方形中的和差问题","methodHint":"找到长和宽对应的和差","page":17,"text":"蚂蚁沿着阿普的课本四周爬了一圈是200厘米，知道课本的长边比短边多30厘米，问阿普课本的长边和短边各是多少厘米？","solution":"已知课本的周长是200厘米，那么长宽之和是200÷2=100（厘米）；又知道长宽之差为30（厘米)，可以转换为和差问题来解决。短边：（100−30)÷2=35（厘米）；长边：35+30=65（厘米)。","answer":"长：65厘米；短：35厘米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p8","lecture":"xes_04_12","type":"practice","num":8,"method":3,"methodTitle":"长方形中的和差问题","methodHint":"找到长和宽对应的和差","page":17,"text":"判断对错。田田和牛牛边走边聊：我们三年前的年龄和是12岁，今年的年龄和为15岁。（","solution":"田田和牛牛三年前的年龄和是12岁，从3年前到今年每人都长三岁，所以今年的年龄和为12+2×3=18（岁）。","answer":"×。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_c9","lecture":"xes_04_12","type":"challenge","num":9,"method":3,"methodTitle":"长方形中的和差问题","methodHint":"找到长和宽对应的和差","page":18,"text":"姐妹两个拿彩纸比赛剪纸花，已知3分钟共剪了36朵，妹妹比姐姐每分钟多剪2朵，那么姐姐、妹妹每分钟各剪几朵？","solution":"姐妹两人3分钟共剪了36朵，说明姐妹两人每分钟共剪36÷3=12（朵）；妹妹比姐姐每分钟多剪2朵，根据和差问题，可求妹妹剪的朵数：（12+2)÷2=7（朵）；姐姐剪的朵数：7−2=5（朵）。","answer":"姐姐每分钟剪5朵；妹妹每分钟剪7朵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_e4","lecture":"xes_04_12","type":"example","num":4,"method":4,"methodTitle":"暗和型和差问题（2）","methodHint":"①先求暗和","page":19,"text":"牛牛在这次测验中，语文和数学的平均分是95分，语文比数学多6分，牛牛在这次测验中，语文和数学各得了多少分？","solution":"由语文比数学多6分，可知语文和数学成绩之差；再找到语文成绩和数学成绩之和就是和差问题。因为语文和数学成绩的平均分是95，那么两科的成绩之和是：95×2=190（分）。根据和差问题可得：数学：（95×2−6)÷2=92（分）；语文：92+6=98（分）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p10","lecture":"xes_04_12","type":"practice","num":10,"method":4,"methodTitle":"暗和型和差问题（2）","methodHint":"①先求暗和","page":21,"text":"牛牛和丁丁的平均身高是130厘米,牛牛比丁丁高10厘米，丁丁和牛牛的身高各是多少厘米？","solution":"由平均身高130厘米可知牛牛和丁丁的身高和是130×2=260（厘米）。根据和差问题可得丁丁：(130×2−10)÷2=125(厘米）；牛牛：125+10=135（厘米）。","answer":"丁丁：125厘米；牛牛：135厘米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p11","lecture":"xes_04_12","type":"practice","num":11,"method":4,"methodTitle":"暗和型和差问题（2）","methodHint":"①先求暗和","page":21,"text":"今年爷爷比阿普大60岁，3年后大多少岁？","solution":"只要没有生老病死，年龄差就不变。设数法：今年爷爷62岁，阿普为2岁；3年后爷爷62+3=65（岁），阿普2+3=5（岁），年龄差为：65-5=60（岁)。","answer":"60岁。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_c12","lecture":"xes_04_12","type":"challenge","num":12,"method":4,"methodTitle":"暗和型和差问题（2）","methodHint":"①先求暗和","page":22,"text":"阿普看到漂亮的纸花，很想装饰一下家里的相框，可是他忘了相框长和宽各是多少了，只记着当时蚂蚁围着相框爬了两圈是80厘米，长比宽多4厘米，小朋友能帮阿普算算相框的长和宽各是多少吗？","solution":"蚂蚁爬了两圈是80厘米，可知相框的两个周长的和是80厘米，相框的周长为：80−2=40（厘米），长十宽=40÷2=20（厘米），长一宽=4（厘米）。据和差问题可求长：（20+4)÷2=12（厘米），宽：12−4=8(厘米）。","answer":"长12厘米；宽8厘米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_e5","lecture":"xes_04_12","type":"example","num":5,"method":5,"methodTitle":"暗差型和差问题","methodHint":"增同减同差不变","page":23,"text":"豆豆和毛毛一共有34个巧克力豆，两人都吃了同样的巧克力豆后，分别还剩15个和11个，问原来豆豆和毛毛各有多少个巧克力豆？","solution":"这里知道两人的巧克力豆个数之和，只要找到两人巧克力豆个数之差就是典型的和差问题。毛毛：L 11个豆豆：L 15个 34个由上图可知，吃了同样多后差多少，原来就差多少。差：15−11=4（个）；由和差问题可列式：毛毛：（34-4)÷2=15（个）；豆豆:34−15=19（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p13","lecture":"xes_04_12","type":"practice","num":13,"method":5,"methodTitle":"暗差型和差问题","methodHint":"增同减同差不变","page":25,"text":"大毛、二毛共有33元，两人花掉同样的钱后，大毛还有19元，二毛还有6元，问原来大毛、二毛各有多少钱？","solution":"两人花掉同样多的钱后，各剩19元和6元，可知现在大毛、二毛的钱差13元，增同减同差不变，可知原来的大毛和二毛的钱的差也是13元。差：19−6=13（元）；二毛：（33−13）÷2=10（元）；大毛：33−10=23（元）。","answer":"大毛：23元；二毛：10元。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p14","lecture":"xes_04_12","type":"practice","num":14,"method":5,"methodTitle":"暗差型和差问题","methodHint":"增同减同差不变","page":25,"text":"牛牛和田田都有一些玻璃球，拿走同样多后，牛牛有20个，田田有13个，原来牛牛比田田的玻璃球多多少个？","solution":"增同减同差不变：拿走同样多或者拿来同样多，现在的差一原来的差。牛牛比田田的玻璃球多：20−13=7（个）。","answer":"7个。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_c15","lecture":"xes_04_12","type":"challenge","num":15,"method":5,"methodTitle":"暗差型和差问题","methodHint":"增同减同差不变","page":26,"text":"姐妹两人共给了阿普20朵纸花，阿普分别从姐姐和妹妹给的纸花里拿走同样多后，发现姐姐给的还有7朵，妹妹给的还有5朵，问姐姐、妹妹各给了阿普几朵纸花？","solution":"这道题和为20，找到差数即可；拿走同样多后，姐姐和妹妹给的纸花相差数为：7−5=2（朵），可知姐姐和妹妹原来给的纸花相差数为2朵，姐姐给的朵数：（20+2)÷2=11（朵），妹妹给的朵数：11−2=9（朵）。","answer":"姐姐给了11朵，妹妹给了9朵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_e6","lecture":"xes_04_12","type":"example","num":6,"method":6,"methodTitle":"年龄问题中的和差问题","methodHint":"①寻找和差对应的时间","page":27,"text":"牛牛3年前的年龄与阿普2年后的年龄之和是23岁，牛牛3年后的年龄等于阿普1年前的年龄，牛牛、阿普今年的年龄各是多少岁？","solution":"(1)牛牛3年后的年龄等于阿普1年前的年龄，说明牛牛比阿普小3+1=4（岁）；\n(2)牛牛3年前的年龄与阿普2年后的年龄之和是23岁，说明二人今年的年龄和是：23+3−2=24（岁）；\n(3)根据和差问题模型，求得今年牛牛的年龄：（24−4)÷2=10（岁）,阿普的年龄：24−10=14（岁）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p16","lecture":"xes_04_12","type":"practice","num":16,"method":6,"methodTitle":"年龄问题中的和差问题","methodHint":"①寻找和差对应的时间","page":29,"text":"红红2年前的年龄与果果1年后的年龄相等，红红3年前的年龄与果果2年后的年龄和为18岁，则红红、果果今年各多少岁？","solution":"红红2年前的年龄与果果1年后的年龄相等，说明红红比果果大2+1=3（岁）；红红3年前的年龄与果果2年后的年龄和为18岁，说明二人今年的年龄和为：18+3−2=19（岁）；根据和差问题，今年果果的年龄：（19−3)÷2=8（岁)，红红的年龄：19−8=11（岁）。","answer":"红红的年龄：11岁；果果的年龄：8岁。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_p17","lecture":"xes_04_12","type":"practice","num":17,"method":6,"methodTitle":"年龄问题中的和差问题","methodHint":"①寻找和差对应的时间","page":29,"text":"有大小两个塑料袋，共装了50个乒乓球，拿走同样多的乒乓球后，分别还有20个和10个，问原来两个塑料袋里各有多少个乒乓球呢？","solution":"增同减同差不变，所以原来的差就是现在的差：20−10=10（个）。原来的和为50个，根据和差思想可得：小袋里有：（50−10)÷2=20（个），大袋里有：20+10=30（个）。","answer":"20个；30个。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_c18","lecture":"xes_04_12","type":"challenge","num":18,"method":6,"methodTitle":"年龄问题中的和差问题","methodHint":"①寻找和差对应的时间","page":30,"text":"阿普决定把他家冰箱里的水果送给姐姐和妹妹，阿普只知道上下两层共有34个水果，如果从上层拿出5个放入下层，那么两层的水果就一样多了。请你算一下，快告诉阿普：冰箱上下两层各有多少个水果？","solution":"从上层拿出5个放入下层，两层就一样多，可知上下层差：2×5=10（个）。下层水果个数：(34−10)÷2=12（个），上层水果个数：12+10=22（个）。","answer":"上层：22个；下层：12个。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_12_k19","lecture":"xes_04_12","type":"peak","num":19,"method":6,"methodTitle":"年龄问题中的和差问题","methodHint":"①寻找和差对应的时间","page":30,"text":"便民停车场早上8点停放的车辆数如下：地面和地下共停车100辆，如果地面停车场再开来15辆，地下停车场开走5辆，这时地面和地下停车场的车辆数就一样多了。问原来地面和地下各停着多少辆车？","solution":"由地面停车场再开来15辆，地下停车场开走5辆就一样多了可知：地面和地下停车场的车辆差：15+5=20（辆），地面停放车辆：（100−20）÷2=40（辆)，地下停放车辆：100−40=60(辆)。","answer":"地面车辆有40辆；地下车辆有60辆。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_e1","lecture":"xes_04_16","type":"example","num":1,"method":1,"methodTitle":"认识年龄差","methodHint":"年龄差永不变","page":7,"text":"丁丁今年8岁，爸爸的年龄是丁丁的4倍，4年前，爸爸的年龄和丁丁相差几岁？","solution":"\n方法一：爸爸今年的年龄是8×4=32（岁），今年爸爸就比丁丁大32−8=24（岁）。4年前，爸爸的年龄和丁丁相差24\n方法二：爸爸和丁丁的年龄差相当于丁丁年龄的4−1=3倍，是8×3=24（岁）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p1","lecture":"xes_04_16","type":"practice","num":1,"method":1,"methodTitle":"认识年龄差","methodHint":"年龄差永不变","page":9,"text":"田田今年6岁，妈妈今年36岁，再过6年，田田读初中时，妈妈比田田大多少岁？","solution":"虽然田田和妈妈的岁数都在不断变大，但她们两人相差的岁数永远不变。今年妈妈比田田大36−6=30（岁），不管过多少年，妈妈比田田都大30岁。","answer":"30岁。","answerPage":36,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p2","lecture":"xes_04_16","type":"practice","num":2,"method":1,"methodTitle":"认识年龄差","methodHint":"年龄差永不变","page":9,"text":"牛牛今年8岁，爸爸比他大26岁。请问：3年前，牛牛比爸爸小多少岁？","solution":"年龄差不变，3年前，牛牛比爸爸依然小26岁。","answer":"26岁。","answerPage":36,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_c3","lecture":"xes_04_16","type":"challenge","num":3,"method":1,"methodTitle":"认识年龄差","methodHint":"年龄差永不变","page":10,"text":"今天数学课，老师要给大家做关于年龄的数学题，同学们也可以踊跃参加出题，丁丁和田田都跃跃欲试。第一题由乐乐老师提出：“今年兄弟二人的年龄和是26岁，3年后哥哥比弟弟大4岁。那么今年哥哥和弟弟各是多少岁？”","solution":"根据年龄差不变，再根据和差问题的解题方法。今年哥哥的年龄：(26+4)÷2=15（岁），今年弟弟的年龄：（26−4)÷2=11（岁）。","answer":"哥哥15岁；弟弟11岁。","answerPage":36,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_e2","lecture":"xes_04_16","type":"example","num":2,"method":2,"methodTitle":"计算年龄差","methodHint":"年龄差永不变","page":11,"text":"田田今年10岁，博士今年55岁，当田田17岁时，博士多少岁？","solution":"\n方法一：田田和博士的年龄差是55−10=45（岁），当田田17岁时年龄差还是45岁，所以博士是17+45=62（岁）。\n方法二：田田长了17−10=7（岁），博士也得长7岁，所以博士是55+7=62（岁）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p4","lecture":"xes_04_16","type":"practice","num":4,"method":2,"methodTitle":"计算年龄差","methodHint":"年龄差永不变","page":13,"text":"小芳今年10岁，妈妈比她大28岁，当小芳15岁时，妈妈多少岁？","solution":"有两种思考方法，具体分析如下：方法一：今年，小芳10岁，妈妈的年龄是10+28=38（岁）。当小芳15岁时，也就是过了5年，妈妈也大了5岁。所以，小芳15岁时，妈妈是38+5=43（岁）。方法二：不管过多少年，两个人的年龄差不变。当小芳15岁时，妈妈还是比她大28岁，所以也可直接用28+15=43（岁）来算。（比较之后，此方法较简单）","answer":"43岁。","answerPage":36,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p5","lecture":"xes_04_16","type":"practice","num":5,"method":2,"methodTitle":"计算年龄差","methodHint":"年龄差永不变","page":13,"text":"丁丁今年6岁，妈妈的年龄是丁丁的5倍，请问：4年前，妈妈比丁丁大多少岁？","solution":"方法一：5×6=30（岁），30-6=24（岁），4前年妈妈比丁丁大24岁。方法二：6×(5-1)=24（岁），4前年妈妈比丁丁大24岁。","answer":"24岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_c6","lecture":"xes_04_16","type":"challenge","num":6,"method":2,"methodTitle":"计算年龄差","methodHint":"年龄差永不变","page":14,"text":"乐乐老师继续出题：“牛牛今年12岁，田田4年后的年龄和牛牛两年前的年龄相等，那么田田今年几岁?”","solution":"4+2=6（岁），田田和牛牛相差6岁。牛牛今年12岁，所以田田今年12−6=6（岁）。","answer":"6岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_e3","lecture":"xes_04_16","type":"example","num":3,"method":3,"methodTitle":"两人的年龄和问题","methodHint":"每人每年长一岁","page":15,"text":"今年小王子8岁，大王子14岁，当两人的年龄之和是40岁时，应该是几年之后？","solution":"今年两人年龄和：8+14=22（岁）；几年之后两人共长：40−22=18（岁）；几年之后小王子长几岁，大王子就长几岁，所以分别长了：18÷2=9（岁）；所以当两人年龄之和是40岁时，应该是9年之后。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p7","lecture":"xes_04_16","type":"practice","num":7,"method":3,"methodTitle":"两人的年龄和问题","methodHint":"每人每年长一岁","page":17,"text":"今年太子8岁，王后34岁，当太子和王后两人的年龄和是50岁时，太子多少岁？王后多少岁？","solution":"方法一：今年两人年龄和：8+34=42（岁）；几年之后两人共长：50−42=8（岁）。几年之后太子长几岁，王后就长几岁，所以分别长了8÷2=4（岁）。所以当太子和王后两人的年龄和是50岁时，太子的年龄是：8+4=12（岁），王后的年龄是：34+4=38（岁）。方法二：根据年龄差不变，再用和差问题的方法来解决。年龄差：34−8=26（岁）；太子的年龄是：(50−26）÷2=12（岁）；王后的年龄是：12+26=38(岁)。","answer":"12岁；38岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p8","lecture":"xes_04_16","type":"practice","num":8,"method":3,"methodTitle":"两人的年龄和问题","methodHint":"每人每年长一岁","page":17,"text":"爷爷今年75岁，爸爸比爷爷小30岁。当爷爷60岁时，爸爸多少岁？","solution":"当爷爷60岁时，爸爸还是比爷爷小30岁，爸爸当时的年龄就是：60−30=30（岁）。","answer":"30岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_c9","lecture":"xes_04_16","type":"challenge","num":9,"method":3,"methodTitle":"两人的年龄和问题","methodHint":"每人每年长一岁","page":18,"text":"这个时候田田说道：“我出一道爷孙的题目吧！爷爷今年72岁，孙子今年12岁，问几年后爷爷的年龄是孙子的4倍？”","solution":"爷爷与孙子的年龄差：72−12=60（岁）；当爷爷的年龄是孙子的4倍时，孙子的年龄是：60÷（4−1)=20（岁）；几年后爷爷的年龄是孙子的4倍：20-12=8(年）。","answer":"8年。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_e4","lecture":"xes_04_16","type":"example","num":4,"method":4,"methodTitle":"三人的年龄和问题","methodHint":"每人每年长一岁","page":19,"text":"爸爸今年40岁，妈妈今年38岁，儿子今年12岁，当爸爸、妈妈、儿子三人的年龄和是81岁时，爸爸多少岁？妈妈多少岁？儿子多少岁？","solution":"今年爸爸、妈妈、儿子三人的年龄和是：40+38+12=90（岁）；几年前三人年龄和是81岁：（90−81)÷3=3（年）;那时爸爸的年龄是：40−3=37（岁）；那时妈妈的年龄是：38−3=35（岁）；那时儿子的年龄是：12−3=9（岁）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p10","lecture":"xes_04_16","type":"practice","num":10,"method":4,"methodTitle":"三人的年龄和问题","methodHint":"每人每年长一岁","page":21,"text":"李文今年9岁，爸爸、妈妈的年龄和是81岁，问：多少年后他们三个的平均年龄是40岁？","solution":"经过若干年后，他们三人的年龄和是|÷2=60（岁），父亲现在60−12=48（岁）。40×3=120（岁），比现在三人的年龄和多：120−（9+81）=30（岁），所以，要经过30÷3=10(年)。","answer":"10年。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p11","lecture":"xes_04_16","type":"practice","num":11,"method":4,"methodTitle":"三人的年龄和问题","methodHint":"每人每年长一岁","page":21,"text":"妹妹今年6岁，哥哥今年15岁，当哥哥21岁时，妹妹几岁？","solution":"方法一：21−15=6（岁），6+6=12（岁），当哥哥21岁时，妹妹12岁。方法二：15−6=9（岁），21-9=12（岁），当哥哥21岁时，妹妹12岁。","answer":"12岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_c12","lecture":"xes_04_16","type":"challenge","num":12,"method":4,"methodTitle":"三人的年龄和问题","methodHint":"每人每年长一岁","page":22,"text":"丁丁也跃跃欲试好久了，说道：“一家三口人，三人年龄之和是72岁，妈妈和爸爸同岁，妈妈的年龄是孩子的4倍，问三人各是多少岁？”","solution":"妈妈的年龄是孩子的4倍，爸爸和妈妈同岁，那么爸爸的年龄也是孩子的4倍，把孩子的年龄作为1倍数，已知三口人年龄和是72岁，那么孩子的年龄为：72÷（1+4+4）=8（岁），妈妈的年龄是：8×4=32（岁），爸爸也是32岁。","answer":"妈妈32岁；爸爸32岁；孩子8岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_e5","lecture":"xes_04_16","type":"example","num":5,"method":5,"methodTitle":"年龄问题中的和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":23,"text":"李斯、韩非现在的年龄和是62岁，5年前，李斯比韩非大6岁，今年李斯、韩非两人各多少岁？","solution":"根据年龄差不变，再用和差问题的方法来解决。列式：韩非今年的年龄：（62−6）÷2=28（岁）；李斯今年的年龄：28+6=34（岁）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p13","lecture":"xes_04_16","type":"practice","num":13,"method":5,"methodTitle":"年龄问题中的和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":25,"text":"爸爸、妈妈现在的年龄和是72岁；5年后，爸爸比妈妈大6岁。今年爸爸妈妈二人各多少岁？","solution":"5年后，爸爸比妈妈大6岁，即爸妈的年龄差是6岁。它是一个不变量。所以爸爸、妈妈现在的年龄差仍然是6岁。这样原问题就归结成“已知爸爸、妈妈的年龄和是72岁，他们的年龄差是6岁，求二人各是几岁”的和差问题。爸爸的年龄：（72+6)÷2=39（岁）；妈妈的年龄：39−6=33（岁）。","answer":"39岁，33岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p14","lecture":"xes_04_16","type":"practice","num":14,"method":5,"methodTitle":"年龄问题中的和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":25,"text":"爸爸今年39岁，儿子今年10岁，问几年前，父子的年龄和是37岁？","solution":"今年两人年龄和：39+10=49（岁）；几年前，父子的年龄和是37岁：(49−37)÷2=6（年）。","answer":"6年。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_c15","lecture":"xes_04_16","type":"challenge","num":15,"method":5,"methodTitle":"年龄问题中的和差问题","methodHint":"大数=（和十差）÷2；小数=（和一差）÷2","page":26,"text":"整个班级的同学都十分活跃，这个时候，牛牛说道：“我也出一道吧，父亲与两个儿子的年龄和为84岁，12年后父亲的年龄正好等于两个儿子的年龄和，那么父亲现在多少岁？”","solution":"三人现在的年龄和是84岁，12年后的年龄和是84+12×3=120（岁），那时父亲是120","answer":"48岁。","answerPage":37,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_e6","lecture":"xes_04_16","type":"example","num":6,"method":6,"methodTitle":"年龄问题中的暗差问题","methodHint":"画年龄轴","page":27,"text":"姐姐5年前的年龄与妹妹3年后的年龄相等，问姐姐和妹妹相差多少岁？","solution":"此题可以画年龄轴进行分析。可以推算出姐姐与妹妹的年龄差是3+5=8（岁）。3年 5年妹妹姐姐","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p16","lecture":"xes_04_16","type":"practice","num":16,"method":6,"methodTitle":"年龄问题中的暗差问题","methodHint":"画年龄轴","page":29,"text":"小明12年后的年龄与妈妈12年前的年龄相等，问小明和妈妈相差多少岁？","solution":"此题可以画年龄轴进行分析。可以推算出小明与妈妈的年龄差是12+12=24(岁）。12年 12年小明妈妈","answer":"24岁。","answerPage":38,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_p17","lecture":"xes_04_16","type":"practice","num":17,"method":6,"methodTitle":"年龄问题中的暗差问题","methodHint":"画年龄轴","page":29,"text":"今年爸爸是32岁，儿子是4岁，当父子俩年龄之和是50岁时，爸爸和儿子各多少岁？API","solution":"方法一：今年两人年龄和：32+4=36（岁）；几年后，父子的年龄和是50岁：（50−36)÷2=7(年）；儿子的年龄是：4+7=11(岁)；爸爸的年龄是：32+7=39（岁）。方法二：根据年龄差不变，再根据和差问题的解题方法。32−4=28（岁），(50-28)÷2=11（岁）,11+28=39（岁）。当父子俩年龄之和是50岁时，儿子11岁，爸爸39岁。","answer":"爸爸39岁；儿子11岁。","answerPage":38,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_04_16_c18","lecture":"xes_04_16","type":"challenge","num":18,"method":6,"methodTitle":"年龄问题中的暗差问题","methodHint":"画年龄轴","page":30,"text":"忽然，阿普的机器人出现了，他哎哎地说道：“我出一道关于小动物的吧。”题目是这样的，小象今年18岁，大象对小象说：“当你像我这么大时，我已经62岁了。”你知道大象今年多少岁吗？","solution":"此题可以画年龄轴进行分析。大象比小象大的年龄等于小象长的年龄。小象要长几年才能长到大象的年龄呢？（62−18)÷2=22（年），即大象与小象的年龄相差了22岁。今年大象的年龄就是：22+18=40（岁）或62-22=40（岁）。18岁小象大象 62岁","answer":"40岁。","answerPage":38,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_04_16_k19","lecture":"xes_04_16","type":"peak","num":19,"method":6,"methodTitle":"年龄问题中的暗差问题","methodHint":"画年龄轴","page":30,"text":"李伟5年前的年龄与张磊8年后的年龄相等。李伟4年后与张磊3年前的年龄和是36岁，问李伟和张磊两人今年各多少岁？","solution":"由题中“李伟5年前的年龄与张磊8年后的年龄相等”这个条件可知李伟比张磊大5+8=13（岁）；又由题目中“李伟4年后与张磊3年前的年龄和是36岁”可知他们两人今年的年龄和是：36+3−4=35（岁）。再根据和差关系可以解答，李伟的年龄是：（35+13)÷2=24（岁），张磊的年龄是：35−24=11（岁）。","answer":"李伟24岁；张磊11岁。","answerPage":38,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_e1","lecture":"xes_05_04","type":"example","num":1,"method":1,"methodTitle":"两位数乘一位数","methodHint":"求几个相同加数的和，用乘法","page":7,"text":"看图列算式。(1) 每棵树上有（2）每棵树上有38个桃子， 42个苹果，一共有多少一共有多少个桃子呢？个苹果呢？","solution":"(1)有3棵树，每棵树上有桃子38个，求总共有多少个桃子。那么就是38+38+38,3个38相加,根据乘法的意义，可列式为38×3=114（个）。(2)有8棵树，每棵树上有苹果42个，求总共有多少个苹果。那么就是42+42+42+42+42+42+42+42，8个42相加，根据乘法的意义，可列式为42×8=336（个）。两道题的竖式如下：(1) 3 8 (2) 4 2× 3×8","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_05_04_p1","lecture":"xes_05_04","type":"practice","num":1,"method":1,"methodTitle":"两位数乘一位数","methodHint":"求几个相同加数的和，用乘法","page":9,"text":"列竖式计算。(1)13×4(2)24×5(3)46×8","solution":"(1) 13 (2) 2414×25(3) 46","answer":"(1)52；(2)120；(3)368。","answerPage":9,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p2","lecture":"xes_05_04","type":"practice","num":2,"method":1,"methodTitle":"两位数乘一位数","methodHint":"求几个相同加数的和，用乘法","page":9,"text":"列竖式计算。(1)38×9(2)19×7(3)56×8","solution":"× 79× 67×8","answer":"(1)342；(2)133；(3)448。3 8","answerPage":9,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_c3","lecture":"xes_05_04","type":"challenge","num":3,"method":1,"methodTitle":"两位数乘一位数","methodHint":"求几个相同加数的和，用乘法","page":10,"text":"今天，大家学会了乘法竖式计算，掌握了新的计算工具，同学们可高兴啦！乐乐老师在课堂上出题目，大家随便抽。谁做对了谁可以获得五枚小印章。首先，牛牛抽到了这道题：计算：124×13-204×5+44×70","solution":"124×13−204×5+44×70=1612−1020+3080=3672。加减乘除统称四则运算。其中：加法和减法是第一级运算；乘法和除法是第二级运算。同级运算时，先从左往右依次算；两级运算时，先算乘除，再算加减。","answer":"3672。","answerPage":9,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_e2","lecture":"xes_05_04","type":"example","num":2,"method":2,"methodTitle":"两位数乘两位数","methodHint":"①列竖式","page":11,"text":"请同学们列竖式计算下列算式。(1）21×13 (2）45×68 (3）75×61","solution":"(1) 21 (2) 45 (3) 75×13 648 6163 3.60 3.752,70 450","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p4","lecture":"xes_05_04","type":"practice","num":4,"method":2,"methodTitle":"两位数乘两位数","methodHint":"①列竖式","page":13,"text":"请同学们列竖式计算下列算式。(1)23×17(2)41×34(3)24×38","solution":"(1) 23 (2) 4 1×127×34(3) 24×387.2","answer":"（1)391；（2）1394；（3）912。","answerPage":9,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p5","lecture":"xes_05_04","type":"practice","num":5,"method":2,"methodTitle":"两位数乘两位数","methodHint":"①列竖式","page":13,"text":"列竖式计算。(1)63×47(2)96×89(3)22×47","solution":"X 42 7 8592 5.2 7.6.82 24 .78.8","answer":"(1)2961；(2)8544；(3)1034。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_c6","lecture":"xes_05_04","type":"challenge","num":6,"method":2,"methodTitle":"两位数乘两位数","methodHint":"①列竖式","page":14,"text":"田田紧跟其后，抽到了这道题：计算：47+69×12+14+234×5","solution":"47+69×12+14+234×5=47+828+14+1170=2059。","answer":"2059。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_e3","lecture":"xes_05_04","type":"example","num":3,"method":3,"methodTitle":"走马灯数","methodHint":"按顺序轮值一次，到第7天，结果是999999","page":15,"text":"你能算出下面算式的结果吗？你发现规律了吗？(1)142857×1 (2)142857×2 (3)142857×3(4)142857×4 (5)142857×5 (6)142857×6(7)142857×7","solution":"(1)142857×1=142857 （原数）（2)142857×2=285714 (轮值)(3)142857×3=428571 （轮值）（4)142857×4=571428 (轮值)(5)142857×5=714285 （轮值）（6)142857×6=857142 (轮值）(7)142857×7=999999 （休息）规律：这是神奇的142857，又名“走马灯数”。它的计算规律为一星期有7天，每自我累加一次，就由它的6个数字，依顺序轮值一次，到了第7天，它们就放假，结果为999999。不论乘几总能得到由142857这几个数字按一定的顺序组成的数字。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p7","lecture":"xes_05_04","type":"practice","num":7,"method":3,"methodTitle":"走马灯数","methodHint":"按顺序轮值一次，到第7天，结果是999999","page":17,"text":"请列竖式计算下面各题。(1)63×11(2)11×43(3)52×11","solution":"(1) 63 (2) 1 1× 1 1 × 4363 33693 473(3) 52× 11规律：在计算一个数乘11的时候，我们可以使用竖式，也可以用一个叫作“拉面法”的小技巧：两头一拉，中间相加。例如：63×11，我们可以将63两头拉开，6在百位，3在个位；中间相加，即十位就是6+3=9。按照这个规律，我们可以直接算出63×11=693。其他题目同理。","answer":"（1）693；（2）473；（3）572。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p8","lecture":"xes_05_04","type":"practice","num":8,"method":3,"methodTitle":"走马灯数","methodHint":"按顺序轮值一次，到第7天，结果是999999","page":17,"text":"列竖式计算。(1)25×11(2)323×11(3)4036×11","solution":"(1) (2) 3 2 3× 1 1 1 1(3) 4 0 3 6×1 1","answer":"(1)275；(2)3553；(3)44396。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_c9","lecture":"xes_05_04","type":"challenge","num":9,"method":3,"methodTitle":"走马灯数","methodHint":"按顺序轮值一次，到第7天，结果是999999","page":18,"text":"计算：12+34×56+7+89","solution":"12+34×56+7+89=12+1904+7+89=2012。","answer":"2012。","answerPage":10,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_05_04_e4","lecture":"xes_05_04","type":"example","num":4,"method":4,"methodTitle":"乘法应用","methodHint":"根据题目列算式，再计算","page":19,"text":"学校三年级有4个班，每个班有6个组，每组有13名同学，请问三年级共有多少名同学？","solution":"求三年级共有多少名同学，首先要求出每个班有多少名同学，然后再求出4个班一共多少名同学。可以列算式为：13×6×4=312（名）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p10","lecture":"xes_05_04","type":"practice","num":10,"method":4,"methodTitle":"乘法应用","methodHint":"根据题目列算式，再计算","page":21,"text":"学校组织同学们去植树，一共去了6个班，每个班有7个小组，每组有12个同学，请问一共有多少个同学去植树？","solution":"求一共有多少个同学去植树，首先要求出每个班去了多少个同学，然后再求出6个班一共多少个同学。可以列算式为：12×7×6=504(个)。","answer":"504个。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p11","lecture":"xes_05_04","type":"practice","num":11,"method":4,"methodTitle":"乘法应用","methodHint":"根据题目列算式，再计算","page":21,"text":"学校里一共有1200位同学为灾区儿童捐款，如果每个同学捐款24元，学校一共捐款多少元？","solution":"题目要求一共捐款多少元，则可用每个学生的捐款数乘同学人数，可列算式为24×1200=28800(元）。","answer":"28800元。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_c12","lecture":"xes_05_04","type":"challenge","num":12,"method":4,"methodTitle":"乘法应用","methodHint":"根据题目列算式，再计算","page":22,"text":"最后丁丁抽到了这道题。这道题目看上去很复杂，找到了规律后很简单！计算：(1)12×1010101(2)123×1001001(3)213×1010101","solution":"（1)12×1010101=12121212；(2)123×1001001=123123123；(3)213×1010101=215151513。","answer":"（1)12121212；(2)123123123；(3)215151513。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_e5","lecture":"xes_05_04","type":"example","num":5,"method":5,"methodTitle":"乘数末位含零的计算","methodHint":"①先计算乘数中不含末尾部分的积","page":23,"text":"计算下列各式。(1） 41×20（2）32×200(3）20×30","solution":"乘数末位含零的计算，我们一般采用“栓气球”的方法，就是先计算出乘数中不含零的部分，然后数一下乘数末尾一共有几个零，就像栓气球一样，在积末尾添几个零。（1)41×20，先算出41×2=82，乘数末尾有1个零，就在82后添1个零，结果为820。（2)32×200，先算出32×2=64，乘数末尾有2个零，就在82后添2个零，结果为6400。（3)20×30，先算出2×3=6，乘数末尾有2个零，就在6后添2个零，结果为600。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p13","lecture":"xes_05_04","type":"practice","num":13,"method":5,"methodTitle":"乘数末位含零的计算","methodHint":"①先计算乘数中不含末尾部分的积","page":25,"text":"列竖式计算下列各式。(1)3200×140(2)120×40(3)370×2300","solution":"(1) 32004 48000(2) 12 04800(3) 3701, 1 1851000","answer":"（1)448000；(2)4800；(3)851000。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p14","lecture":"xes_05_04","type":"practice","num":14,"method":5,"methodTitle":"乘数末位含零的计算","methodHint":"①先计算乘数中不含末尾部分的积","page":25,"text":"新学期开学了，田田兴高采烈地到乐乐老师的课堂上课，乐乐老师在课堂上会给同学们小印章。每做对一道题就能获得一个小印章，你可以得到多少个印章？(1)21×20(2)220×30(3)1200×1400(4)32×500","solution":"(1) 21 (2) 220× 20 × 30420 6600(3) 1200 (4) 32× 1 4 0 0 × 50048 160001680000","answer":"(1)420；(2)6600;(3)1680000；(4)16000。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_c15","lecture":"xes_05_04","type":"challenge","num":15,"method":5,"methodTitle":"乘数末位含零的计算","methodHint":"①先计算乘数中不含末尾部分的积","page":26,"text":"大家做完题目，乐乐老师奖励了每个同学五枚小印章。大家接受了数学魔法学校两项挑战，挑战成功了就可以获得“乘法计算小能手”的称号。咱们来看看第一项挑战吧！计算一下数学魔法学校三、四年级的人数。三年级有13个班级，每个班级有34个学生；四年级有11个班级，每个班级有38个学生。请问：数学魔法学校三、四年级共有多少人？","solution":"要求三、四年级一共有多少人，可以分别算出三年级的人数和四年级的人数，然后相加就是总人数。可列式为13×34+11×38=442+418=860(人）。","answer":"860人。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_e6","lecture":"xes_05_04","type":"example","num":6,"method":6,"methodTitle":"乘数中间带零的乘法","methodHint":"①竖式中位数多的乘数放在上面，位数少的乘","page":27,"text":"列竖式计算下面各题。(1)56×102 (2)203×32 (3)405×13","solution":"(1) 102 (2) 203 (3) 405×56 × 32×13","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p16","lecture":"xes_05_04","type":"practice","num":16,"method":6,"methodTitle":"乘数中间带零的乘法","methodHint":"①竖式中位数多的乘数放在上面，位数少的乘","page":29,"text":"列竖式计算下面各题。(1)506×53(2)105×23(3)104×52","solution":"(1) 506 (2) 105×53×231518 3152530 21026818 2415(3) 104× 525408","answer":"(1)26818；(2)2415；(3)5408。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_p17","lecture":"xes_05_04","type":"practice","num":17,"method":6,"methodTitle":"乘数中间带零的乘法","methodHint":"①竖式中位数多的乘数放在上面，位数少的乘","page":29,"text":"同学们，计算下列各题，能不能找出规律呢？(1)27×101(2)34×101(3)45×101","solution":"两位数乘101有一个计算小窍门，可以不用竖式直接口算出来哦！例如,27×101可以利用乘法的意义，可以拆成100个27相加和1个27相加的和，那就是2700+27=2727。","answer":"（1)2727；（2)3434；（3)4545。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_c18","lecture":"xes_05_04","type":"challenge","num":18,"method":6,"methodTitle":"乘数中间带零的乘法","methodHint":"①竖式中位数多的乘数放在上面，位数少的乘","page":30,"text":"魔法学校的第二个挑战，同学们，你们做好准备了吗？魔法学校批发了一些文具，准备给优秀学生发奖品。这些文具包括80支钢笔，52个文具盒，35个笔记本和12盒水彩笔。已知每支钢笔的价格是5元，每个文具盒的价格是8元，每个笔记本的价格是12元，每盒水彩笔的价格是18元。那么，批发这些文具一共要多少钱？","solution":"要求批发这些文具的总钱数可以先求出每种文具的钱数，然后相加就是总钱数了，可以列算式计算：80×5+52×8+35×12+12×18=400+416+420+216=1452(元）。","answer":"1452元。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_04_k19","lecture":"xes_05_04","type":"peak","num":19,"method":6,"methodTitle":"乘数中间带零的乘法","methodHint":"①竖式中位数多的乘数放在上面，位数少的乘","page":30,"text":"已知246×4的结果是一个五位数，那么后一个乘数的十位有可能填几？讲解","solution":"这道题可以用尝试法，可以从3开始尝试。发现：246×34=8364（四位数），246×44=10824（五位数），，246×94=23124（五位数）。可以得出十位可能填入的数有4～9。","answer":"4~9。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_10_e1","lecture":"xes_05_10","type":"example","num":1,"method":1,"methodTitle":"分数的认识","methodHint":"了解什么是分数，分数如何构成，分数的写法和","page":7,"text":"(1)图中阴影部分占全部的分子是 ，分母是 ，分数单位是(2)图中阴影部分占全部的 ，分子是 ，分母是 ，分数单位是图(1) 图(2)","solution":"（1)把正方形当作单位“1”，平均分成9份，阴影占其中5份，即阴影占全部的，分子是5,分母是9,分数单位是 5（2)把长方形当作单位“1”，平均分成8份，阴影占其中5份，即阴影占全部的 5 ，分子是5，分母是8，分数单位是","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_05_10_p1","lecture":"xes_05_10","type":"practice","num":1,"method":1,"methodTitle":"分数的认识","methodHint":"了解什么是分数，分数如何构成，分数的写法和","page":9,"text":"图中阴影部分用分数表示是 ，分子是 ，分母是分数单位是","solution":"单位“1”要分清，我们都是把一个图形当作单位“1”，图中1个正方形为单位“1”，平均分成4份，而阴影占其中的3份，即阴影","answer":"，3，4，","answerPage":22,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_05_10_p2","lecture":"xes_05_10","type":"practice","num":2,"method":1,"methodTitle":"分数的认识","methodHint":"了解什么是分数，分数如何构成，分数的写法和","page":9,"text":"(1)左图中阴影部分占全部的 ，分子是 ，分母是分数单位是(2)右图中阴影部分占全部的 ，分子是 ，分母是","solution":"（1)把正方形当作单位“1”，平均分成8份，阴影占其中3份，即阴影占全部的3，分母是8，分数单位是 8°(2)此题通过翻转，会变成如图（一)所示的图形，然后相当于如图(二)的图形，把正方形当作单位“1”，平均分成8份，阴影占其中4份，即阴影占全部的 ，分子是4，分母是8。图（一图（二）","answer":"(1)- ,3,8， 8 ,4,8。","answerPage":22,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_05_10_c3","lecture":"xes_05_10","type":"challenge","num":3,"method":1,"methodTitle":"分数的认识","methodHint":"了解什么是分数，分数如何构成，分数的写法和","page":10,"text":"丁丁：“大家快来看，我给阿普装了一个新的计算系统。”牛牛：“不信，他还会计算？我要考考他。”丁丁：“来呀！”计算：5 2(2)8 8 8","solution":"分数加减法，同分母相加减，分母不变，分子相加减。","answer":"(1)1；(2) 8°","answerPage":22,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_e2","lecture":"xes_05_10","type":"example","num":2,"method":2,"methodTitle":"看图写出分数加减算式","methodHint":"①知道每个图形的意义","page":11,"text":"看图写算式。","solution":"第一个图形：阴影占第一个图形的 ，第二个图形：阴影占第二个图形的再一起看或直接做加法：阴影占全部的","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_05_10_p4","lecture":"xes_05_10","type":"practice","num":4,"method":2,"methodTitle":"看图写出分数加减算式","methodHint":"①知道每个图形的意义","page":13,"text":"看图写算式。","solution":"","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_05_10_p5","lecture":"xes_05_10","type":"practice","num":5,"method":2,"methodTitle":"看图写出分数加减算式","methodHint":"①知道每个图形的意义","page":13,"text":"看图写算式。(1)(","solution":"（1)第一个图形：阴影为单位“1”，相当于 ，第二个图形：阴影占第二个图形的，再一起看：空白占全部的一 2(2)把这条线段当作单位“1”，前面一段占一 ，后面一段占 b 6","answer":"（1)1 （2）3 7","answerPage":22,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_05_10_c6","lecture":"xes_05_10","type":"challenge","num":6,"method":2,"methodTitle":"看图写出分数加减算式","methodHint":"①知道每个图形的意义","page":14,"text":"田田：“阿普确定会计算，以后是不是可以帮我做数学题了！”丁丁：“田田，我要考你几道题，都答对了才能把阿普带走。”在里填上“>”“<”或“=”3 7 -5 5 O 3-3 9 7 O 3 6(2) 3 6 5 8 3 O 3-6 9 5 O 4 8","solution":"即即9 9(2)同理画图，可比较大小：8.9 6.9","answer":"(1)<,=,>；(2)<，<","answerPage":23,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_e3","lecture":"xes_05_10","type":"example","num":3,"method":3,"methodTitle":"同分母分数加减法（1）","methodHint":"分母不变，分子相加减","page":15,"text":"填空：(1)7个是(2)根据算式填算理是（ ，也就是（1 2 5 24 10 10","solution":"就等于。 5(2)把一根木棍平均分成7段，先取其中3段，再取其中2段，相当(3)把一根木棍平均分成4份，先取其中的1份，再取其中的2份，最后一共取了3份，即 235 23","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p7","lecture":"xes_05_10","type":"practice","num":7,"method":3,"methodTitle":"同分母分数加减法（1）","methodHint":"分母不变，分子相加减","page":17,"text":")，（92(2)1 ),( )个( )减（3是( ）。(3)计算 3 5 58 8 6","solution":"（1)把一根木棍分平均成5段，每段都；把一根木棍平均分成9段，每段都是(2)把一根木棍平均分成3段，每段都是然后丢掉其中的2段，剩下了1段，即3个减2个就是1个(3)把一根木棍平均分成8份，先取其中的3份，再取其中的5份，最后一共取了8份，即， 35 81；把一根木棍平均分成6份，然后扔掉8 8其中的5份，剩下1份，即1-","answer":"（1) 2 ，5；(2） ；(3)","answerPage":23,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p8","lecture":"xes_05_10","type":"practice","num":8,"method":3,"methodTitle":"同分母分数加减法（1）","methodHint":"分母不变，分子相加减","page":17,"text":"(1)根据题意填空：3个(2) 9 2 9 )，表示：（ 加（是( )。8 5 2 8 )，表示：（ 减（ 剩（ 就是","solution":"(1)把一根木棍平均分成7段，每段都是 ，然后取其中的3段，就是 ，就相当于3个就等于 3 ；把一根木棍平均分成4段，每段都是 ，然后取其中的3段，就是(2)分数减法，同分母相减，分母不变，分子相减。","answer":"(1)(2) 6 2，5，7 8.6 5,2，3， 83 2","answerPage":23,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_c9","lecture":"xes_05_10","type":"challenge","num":9,"method":3,"methodTitle":"同分母分数加减法（1）","methodHint":"分母不变，分子相加减","page":18,"text":"牛牛：“阿普，你太棒了，走，跟我回家。”丁丁：“牛牛，我也要考你几道题，都答对了才能把阿普带走。”判断题，对的画“一”，错的画“×”。2(4)一个西瓜分成2块，其中一块是整个西瓜的。(5)有两个杯子，各装有半杯水，将它们倒在一起就刚好是一杯水。","solution":"（1)同分母相加， 1；（2）可以画图表示；(3）只有分数单位不一样，其他都是一样的；(4)概念性错误，需要平均分成两份；(5)概念性错误，没有说两个杯子一样大。","answer":"（1)×；(2)×；(3)~；(4)×；(5)×。","answerPage":23,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_e4","lecture":"xes_05_10","type":"example","num":4,"method":4,"methodTitle":"同分母分数加减法（2）","methodHint":"分母不变，分子相加减","page":19,"text":"计算下列分数式。1.2.4 14 2 4（1） (2)7 16 16 16","solution":"根据总结，（1","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p10","lecture":"xes_05_10","type":"practice","num":10,"method":4,"methodTitle":"同分母分数加减法（2）","methodHint":"分母不变，分子相加减","page":21,"text":"计算下列分数式。5 1.4 9 2 6(1)10 1010 (2) 14 14 14","solution":"根据总结，（1) 5 15−1+4 8 9 2 610 10 (2） 14 14 149-2+6 1314 14 °","answer":"(1) 14°","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p11","lecture":"xes_05_10","type":"practice","num":11,"method":4,"methodTitle":"同分母分数加减法（2）","methodHint":"分母不变，分子相加减","page":21,"text":"计算：5 2 3 6， 2(1) 10 10 10 (2)1- 8","solution":"分数加减法，同分母相加减，分母不变，分子相加减。","answer":"(1)0；（2) 4","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_c12","lecture":"xes_05_10","type":"challenge","num":12,"method":4,"methodTitle":"同分母分数加减法（2）","methodHint":"分母不变，分子相加减","page":21,"text":"丁丁：“阿普，我好舍不得你，我明天去接你，走之前，来，咱俩再做三道题。”说一说下面分数的分数单位，它们各有几个这样的分数单位？7 23 6615 77 100","solution":"分数单位的定义是：把单位“1”平均分成几份，取其中的一份。","answer":"（1) 15' 7个；(2) 77 23个；（3） 10066个。","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_e5","lecture":"xes_05_10","type":"example","num":5,"method":5,"methodTitle":"分数比较大小","methodHint":"①分子相同，分母越小，分数越大","page":22,"text":"选择正确的一项。(1)( 的一半，再一半，结果是（① ②(2)1是由(① 1 ②2(3)下列分数最大的是(1 5①1 ② 2 ③ 5(4)下列分数最小的是（2-8 ② 34 8","solution":"(1)( 的一半是 ，再一半就是，选③。（2)把单位“1”平均分成2份，取其中的2份才相当于取出单位“1”，(3)把一根木棍平均分成10份,取其中的1份,为;把同一根木棍平均分成2份，取其中的1份，为；把一根木棍平均分成5份， 1大于 ，选③(4)把一根木棍平均分成8份,取其中的2份，为;把同一根木棍平均分成4份，取其中的3份，为一；把同一根木棍平均分成8份，取其中的3份，为 3 如图：即最小，选①。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p13","lecture":"xes_05_10","type":"practice","num":13,"method":5,"methodTitle":"分数比较大小","methodHint":"①分子相同，分母越小，分数越大","page":25,"text":"在里填上“>”\"“<”或“=3 35 3(2) 5 5 96 8 6 5","solution":"(1)所以， 2 33 1，所以所以，(2)5 L6 1，所以1=","answer":"(1)<，=，>；(2)>，=，<","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p14","lecture":"xes_05_10","type":"practice","num":14,"method":5,"methodTitle":"分数比较大小","methodHint":"①分子相同，分母越小，分数越大","page":25,"text":"将下列分数按照从大到小的顺序排序：7115116′2`16′4°","solution":"取四段相同长度的线段，将其平均分成71151若干份后表示出：示分数对应长度的大小来判断分数的大小。","answer":"15","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_c15","lecture":"xes_05_10","type":"challenge","num":15,"method":5,"methodTitle":"分数比较大小","methodHint":"①分子相同，分母越小，分数越大","page":26,"text":"此时乐乐老师来了，乐乐老师：“你们在干嘛呢？这么热闹！”牛牛：“乐乐老师，阿普会做数学题，可厉害了！\"乐乐老师：“是吗，来，那我出两道题！先看第一题。”1工程队修铁路，第一次修了要修部分的两次共修了要修部分的几分之几？APH","solution":"加了一个做题背景，实质还是同分母相加，分母不变，分子相加。 9°","answer":"","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_e6","lecture":"xes_05_10","type":"example","num":6,"method":6,"methodTitle":"分数应用题","methodHint":"理解题意，用分数加减法计算应用题","page":27,"text":"打了总子弹数量的 3(1)小李比小张多打了几分之几？(2)小李和小张一共打了几分之几？(3)小林打了几分之几？","solution":"把总子弹数量当作单位“1”，小李占 33 1043.10-4-33 43小李和小张一共打了 101010","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p16","lecture":"xes_05_10","type":"practice","num":16,"method":6,"methodTitle":"分数应用题","methodHint":"理解题意，用分数加减法计算应用题","page":29,"text":"三只大象用鼻子运木材。第一只大象运了全部的，第二只大象运的木材和第三只大象运的木材同样多。第二只大象和第三只大象各运了这批木材的几分之几？","solution":"第一只大象运木材的，图形表示 1为：第二只大象和第三只大象一共运了剩下木材第二只大象和第三只大象分别运了木材的一图形表示为：","answer":"","answerPage":24,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_p17","lecture":"xes_05_10","type":"practice","num":17,"method":6,"methodTitle":"分数应用题","methodHint":"理解题意，用分数加减法计算应用题","page":29,"text":"丁丁过生日的时候买了一个大蛋糕，他想拿一部分蛋糕送给好朋友。已知丁丁吃掉了蛋糕的，丁丁妈妈吃掉了蛋糕的 ，丁丁爸爸吃掉了蛋糕的丁丁给好朋友带去了蛋糕的多少？","solution":"把整个蛋糕当作单位“1”，丁丁吃掉了蛋糕的，丁丁妈妈吃掉了蛋糕的-吃掉了蛋糕的 2 ，则丁丁拿给好朋友的蛋糕占了整个蛋糕的：1-5 5","answer":"","answerPage":25,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_c18","lecture":"xes_05_10","type":"challenge","num":18,"method":6,"methodTitle":"分数应用题","methodHint":"理解题意，用分数加减法计算应用题","page":30,"text":"乐乐老师：“这么厉害，请看第二题。”商店运来一批水果。其中红富士苹果占水果总量的 ，香蕉占水果总量的，香蕉比苹果多出总量的几分之几？","solution":"加了一个做题背景，实质还是同分母相减，分母不变，分子相减。 5 2_38-8-8°","answer":"8°","answerPage":25,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_10_k19","lecture":"xes_05_10","type":"peak","num":19,"method":6,"methodTitle":"分数应用题","methodHint":"理解题意，用分数加减法计算应用题","page":30,"text":"爸爸买了两块同样的比萨饼，把其中的一块平均分成6小块，爸爸吃了1小块，妈妈也吃了1小块。把另一块平均分成3小块，小明吃了其中的1小块。哪一块剩下的多？","solution":"画图表示：第一块：第二块：根据图可以看出，剩的一样多。","answer":"一样多。","answerPage":25,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_05_11_e1","lecture":"xes_05_11","type":"example","num":1,"method":1,"methodTitle":"和倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":7,"text":"甲、乙两根绳子一共长28米，乙的长度是甲长度的3倍，求甲、乙的长度各是多少米。","solution":"题目中有和有倍，属于和倍问题，采用画图解答。画图前先找到一倍数和多倍数。甲为一倍数，长度为：28÷（3+1)=7（米）。乙为多倍数，长度为：7×3=21（米）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p1","lecture":"xes_05_11","type":"practice","num":1,"method":1,"methodTitle":"和倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":9,"text":"学校买来两种粉笔共240盒，已知白色粉笔的盒数是彩色粉笔的5倍。两种粉笔各买了多少盒？","solution":"题中有和（240)有倍数（5倍），所以为和倍问题，其中彩色粉笔的数量是一倍数，白色粉笔是多倍数，用画图法：彩色粉笔：白色粉笔： 240彩色粉笔：240÷(5+1)=40（盒）。白色粉笔：40×5=200(盒)。","answer":"彩色粉笔有40盒，白色粉笔有200盒。","answerPage":25,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p2","lecture":"xes_05_11","type":"practice","num":2,"method":1,"methodTitle":"和倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":9,"text":"城市绿化带新种杨树和柳树共260棵，其中杨树的棵数比柳树多3倍。种杨树和柳树各多少棵？","solution":"题目中有和有倍数，是和倍问题，柳树是一倍数，杨树是多倍数，画线段图：柳树：·0杨树：· 260柳树：260÷(1+4)=52(棵），杨树：52×4=208（棵）。","answer":"柳树有52棵，杨树有208棵。","answerPage":25,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_c3","lecture":"xes_05_11","type":"challenge","num":3,"method":1,"methodTitle":"和倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":10,"text":"最近乐乐老师带领大家举行完体育运动会后，又组织了一场智力运动会。其中也是有A，B，C，D，E，F六个项目供大家选择。首先牛牛选的是A项目，打开题目后看到：有一个除法算式，被除数和除数的和是136，商是7，没有余数。问：被除数和除数是多少？","solution":"在除法算式中，商是被除数与除数的倍数关系，题目有和有倍数，是和倍问题，画线段图：除数：o0被除数：o- 36除数：136÷（1+7)=17，被除数：17×7=119。","answer":"被除数是119，除数是17。","answerPage":25,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_e2","lecture":"xes_05_11","type":"example","num":2,"method":2,"methodTitle":"和倍问题（整倍型）（2）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":11,"text":"甲班有图书120本，乙班有图书30本，甲班给乙班多少本，甲班的图书是乙班的2倍？","solution":"题目中存在暗和：120+30=150（本），有倍数，所以是和倍问题中的整倍数问题，先画甲班给乙班书后的线段图：乙后来的本数：150÷（1+2)=50（本）。甲给乙的本数：50−30=20（本）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p4","lecture":"xes_05_11","type":"practice","num":4,"method":2,"methodTitle":"和倍问题（整倍型）（2）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":13,"text":"甲、乙两个油桶共有1000千克油，将乙桶的15千克油注入甲桶，此时甲桶中的油是乙桶中油的4倍，那么，原来甲桶中油比乙桶中的油多多少千克？","solution":"题目中有倍数关系，有和，是和倍问题。画乙桶油注入甲桶后的线段图：乙：。甲： 1000现在乙的重量为：1000÷（1+4)=200（千克）。则原来乙桶的重量为200+15=215（千克），甲原来的重量为：1000−215=785（千克），甲和乙原来的差为：785−215=570（千克）。","answer":"570千克。","answerPage":25,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p5","lecture":"xes_05_11","type":"practice","num":5,"method":2,"methodTitle":"和倍问题（整倍型）（2）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":13,"text":"一个长方形的周长是48厘米，长是宽的2倍，这个长方形的面积是多少平方厘米?","solution":"先找出长和宽的和48−2=24（厘米），|把多出来的7本拿走，就变成了整倍数问题。再利用和倍关系求解。先画线段图：宽：0-0长：宽：24÷(1+2)=8(厘米），长：8×2=16(厘米），面积：16×8=128(平方厘米）。","answer":"128平方厘米。","answerPage":25,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_c6","lecture":"xes_05_11","type":"challenge","num":6,"method":2,"methodTitle":"和倍问题（整倍型）（2）","methodHint":"画图法：一倍数=两数和÷（倍数十1）","page":14,"text":"牛牛答对了A项目，准备趁热打铁，又选了个C项目，题目是这样的：甲、乙两数的和是231，已知甲数的末尾数字是0，如果把甲数末尾的0去掉，正好等于乙数，那么，甲数是多少，乙数是多少？","solution":"根据甲数的末尾是0，如果把甲数末尾的0去掉，正好等于乙数，知道甲是乙的10倍，再根据题意知道甲、乙两数的和是231，由此利用和倍问题，画线段图：甲：00乙：231÷(1+10)=21，甲：21×10=210。","answer":"甲数是210，乙数是21。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_e3","lecture":"xes_05_11","type":"example","num":3,"method":3,"methodTitle":"和倍问题（非整倍型）（1）","methodHint":"画图法：“多去少补”","page":15,"text":"北京某小学的同学做了红花和黄花共500朵。已知红花的朵数比黄花的2倍多50朵。两种花各有多少朵？","solution":"题目中有和与倍数，是和倍问题，画线段图：黄花：·图中非整倍数部分要先去掉，转化成整倍数问题。黄花：（500−50)÷（1+2)=150（朵）。红花：150×2+50=350（朵）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p7","lecture":"xes_05_11","type":"practice","num":7,"method":3,"methodTitle":"和倍问题（非整倍型）（1）","methodHint":"画图法：“多去少补”","page":17,"text":"动物园中一头犀牛和一头大象共重1500千克，大象的体重比犀牛的3倍还多20千克，犀牛和大象各重多少千克？","solution":"题目中有和与倍数，可以画线段图：犀牛： 11500大象：图中非整倍数部分要先去掉，转化成整倍数问题。犀牛：(1500−20)÷(1+3)=370(千克）。大象：370×3+20=1130（千克）或1500−370=1130（千克）。","answer":"犀牛重370千克，大象重1130千克。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p8","lecture":"xes_05_11","type":"practice","num":8,"method":3,"methodTitle":"和倍问题（非整倍型）（1）","methodHint":"画图法：“多去少补”","page":17,"text":"三年级(1)班的图书角里有故事书和连环画共47本，如果故事书拿走7本后，故事书的本数就是连环画的4倍，原有连环画和故事书各多少本？","solution":"根据题目，知道故事书比连环画的4倍多7本，画线段图：连环画：0故事书：o连环画：(47−7)÷(1+4)=8(本），故事书：8×4+7=39（本）或47-8=39（本）。","answer":"故事书有39本，连环画有8本。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_c9","lecture":"xes_05_11","type":"challenge","num":9,"method":3,"methodTitle":"和倍问题（非整倍型）（1）","methodHint":"画图法：“多去少补”","page":18,"text":"牛牛在第二个项目遇到了小阻碍，觉得没那么轻松，于是先去休息，接下来丁丁选了D项目：两个仓库共有存粮173吨，从第一个仓库运出38吨后，第二个仓库的粮食比第一个仓库的2倍还多6吨，求第一个仓库、第二个仓库原有粮食各多少吨。","solution":"根据题目中的和与倍数，是和倍问题，画线段图：第一个： 38°第二个：把非整倍数部分去掉，变成整倍数问题。第一个仓库：(173−38−6)÷(1+2)=43(吨），第一个仓库原来：43+38=81（吨），第二个仓库：43×2+6=92（吨）或173−81=92(吨)。","answer":"第一个仓库原来有81吨粮食，第二个仓库原来有92吨粮食。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_e4","lecture":"xes_05_11","type":"example","num":4,"method":4,"methodTitle":"和倍问题（非整倍型）（2）","methodHint":"画图法：“多去少补”","page":19,"text":"光明小学有学生760人，其中男生比女生的3倍少40人，男、女生各有多少人？","solution":"题目中有和与倍数，是和倍问题，画线段图：女生：·男生：· 760把少的部分补上，变成整倍数问题。女生：（760+40)÷（1+3)=200(人）。男生：200×3−40=560(人）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p10","lecture":"xes_05_11","type":"practice","num":10,"method":4,"methodTitle":"和倍问题（非整倍型）（2）","methodHint":"画图法：“多去少补”","page":21,"text":"动物园的猴山上有180只猴子，大猴子的数量比小猴子的3倍少8只，那么猴山上大、小猴子各多少只？","solution":"题目中有和有倍数，是和倍问题。画线段图：小猴子：·大猴子：把少的部分补上，变成整倍数问题。小猴子：（180+8）÷（1+3）=47（只）。大猴子：47×3−8=133（只）或180−47=133（只）。","answer":"大猴子有133只，小猴子有47只。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p11","lecture":"xes_05_11","type":"practice","num":11,"method":4,"methodTitle":"和倍问题（非整倍型）（2）","methodHint":"画图法：“多去少补”","page":21,"text":"一根电线长240米，把它截成三段，使第一段比第二段长20米，第三段是第一段的2倍，这三段电线各长多少米？","solution":"根据题目中的和与倍数，判断为和倍问题，画线段图：第一段：第二段： 20 240第三段：0把少的部分补上，变成整倍数问题。第一段：(240+20)÷(1+1+2)=65（米），第二段：65-20=45（米），第三段：65×2=130（米）或240-65-45=130（米）。","answer":"第一段长65米，第二段长45米，第三段长130米。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_c12","lecture":"xes_05_11","type":"challenge","num":12,"method":4,"methodTitle":"和倍问题（非整倍型）（2）","methodHint":"画图法：“多去少补”","page":22,"text":"丁丁看到刚才牛牛都可以挑战两道题，于是也选了第二道题目F：甲、乙、丙三个数的和是177，甲数是乙数的3倍，乙数比丙数的5倍少3，求这三个数。","solution":"根据题目的和与倍数，画出线段图：丙：00乙：o 3 177甲：把少的部分补上，变成整倍数问题。丙：（177+3×4)÷（1+5+5×3)=9，乙：9×5-3=42，甲：42×3=126或177−9-42=126。","answer":"甲是126，乙是42，丙是9。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_e5","lecture":"xes_05_11","type":"example","num":5,"method":5,"methodTitle":"三量和倍问题（1）","methodHint":"画图法","page":23,"text":"三堆小球共有2012颗，如果从每堆取走相同数目的小球后，第二堆还剩下17颗小球，并且第一堆剩下的小球数是第三堆剩下小球数的2倍，那么第三堆原有多少颗小球？","solution":"根据题目中的和与倍数，画出线段图：第一堆： 2b第二堆： 2012第三堆：将第二堆剩下的17颗小球除去，剩下的恰好是原来第三堆球数的3倍。所以第三堆原有小球（2012−17)÷3=665（颗）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p13","lecture":"xes_05_11","type":"practice","num":13,"method":5,"methodTitle":"三量和倍问题（1）","methodHint":"画图法","page":25,"text":"丁丁、田田、牛牛共有200元钱，丁丁的钱是田田的2倍，田田的钱是牛牛的3倍，则三人各有多少钱？","solution":"根据题目的和与倍数，画线段图：牛牛：田田： 200丁丁：牛牛：200÷（1+3+6)=20（元）。田田：20×3=60（元）。丁丁：60×2=120(元)或200−20−60=120（元）。","answer":"牛牛有20元，田田有60元，丁丁有120元钱。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p14","lecture":"xes_05_11","type":"practice","num":14,"method":5,"methodTitle":"三量和倍问题（1）","methodHint":"画图法","page":25,"text":"一家三口人，三人年龄之和是72岁，妈妈和爸爸同岁，妈妈的年龄是孩子的4倍，三人各是多少岁？","solution":"发现题目有和与倍数，是和倍问题，画线段图：孩子：妈妈： 72爸爸：孩子：72÷(1+4+4)=8(岁)，妈妈：8×4=32（岁），爸爸：8×4=32（岁）。","answer":"孩子8岁，妈妈和爸爸都是32岁。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_c15","lecture":"xes_05_11","type":"challenge","num":15,"method":5,"methodTitle":"三量和倍问题（1）","methodHint":"画图法","page":26,"text":"接下来上场的是阿普，阿普可没那么大把握，于是选了B项目，题目是这样的：某校三年级和四年级各有两个班。三年级(1)班比(2)班多4人，四年级(1)班比(2)班少5人，三年级比四年级少17人。那么，三年级(1)班比四年级(2)班少多少人？","solution":"根据题意，最后所要求的为三年级（1)班比四年级(2)班少几人。因此三、四年级总人数分别用三年级(1)班和四年级(2)班人数表示。由于三年级(1)班比三年级(2)班多4人,则三年级共有学生：2×三年级(1)班一4；四年级共有学生：2X四年级(2)班一5；而三年级比四年级少17人，则有：2×三年级（1)班一4+17=2×四年级(2)班一5，可得四年级(2)班比三年级(1)班多9人。","answer":"9人。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_e6","lecture":"xes_05_11","type":"example","num":6,"method":6,"methodTitle":"三量和倍问题（2）","methodHint":"画图法：“多去少补”","page":27,"text":"甲、乙、丙三数之和是183，乙比丙的2倍少4，甲比丙的3倍多7，求甲、乙、丙三数各是多少。","solution":"根据题目中的和与倍数，画出线段图：把非整倍数部分“多去少补”，转变成整倍数，总和为183−7+4=180。丙：180÷(1+2+3)=30。乙:30×2-4=56。甲:30×3+7=97或183-30-56=97。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p16","lecture":"xes_05_11","type":"practice","num":16,"method":6,"methodTitle":"三量和倍问题（2）","methodHint":"画图法：“多去少补”","page":29,"text":"果园里有桃树、梨树、苹果树共552棵。桃树比梨树的2倍多12棵，苹果树比梨树少20棵，求桃树、梨树和苹果树各有多少棵。","solution":"根据题目的和与倍数，画线段图：梨：··桃： 552苹果：—0利用“多去少补”转化为整倍数问题。梨树的棵数：（552+20−12)÷（1+1+2)=560÷4=140(棵)。桃树的棵数：140×2+12=292（棵）。苹果树的棵数：140−20=120（棵）或552−140−292=120(棵)。","answer":"梨树有140棵，桃树有292棵，苹果树有120棵。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_p17","lecture":"xes_05_11","type":"practice","num":17,"method":6,"methodTitle":"三量和倍问题（2）","methodHint":"画图法：“多去少补”","page":29,"text":"某养殖厂养鸡、鸭、鹅共1462只，鸡的只数比鸭的4倍多132只，鹅的只数比鸭的2倍少70只。这个养殖厂养的鸡、鸭、鹅各有多少只？","solution":"题目中有和与倍数，是和倍问题，而且是非整倍数问题，由于题目中是三量之间的非整倍关系，画图法比较麻烦，可以根据画图法原理，用假设法。假设一倍鸭的只数看作1份，鸡的只数看作4份，鹅的只数看作2份，鸡、鸭、鹅的总只数就相当于鸣的：1+4+2=7(份）。而鸡、鸭、鹅的总只数可以看作：1462−132+70=1400（只）（多去少补，转化成整倍数）。用总只数除以总份数，先求出鸭的只数，再求鸡和鹅的只数。鸭的只数：（1462−132+70)÷（1+4+2)=200（只），鸡的只数：200×4+132=932（只），鹅的只数：200×2−70=330（只）。","answer":"养殖场养的鸡有932只，鸭有200只，鹅有330只。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_c18","lecture":"xes_05_11","type":"challenge","num":18,"method":6,"methodTitle":"三量和倍问题（2）","methodHint":"画图法：“多去少补”","page":30,"text":"智力运动会结束后，田田、丁丁、牛牛、阿普去游乐场，一共花了154元。有趣的是：田田花的钱数加上5元等于丁丁花的钱数减去7元，等于牛牛花的钱数乘3，等于阿普花的钱数除以4。请问：丁丁花了多少钱？","solution":"根据条件，画出线段图：丁丁：田田：牛牛：-0 154阿普：o根据“多去少补”转化成整倍数问题。牛牛：(154+5−7)÷(1+3+3+12)=8(元)。丁丁：8×3+7=31(元)。","answer":"31元。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_11_k19","lecture":"xes_05_11","type":"peak","num":19,"method":6,"methodTitle":"三量和倍问题（2）","methodHint":"画图法：“多去少补”","page":30,"text":"老王在退休时共有264万元的积蓄，他将这些钱分为4份，除了三个儿子各给一份外，另有一份自己留做养老金。若他把这份养老金给大儿子，则大儿子所得的钱等于二儿子及三儿子所得的钱之总和；若他把这份养老金给二儿子，则二儿子所得的钱等于大儿子及三儿子所得的钱之总和的两倍；若他把这份养老金给三儿子，则三儿子所得的钱等于大儿子及二儿子所得钱之总和的三倍。请问：老王准备拿来当养老金的部分为多少万元？","solution":"如果老王把钱给大儿子，那么大儿子所得的钱是二儿子和三儿子所得钱的总和，也就是说二儿子和三儿子所得钱的总和占到总金额的一半，即264−2=132（万元）；由第二个条件，知道大儿子和三儿子所得钱的总和是264÷3×1=88（万元)；由第三个条件，知道大儿子和二儿子所得钱的总和是264÷4×1=66（万元）。于是大儿子、二儿子、三儿子三人所得钱总和是(132+88+66）÷2=143（万元），于是老王准备拿来当养老金的那部分是264−143=121（万元）。","answer":"121万元。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_e1","lecture":"xes_05_12","type":"example","num":1,"method":1,"methodTitle":"差倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数差÷（倍数一1）","page":7,"text":"乐乐老师买来一些糖果分给田田和牛牛，牛牛分到的是田田的3倍，田田分到的比牛牛少30颗，田田和牛牛各分到多少颗糖？","solution":"根据题目中的差与倍数关系，判断为差倍问题，田田的数量为一倍数，画线段图：田田：30÷（3−1)=15（颗）。牛牛：15×3=45（颗）或15+30=45（颗）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p1","lecture":"xes_05_12","type":"practice","num":1,"method":1,"methodTitle":"差倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数差÷（倍数一1）","page":9,"text":"乐乐老师比丁丁大24岁，今年乐乐老师的年龄正好是丁丁年龄的3倍，你知道今年乐乐老师多少岁，丁丁多少岁吗？","solution":"根据题目中的差与倍数关系，是差倍|根据“多去少补”，把非整倍数问题转化成整倍问题，画线段图，丁丁年龄是一倍数。丁丁： 24乐乐老师：·丁丁：24÷(3−1)=12(岁）。乐乐老师：12×3=36（岁）或12+24=36（岁）。","answer":"丁丁12岁，乐乐老师36岁。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p2","lecture":"xes_05_12","type":"practice","num":2,"method":1,"methodTitle":"差倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数差÷（倍数一1）","page":9,"text":"会计结账时，发现账面少了63元，后来发现是把一笔钱的0丢了，则这笔钱原来是多少元？","solution":"根据题目中的差和倍数，确定为差倍问题，画出线段图。现在的钱数为一倍数，少看了个0，相当于原来是现在的10倍。现在：0 63原来：人现在：63÷（10-1)=7(元），原来：7×10=70（元）或7+63=70（元）。","answer":"70元。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_c3","lecture":"xes_05_12","type":"challenge","num":3,"method":1,"methodTitle":"差倍问题（整倍型）（1）","methodHint":"画图法：一倍数=两数差÷（倍数一1）","page":10,"text":"今天是牛牛的9岁生日，妈妈为他准备了生日Party。牛牛邀请了他的好朋友一起来参加。在小朋友们到来前，妈妈跟牛牛说：“今天是你9岁生日，妈妈今年33岁了，那么再过多少年你的年龄会是妈妈年龄的一半呢？”","solution":"牛牛和妈妈的年龄差不变，为33−9=24（岁)，牛牛的年龄是妈妈年龄的一半即妈妈的年龄是牛牛的2倍，有差有倍数，是差倍问题，画线段图：牛牛： ?24妈妈：0牛牛：24÷（2−1)=24（岁），24−9=15（年）。","answer":"再过15年。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_e2","lecture":"xes_05_12","type":"example","num":2,"method":2,"methodTitle":"差倍问题（非整倍型）","methodHint":"画图法：“多去少补”","page":11,"text":"学校买来的足球比排球多18个，足球的个数比排球的2倍少4个。学校买来足球和排球各多少个？","solution":"根据题目中的差为18个，与倍数关系2倍少4个，判断为差倍问题，画出线段图：根据“多去少补”把非整倍数问题转化成整倍数问题。排球：（18+4)÷（2−1)=22（个）。足球：22+18=40（个）或22×2−4=40（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p4","lecture":"xes_05_12","type":"practice","num":4,"method":2,"methodTitle":"差倍问题（非整倍型）","methodHint":"画图法：“多去少补”","page":13,"text":"三年级(1)班女生比男生多15人，女生的人数比男生的4倍少3人，则三年级(1)班有男生和女生各多少人？","solution":"根据题目中的差15人和倍数关系，判断为差倍问题，画出线段图：男生：女生：数问题。男生：(15+3)÷（4−1)=6（人）。女生：6+15=21(人)或6×4−3=21(人）。","answer":"男生有6人，女生有21人。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p5","lecture":"xes_05_12","type":"practice","num":5,"method":2,"methodTitle":"差倍问题（非整倍型）","methodHint":"画图法：“多去少补”","page":13,"text":"某校有排球的个数比足球多50个，如果再买40个排球，排球的个数就是足球的3倍，足球、排球各有多少个？","solution":"根据题目中的差为50，倍数关系为3倍少40，确定为差倍问题，画出线段图：足球：· 40排球：0根据“多去少补”将非整倍数问题转化成整倍数问题。足球：（50+40)÷（3−1)=45（个），排球：45+50=95（个）或45×3−40=95（个）。","answer":"足球有45个，排球有95个。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_c6","lecture":"xes_05_12","type":"challenge","num":6,"method":2,"methodTitle":"差倍问题（非整倍型）","methodHint":"画图法：“多去少补”","page":14,"text":"为了准备生日Party，爸爸一大早就去大采购，先买水果。爸爸看到水果店有两筐橘子（假设每个橘子一样重)，第一筐橘子的数量比第二筐的5倍多60个。如果从第一筐取出300个放入第二筐，那么第一筐还比第二筐多60个。原来两筐橘子各多少个？","solution":"根据移多补少知识，可以算出第一筐与第二筐的差为300×2+60=660（个），有差有倍数关系，差倍问题。画线段图：第二筐：o 60第一筐：0根据“多去少补”将非整倍数问题转化为整倍数问题。第二筐：（660−60)÷（5−1)=150（个），第一筐：150+660=810（个）或150×5+60=810(个）。","answer":"第一筐有810个，第二筐有150个。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_e3","lecture":"xes_05_12","type":"example","num":3,"method":3,"methodTitle":"差倍问题（整倍型）（2）","methodHint":"画图法：同增同减差不变","page":15,"text":"甲仓库存放大米500袋，乙仓库存放大米200袋，现从两个仓库里运走同样袋数的大米，结果甲仓库剩下的大米正好是乙仓库剩下大米的3倍，从两个仓库里各运走大米多少袋？","solution":"题目中没有直接给出两个仓库中大米数量的差，但是告诉我们甲、乙仓库分别有大米多少，可以计算出两个仓库大米数量的差或者和。又根据题目的已知条件，两个仓库同时运走相同数量的大米后，发现和发生变化，但是差没有变，仍为500−200=300（袋），所以确定为差倍问题。画线段图：乙:300÷（3−1)=150（袋）。所以运走了大米200−150=50（袋）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p7","lecture":"xes_05_12","type":"practice","num":7,"method":3,"methodTitle":"差倍问题（整倍型）（2）","methodHint":"画图法：同增同减差不变","page":17,"text":"实验小学一校区人数比实验小学二校区人数少540人。第三校区建成后，从一、二校区各调走200人到第三校区，这时实验小学二校区人数恰好是实验小学一校区人数的4倍，那么实验小学一校区和实验小学二校区原来各有多少人？","solution":"由于两个校区同时调走相同的人数，差不变。差仍为540人，根据差和倍数关系，画线段图：调走一校区：二校区：-一校区：540÷（4−1)=180（人），一校区原来的人数为180+200=380（人）。二校区原来的人数为180×4+200=920（人）或380+540=920(人)。","answer":"一校区原来有380人，二校区原来有920人。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p8","lecture":"xes_05_12","type":"practice","num":8,"method":3,"methodTitle":"差倍问题（整倍型）（2）","methodHint":"画图法：同增同减差不变","page":17,"text":"甲粮库有稻谷500吨，乙粮库有稻谷340吨。现在从甲、乙两粮库中运出同样多的稻谷以后，甲粮库剩下的是乙粮库的5倍，甲、乙两粮库各剩下多少吨稻谷？各运出多少吨？","solution":"由于甲、乙两个粮库运出同样多的稻谷，则差不变，仍为500−340=160（吨），根据差和倍数关系，画线段图：乙：。 1甲：0乙现在160÷（5−1)=40（吨），甲现在40+160=200（吨）或40×5=200（吨），运出的重量为340−40=300（吨）。","answer":"甲粮库剩下200吨稻谷，乙粮库剩下40吨稻谷，各运出300吨。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_c9","lecture":"xes_05_12","type":"challenge","num":9,"method":3,"methodTitle":"差倍问题（整倍型）（2）","methodHint":"画图法：同增同减差不变","page":18,"text":"终于等到小朋友们都到了，生日Party正式开始。小朋友们都给牛牛带来了生日礼物和贺卡。今天牛牛一共收到贺卡48张，阿普送给牛牛后自己还有贺卡12张。若两人再买同样多的贺卡，则牛牛的贺卡是阿普的3倍，那么两人各买多少张贺卡呢？","solution":"根据题目已知条件，两人同时购买相同数量的贺卡后，差没有变，仍为48−12=36（张），所以确定为差倍问题。画线段图：阿普：0牛牛：0阿普：36÷（3−1)=18(张）。所以应该买18−12=6（张）。","answer":"两人各买6张。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_e4","lecture":"xes_05_12","type":"example","num":4,"method":4,"methodTitle":"差倍问题（暗差型）（1）","methodHint":"①找到暗差","page":19,"text":"阿普和丁丁做题，如果阿普再做4道就和丁丁做的一样多，如果丁丁再做6道就是阿普的3倍。阿普和丁丁各做了多少道题？","solution":"根据题目已知条件，找到两人的差为4，倍数关系为丁丁比阿普的3倍少6道题。为差倍问题，画线段图：根据“多去少补”转化成整倍数问题。阿普：（4+6）÷（3−1)=5（道)。丁丁:5+4=9(道)或5×3−6=9(道）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p10","lecture":"xes_05_12","type":"practice","num":10,"method":4,"methodTitle":"差倍问题（暗差型）（1）","methodHint":"①找到暗差","page":21,"text":"甲、乙两个数，如果甲数加上50，就等于乙数，如果乙数加上350就等于甲数的3倍，问甲、乙各是多少？","solution":"甲、乙两数的差为50，倍数关系为乙数比甲数的3倍少350。根据差与倍数关系，画线段图：甲：乙：'50根据“多去少补”将非整倍数问题转化成整倍数问题。甲：(50+350)÷（3−1)=200。乙：200+50=250或200×3-350=250。","answer":"甲是200，乙是250。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p11","lecture":"xes_05_12","type":"practice","num":11,"method":4,"methodTitle":"差倍问题（暗差型）（1）","methodHint":"①找到暗差","page":21,"text":"牛牛、田田各有若干本书。若田田再买45本书，两人的书就一样多了；若牛牛再买45本书，牛牛书的本数就是田田书的4倍。现在牛牛、田田各有书多少本？","solution":"根据已知条件可知，两人书的差为45本，倍数关系为牛牛的书比田田书的4倍少45本，差倍问题，画线段图：田田：0 45牛牛：0:45田田：(45+45)÷(4−1)=30(本），牛牛：30+45=75（本）或30×4−45=75（本）。","answer":"田田有30本，牛牛有75本。","answerPage":30,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_c12","lecture":"xes_05_12","type":"challenge","num":12,"method":4,"methodTitle":"差倍问题（暗差型）（1）","methodHint":"①找到暗差","page":22,"text":"丁丁和田田来到牛牛的书房参观。发现他的书架上下两层放着一些书，如果上层少放8本，上下两层的本数就一样多；如果上层多放8本，上层的书就是下层的2倍。问：书架上下两层各有多少本书？","solution":"根据已知条件，知道上下两层的差为8，倍数关系为上层比下层的2倍少8本。画出线段图：下层：上层：。下层：(8+8)÷(2−1)=16(本），上层：16+8=24（本）或16×2−8=24（本）。","answer":"上层有24本，下层有16本。","answerPage":30,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_e5","lecture":"xes_05_12","type":"example","num":5,"method":5,"methodTitle":"差倍问题（暗差型）（2）","methodHint":"①找到暗差","page":23,"text":"两筐重量相等的苹果，从甲筐取出7千克，乙筐加上19千克，这时乙筐重量是甲筐的2倍。原来两筐各有多少千克苹果？","solution":"根据甲筐减少7千克，乙筐增加19千克，找到现在甲、乙两筐的差为7+19=26（千克）。根据差与倍数关系，确定为差倍问题，画出线甲现在的重量为：（7+19)÷（2−1)=26（千克）。则甲筐原来的重量为26+7=33（千克），因为甲、乙两筐原本一样重，所以乙筐的重量也是33千克。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p13","lecture":"xes_05_12","type":"practice","num":13,"method":5,"methodTitle":"差倍问题（暗差型）（2）","methodHint":"①找到暗差","page":25,"text":"甲、乙两桶油重量相等，如果甲桶取走油26千克，乙桶加入油14千克，这时乙桶油的重量是甲桶油重量的3倍。那么，两桶油原来分别有多少千克？","solution":"根据甲桶减少26千克，乙桶增加14千克，得出现在两桶油重量的差为26+14=40(千克)，根据差与倍数关系画出线段图。乙：甲桶油现在的重量为：（26+14)÷（3−1)=20（千克），原来甲桶油的重量为：20+26=46（千克），乙桶与甲桶相等，所以乙桶油原来也是46千克。","answer":"两桶油原来分别有46千克。","answerPage":30,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p14","lecture":"xes_05_12","type":"practice","num":14,"method":5,"methodTitle":"差倍问题（暗差型）（2）","methodHint":"①找到暗差","page":25,"text":"牛牛和阿普两人所存的钱数相等。牛牛要买一件商品向阿普借了120元，这时牛牛的钱数正好是阿普的4倍。那么，原来牛牛和阿普各有多少钱？","solution":"牛牛向阿普借完钱后，两人的差为120×2=240（元）。根据倍数关系，画出线段图：阿普：0 240牛牛：· 。...阿普现在的钱数为240−（4−1)=80（元），阿普原来的钱数为80+120=200（元），牛牛和阿普的钱数一样，也是200元。","answer":"阿普和牛牛原来各有200元钱。","answerPage":30,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_c15","lecture":"xes_05_12","type":"challenge","num":15,"method":5,"methodTitle":"差倍问题（暗差型）（2）","methodHint":"①找到暗差","page":26,"text":"阿普看到了装饰房间剩下的两根彩带。红色和黄色两根彩带原来的长度相等。红色的用去13米，黄色的用去25米，剩下的红色彩带是黄色彩带的4倍。那么原来这两根彩带各长多少米？","solution":"根据红色用去13米，黄色用去25米，可知剩下的彩带长度相差25−13=12（米）。根据倍数关系，画出线段图：25.黄色：红色：黄色还剩下的长度为：12÷（4−1)=4（米），则原来的长度为4+25=29（米），那么红色彩带的长度也是29米。","answer":"原来两根彩带的长度都是29米。","answerPage":30,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_e6","lecture":"xes_05_12","type":"example","num":6,"method":6,"methodTitle":"差倍问题（变倍型）","methodHint":"找到不变量","page":27,"text":"苹果的个数是梨的3倍，如果苹果加上6个，梨也加上6个，此时苹果的个数是梨的个数的2倍。问原来苹果、梨各有多少个？","solution":"把原来梨的个数作为一倍数，画出线段图：那么增加后梨的数量就是一倍数十6，苹果原来的数量为3倍数，增加后苹果的数量就是三倍数十6。增加后梨数量的2倍为两倍数十12，则两倍数十12=三倍数十6，可求出一倍数=6个，所以梨原来的数量为6个，苹果原来的数量为6×3=18（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p16","lecture":"xes_05_12","type":"practice","num":16,"method":6,"methodTitle":"差倍问题（变倍型）","methodHint":"找到不变量","page":29,"text":"今年阿普的年龄是牛牛年龄的5倍，22年后，阿普的年龄是牛牛年龄的3倍。今年阿普和牛牛各多少岁？","solution":"牛牛： 22阿普：由题意，牛牛今年的年龄为一倍数，22年后牛牛年龄为一倍数十22；阿普今年的年龄为五倍数，22年后阿普的年龄为五倍数十22。根据22年后阿普是牛牛年龄的3倍，即3×（一倍数十22)=五倍数十22。所以一倍数=22岁，所以牛牛今年的年龄是22岁，阿普今年的年龄为22×5=110（岁）。","answer":"牛牛今年22岁，阿普今年110岁。","answerPage":30,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_p17","lecture":"xes_05_12","type":"practice","num":17,"method":6,"methodTitle":"差倍问题（变倍型）","methodHint":"找到不变量","page":29,"text":"7年前，爸爸的年龄是田田的9倍，11年后爸爸的年龄是田田的3倍。问：爸爸和田田今年各多少岁？","solution":"田田： 18爸爸：0-00把田田7年前的年龄作为一倍量，则11年后即一倍量十7+11。爸爸7年前的年龄为9倍量，11年后为9倍量十7+11。根据11年后爸爸是田田年龄的3倍，即3×（一倍量十7+11）=9倍量十7+11，可以得出3倍量+54=9倍量十18，1倍量=（54−18）÷（9−3）=6（岁），田田今年的年龄为6+7=13（岁）。爸爸7年前的年龄为6×9=54（岁），今年的年龄为54+7=61（岁）。","answer":"田田今年13岁，爸爸今年61岁。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_c18","lecture":"xes_05_12","type":"challenge","num":18,"method":6,"methodTitle":"差倍问题（变倍型）","methodHint":"找到不变量","page":30,"text":"阿普玩过彩带之后到书房找到丁丁和田田。阿普说：“我也有很多故事书啊。”丁丁就顺势给田田出了个题目，让她算算丁丁和阿普原来分别有多少本故事书。“丁丁原有故事书是阿普的6倍，两人各自接受礼物增加两本后，丁丁现有的故事书是阿普的4倍。那么丁丁和阿普原来分别有多少本故事书？”","solution":"把阿普原来有故事书的数量作为1倍量，增加2本后，为1倍量十2；丁丁原来有故事书的数量为6倍量，增加2本后为6倍量十2。现在丁丁的数量是阿普的4倍，即4×（1倍量十2)=6倍量+2，所以1倍量=（2×4−2）÷（6−4)=3（本），即阿普原来有故事书的数量为3本，则丁丁原来有故事书的数量为6×3=18（本）。","answer":"阿普原来有3本故事书，丁丁原来有18本故事书。阿普： 2丁丁：0","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_12_k19","lecture":"xes_05_12","type":"peak","num":19,"method":6,"methodTitle":"差倍问题（变倍型）","methodHint":"找到不变量","page":30,"text":"如下图所示，圆的面积是三角形面积的3倍。若除去重叠部分，圆余下的面积比三角形余下的面积多14平方厘米。问：整个三角形的面积是多少平方厘米？","solution":"把三角形的面积作为一倍数，画线段图：三角形：· 14圆形：根据已知条件，圆和三角形除去重叠部分，即圆和三角形的面积减去一个相同的数，则剩下的面积的差不变，同增同减差不变，仍为14平方厘米，则三角形原来的面积为14÷（3−1)=7（平方厘米)。","answer":"7平方厘米。","answerPage":31,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_05_13_e1","lecture":"xes_05_13","type":"example","num":1,"method":1,"methodTitle":"乘法巧算（1）","methodHint":"乘法交换律、乘法结合律","page":7,"text":"计算：(1)25×125×4(2)5×13×125×20×8","solution":"(1) 25×125×4 (2）5×13×125×20×8=25×4×125 =(5×20)×(125×8)×13=100×125 =100×1000×13=12500; =1300000。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p1","lecture":"xes_05_13","type":"practice","num":1,"method":1,"methodTitle":"乘法巧算（1）","methodHint":"乘法交换律、乘法结合律","page":9,"text":"计算：(1)27×125×8(2)6×25×4×8","solution":"（1）27×125×8=27×(125×8)=27×1000=27000；(2）6×25×4×8=(6×8)×(25×4)=48×100=4800。","answer":"（1)27000；(2)4800。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p2","lecture":"xes_05_13","type":"practice","num":2,"method":1,"methodTitle":"乘法巧算（1）","methodHint":"乘法交换律、乘法结合律","page":9,"text":"计算：(1)8×6×125(2)4×7×25×10(3)8×45×25(4)4×13×75","solution":"(1)8×6×125 （2）4×7×25×10=8×125×6 =(4×25)×(7×10)=1000×6 =100× 70=6000； =7000；(3)8×45×25 （4）4×13×75=4×2×45×25 =4×13×25×3=(4×25)×(2×45）=(4×25)×(13×3)=100×90 =100×39=9000； =3900。","answer":"(1)6000；(2)7000;(3)9000；(4)3900。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_c3","lecture":"xes_05_13","type":"challenge","num":3,"method":1,"methodTitle":"乘法巧算（1）","methodHint":"乘法交换律、乘法结合律","page":10,"text":"乐乐老师为了选拔出最聪明的大脑，给同学们进行了一场“谁是小小神算子”比赛。每位同学限时5分钟，答对题目最多的即可赢得比赛，丁丁首先抽到了下面这道题：请用最快的速度计算：456×2×125×25×5×4×8","solution":"456×2×125×25×5×4×8=456×(2×5)×(125×8)×(25×4)=456×10×1000×100=456000000。","answer":"456000000。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_e2","lecture":"xes_05_13","type":"example","num":2,"method":2,"methodTitle":"乘法巧算（2）","methodHint":"拆分，找能凑整的好朋友","page":11,"text":"计算：(1)888×125(2)25×32×125×2","solution":"(1） 888×125 (2） 25×32×125×2=111×(8×125) =(25×4)×(8×125)×2=111×1000 =100×1000×2=111000; =200000。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p4","lecture":"xes_05_13","type":"practice","num":4,"method":2,"methodTitle":"乘法巧算（2）","methodHint":"拆分，找能凑整的好朋友","page":13,"text":"计算：(1)25×36(2)125×24(3)25×64×19×125","solution":"（1）25×36 (2）125×24=25×4×9 =125×8×3=100×9 =1000×3=900; =3000；(3）25×64×19×125=25×4×8×2×19×125=(25×4)×(8×125)×(2×19)=100×1000×38=3800000。","answer":"（1)900；(2)3000；（3)3800000。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p5","lecture":"xes_05_13","type":"practice","num":5,"method":2,"methodTitle":"乘法巧算（2）","methodHint":"拆分，找能凑整的好朋友","page":13,"text":"计算：(1)25×64×125×5(2)125×125×64(3)32×25×125(4)56×125(5)16×25×5","solution":"（1）25×64×125×5=25×4×2×8×125×5=(25×4)×(2×5)×(8×125)=100×10×1000=1000000；(2）125×125×64=125×125×8×8=(125×8)×(125×8)=1000×1000=1000000;(3）32×25×125=4×8×25×125=(4×25)×(8×125)=100×1000=100000;(4）56×125=7×(8×125)=7×1000=7000；(5) ）16×25×5=2×4×2×25×5=(2×5)×(4×25)×2=10×100×2=2000。","answer":"（1)1000000；（2)1000000；（3)100000；(4)7000;(5)2000。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_c6","lecture":"xes_05_13","type":"challenge","num":6,"method":2,"methodTitle":"乘法巧算（2）","methodHint":"拆分，找能凑整的好朋友","page":14,"text":"计算：(1)38×102(2)526×99(3)1234×9998","solution":"","answer":"（1)3876；(2)52074；(3)12337532。(1）38×102=38×(100+2)=38×100+38×2=3800+76=3876;(2) 526×99=526×(100−1)=526×100−526=52600-526=52074；(3) 1234×9998=1234×(10000−2)=1234×10000−1234×2=12340000−2468=12337532。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_e3","lecture":"xes_05_13","type":"example","num":3,"method":3,"methodTitle":"乘法巧算（3）","methodHint":"①乘法分配律","page":15,"text":"计算：(1)125×(80+2)(2)68×(100+1)(3)56×999","solution":"（1）125×（80+2） (2)68×(100+1) (3)56×999（000)×99=1×99+001×89=7×90+08×91==10000+ 250 =6800+68 =56×1000-56×1=10250; =6868; =56000−56=55944。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p7","lecture":"xes_05_13","type":"practice","num":7,"method":3,"methodTitle":"乘法巧算（3）","methodHint":"①乘法分配律","page":17,"text":"计算：(1)25×(4+10)(2)37×(100+2)(3)23×99","solution":"（1）25×(4+10)=25×4+25×10=100+250=350；(2）3 37×(100+2)=37×100+37×2=3700+74=3774;(3）23×99=23×(100-1)=23×100-23×1=2300−23==2277。","answer":"（1)350；（2)3774；(3)2277。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p8","lecture":"xes_05_13","type":"practice","num":8,"method":3,"methodTitle":"乘法巧算（3）","methodHint":"①乘法分配律","page":17,"text":"计算：137×25+137×75","solution":"137×25+137×75=137×(25+75)=137×100=13700。","answer":"13700。","answerPage":33,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_05_13_c9","lecture":"xes_05_13","type":"challenge","num":9,"method":3,"methodTitle":"乘法巧算（3）","methodHint":"①乘法分配律","page":18,"text":"计算：(1）54+99×99+45(2)156+78×1994+22×1996","solution":"（1）54+99×99+45=99×99+(54+45)=99×99+99 ×1=99×(99+1)=99 ×100:0066=(2)156+78×1994+22×1996=78×2+78×1994+22×1996=78×(2+1994)+22×1996=78×1996+22×1996=1996×(78+22)=1996×100=199600。","answer":"（1)9900；（2)199600。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_e4","lecture":"xes_05_13","type":"example","num":4,"method":4,"methodTitle":"乘法巧算（4）","methodHint":"提取公因数","page":19,"text":"计算：(1)51×32+51×68(2)218×59+218×40+218","solution":"(1)51×32+51×68 (2)218×59+218×40+218=51×(32+68) =218×59+218×40+218×1=51×100 =218×(59+40+1)=5100; =218×100=21800。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p10","lecture":"xes_05_13","type":"practice","num":10,"method":4,"methodTitle":"乘法巧算（4）","methodHint":"提取公因数","page":21,"text":"计算：(1)80×2016-2×2016+2016×22(2)1999+999×999","solution":"（1）80×2016−2×2016+2016×22=2016×(80−2+22)=2016×100=201600;（2）1999+999×999=1000+999+999×999=1000+999×(999+1)=1000+999000=1000000。","answer":"(1)201600;(2)1000000。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p11","lecture":"xes_05_13","type":"practice","num":11,"method":4,"methodTitle":"乘法巧算（4）","methodHint":"提取公因数","page":21,"text":"计算：(1）125×(10+8)(2)(100-4)×25","solution":"（1）125×(10+8)=125×10+125 ×8=1250+1000=2250；(2）(100−4)×25=100×25−4×25=2500−100=2400。","answer":"（1)2250；（2)2400。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_c12","lecture":"xes_05_13","type":"challenge","num":12,"method":4,"methodTitle":"乘法巧算（4）","methodHint":"提取公因数","page":22,"text":"计算：9999×7777+3333×6666","solution":"9999×7777+3333×6666=9999×7777+3333×3×2222=9999×7777+9999×22229999×(7777+2222)=9999×9999=9999×(10000−1)=99990000−9999=99980001。","answer":"99980001。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_e5","lecture":"xes_05_13","type":"example","num":5,"method":5,"methodTitle":"乘法巧算（5）","methodHint":"寻找公因数：先把接近或有倍数关系的数变型，","page":23,"text":"计算：(1)24×99+33×76×3(2)999×222+333×334","solution":"(1)24×99+33×76×3 (2)999×222+333×334=24×99+99×76 =333×3×222+333×334=99×(24+76) =333×666+333×334=99×100 =333×(666+334)=9900; =333×1000=333000。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p13","lecture":"xes_05_13","type":"practice","num":13,"method":5,"methodTitle":"乘法巧算（5）","methodHint":"寻找公因数：先把接近或有倍数关系的数变型，","page":25,"text":"计算：(1)255×999+255×2-255(2)999×778+333×666","solution":"（1）255×999+255×2-255=255×999+255×2-255×1=255×(999+2−1)=255×1000=255000；(2) 999×778+333×666=999×778+333×3×222=999×778+999×222=999×(778+222)=999×1000=999000。","answer":"（1)255000；（2)999000。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p14","lecture":"xes_05_13","type":"practice","num":14,"method":5,"methodTitle":"乘法巧算（5）","methodHint":"寻找公因数：先把接近或有倍数关系的数变型，","page":25,"text":"计算：1001+255×999+255×2","solution":"1001+255×999+255×2=1001+255×(999+2)=1001+255×1001=1001×(1+255)=1001×256=256256。","answer":"256256。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_c15","lecture":"xes_05_13","type":"challenge","num":15,"method":5,"methodTitle":"乘法巧算（5）","methodHint":"寻找公因数：先把接近或有倍数关系的数变型，","page":26,"text":"阿普则慢慢悠悠地说：“等等我，我才刚读完题···.计算：","solution":"211×555+445×789+555×789+211×445555×(211+789)+445×(211+789)=555×1000+445×1000=1000×(555+445)=1000×1000=1000000。","answer":"1000000。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_e6","lecture":"xes_05_13","type":"example","num":6,"method":6,"methodTitle":"乘法巧算（6）","methodHint":"①椅子数","page":27,"text":"先计算，然后总结一些计算规律。(1)37×101 49 ×10101 2016×10001(2)12×11 52×11 69×11(3)57×53 26×24 61×69(4)16×96 78×38 41 × 61","solution":"（1）37 × 101 =3737,49 × 10101 = 494949,2016 × 10001=20162016。(2)12 6 9(3)57×53 26×24 61×69前两位：5×6=30，前两位：2×3=6，前两位：6×7=42，后两位：7×3=21，后两位：6×4=24，后两位：1×9=9，结果：3021。结果：624。结果：4209。(4)16×96 78×38 41×61前两位:1×9+6=15, 前两位：7×3+8=29，前两位：4×6+1=25,后两位：6×6=36，后两位：8×8=64，后两位：1×1=1,结果：1536。结果：2964。结果：2501。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p16","lecture":"xes_05_13","type":"practice","num":16,"method":6,"methodTitle":"乘法巧算（6）","methodHint":"①椅子数","page":29,"text":"计算：(1)20162016×2015−20152015×2016(2)99×11 24×11(3)33×37 68×62(4)37×77 26×86","solution":"(1）20162016×2015−20152015×2016=2016×10001×2015−2015×10001×2016=0；(2) 9 9 2 VV VV108 26(3）33×37 68×62前两位：3×4=12，前两位：6×7=42，后两位：7×3=21，后两位：8×2=16，结果：1221。结果：4216。(4)37×77 26×86前两位：3×7+7=28，前两位：2×8+6=22，后两位：7×7=49，后两位：6×6=36，结果：2849。结果：2236。","answer":"（1)0；（2)1089，264；（3)1221，4216；(4)2849,2236。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_p17","lecture":"xes_05_13","type":"practice","num":17,"method":6,"methodTitle":"乘法巧算（6）","methodHint":"①椅子数","page":29,"text":"计算：(1)35×11 (2)68×11(3)57×53 (4)46× 44(5)18×98 (6)32×72","solution":"(1)35×11=385； (2)68×11=748;(3）57×53=3021； (4)46×44=2024；(5)18×98=1764; (6)32×72=2304。","answer":"（1)385；(2)748；(3)3021；（4)2024；(5)1764;(6)2304。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_c18","lecture":"xes_05_13","type":"challenge","num":18,"method":6,"methodTitle":"乘法巧算（6）","methodHint":"①椅子数","page":30,"text":"牛牛果断地放弃了第一题，重新抽取到了学而思杯的试题：计算：33×20102010-2010×330033","solution":"330033可以看作是00330033，即0033重复出现了2次。33×20102010−2010×330033=33×2010×10001−2010×33×10001=0。","answer":"0。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_05_13_k19","lecture":"xes_05_13","type":"peak","num":19,"method":6,"methodTitle":"乘法巧算（6）","methodHint":"①椅子数","page":30,"text":"6×4444×2222+3333×5555的得数中有多少个数字是奇数？","solution":"6×4444×2222+3333×5555=1111×1111×6×4×2+1111 ×1111 ×3×5=1111×1111×63=1111×1111×9×7=9999×7777=(10000−1)×7777=77762223，因此，有4个数字是奇数。","answer":"4。","answerPage":34,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_e1","lecture":"xes_06_13","type":"example","num":1,"method":1,"methodTitle":"等差数列求末项","methodHint":"末项=首项十(项数一1)×公差","page":7,"text":"同学们一起来算一算吧！(1)等差数列：5，7，9，11，13，15，的第12项是（2）等差数列：0，4，8，12，16，20，*的第43项是(3)等差数列：3，7，11，15，·的第56项是","solution":"(1)5+(12−1)×2=27；\n(2)0+(43−1)×4=168;(3)3+(56-1)×4=223。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p1","lecture":"xes_06_13","type":"practice","num":1,"method":1,"methodTitle":"等差数列求末项","methodHint":"末项=首项十(项数一1)×公差","page":9,"text":"(1)等差数列：3，4，5，6，··的第62项是(2)等差数列：2，5，8，11，*的第47项是","solution":"根据公式：（1)3+（62−1)×1=64。(2)2+(47−1)×3=140。","answer":"（1)64;（2)140。","answerPage":31,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_06_13_p2","lecture":"xes_06_13","type":"practice","num":2,"method":1,"methodTitle":"等差数列求末项","methodHint":"末项=首项十(项数一1)×公差","page":9,"text":"(1)等差数列9,13,17,21,·中，第65项是(2)等差数列3，5，7，9，··中，第102项是","solution":"（1)第65项为9+（65-1)×4=265；(2）第102项为3+（102-1)×2=205。","answer":"（1)265；(2)205。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_c3","lecture":"xes_06_13","type":"challenge","num":3,"method":1,"methodTitle":"等差数列求末项","methodHint":"末项=首项十(项数一1)×公差","page":10,"text":"田田和牛牛来到了一个很神秘的地方，那里有很多的雕塑，每个雕塑都是由蝴蝶组成的。第一个雕塑有3只蝴蝶，第二个雕塑有5只蝴蝶，第三个雕塑有7只蝴蝶，第四个雕塑有9只蝴蝶，以后的雕塑按照这样的规律一直延伸到很远的地方，田田和牛牛看不到这排雕塑的尽头在哪里，田田问牛牛：第102个雕塑有多少只蝴蝶呢？","solution":"根据题意，这是一个等差数列：3，5，7，9,11，13，15，\"，求这个数列的第102项是多少，根据末项公式可知，第102项=3+（102−1）×2=205（只）。","answer":"205只。","answerPage":31,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_06_13_e2","lecture":"xes_06_13","type":"example","num":2,"method":2,"methodTitle":"等差数列求项数","methodHint":"项数=(末项一首项)÷公差十1","page":11,"text":"（1)等差数列：5，6，7，8，9，，其中55是这个数列的第项；(2)等差数列：7，9，11，13，，其中69是这个数列的第项。","solution":"（1)连续自然数没有1，2，3，4，所以55是这个数列的第55−4=51（项），或者55−5+1=51（项）。(2)项数为(69−7)÷2+1=32(项）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p4","lecture":"xes_06_13","type":"practice","num":4,"method":2,"methodTitle":"等差数列求项数","methodHint":"项数=(末项一首项)÷公差十1","page":13,"text":"(1)等差数列：8,11,14,17，\"\"，其中134是这个数列的第项；(2)等差数列：15，19,23,27，，其中295是这个数列的第项。","solution":"根据公式：（1）（134−8）÷3+1=43(项）。（2)(295−15)÷4+1=71(项)。","answer":"（1)43；（2)71。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p5","lecture":"xes_06_13","type":"practice","num":5,"method":2,"methodTitle":"等差数列求项数","methodHint":"项数=(末项一首项)÷公差十1","page":13,"text":"(1)已知等差数列2,6,10,14,…,则82是这个数列的第项；(2)已知等差数列2，5，8，11，，则38是这个数列的第项。","solution":"（1)项数为（82−2)÷4+1=21；(2)项数为(38-2)÷3+1=13。","answer":"（1)21；(2)13。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_c6","lecture":"xes_06_13","type":"challenge","num":6,"method":2,"methodTitle":"等差数列求项数","methodHint":"项数=(末项一首项)÷公差十1","page":14,"text":"在这个神秘的地方还有很多美丽的蝴蝶，田田想让牛牛把66只蝴蝶放在若干个盒子里，按第一个盒子里放1只，第2个盒子里放2只，第3个盒子里放3只，\"，这样下去，最后刚好将蝴蝶放完，那么牛牛用了多少个盒子呢？","solution":"在基础学习中，我们要求记住：1+2+3+4十*十10=55，那么55+11=66，刚好一共11个数，所以需要11个盒子。","answer":"11个。","answerPage":31,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_e3","lecture":"xes_06_13","type":"example","num":3,"method":3,"methodTitle":"等差数列求和","methodHint":"和=（首项十末项）×项数÷2","page":15,"text":"大家一起来求和！(1)3+4+5+6+*+76+77+78(2)2+4+6+8+*+96+98+100","solution":"(1)因为是连续自然数，所以项数为78−2=76，和为（3+78)×76÷2=3078。(2)这个数列是100以内的所有偶数，所以是50个，和为（2+100）×50÷2=2550。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p7","lecture":"xes_06_13","type":"practice","num":7,"method":3,"methodTitle":"等差数列求和","methodHint":"和=（首项十末项）×项数÷2","page":17,"text":"等差数列求和。(1)1,3,5,7,.·.,87,89,91;(2)4,7,10,13,.**,40,43,46。","solution":"","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p8","lecture":"xes_06_13","type":"practice","num":8,"method":3,"methodTitle":"等差数列求和","methodHint":"和=（首项十末项）×项数÷2","page":17,"text":"计算：(1)2+5+8+11+··*+41(2)6+9+12+15+··*+63","solution":"（1)项数为（41−2)÷3+1=14，和为(2+41)×14÷2=301。(2)项数为（63−6)÷3+1=20，和为（6+63）×20÷2=690。","answer":"（1)301；(2)690。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_c9","lecture":"xes_06_13","type":"challenge","num":9,"method":3,"methodTitle":"等差数列求和","methodHint":"和=（首项十末项）×项数÷2","page":18,"text":"当他们抓完蝴蝶后，突然出现了一位神秘的老爷爷，老爷爷告诉田田和牛牛，他是这里的守护者，他们随意抓蝴蝶破坏了这里美丽的环境，要受到惩罚。田田哭着向老爷爷求情，老爷爷说不接受惩罚也可以，但要放回蝴蝶且回答对他问的问题：“在100以内的自然数中，所有是3的倍数的数的平均数是多少？”","solution":"100以内的自然数中，是3的倍数的数有0，3，6，9，**，99，共34个。它们的和是（0+99)×34÷2=99×17=1683，则它们的平均数为1683÷34=49.5。","answer":"49.5。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_e4","lecture":"xes_06_13","type":"example","num":4,"method":4,"methodTitle":"求公差","methodHint":"公差=（末项一首项）÷（项数一1)","page":19,"text":"一个递增的等差数列的首项是10，第61项是250，这个等差数列的公差是多少？","solution":"这个等差数列的首项为10，末项为250，项数为61，所以公差=（末项一首项）÷（项数一1)=（250−10)÷（61−1)=4。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p10","lecture":"xes_06_13","type":"practice","num":10,"method":4,"methodTitle":"求公差","methodHint":"公差=（末项一首项）÷（项数一1)","page":21,"text":"一个递增的等差数列，第1项是232，第52项是334，这个等差数列的公差是多少？","solution":"这个等差数列的首项为232，末项为334，项数为52，所以公差=（末项一首项）÷（项数—1)=（334−232)÷（52−1)=2。","answer":"2。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p11","lecture":"xes_06_13","type":"practice","num":11,"method":4,"methodTitle":"求公差","methodHint":"公差=（末项一首项）÷（项数一1)","page":21,"text":"一个递减的等差数列，第18项是298，第51项是67，这个等差数列公差是","solution":"这个等差数列的第18项为298，第51项为67，项数差为51−18=33，两数差为298−67=231，所以公差为231÷33=7。","answer":"7。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_c12","lecture":"xes_06_13","type":"challenge","num":12,"method":4,"methodTitle":"求公差","methodHint":"公差=（末项一首项）÷（项数一1)","page":22,"text":"田田和牛牛通过了老爷爷的考验，老爷爷决定给他们一些奖励。老爷爷给了他们编号为1～9的9个盒子，里面共放有351块糖，老爷爷告诉他们每个盒子都比前一个盒子里多同样数量的糖。而且1号盒子里放11块糖，如果他们能告诉老爷爷后面的盒子比它前一个盒子里多放几块糖，就把这些好吃的糖果送给他们，他们能得到吗？","solution":"根据题意，灵活运用等差数列求和公式，解决问题。求和公式：和=（首项十末项)×项数÷2，可得：末项=和×2÷项数一首项。故第9个盒子中的糖果的数量为351×2÷9−11=67(块），公差为（67−11)÷（9−1)=56÷8=7（块），即后面盒子比前一个盒子多放7块糖。","answer":"7块。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_e5","lecture":"xes_06_13","type":"example","num":5,"method":5,"methodTitle":"等差数列综合","methodHint":"①求公差","page":23,"text":"一个等差数列的第6项和第12项分别是24、42。问：(1)数列的第1项是什么？(2)数列的第23项是什么？(3)数列的前23项的和是多少？","solution":"(2)第23项为9+（23−1)×3=75。（3)前23项的和为（9+75）×23÷2=966。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p13","lecture":"xes_06_13","type":"practice","num":13,"method":5,"methodTitle":"等差数列综合","methodHint":"①求公差","page":25,"text":"已知等差数列的第5项和第9项分别为25，49，那么前31项的和是多少？","solution":"公差为（49−25）÷（9−5）=6。第1项为25−（5−1)×6=1，第31项为1+（31−1)×6=181，和为（1+181)×31÷2=2821。","answer":"2821。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p14","lecture":"xes_06_13","type":"practice","num":14,"method":5,"methodTitle":"等差数列综合","methodHint":"①求公差","page":25,"text":"一个等差数列的第3项是13，第11项是45，它的第21项是什么数？它的前21项的和是多少？","solution":"公差为（45−13)÷（11-3)=4，第21项为45+（21−11)×4=85。因为这个数列有21项，所以中间数是第11项，即45，所以前21项和为45×21=945。","answer":"85，945。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_c15","lecture":"xes_06_13","type":"challenge","num":15,"method":5,"methodTitle":"等差数列综合","methodHint":"①求公差","page":26,"text":"牛牛和田田得到了很多糖果，牛牛打算把自己的糖果分开按数量呈等差数列的形式包装，如果第4个盒子里放了27块糖，第8个盒子里放了47块糖，来计算一下牛牛的前20个盒子一共装有多少块糖？","solution":"将盒子里的糖数看作等差数列，第8项与第4项之间差了4个公差，所以公差=（47−27)÷（8-4)=5；首项=27-3×5=12；第20项=12+（20−1)×5=107；前20项的和=（12+107)×20÷2=1190。所以牛牛的前20个盒子一共装有1190块糖。","answer":"1190块。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_e6","lecture":"xes_06_13","type":"example","num":6,"method":6,"methodTitle":"中项定理的逆运用","methodHint":"中间数=和÷项数（奇数个）","page":27,"text":"(1)有5个盒子中共放了325个乒乓球，从小盒子到大盒子，每一个盒子中比前面的盒子多了5个乒乓球。问：最大的盒子中有多少个乒乓球？(2)有8个盒子共放了888个乒乓球，从小盒子到大盒子，每一个盒子比前面的盒子多了6个乒乓球，问：最小的盒子里有多少个乒乓球？","solution":"（1)第3个盒子中放了乒乓球：325÷5=65（个），最大的盒子中放了乒乓球：65+5+5=75（个）。(2）中间的2个盒子中有888÷（8÷2)=222（个）乒乓球，即第4个和第5个盒子中所放乒乓球的总数为222个，2个盒子中所放乒乓球差为6个，所以第4个盒子中有乒乓球：（222−6)÷2=108（个），最小的盒子中有乒乓球：108−6×3=90（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p16","lecture":"xes_06_13","type":"practice","num":16,"method":6,"methodTitle":"中项定理的逆运用","methodHint":"中间数=和÷项数（奇数个）","page":29,"text":"2,4,6，8，10，12，··是个连续偶数列，如果其中5个连续偶数的和是320，那么它们中最小的一个数是谁？","solution":"利用等差数列的“中项定理”，对于奇数个连续自然数，最中间的数是所有这些自然数的平均值，五个连续偶数的中间一个数应为320÷5=64。因为相邻偶数相差2，所以这五个偶数依次是60，62，64，66，68，其中最小的是60。","answer":"60。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_p17","lecture":"xes_06_13","type":"practice","num":17,"method":6,"methodTitle":"中项定理的逆运用","methodHint":"中间数=和÷项数（奇数个）","page":29,"text":"(1)有一个7层书架共放了679本书，上层比下层少5本，最上层放几本书？(2)有一个6层书架共放了762本书，上层比下层少8本，最下层放几本书？","solution":"（1)7层是一个奇数，所以有中间数，中间的第4层有：679÷7=97（本），最上层有：97−3×5=82(本）。（2）6层是一个偶数，我们可以分成和相同的3组，最中间那组的和为762÷3=254（本），是第3层和第4层，中间2层相差8本，这就成了一个和差问题，第4层有（254+8)÷2=131（本），第6层131+8+8=147(本)。","answer":"（1)82本；(2)147本。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_c18","lecture":"xes_06_13","type":"challenge","num":18,"method":6,"methodTitle":"中项定理的逆运用","methodHint":"中间数=和÷项数（奇数个）","page":30,"text":"牛牛和田田玩投放石子游戏，牛牛从A出发走1米放1块石子，第二次走4米放3块石子，第三次走7米放5块石子，再走10米放7块石子，\"，照此规律最后走到B处放下35块石子。请问小朋友们，从A到B路程有多远？","solution":"先计算投放了多少次，由题意知，一次投放石子数构成的数列是：1，3，5，7，,35，这是一个等差数列，其中首项为1，公差为2，末项为35，那么项数为：（35−1)÷2+1=18。再看投放石子每次走的路程依次组成的数列为1，4，7，10，\"，这又是一个等差数列，其中首项为1，公差为3，项数为18，末项为1+（18−1)×3=52，其和为（1+52)×18÷2=477（米）。","answer":"477米。","answerPage":32,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_13_k19","lecture":"xes_06_13","type":"peak","num":19,"method":6,"methodTitle":"中项定理的逆运用","methodHint":"中间数=和÷项数（奇数个）","page":30,"text":"牛牛和田田来到了一个神秘的工厂，这个工厂原有工人不少于63人，在1月底以前的某一天调进了若干工人，以后，每天都新调入1人进车间工作。现在知道该车间1月份每人每天生产一件产品，共生产1994件。试问：1月几日开始调进工人？共调进了多少工人？","solution":"1月份共有31天，所以这个车间的原有工人至少生产出了63×31=1953（件），或增加31的倍数，但因不超过1994件，所以工厂的原有工人生产了1953或1984件。所以后来调进的工人生产了1994−1953=41（件），或1994−1984=10（件）产品。根据题目，我们也可以知道调进的工人生产的产品总数是若干个连续的自然数的和，自然数的个数即是调入的天数，连续自然数中最小的那个数即是第一次调入的工人数。41=20+21，所以调入的次数为2次，第一次调入的人数为20人，共调进人数为20+1=21（人）。10=1+2+3+4，所以调入的次数为4次，第一次调入的人数为1人，共调进4人。所以分两种情况：第一种调人的天数为2天，1月30日开始调入，共调进21人；第二种调人的天数为4天，1月28日开始调入，共调进4人。","answer":"1月30日开始调人，共调进21人或1月28日开始调人，共调进4人。","answerPage":33,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_e1","lecture":"xes_06_19","type":"example","num":1,"method":1,"methodTitle":"直接设未知数（1）","methodHint":"①审：审题","page":7,"text":"煤场上午运来15吨煤，下午又运来了一些，这天共运来43吨煤，下午运来多少吨煤？","solution":"1.先审题，找出未知数，一般将问题所问的量设为未知数；2.设未知数为x，即设下午运来x吨煤；3.找出题目中数量之间的相等关系，列出方程。上午运煤重量十下午运煤重量=一天运煤总重量，即15十x=43；4.解方程：x=28；5.检验：把x=28代入原方程15十x=43中，15+28=43，所以原方程的解为x=28；6.下午运来28吨煤。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p1","lecture":"xes_06_19","type":"practice","num":1,"method":1,"methodTitle":"直接设未知数（1）","methodHint":"①审：审题","page":9,"text":"两袋大米，第一袋比第二袋少14千克。已知第一袋重52千克，第二袋重多少千克？","solution":"1.先审题，找出未知量：第二袋重多少千克；2.设未知数为x，即第二袋重x千克；3.找出题目中数量之间的相等关系，列方程：第一袋比第二袋少14千克，即x一52=14；4.解方程：x=66；5.检验：把x=66代入原方程x一52=14中，66−52=14，所以原方程的解为x=66；6.第二袋重66千克。","answer":"66千克。","answerPage":44,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p2","lecture":"xes_06_19","type":"practice","num":2,"method":1,"methodTitle":"直接设未知数（1）","methodHint":"①审：审题","page":9,"text":"有两包面粉，第一包重60千克，如果从第二包取出10千克放入第一包，那么两包面粉一样重。问：第二包面粉重多少千克？","solution":"解：设第二包面粉重α千克。根据题目中的等量关系，从第二包取出10千克放入第一包后两包一样重，列出方程：x一10=60+10，解方程得x=80。把x=80代入原方程x一10=60+10中，80−10=60+10。所以原方程的解为x=80。","answer":"80千克。","answerPage":44,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_c3","lecture":"xes_06_19","type":"challenge","num":3,"method":1,"methodTitle":"直接设未知数（1）","methodHint":"①审：审题","page":10,"text":"乐乐老师带领同学们进行课外实践活动，丰富生活经验。牛牛的哥哥知道这个活动后也想参加。牛牛今年10岁，哥哥3年前的年龄是牛牛当时年龄的2倍。哥哥今年多少岁？","solution":"解：设哥哥今年r岁。根据题目中的等量关系，哥哥3年前的年龄是牛牛当时年龄的2倍，列出方程：2×（10−3）=x一3，解方程得x=17。把x=17代入原方程2×（10−3）=x一3中，2×（10−3)=17−3。所以原方程的解为x=17。","answer":"17岁。","answerPage":44,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_e2","lecture":"xes_06_19","type":"example","num":2,"method":2,"methodTitle":"直接设未知数（2）","methodHint":"①审：审题","page":11,"text":"一个平行四边形的面积是150平方厘米，底是50厘米，高是多少厘米？","solution":"1.先审题，找出未知数，高是多少；2.设未知数为x，即设高是r厘米；3.找出题目中数量之间的相等关系，列出方程：平行四边形的面积=底×对应高，即50×x=150；4.解方程：x=3；5.检验：把x=3代入原方程50×x=150中，50×3=150，所以原方程的解为r=3。6.平行四边形的高是3厘米。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p4","lecture":"xes_06_19","type":"practice","num":4,"method":2,"methodTitle":"直接设未知数（2）","methodHint":"①审：审题","page":13,"text":"一个三角形的高是18厘米，面积是180平方厘米，底是多少厘米？","solution":"1．先审题，找出未知量：底是多少厘米；2.设未知数为x，即设底是x厘米；3.找出题目中数量之间的相等关系，列方程：三角形的面积=底×对应高÷2，即x×18÷2=180;4.解方程：x=20；5.检验：把x=20代入原方程x×18÷2=180中，20×18÷2=180，所以原方程的解为x=20；6.底是20厘米。","answer":"20厘米。","answerPage":44,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p5","lecture":"xes_06_19","type":"practice","num":5,"method":2,"methodTitle":"直接设未知数（2）","methodHint":"①审：审题","page":13,"text":"一堆煤重40吨，一辆货车运了4次，还剩一半没有运，这辆货车平均每次运多少吨？","solution":"","answer":"5吨。题目中的等量关系，已经运的重量=总重量的一半。列出方程：4x=40÷2，解方程得x=5。把x=5代入原方程4x=40÷2中，4×5=40÷2，所以原方程的解为r=5。","answerPage":44,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_c6","lecture":"xes_06_19","type":"challenge","num":6,"method":2,"methodTitle":"直接设未知数（2）","methodHint":"①审：审题","page":14,"text":"丁丁首先发现了一块梯形的草地，想在草地上种一些花。这个梯形的面积是120平方米，上底是13米，下底是17米，这个梯形的高是多少米？","solution":"解：设梯形的高为工米。根据题目中的等量关系，梯形面积=（上底十下底）×高÷2，列出方程：（13+17)×x÷2=120，解方程得x=8。把x=8代入原方程（13+17)×x÷2=120中，（13+17）×8÷2=120。所以原方程的解为x=8。","answer":"8米。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_e3","lecture":"xes_06_19","type":"example","num":3,"method":3,"methodTitle":"直接设未知数（3）","methodHint":"①审：审题","page":15,"text":"丁丁和牛牛共有100张积分卡，已知牛牛积分卡的数量比丁丁的3倍多8张，请问丁丁、牛牛各有多少张积分卡？","solution":"1.先审题，找出未知数：丁丁、牛牛各有多少张积分卡；2.设未知数为x：丁丁有张积分卡，那么牛牛有(3x十8)张；3.找出题目中数量之间的相等关系：丁丁和牛牛共有100张积列出方程，即x十3x十8=100；4.解方程：x=23；5.检验：把x=23代入原方程x+3x十8=100中,23+3×23+8=100,所以原方程的解为x=23；6.丁丁有23张积分卡，牛牛有77张积分卡。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p7","lecture":"xes_06_19","type":"practice","num":7,"method":3,"methodTitle":"直接设未知数（3）","methodHint":"①审：审题","page":17,"text":"牛牛比丁丁多100张积分卡，已知牛牛积分卡的数量比丁丁的3倍少8张，请问丁丁、牛牛各有多少张积分卡？","solution":"1.先审题，找出未知量：丁丁、牛牛各有多少张积分卡；2.设未知数为x：丁丁有r张积分卡，那么牛牛有(3x一8)张；3.找出题目中数量之间的相等关系，丁丁比牛牛多100张积分卡，列出方程，即3x一8一x=100；4.解方程：r=54；5.检验：把x=54代入原方程3x一8一x=100中，左右相等，所以原方程的解为x=54；6.丁丁有54张积分卡，牛牛有3×54−8=154(张)积分卡。","answer":"丁丁有54张，牛牛有154张。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p8","lecture":"xes_06_19","type":"practice","num":8,"method":3,"methodTitle":"直接设未知数（3）","methodHint":"①审：审题","page":17,"text":"妈妈买了3千克葡萄，付出20元，找回5元，每千克葡萄多少元？","solution":"解：设每千克葡萄r元。根据题目中的等量关系，单价×重量=总价，葡萄的钱十找回的钱=总钱数，列出方程：3x十5=20，解方程得x=5。把x=5代入原方程3x十5=20中，3×5+5=20。所以原方程的解为x=5。","answer":"5元。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_c9","lecture":"xes_06_19","type":"challenge","num":9,"method":3,"methodTitle":"直接设未知数（3）","methodHint":"①审：审题","page":18,"text":"田田的课外实践场地选在了图书馆，图书馆要修补图书820本，已经修补了400本，要求在剩下的6小时里将图书全部修补完，平均每小时修补多少本？AP","solution":"","answer":"70本。量，已修补的数量十未修补的数量=总数量，列出方程：6x十400=820，解方程得x=70。把x=70代入原方程6x十400=820中，6×70+400=820。所以原方程的解为x=70。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_e4","lecture":"xes_06_19","type":"example","num":4,"method":4,"methodTitle":"直接设未知数（4）","methodHint":"①审：审题","page":19,"text":"苹果和梨共80千克，价值400元，已知苹果4元一千克，梨6元一千克，那么苹果和梨各多少千克？","solution":"1.先审题，找出未知数：苹果多少千克，梨多少千克；2.设未知数为x，有两个未知数时，先设一个，设苹果有x千克，则梨有(80一x)千克；3.找出题目中数量之间的相等关系：苹果价钱十梨价钱=总价钱，列出方程，即6×（80一x）+4x=400；4.解方程：x=40；5.检验：把x=40代入原方程6×（80一x）+4x=400中，6×（80−40)+4×40=400，所以原方程的解为x=40；6.苹果40千克，梨有40千克。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p10","lecture":"xes_06_19","type":"practice","num":10,"method":4,"methodTitle":"直接设未知数（4）","methodHint":"①审：审题","page":21,"text":"小明买来8角邮票与5角邮票共100张，总值68元。8角邮票和5角邮票各买了多少张？","solution":"1.先审题，找出未知量：8角邮票和5角邮票各买了多少张；2.设未知数为x，有两个未知数时，先设一个，设8角邮票有x张，则5角邮票有（100一x）张；3.找出题目中数量之间的相等关系：8角邮票与5角邮票共68元，列出方程，即0.8r十0.5（100-x)=68；4.解方程：x=60；5.检验：把x=60代入原方程0.8x十0.5（100一x）=68中，0.8×60+0.5×（100-60)=68，所以原方程的解为=60；6.8角邮票有60张，5角邮票有40张。","answer":"8角邮票60张，5角邮票40张。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p11","lecture":"xes_06_19","type":"practice","num":11,"method":4,"methodTitle":"直接设未知数（4）","methodHint":"①审：审题","page":21,"text":"新学期开始，有一批新的教科书要分发到各位学生手中，这批教科书由一个小组的学生来搬，如果这批教科书由小组中的男生来搬，每人搬25本，那么还有15本没人搬；如果由小组中的女生来搬，每人搬20本，那么最后一名女生只需要搬10本。已知这个小组的学生一共有8人，求男、女生各有多少人。","solution":"解：设这个小组男生有x人，那么女生(8一x)人。根据题目中两种搬书方式的数量关系列出方程：25x十15=20（8一x）-10，解方程得x=3。把x=3代入原方程25x+15=20（8一x）-10中，25×3+15=20×（8−3)−10。所以原方程的解为x=3，男生有3人，女生有8−3=5（人）。","answer":"男生有3人，女生有5人。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_c12","lecture":"xes_06_19","type":"challenge","num":12,"method":4,"methodTitle":"直接设未知数（4）","methodHint":"①审：审题","page":22,"text":"然后乐乐老师带领同学们参加植树活动，派男、女生共12人去取树苗，男生每人拿3棵，女生每人拿2棵，正好全部取完；如果男、女生人数调换一下，则还差2棵不能取回。问：原来男、女生各有多少人？","solution":"解：设有男生x人，则有女生（12一x)人。根据题目中的等量关系，男生拿的棵数十女生拿的棵数=树苗的总棵数，列出方程：3x十2（12一r）=3（12-x）+2x+2，解方程得x=7。把x=7代入原方程3x+2（12—x）=3（12—x）+2x+2中，3×7+2×（12-7)=3×（12-7)+2×7+2。解：设平均每小时修补x本。根据题目|所以原方程的解为x=7。女生有12−7=5（人)。","answer":"男生有7人，女生有5人。","answerPage":45,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_e5","lecture":"xes_06_19","type":"example","num":5,"method":5,"methodTitle":"间接设未知数（1）","methodHint":"①审","page":23,"text":"小明家左边与右边各有一家超市在促销同一种品牌的牛奶。如果去左边这家超市购买，所带的钱恰好能买12盒；如果去右边那家超市购买，所带的钱恰好能多买2盒。已知右边超市每盒牛奶的价格比左边超市每盒牛奶的价格便宜1元，那么小明共带了多少钱？","solution":"1.先审题，找出未知数：小明共带了多少元，但直接设这个未知数不好算，为了求出小明带了多少元，就必须知道每盒牛奶的价格；2.设未知数为：间接设未知数，右边超市每盒牛奶x元，则左边超市每盒牛奶(x十1)元；3.找出题目中数量之间的相等关系，两种购买方式的钱数相同，列出方程，即12×(c十1)=（12+2)c；4.解方程：c=6；5.检验：把x=6代入原方程12×（x十1)=（12+2)x中，12×（6+1)=（12+2)×6，所以原方程的解为x=6；6.小明一共带了6×(12+2)=84（元）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p13","lecture":"xes_06_19","type":"practice","num":13,"method":5,"methodTitle":"间接设未知数（1）","methodHint":"①审","page":25,"text":"体育课上，三年级(1)班的46名同学都在操场上玩球。每个篮球分给6名同学玩，每个排球分给8名同学玩。篮球和排球一共有7个。问：玩排球的同学有多少人？","solution":"1，先审题，找出未知量：玩排球的同学有多少人；2.设未知数为工，间接设未知数，排球有x个；3.找出题目中数量之间的相等关系，则篮球有（7一x）个，玩篮球的人数十玩排球的人数=总人数，列出方程：8x十6×（7一x）=46；4.解方程：x=2；5.检验：把x=2代入原方程8x十6×（7一x）=46中，8×2+6×（7−2)=46。所以原方程的解为x=2；6.玩排球的人数为8×2=16（人）。","answer":"16人。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p14","lecture":"xes_06_19","type":"practice","num":14,"method":5,"methodTitle":"间接设未知数（1）","methodHint":"①审","page":25,"text":"丁丁和牛牛共有25元钱，已知牛牛的钱比丁丁的2倍还少8元，请问丁丁、牛牛各有多少元？","solution":"解：设丁丁有r元，那么牛牛有（2x一8)元。根据题目中数量之间的相等关系，丁丁和牛牛共有25元，列出方程：2x一8十x=25。解方程得x=11。把x=11代入原方程2x一8十x=25中，左右相等，所以原方程的解为x=11。牛牛的钱数为2×11−8=14（元）。","answer":"丁丁有11元，牛牛有14元。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_c15","lecture":"xes_06_19","type":"challenge","num":15,"method":5,"methodTitle":"间接设未知数（1）","methodHint":"①审","page":26,"text":"阿普也没闲着，他发现一口枯井，想量一下井深。用绳子测井深，绳子两折时余60厘米，绳子三折时差40厘米，求绳子的长度是多少厘米。","solution":"解：设井深是工厘米。根据题目中的等量关系绳子的长度不变，列出方程：2x十60×2=3x一40×3，解方程得x=240。把x=240代入原方程2x+60×2=3x-40×3中，2×240+60×2=3×240−40×3。所以原方程的解为x=240。绳长为2×240+60×2=600（厘米）。","answer":"600厘米。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_e6","lecture":"xes_06_19","type":"example","num":6,"method":6,"methodTitle":"间接设未知数（2）","methodHint":"①审","page":27,"text":"甲、乙、丙共有钱99元，甲的钱比乙的钱的2倍少2元，乙的钱比丙的钱的3倍少3元。甲有多少钱？","solution":"1.先审题，找出未知数：甲有多少元，如果知道丙有多少元，就可以表示甲的钱数；2.设未知数为x，间接设未知数丙有元；3.找出题目中数量之间的相等关系，乙有（3x一3)元，甲有[2（3x一3)−2］元，甲十乙十丙=99元，列出方程：2（3x一3）−2+3x一3十==99；4.解方程：c=11；5.检验：把x=11代入原方程2(3x一3)−2+3x一3十x=99中，2(3×11−3)-2+3×11−3+11=99。所以原方程的解为x=11；6.甲有2×(3×11-3)-2=58（元)。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p16","lecture":"xes_06_19","type":"practice","num":16,"method":6,"methodTitle":"间接设未知数（2）","methodHint":"①审","page":29,"text":"已知足球、篮球、排球三种球的单价平均每个35元。篮球比排球每个贵10元，足球比排球每个贵8元。问：每个篮球多少元？","solution":"1.先审题，找出未知量：每个篮球多少元，要间接知道每个排球多少元；2.设未知数为x，间接设未知数，每个排球工元；3.找出题目中数量之间的相等关系，每个篮|球(x十10)元，每个足球（x十8)元，篮球十足球十排球=35×3元，列出方程：x十10十x十8+x=35×3；4.解方程：x=29；5.检验：把x=29代入原方程x十10十x十8+x=35×3中，29+10+29+8+29=35×3。所以原方程的解为x=29；6.每个篮球29+10=39（元）。","answer":"39元。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_p17","lecture":"xes_06_19","type":"practice","num":17,"method":6,"methodTitle":"间接设未知数（2）","methodHint":"①审","page":29,"text":"丁丁、牛牛、田田共有100本课外书。丁丁的本数除以牛牛的本数，田田的本数除以丁丁的本数，商都是5，而且余数也都是1。丁丁有多少本书？","solution":"解：设牛牛有x本书，则丁丁有（5x十1)本书，田田有[(5x十1)+1]本书。根据题目中的等量关系丁丁的书十牛牛的书十田田的书=100，列出方程：5(5.x十1)+1+5x十1十x=100，解方程得x=3。把x=3代入原方程5(5x十1)+1+5x十1+x=100中，5×(5×3+1)+1+5×3+1+3=100，所以原方程的解为x=3。丁丁有书3×5+1=16(本)。","answer":"16本。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_c18","lecture":"xes_06_19","type":"challenge","num":18,"method":6,"methodTitle":"间接设未知数（2）","methodHint":"①审","page":30,"text":"实践结束后，牛牛、丁丁、阿普看到旁边有射击气球的游戏，游戏有两关，两关的气球数量相同。若牛牛第一关射中的气球数比没射中的气球数的4倍多2个；第二关射中的气球数比第一关射中的气球数增加了8个，第二关射中的气球数正好是没射中的气球数的6倍。问游戏中每一关有气球多少个？","solution":"解：设第一关没射中的气球数为x个，则第一关射中的气球数为（4x十2)个。第二关射中的气球数比第一关射中的气球数多8个，为(4x十2+8）个。因为两关的气球数相同，所以第二关没射中的气球数比第一关没射中的气球数少8个，为（r一8）个。根据题目中的等量关系，第二关射中的是没射中的6倍，列出方程：4x十2+8=6(x一8），解方程得x=29。将x=29代入原方程4x十2+8=6（x一8）中，4×29+2+8=6×（29−8），所以原方程的解为x=29。故第一关射中的气球数为4×29+2=118（个）。每一关气球的总数为29+118=147（个）。","answer":"147个。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_06_19_k19","lecture":"xes_06_19","type":"peak","num":19,"method":6,"methodTitle":"间接设未知数（2）","methodHint":"①审","page":30,"text":"有甲、乙、丙三个人，当甲的年龄是乙的2倍时，丙是22岁；当乙的年龄是丙的2倍时，甲是31岁。当甲60岁时，丙是多少岁？","solution":"解：设丙22岁时，乙的年龄是x岁，当时甲的年龄就是2r岁。那么甲是31岁时，甲长了（31−2x）岁，那么这时候乙是（x十31−2x）岁，丙是（22+31−2x）岁，且有：2（22+31−2x）=x十31−2x，解得x=25。所以乙25岁时，甲25×2=50（岁），丙22岁。那么甲60岁时，丙22+（60−50)=32（岁）。","answer":"32岁。","answerPage":46,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_e1","lecture":"xes_07_01","type":"example","num":1,"method":1,"methodTitle":"乘法原理（1）","methodHint":"乘法分步，步步相乘","page":13,"text":"乐乐老师需要从北京出发，依次到南京、上海、深圳和广州调研当地分校的发展情况。从北京到南京可以乘火车或者飞机；从南京到上海可以乘火车、汽车或者飞机；从上海到深圳不仅可以乘火车、汽车和飞机，还可以坐船；从深圳到广州则可以乘火车或者汽车。请问乐乐老师这次从北京到广州的调研共有多少种不同的交通选择方案？","solution":"2×3×4×2=48（种）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p1","lecture":"xes_07_01","type":"practice","num":1,"method":1,"methodTitle":"乘法原理（1）","methodHint":"乘法分步，步步相乘","page":15,"text":"如图所示，从A地去B地有5种走法，从B地去C地有3种走法，那么田田从A地经B地去C地一共有多少种不同的走法？","solution":"5×3=15(种）。","answer":"15种。","answerPage":2,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_01_p2","lecture":"xes_07_01","type":"practice","num":2,"method":1,"methodTitle":"乘法原理（1）","methodHint":"乘法分步，步步相乘","page":15,"text":"牛牛投递邮件，由A村去B村的道路有3条，由B村去C村的道路有2条，那么邮递员从A村经B村去C村，共有多少种不同的走法？北 1号路中B南2号路","solution":"3×2=6（种）。","answer":"6种。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_c3","lecture":"xes_07_01","type":"challenge","num":3,"method":1,"methodTitle":"乘法原理（1）","methodHint":"乘法分步，步步相乘","page":16,"text":"一天放学后，牛牛、丁丁、田田、阿普一起去牛牛家写作业，他们各有一个作业本混放在一起，四人每人随便拿了一本。问：(1)牛牛拿到自己作业本的拿法有多少种？(2)恰有一人拿到自己作业本的拿法有多少种？(3)至少有一人没拿到自己作业本的拿法有多少种？(4)谁也没拿到自己作业本的拿法有多少种？","solution":"（1)牛牛拿到自己的作业本有3×2×1=6(种)拿法。(2)恰好有一人拿到自己作业本的拿法有4×2个=8(种)。(3)至少有一人没有拿到自己作业本拿法存小学颤佩数贫两类：一类，个位为0：6×5×4×(4）谁也没有拿到自己的作业本的拿法有3×3×1=9(种）。","answer":"（1)6种；（2）8种；（3）23种；(4)9种。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_e2","lecture":"xes_07_01","type":"example","num":2,"method":2,"methodTitle":"乘法原理（2）","methodHint":"乘法分步，步步相乘","page":17,"text":"牛牛去基肯麦快餐店吃饭，发现店里的菜单上只有3种不同的汉堡、4种不同的饮料和5种不同的小吃。(1)如果牛牛想从汉堡和饮料中各选1种作为午餐，请问他一共可以搭配出多少种不同的午餐组合？(2)如果基肯麦为了吸引客人，决定从汉堡、饮料和小吃中各选1种组成套餐，请问基肯麦一共能提供多少种不同的套餐组合？(3)后来基肯麦发现像艾迪这样不喜欢小吃的顾客有很多，为了方便这些顾客，他们决定改良套餐结构：新的套餐中每款都包含一种汉堡和一种饮料，但是小吃可选可不选。改良后基肯麦一共能提供多少种不同的套餐组合？","solution":"(1)3×4=12(种）；\n(2)3×4×5=60(种）；\n(3)3×4×(5+1)=72(种）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p4","lecture":"xes_07_01","type":"practice","num":4,"method":2,"methodTitle":"乘法原理（2）","methodHint":"乘法分步，步步相乘","page":19,"text":"(1)大宽出门前要选一套衣服。他共有5件不同的上衣、3条不同的裤子，那么大宽有种不同的搭配方法。(2)薇儿出门之前也要选一身衣服。她共有10件不同的上衣、4条不同的裤子、6条不同的裙子（当然，裤子和裙子不能一起穿），那么薇儿有种不同的搭配方法。","solution":"（1）5×3=15（种）。(2)10×(4+6)=100(种）。","answer":"（1)15；（2)100。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p5","lecture":"xes_07_01","type":"practice","num":5,"method":2,"methodTitle":"乘法原理（2）","methodHint":"乘法分步，步步相乘","page":19,"text":"商店里有2种巧克力糖：牛奶味、榛仁味；有3种水果糖：苹果味、梨味、橙味。丁丁想买水果糖、巧克力糖各1种送给他的朋友，他有几种不同选法？","solution":"2×3=6（种）。","answer":"6种。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_c6","lecture":"xes_07_01","type":"challenge","num":6,"method":2,"methodTitle":"乘法原理（2）","methodHint":"乘法分步，步步相乘","page":20,"text":"牛牛看了挂在墙上的数字表格，说道：“我们用数字0、1、2、3、4、5、6组数。”请问可以组成多少个：(1)没有重复数字的四位数？(2)没有重复数字的四位奇数？(3)百位为5且没有重复数字的四位数？(4)没有重复数字的自然数？(5)没有重复数字的五位偶数？(6)没有重复数字且能被5整除的四位数？","solution":"（1)组四位数分四步：千位有6种选择（不能为0)，由于不能重复，百位有6种选择，十位有5种选择，个位有4种选择，所以可以组成6×6×5×4=720（个）没有重复数字的四位数。(2)组四位奇数分四步：由于个位受限制，只能有3种选择，不能重复，千位有5种选择，百位有5种选择，十位有4种选择，所以可以组成5×5×4×3=300（个）没有重复数字的四位奇数。(3）组四位数分四步：由于百位受限制，只能有1种选择，不能重复，千位有5种选择，十位有5种选择，个位有4种选择，所以可以组成5×1×5×4=100（个）百位为5且没有重复数字的四位数。（4）组成没有重复数字的自然数，分7类：一位数有7个；两位数有6×6=36（个）；三位数有6×6×5=180（个）；四位数有6×6×5×4=720（个）；五位数有6×6×5×4×3=2160（个）；六位数有6×6×5×4×3×2=4320（个）；七位数有6×6×5×4×3×2×1=4320（个）。根据加法原理，可以组成7+36+180+720+2160+4320+4320=11743(个)没有重复数字的自然数231360（个);二类，个位不为0:5×5×4×3×3=900（个），共1260个。(6)能被5整除只需看个位，分两类：个位为0：6×5×4×1=120（个），个位为5：5×5×4×1=100（个），共120+100=220（个）能被5整除且没有重复数字的四位数。","answer":"（1)720个；(2)300个；(3)100个；(4)11743个；(5)1260个；(6)220个。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_e3","lecture":"xes_07_01","type":"example","num":3,"method":3,"methodTitle":"排队问题","methodHint":"特殊位置优先考虑","page":21,"text":"运动会上牛牛、丁丁、田田、阿普4名运动员组队参加4×100接力赛。(1)4人随意安排跑步顺序，一共有多少种不同的跑法？(2)牛牛必须跑第一棒，一共有多少种不同的跑法？(3)牛牛不能跑第一棒，一共有多少种不同的跑法？(4)牛牛不能跑第一棒和第四棒，一共有多少种不同的跑法？","solution":"(1)4×3×2×1=24(种);(2)1×3×2×1=6(种）；\n(3)3×3×2×1=18(种）或24-6=18(种）；\n(4)3×2×1×2=12(种）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p7","lecture":"xes_07_01","type":"practice","num":7,"method":3,"methodTitle":"排队问题","methodHint":"特殊位置优先考虑","page":23,"text":"5个人照相，甲不能站在两侧，能照出多少张不同的照片？","solution":"4×3×2×1×3=72（种）。口","answer":"72种。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p8","lecture":"xes_07_01","type":"practice","num":8,"method":3,"methodTitle":"排队问题","methodHint":"特殊位置优先考虑","page":23,"text":"小丸子有许多衣服，包括5顶帽子、10件上衣、8条裤子和6双皮鞋。她每次出门都要从中各取一件进行搭配。问：共可组成多少种不同的搭配（帽子可以选择戴与不戴）？","solution":"（5+1)×10×8×6=2880（种）。","answer":"2880种。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_c9","lecture":"xes_07_01","type":"challenge","num":9,"method":3,"methodTitle":"排队问题","methodHint":"特殊位置优先考虑","page":24,"text":"丁丁伸个懒腰，看到了院子中停放的汽车牌照如图所示：鄂A·HP029以“鄂A”开头表示武汉市，后面跟着2个字母（提示：英文字母共有26个），再跟3个数字，那么像这样的汽车牌照武汉市共有种不同的情况。","solution":"根据乘法原理可知：26×26×10×10×10=676000(种)。","answer":"676000。","answerPage":2,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_01_e4","lecture":"xes_07_01","type":"example","num":4,"method":4,"methodTitle":"组数问题","methodHint":"①数字能否重复","page":25,"text":"用数字1，2，3，4，5，6，7，(1)可以组成多少个两位数？(2)可以组成多少个无重复数字的三位数？(3)可以组成多少个无重复数字的四位偶数？(4)可以组成多少个无重复数字的四位奇数？","solution":"(1)7×7=49(个);(2)7×6×5=210(个）;(3)6×5×4×3=360(个）；\n(4)6×5×4×4=480（个）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p10","lecture":"xes_07_01","type":"practice","num":10,"method":4,"methodTitle":"组数问题","methodHint":"①数字能否重复","page":27,"text":"用数字0,1,2,3，4,5,6，(1)可以组成多少个两位数？(2)可以组成多少个无重复数字的三位数？(3)可以组成多少个无重复数字的四位奇数？","solution":"（1)6×7=42（个）。(2)6×6×5=180(个）。(3)5×5×4×3=300（个）。","answer":"（1)42个；（2)180个；(3)300个。","answerPage":2,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p11","lecture":"xes_07_01","type":"practice","num":11,"method":4,"methodTitle":"组数问题","methodHint":"①数字能否重复","page":27,"text":"5个同学排成一排照相，其中甲不能站在正中间，问一共能照出多少种不同的照片？","solution":"4×4×3×2×1=96（种），或5×4×3×2×1−4×3×2×1=96（种）。","answer":"96种。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_c12","lecture":"xes_07_01","type":"challenge","num":12,"method":4,"methodTitle":"组数问题","methodHint":"①数字能否重复","page":27,"text":"田田看大家兴趣浓厚，又想出一题来考大家：（1)用数字1,2，3，4，5可以组成多少个小于10000的自然数？（2）用数字0，1，2，3，4，5可以组成多少个小于10000的自然数？","solution":"（1)小于10000的自然数有四类。第一类是一位数，有5个；第二类是两位数，有5×5=25（个）；第三类是三位数，有5×5×5=125（个）；第四类是四位数，有5×5×5×5=625（个），共有5+25+125+625=780（个）。(2)小于10000的自然数有四类。第一类是一位数，有6个(0是自然数)；第二类是两位数，有5×6=30（个）；第三类是三位数，有5×6×6=180（个）；第四类是四位数，有5×6×6×6=1080（个），共有6+30+180+1080=1296（个）。","answer":"（1)780个；（2)1296个。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_e5","lecture":"xes_07_01","type":"example","num":5,"method":5,"methodTitle":"信号问题","methodHint":"先分类，再分步","page":28,"text":"牛牛有红、黄、蓝、绿四色信号旗各一面。他在旗杆上挂信号旗时每次可从上到下依次挂一面、两面或三面，排成一列。那么牛牛一共可以表示出多少种不同的信号？","solution":"先分类：挂一面：4种；挂两面：4×3=12（种）；挂三面：4×3×2=24（种），所以一共可表示4+12+24=40（种）信号。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p13","lecture":"xes_07_01","type":"practice","num":13,"method":5,"methodTitle":"信号问题","methodHint":"先分类，再分步","page":30,"text":"红、黄、蓝三色信号旗各一面。牛牛在旗杆上挂信号旗时每次可从上到下依次挂一面、两面或三面，排成一列。那么他一共可以表示出多少种不同的信号？","solution":"先分类：挂一面3种；挂两面：3×2=6（种）；挂三面：3×2×1=6（种），所以一共可表示3+6+6=15（种）信号。","answer":"15种。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_p14","lecture":"xes_07_01","type":"practice","num":14,"method":5,"methodTitle":"信号问题","methodHint":"先分类，再分步","page":30,"text":"用数字3、5、6、8、9，(1)可以组成多少个两位数？(2)可以组成多少个无重复数字的三位数？(3)可以组成多少个无重复数字的四位偶数？(4)可以组成多少个无重复数字的四位奇数？","solution":"（1)5×5=25（个）；(2)5×4×3=60(个）；(3）4×3×2×2=48（个）；(4）4×3×2×3=72（个）。","answer":"（1)25个；（2）60个；（3）48个；（4）72个。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_c15","lecture":"xes_07_01","type":"challenge","num":15,"method":5,"methodTitle":"信号问题","methodHint":"先分类，再分步","page":30,"text":"大家边做游戏边做作业，很快作业就做完了。这时田田看到牛牛家的橱柜里面放着红、黄、蓝、白四种颜色的小旗，各有2、2、3、3面，她想出了一个问题：任意取出3面按顺序排成一行，表示一种信号，问：一共可以表示多少种不同的信号？如果白旗不能打头又有多少种？","solution":"（1)取出的3面旗子，可以是一种颜色、两种颜色、三种颜色，应按此进行分类。第一类，一种颜色：都是蓝色的或者都是白色的，有2种；第二类，两种颜色：（4×3）×3=36（种）；第三类，三种颜色：4×3×2=24（种）。所以，根据加法原理，一共可以表示2+36+24=62（种）不同的信号。(2)白旗打头的信号，后两面旗有4×4=16(种）情况。所以白旗不打头的信号有62−16=46(种)。","answer":"62种；46种。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_e6","lecture":"xes_07_01","type":"example","num":6,"method":6,"methodTitle":"加乘原理","methodHint":"先分类，再分步","page":31,"text":"书架上有2本不同的英语书，4本不同的语文书，3本不同的数学书。现在要从中取出2本，而且不能是同一科的，一共有多少种不同取法？","solution":"先分成三类：情况1：取的是英语书和语文书时有2×4=8(种）；情况2：取的是英语书和数学书时有2×3=6（种）；情况3：取的是语文书和数学书时有4×3=12（种）。所以一共有8+6+12=26(种)取法。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_07_01_p16","lecture":"xes_07_01","type":"practice","num":16,"method":6,"methodTitle":"加乘原理","methodHint":"先分类，再分步","page":33,"text":"花店有10盆不同的茉莉花，15盆不同的菊花，8盆不同的丁香花。现在要从中取出2盆，而且不能是同一品种的，一共有多少种不同取法？","solution":"分成三类：情况1：取的是茉莉花和菊花时有10×15=150(种)；情况2：取的是茉莉花和丁香花时有10×8=80(种)；情况3：取的是菊花和丁香花时有15×8=120（种）。所以一共有150+80+120=350（种)取法。","answer":"350种。","answerPage":3,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_07_01_p17","lecture":"xes_07_01","type":"practice","num":17,"method":6,"methodTitle":"加乘原理","methodHint":"先分类，再分步","page":33,"text":"牛牛带着他的同学们参观牛牛爸爸的书房，这里面有好多书法字画，他们从7幅楷书，5幅隶书，3幅草书作品中选取不同类型的两幅，共有种不同的选法。","solution":"根据加乘原理可知，先分成三类：1.选楷书和隶书：7×5=35（种），2.选楷书和草书：7×3=21（种），3.选隶书和草书：5×3=15（种），共计：35+21+15=71(种）。","answer":"71。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_c18","lecture":"xes_07_01","type":"challenge","num":18,"method":6,"methodTitle":"加乘原理","methodHint":"先分类，再分步","page":34,"text":"时间已经比较晚了，大家看了看电子表准备各自回家，这时阿普说：电子表用11：35表示11点35分，用06：05表示6点5分，那么2点到10点之间电子表显示无重复数字的时刻有种。","solution":"根据题意，在2点到10点之间，表示小时数的二位数字前一位只能为0，后一位可以为2～9；表示分钟数和秒数的二位数字前一位可以为0～5，后一位可以为0～9。再考虑到无重复数字，当时间为2点多、3点多、4点多或5点多时，每一种情况下，表示分钟数的两位数字中前一位有6−2=4（种）选择，后一位数字有10−3=7（种）选择，此时有4×7=28（种）可能，比如02：ab时，a可以为1，3，4，5，b就剩下10−3=7（种）可以选择。所以这几种情况下共有28×4=112(种）。类似分析可知，当时间为6点多、7点多、8点多、9点多时，每种情况下都有5×7=35（种），共有35×4=140（种）。所以共112+140=252(种）。","answer":"252。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_01_k19","lecture":"xes_07_01","type":"peak","num":19,"method":6,"methodTitle":"加乘原理","methodHint":"先分类，再分步","page":34,"text":"有红、黄、蓝、绿四种颜色的卡片各5张，且每种颜色的卡片上分别标有1，2，3，4，5，从这些卡片中取出5张，要求1、2、3、4、5各一张，但四种颜色都要有，共有种取法。","solution":"根据乘法原理可知：红色卡片可任选1～5号，选好后黄色卡片可任选余下的4个号码，之后蓝色卡片可任选余下的3个号码，最后绿色卡片可任选余下的2个号码，最后一个号码可任选4种颜色中的一种，但类似“第一步红色选1号，最后一步5号选红色”和“第一步红色选5号，最后一步1号选红色”会出现重复，故还应除以2，即5×4×3×2×4÷2=240（种）取法。","answer":"240。","answerPage":3,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_e1","lecture":"xes_07_06","type":"example","num":1,"method":1,"methodTitle":"相遇问题基本公式（1）","methodHint":"①路程和=速度和×相遇时间","page":7,"text":"(1)牛牛和丁丁两人分别以每小时6千米和每小时4千米的速度行走，若他们从A、B两地同时出发，相向而行，5小时后相遇，则A、B两地相距多少千米？(2)甲车和乙车分别以每小时70千米，每小时50千米的速度从相距480千米的两地向对方的出发地前进。多久后两车会相遇？","solution":"(1)路程和=6×5+4×5=50（千米）或（6+4)×5=50（千米）。（2)480÷（50+70)=4（时）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p1","lecture":"xes_07_06","type":"practice","num":1,"method":1,"methodTitle":"相遇问题基本公式（1）","methodHint":"①路程和=速度和×相遇时间","page":9,"text":"甲、乙两人分别以每小时8千米和每小时4千米的速度行走，若他们从A、B两地同时出发，相向而行，6小时后相遇，则A、B两地相距多少千米?","solution":"路程和=(8+4)×6=72(千米）。","answer":"72千米。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p2","lecture":"xes_07_06","type":"practice","num":2,"method":1,"methodTitle":"相遇问题基本公式（1）","methodHint":"①路程和=速度和×相遇时间","page":9,"text":"牛牛、田田二人从A、B两地同时出发，相对而行。牛牛每小时行15千米，田田每小时行10千米，10小时相遇，求A、B两地的距离。","solution":"（15+10)×10=250（千米）。","answer":"250千米。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_c3","lecture":"xes_07_06","type":"challenge","num":3,"method":1,"methodTitle":"相遇问题基本公式（1）","methodHint":"①路程和=速度和×相遇时间","page":10,"text":"暑假开始了，同学们各自安排了丰富多彩的暑假生活。牛牛和田田准备一起去马术学校学骑马，今天他们约好先碰面，再去学校。牛牛和田田两家相距3300米，牛牛、田田二人同时出发相对而行，牛牛每分钟行82米，田田每分钟行83米，已经行了15分钟，还要行多少分钟两人可以相遇？","solution":"根据题意列综合算式得到：3300÷（82+83)−15=5（分），所以两个人还需要5分钟相遇。","answer":"5分钟。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_e2","lecture":"xes_07_06","type":"example","num":2,"method":2,"methodTitle":"相遇问题基本公式（2）","methodHint":"速度和=路程和÷相遇时间","page":11,"text":"田田和阿普两家相距255千米，两人同时骑车，从家出发相对而行，3小时后相遇。已知阿普每小时行60千米，则田田每小时行多少千米？","solution":"（255−60×3)÷3=25（千米）或255÷3−60=25（千米）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p4","lecture":"xes_07_06","type":"practice","num":4,"method":2,"methodTitle":"相遇问题基本公式（2）","methodHint":"速度和=路程和÷相遇时间","page":13,"text":"苹果和梨两家相距250千米，两人同时从家出发相对而行，5小时后相遇。已知苹果每小时行30千米，则梨每小时行多少千米？","solution":"（250−30×5）÷5=20（千米）或2505-30=20(千米)。","answer":"20千米。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p5","lecture":"xes_07_06","type":"practice","num":5,"method":2,"methodTitle":"相遇问题基本公式（2）","methodHint":"速度和=路程和÷相遇时间","page":13,"text":"丁丁和阿普分别从相距60千米的甲、乙两地同时出发，相向而行，5小时相遇，已知丁丁每小时行3千米，则阿普每小时行多少千米？","solution":"方法一：（60−3×5)÷5=9（千米/时）。方法二：60÷5−3=9（千米/时）。","answer":"9千米。","answerPage":10,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_c6","lecture":"xes_07_06","type":"challenge","num":6,"method":2,"methodTitle":"相遇问题基本公式（2）","methodHint":"速度和=路程和÷相遇时间","page":14,"text":"丁丁和乐乐老师，计划出去自驾游。丁丁要去北京，乐乐老师要去南京，他们现在已经相距20千米了，还要继续背向而行。丁丁家的车每小时行60千米，乐乐老师每小时行70千米，4小时后，他们相距多少千米？","solution":"因为是背向而行，所以两车4小时后的距离是：（60+70)×4+20=540（千米）。","answer":"540千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_e3","lecture":"xes_07_06","type":"example","num":3,"method":3,"methodTitle":"相遇后继续走","methodHint":"两次“相距”，一次是相遇前，一次是相遇后","page":15,"text":"甲、乙两城相距780千米，货车和客车从两城同时出发，相向而行。货车每小时行60千米，客车每小时行70千米，问：从出发开始经过多久两车第一次相距130千米？从出发开始经过多久两车第二次相距130千米?","solution":"第一次在相遇前：（780−130）÷（60+70）=5（时）；第二次在相遇后：（780+130)÷（60+70)=7（时）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p7","lecture":"xes_07_06","type":"practice","num":7,"method":3,"methodTitle":"相遇后继续走","methodHint":"两次“相距”，一次是相遇前，一次是相遇后","page":17,"text":"甲车和乙车分别以每小时70千米，每小时50千米的速度从相距300千米的两地同时出发，相向而行。当两车之间的距离是60千米时，是两车出发后多少小时？","solution":"有两种情况，一种是甲、乙两车未相遇，即一共走了300−60=240（千米）；一种是甲、乙两车已相遇，即一共走了300+60=360（千米），所以有两种答案：（300−60)÷（70+50)=2（时）或(300+60)÷(70+50)=3(时）。","answer":"2小时或者3小时。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p8","lecture":"xes_07_06","type":"practice","num":8,"method":3,"methodTitle":"相遇后继续走","methodHint":"两次“相距”，一次是相遇前，一次是相遇后","page":17,"text":"A、B两地相距90米，牛牛从A地到B地需要30秒，丁丁从B地到A地需要15秒。现在牛牛和丁丁从A、B两地同时出发相对而行，相遇时牛牛到B地的距离是多少米？","solution":"牛牛的速度：90÷30=3（米/秒），丁丁的速度：90÷15=6（米/秒），相遇的时间：90−(3+6)=10(秒），牛牛距B地的距离：90−3×10=60(米)。","answer":"60米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_c9","lecture":"xes_07_06","type":"challenge","num":9,"method":3,"methodTitle":"相遇后继续走","methodHint":"两次“相距”，一次是相遇前，一次是相遇后","page":18,"text":"牛牛家距离马术学校3000米，牛牛爸爸从家去学校接牛牛回家，牛牛从学校回家，他们同时出发，牛牛爸爸每分钟比牛牛多走24米，50分钟后两人相遇，那么牛牛的速度是每分钟多少米？","solution":"牛牛和牛牛爸爸的速度和：3000÷50=60（米/分），牛牛爸爸的速度：（60+24）÷2=42（米/分），牛牛的速度：60−42=18（米/分）。","answer":"18米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_e4","lecture":"xes_07_06","type":"example","num":4,"method":4,"methodTitle":"不同时出发（1）","methodHint":"注意甲、乙走的时间不同","page":19,"text":"甲、乙两辆汽车分别从A、B两地出发相对而行，甲车每小时行48千米，乙车每小时行50千米，若甲先出发1小时，再经过5小时相遇，求A、B两地间的距离。","solution":"48×（5+1)+50×5=538（千米）或者48+（48+50）×5=538（千米）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p10","lecture":"xes_07_06","type":"practice","num":10,"method":4,"methodTitle":"不同时出发（1）","methodHint":"注意甲、乙走的时间不同","page":21,"text":"甲、乙两座城市相距530千米，货车和客车从两城同时出发，相向而行。货车每小时行50千米，客车每小时行70千米。客车在行驶中因故耽误1小时，然后继续向前行驶与货车相遇。问相遇时客车、货车各行驶多少千米？口装钻口","solution":"因为客车在行驶中耽误1小时，而货车没有停止继续前行，也就是说，货车比客车多走1小时。如果从总路程中把货车单独行驶1小时的路程减去，余下的就是客车和货车共同走过的。再求出货车和客车每小时所走的速度和，就可以求出相遇时间。然后根据路程=速度时间，可以分别求出客车和货车在相遇时各自行驶的路程。相遇时间：（530−50）÷（50+70）=480÷120=4（时），相遇时客车行驶的路程：70×4=280（千米），相遇时货车行驶的路程：50×（4+1)=250（千米）。","answer":"280千米，250千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p11","lecture":"xes_07_06","type":"practice","num":11,"method":4,"methodTitle":"不同时出发（1）","methodHint":"注意甲、乙走的时间不同","page":21,"text":"甲、乙两辆汽车从相距40千米的两城背向而行，甲车每小时行35千米，乙车每小时行40千米，5小时后，甲、乙两车相距多少千米？","solution":"因为是背向而行，所以两车5小时后的距离是：(35+40)×5+40=415（千米）。","answer":"415千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_c12","lecture":"xes_07_06","type":"challenge","num":12,"method":4,"methodTitle":"不同时出发（1）","methodHint":"注意甲、乙走的时间不同","page":22,"text":"丁丁和乐乐老师分别在A、B两座城市旅行，他们准备结束旅行并见面聚一聚。A、B两地相距480千米，他们同时从两地相对出发，丁丁每小时行55千米，乐乐老师每小时行65千米，一只燕子以每小时80千米的速度与丁丁同时出发向乐乐老师飞去，遇到乐乐老师又折回向丁丁飞去，遇到丁丁又返回飞向乐乐老师，这样一直飞下去，燕子飞了多少千米他们才能相遇？","solution":"由燕子和两车同时开始飞行和同时停止，故燕子飞行的时间和两车相遇的时间相等，480÷（55+65）−4（时），燕子飞行的路程：80×4=320（千米）。","answer":"320千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_e5","lecture":"xes_07_06","type":"example","num":5,"method":5,"methodTitle":"不同时出发（2）","methodHint":"注意甲、乙走的时间不同","page":23,"text":"甲、乙两辆汽车分别从A、B两地出发相向而行，甲车先行3小时后乙车从B地出发，乙车出发5小时后两车还相距15千米。甲车每小时行48千米，乙车每小时行50千米。求A、B两地间相距多少千米。","solution":"题目中写的“还”相距15千米指的是两车未相遇之前还相距15千米。画线段图如下：甲行驶5小时乙行驶5小时甲先行驶3小时 15千米由图中可以看出，甲行驶了3+5=8（时），行驶距离为：48×8=384（千米）；乙行驶了5小时，行驶距离为：50×5=250（千米），此时两车还相距15千米，所以A、B两地间相距：384+250+15=649（千米）。也可以这样做：两车5小时一共行驶：（48+50）×5=490（千米），A、B两地间相距：490+48×3+15=649（千米），所以，A、B两地间相距649千米。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p13","lecture":"xes_07_06","type":"practice","num":13,"method":5,"methodTitle":"不同时出发（2）","methodHint":"注意甲、乙走的时间不同","page":25,"text":"甲、乙两列火车从相距942千米的两地相向而行，甲车每小时行45千米，乙车每小时行41千米，乙车先出发2小时后，甲车才出发。甲车行几小时后与乙车相遇？","solution":"甲、乙两车出发时间有先有后，乙车先出发2小时，这段时间甲车没有行驶，那么乙车这2小时所行的路程不是甲、乙两车同时相对而行的路程，所以要先求出甲、乙两车同时相对而行的路程，再除以速度和，才是甲、乙两车同时相对而行的时间。乙车先行驶路程：41×2=82（千米），甲、乙两车同时相对而行路程：942−82=860（千米），甲、乙两车速度和：45+41=86（千米/时），甲车行的时间：860÷86=10(小时)。","answer":"10小时。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p14","lecture":"xes_07_06","type":"practice","num":14,"method":5,"methodTitle":"不同时出发（2）","methodHint":"注意甲、乙走的时间不同","page":25,"text":"托车每小时行52千米，自行车每小时行18千米，途中摩托车发生故障，修理了1小时，然后继续前进，两车相遇时，摩托车行了多少千米？","solution":"摩托车途中停了1小时，相当于自行车多走了1小时，所以相遇路程=298−18=280（千米），相遇时间=280÷（52+18）=4（时），所以摩托车走了52×4=208（千米）。","answer":"208千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_c15","lecture":"xes_07_06","type":"challenge","num":15,"method":5,"methodTitle":"不同时出发（2）","methodHint":"注意甲、乙走的时间不同","page":26,"text":"牛牛和田田的暑假生活完全围绕着学骑马展开，田田去姑妈家玩了一天后，第二天从姑妈家出发找牛牛去马术学校。牛牛和田田同时出发相向而行。已知牛牛每分钟走50米，田田走完全程要18分钟。出发3分钟后，牛牛、田田仍相距450米。问：还要过多少分钟，牛牛、田田两人才能相遇？AP","solution":"牛牛3分钟行了150米，说明田田剩下的15分钟要走150+450=600（米），田田的速度为600÷15=40（米/秒），450÷（50+40)=5（分），即再过5分钟后他们能相遇。","answer":"5分钟。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_e6","lecture":"xes_07_06","type":"example","num":6,"method":6,"methodTitle":"多次相遇问题","methodHint":"①画线段图","page":27,"text":"牛牛、丁丁两人分别从A、B两地同时出发相向而行，相遇点在距A地6千米处，相遇后他们继续前进到达目的地又立刻返回，发现第二次相遇点在距B地3千米处，问：A、B相距多少千米?","solution":"画图如下：第一次相遇时牛牛走6千米，两人一共走1个AB，第二次相遇时两人一共走3个AB，牛牛走6×3=18千米，全程=6×3−3=15（千第一次相遇第二次相遇6千米 3千米","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p16","lecture":"xes_07_06","type":"practice","num":16,"method":6,"methodTitle":"多次相遇问题","methodHint":"①画线段图","page":29,"text":"牛牛、田田两人分别从A、B两地同时出发相向而行，相遇点在距A地6千米处，相遇后他们继续前进到达目的地又立刻返回，发现第二次相遇点距A地4千米处，问：A、B相距多少千米？","solution":"全程=（6×3+4)÷2=11(千米）。","answer":"11千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_p17","lecture":"xes_07_06","type":"practice","num":17,"method":6,"methodTitle":"多次相遇问题","methodHint":"①画线段图","page":29,"text":"甲、乙两车分别同时从A、B两地相对开出，第一次在离A地90千米处相遇。相遇后继续前进到达目的地后又立刻返回，第二次在离B地30千米处相遇。求A、B两地间的距离。","solution":"第一次相遇意味着甲、乙共行了一个A、B两地间的距离，第二次相遇意味着两车共行了三个A、B两地间的距离。当两车共行了一个A、B两地间的距离时，甲行了90千米，当共行三个A、B两地间的距离时，甲就行了3个90千米，即90×3=270（千米），而这270千米比一个A、B两地间的距离多30千米，可得：90×3−30=270−30=240（千米）。","answer":"240千米。","answerPage":11,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_c18","lecture":"xes_07_06","type":"challenge","num":18,"method":6,"methodTitle":"多次相遇问题","methodHint":"①画线段图","page":30,"text":"牛牛、田田二人同时分别从A、B两地出发，相向匀速骑行。他们第一次在离A地200米处相遇，相遇后继续前行到达对方出发地后又立刻返回，第二次相遇在离A地400米处。A、B两地相距多少米？","solution":"两人第一次相遇共骑行1个全程，第二次相遇共骑行3个全程，所以第二次相遇时牛牛共骑行200×3=600（米），与400米合起来恰好是2个全程。所以两地相距（600+400)÷2=500（米）。","answer":"500米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_06_k19","lecture":"xes_07_06","type":"peak","num":19,"method":6,"methodTitle":"多次相遇问题","methodHint":"①画线段图","page":30,"text":"牛牛、田田二人同时分别从A、B两地出发，相向匀速而行。牛牛到达B地后立即往回走，田田到达A地后也立即往回走。已知他们第一次相遇在离A、B中点2千米处靠B一侧，第二次相遇在离A地4千米处。A、B两地相距多少千米?","solution":"两人第一次相遇，合走一个全程，两人第二次相遇，合走三个全程。而两人速度不变，这说明第二次相遇所用的时间是第一次相遇所用时间的3倍。因此，牛牛在第二次相遇所走的路程是第一次相遇所走路程的3倍。第一次相遇时，牛牛走了半个全程多2千米，那么，第二次相遇时，他应该走了3个半个全程多6千米，而实际他走了2个全程差4千米，即4个半个全程差4千米。因此，半个全程长为6+4=10(千米），A、B两地相距10×2=20(千米)。","answer":"20千米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_e1","lecture":"xes_07_07","type":"example","num":1,"method":1,"methodTitle":"追及问题基本公式（1）","methodHint":"追及时间=路程差÷速度差","page":7,"text":"一天，去上学的牛牛发现田田在他前面150米处，于是以每分钟80米的速度向他追去，已知田田每分钟走50米，问：牛牛多长时间能追上田田呢？","solution":"距离从150米变成追上时的0米，每分钟距离都在缩短，1分钟缩短30米，5分钟后追上。150÷（80−50)=5（分）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p1","lecture":"xes_07_07","type":"practice","num":1,"method":1,"methodTitle":"追及问题基本公式（1）","methodHint":"追及时间=路程差÷速度差","page":9,"text":"甲在乙前面100米，于是乙以每分钟50米的速度向他追去，已知甲每分钟走40米，问：乙多长时间能追上甲呢？","solution":"100÷（50−40）=10（分）。距离从100米变成追上时的0米，每分钟距离都在缩短，1分钟缩短10米，10分钟后追上。","answer":"10分钟。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p2","lecture":"xes_07_07","type":"practice","num":2,"method":1,"methodTitle":"追及问题基本公式（1）","methodHint":"追及时间=路程差÷速度差","page":9,"text":"解放军某部先遣队，从营地出发，以每小时6千米的速度向某地前进，12小时后，部队有急事，派通讯员骑摩托车以每小时78千米的速度前去联络，求多久后通讯员能赶上先遣队？","solution":"(6×12)÷（78−6)=1(时）。","answer":"1小时。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_c3","lecture":"xes_07_07","type":"challenge","num":3,"method":1,"methodTitle":"追及问题基本公式（1）","methodHint":"追及时间=路程差÷速度差","page":10,"text":"学校马上要开学了。牛牛、丁丁二人准备一起去购买学习用品，他俩同时分别自A、B两地出发相向而行，相遇之地距A、B中点300米。已知牛牛每分钟行100米，丁丁每分钟行70米，求A地至B地的距离。","solution":"相遇时牛牛比丁丁多行300×2=600（米），相遇时共用了600−（100−70）=20（分），A、B两地之间的距离为（100+70）×20=3400（米）。","answer":"3400米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_e2","lecture":"xes_07_07","type":"example","num":2,"method":2,"methodTitle":"追及问题基本公式（2）","methodHint":"速度差=路程差÷追及时间","page":11,"text":"甲、乙两架飞机同时从同一机场起飞，向同一方向飞行，甲每小时飞行300千米，乙每小时飞行340千米，4小时后它们相距多少千米？这时甲提高速度打算用2小时追上乙，那么甲每小时应该飞行多少千米？","solution":"(1)根据题意，有4×(340−300)=160（千米）。(2)现在甲的速度每小时需要比乙多飞行160÷2=80（千米），所以甲的速度应为340+80=420（千米/时）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p4","lecture":"xes_07_07","type":"practice","num":4,"method":2,"methodTitle":"追及问题基本公式（2）","methodHint":"速度差=路程差÷追及时间","page":13,"text":"牛牛每小时行12千米，丁丁每小时行15千米，他俩同时同起点同向出发，5小时后他们之间的距离是多少千米？","solution":"每小时丁丁比牛牛多走15−12=3（千米），5小时后他们之间的距离是5×3=15(千米)。","answer":"15千米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p5","lecture":"xes_07_07","type":"practice","num":5,"method":2,"methodTitle":"追及问题基本公式（2）","methodHint":"速度差=路程差÷追及时间","page":13,"text":"牛牛每分钟走70米，丁丁每分钟走60米，两人同时从同一地点背向走了3分钟，牛牛掉头去追丁丁，追上丁丁时牛牛共走了多少米？","solution":"牛牛走的时间是两部分，一部分是和丁丁背向走的时间，另一部分是他追丁丁的时间，要求追及时间，就要求出他们的路程差。路程差是两人相背运动的总路程：（60+70）×3=390（米），追及时间为：390÷（70−60)=39（分），牛牛走的总路程为：70×（39+3)=2940(米）。","answer":"2940米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_c6","lecture":"xes_07_07","type":"challenge","num":6,"method":2,"methodTitle":"追及问题基本公式（2）","methodHint":"速度差=路程差÷追及时间","page":14,"text":"商店门口的电视新闻里报道了一起交通事故，事故的主要原因为车的刹车失灵，具体情况如下：在一条笔直的高速公路上，前面一辆汽车以90千米/时的速度行驶，后面一辆汽车以108千米/时的速度行驶。后面的汽车刹车突然失控，向前冲去（车速不变）。在它鸣笛示警后5秒钟撞上了前面的汽车。在这辆车鸣笛时两车相距多少米？","solution":"根据追及问题的公式，路程差一速度差×追及时间。由题意知，追及时间为5秒钟，也就是5÷（60×60)小时，两车距离为路程差，速度差为108−90=18（千米/时），也就是18×1000米/时，所以路程差为：18×1000×5÷（60×60)=90000÷3600=25（米），所以，在这辆车鸣笛时两车相距25米。","answer":"25米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_e3","lecture":"xes_07_07","type":"example","num":3,"method":3,"methodTitle":"不同时出发的追及问题（1）","methodHint":"速度差=路程差÷追及时间","page":15,"text":"六年级同学从学校出发到公园春游，每分钟走72米。15分钟以后，学校有急事要通知学生，派乐乐老师骑自行车从学校出发用9分钟追上同学们，乐乐老师每分钟要行多少米才可以准时追上同学们？","solution":"同学们15分钟走72×15=1080（米），即路程差。然后根据速度差=路程差一追及时间，可以求出乐乐老师和同学们的速度差，又知道同学们的速度是每分钟72米，就可以得出乐乐老师的速度，即1080÷9+72=192（米/分）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p7","lecture":"xes_07_07","type":"practice","num":7,"method":3,"methodTitle":"不同时出发的追及问题（1）","methodHint":"速度差=路程差÷追及时间","page":17,"text":"一辆慢车从甲地开往乙地，每小时行40千米，开出5小时后，一辆快车以每小时90千米的速度也从甲地开往乙地，在甲、乙两地的中点处快车追上慢车。甲、乙两地相距多少千米？","solution":"慢车先行的路程是：40×5=200（千米），快车每小时追上慢车的千米数是：90−40=50（千米），追及的时间是：200÷50=4（时），快车行至中点所行的路程是：90×4=360（千米），甲乙两地间的路程是：360×2=720（千米）。","answer":"720千米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p8","lecture":"xes_07_07","type":"practice","num":8,"method":3,"methodTitle":"不同时出发的追及问题（1）","methodHint":"速度差=路程差÷追及时间","page":17,"text":"学校与电影院相距2400米，田田、丁丁先后从学校出发，去电影院看电影。田田每分钟行60米，她出发10分钟后丁丁才出发，结果两人同时到达影院。丁丁每分钟行多少米？","solution":"要求丁丁每分钟走多少米，就要先求丁丁所走的路程(已知)和丁丁所用的时间；要求丁丁所用的时间，就要先求田田所用的时间，田田所用的时间是：2400÷60=40（分），丁丁所用的时间是：40−10=30（分），丁丁每分钟走的米数是：2400÷30=80（米）。","answer":"80米。","answerPage":12,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_c9","lecture":"xes_07_07","type":"challenge","num":9,"method":3,"methodTitle":"不同时出发的追及问题（1）","methodHint":"速度差=路程差÷追及时间","page":18,"text":"牛牛按时从家出发上学，乐乐老师早晨也定时出门散步，两人相向而行，牛牛每分钟行60米，乐乐老师每分钟行40米，他们每天都在同一时刻相遇。开学这天，牛牛提前出门，因此比平时早9分钟与乐乐老师相遇，这天牛牛比平时提前多少分钟出门？","solution":"因为提前9分钟相遇，说明乐乐老师出门时，牛牛已经比平时多走了两人9分钟合走的路，即多走了（60+40）×9=900（米），所以牛牛比平时早出门900÷60=15(分)。","answer":"15分。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_e4","lecture":"xes_07_07","type":"example","num":4,"method":4,"methodTitle":"不同时出发的追及问题（2）","methodHint":"注意甲、乙走的时间不同","page":19,"text":"甲、乙两车分别从A，B两地出发，同向而行，乙车在前，甲车在后。已知甲车比乙车提前出发1小时，甲车每小时行96千米，乙车每小时行80千米。甲车出发5小时后追上乙车，求A，B两地间的距离。","solution":"\n方法一：画线段图。乙80千米/时4小时甲96千米/时 5小时不用追及思路，仅仅看线段图就可以。乙走的时间为：5−1=4（时），甲走路程：96×5=480（千米），乙走的路程80×4=320（千米），观察线段图，得A，B距离：480−320=160(千米)。\n方法二：由已知可求出甲、乙两车的追及时间，利用追及问题的公式求解。追及时间为：5−1=4（时），追及路程为：（96−80）×4=64（千米），A，B两地间的距离为：96×1+64=160（千米）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p10","lecture":"xes_07_07","type":"practice","num":10,"method":4,"methodTitle":"不同时出发的追及问题（2）","methodHint":"注意甲、乙走的时间不同","page":21,"text":"甲、乙两辆汽车同时从A地出发去B地，甲车每小时行50千米，乙车每小时行40千米。途中甲车出故障停车修理了3小时，结果甲车比乙车迟1小时到达B地。A，B两地间的路程是多少？API","solution":"由于甲车在途中停车3小时，比乙车迟到1小时，说明行这段路程甲车比乙车少用2小时。可理解成甲车在途中停车2小时，两车同时到达，也就是乙车比甲车先行2小时，两车同时到达B地，所以，也可以用追及问题的数量关系来解答。即行这段路程甲车比乙车少用的时间是：3−1=2（时），乙车2小时行的路程是：40×2=80（千米），甲车每小时比乙车多行的路程是：50−40=10（千米），甲车所需的时间是：80÷10=8（时），A，B两地间的路程是50×8=400（千米）。","answer":"400千米。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p11","lecture":"xes_07_07","type":"practice","num":11,"method":4,"methodTitle":"不同时出发的追及问题（2）","methodHint":"注意甲、乙走的时间不同","page":21,"text":"牛牛和丁丁放学后，一起步行去体校参加排球训练，牛牛每分钟走110米，丁丁每分钟走70米，出发5分钟后，牛牛返回学校取运动服，在学校又耽误了2分钟，然后追赶丁丁。求多少分钟后追上丁丁。","solution":"已知二人出发5分钟后，牛牛返回学校取运动服，这样用去了5分钟，在学校又耽误了2分钟，牛牛一共耽误了5×2+2=12（分），丁丁在这段时间比牛牛多走：70×12=840（米），速度差为：110−70=40（米/分），牛牛追上丁丁的时间是：840÷40=21（分）。","answer":"21分。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_c12","lecture":"xes_07_07","type":"challenge","num":12,"method":4,"methodTitle":"不同时出发的追及问题（2）","methodHint":"注意甲、乙走的时间不同","page":22,"text":"开学后，牛牛、丁丁约好周末一起去图书馆学习，两人从A，B两地同时出发相向而行，牛牛每分钟行80米，丁丁每分钟行70米，出发一段时间后，两人在距中点60米处相遇。如果牛牛晚出发一会儿，那么两人在距中点220米处相遇。牛牛晚出发了多少分钟？","solution":"同时出发，相遇时牛牛多走60×2=120（米），相遇时间为120÷（80−70)=12(分），因此A、B两地距离为（80+70）×12=1800（米）。当牛牛晚出发一会儿时，两人各用时间分别为：丁丁用时（1800÷2+220)÷70=16（分），牛牛用时（1800÷2−220)÷80=8.5（分），所以牛牛比丁丁晚出发16−8.5=7.5(分）。","answer":"7.5分。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_e5","lecture":"xes_07_07","type":"example","num":5,"method":5,"methodTitle":"判断相遇位置","methodHint":"根据速度大小关系判断相遇位置","page":23,"text":"丁丁和牛牛同时从两地相向而行，丁丁每分钟行50米，牛牛每分钟行60米，两人在距两地中点50米处相遇，求两地的距离是多少米。","solution":"根据题意，画线段图如下：50米50米从图中可以看出，因为丁丁的速度比牛牛慢，所以相遇点一定在中点偏向丁丁的这一边50米。丁丁所行路程=全程一半一50米，牛牛所行路程=全程一半十50米，所以两人相遇时，牛牛比丁丁多走了50×2=100(米），牛牛比丁丁每分钟多走10米，所以两人从出发到相遇共走了100÷10=10(分），两地的距离：（60+50)×10=1100（米）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p13","lecture":"xes_07_07","type":"practice","num":13,"method":5,"methodTitle":"判断相遇位置","methodHint":"根据速度大小关系判断相遇位置","page":25,"text":"牛牛、丁丁二人同时从A地去B地，牛牛每分钟行60米，丁丁每分钟行90米，丁丁到达B地后立即返回，并与牛牛相遇，相遇时，牛牛还需行3分钟才能到达B地，A，B两地相距多少米？","solution":"相遇时牛牛走了AB距离减去60×3=180（米），丁丁走了AB距离加上180米，丁丁比牛牛多走了360米，这个路程差需要360÷(90−60)=12（分）才能达到，这12分钟两人一共行走了12×（90+60）=1800（米），所以AB距离为1800÷2=900（米）。","answer":"900米。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p14","lecture":"xes_07_07","type":"practice","num":14,"method":5,"methodTitle":"判断相遇位置","methodHint":"根据速度大小关系判断相遇位置","page":25,"text":"牛牛、丁丁两人同时从两地相向而行。牛牛每小时行5千米，丁丁每小时行4千米。两人相遇时丁丁比牛牛少行3千米。两地相距多少千米？","solution":"两人行走的时间为3÷（5−4)=3（时），所以两地相距(5+4)×3=27(千米)。","answer":"27千米。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_c15","lecture":"xes_07_07","type":"challenge","num":15,"method":5,"methodTitle":"判断相遇位置","methodHint":"根据速度大小关系判断相遇位置","page":26,"text":"牛牛和丁丁在图书馆学习累了，去外面空地上做运动。他们俩同时从南端出发，牛牛每分钟走80米，丁丁每分钟走50米，牛牛到达北端后立即返回，在距离北端180米处与丁丁相遇。求图书馆南北两端的距离。","solution":"相同时间内，牛牛比丁丁多走180×2=360（米），用时为360÷（80−50)=12（分）。所以两端距离为（80+50)×12÷2=780（米）。","answer":"780米。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_e6","lecture":"xes_07_07","type":"example","num":6,"method":6,"methodTitle":"复杂的追及问题","methodHint":"理解题目中的路程差、速度差和追及时间","page":27,"text":"牛牛和丁丁练习跑步，若牛牛让丁丁先跑20米，则牛牛跑5秒钟就可追上丁丁；若牛牛让丁丁先跑4秒钟，则牛牛跑6秒钟就能追上丁丁。牛牛、丁丁两人的速度各是多少？","solution":"牛牛让丁丁先跑20米，则20米就是牛牛、丁丁二人的路程差，牛牛跑5秒钟追上丁丁，5秒就是追及时间，据此可求出他们的速度差为20÷5=4(米/秒)；若牛牛让丁丁先跑4秒，则牛牛6秒可追上丁丁，在这个过程中，追及时间为6秒，根据上一个条件，由速度差和追及时间可求出路程差，这个路程差即是丁丁4秒钟所行的路程，路程差就等于4×6=24（米），也即丁丁在4秒内跑了24米，所以可求出丁丁的速度，也可求出牛牛的速度。综合列式计算如下：丁丁的速度为：20÷5×6÷4=6（米/秒），牛牛的速度为：6+4=10（米/秒）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p16","lecture":"xes_07_07","type":"practice","num":16,"method":6,"methodTitle":"复杂的追及问题","methodHint":"理解题目中的路程差、速度差和追及时间","page":29,"text":"牛牛、田田二人练习跑步，若牛牛让田田先跑10米，则牛牛跑5秒钟可追上田田；若牛牛让田田先跑2秒钟，则牛牛跑4秒钟就能追上田田。问：牛牛、田田两人的速度各是多少？","solution":"若牛牛让田田先跑10米，则10米就是牛牛、田田二人的路程差，5秒就是追及时间，据此可求出他们的速度差为10÷5=2（米/秒)；若牛牛让田田先跑2秒，则牛牛跑4秒可追上田田，在这个过程中，追及时间为4秒，因此路程差就等于2×4=8（米），即田田在2秒内跑了8米，所以可求出田田的速度，也可求出牛牛的速度。综合列式计算如下：田田的速度为：10÷5×4÷2=4（米/秒），牛牛的速度为：2+4=6(米/秒)。","answer":"田田的速度为4米/秒，牛牛的速度为6米/秒","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_p17","lecture":"xes_07_07","type":"practice","num":17,"method":6,"methodTitle":"复杂的追及问题","methodHint":"理解题目中的路程差、速度差和追及时间","page":29,"text":"乐乐老师从甲地到乙地，每小时步行5千米，牛牛从乙地到甲地，每小时步行4千米。两人同时出发，然后在离甲、乙两地的中点1千米的地方相遇，求甲、乙两地间的距离。","solution":"画示意图。（先判断相遇点在中点哪一侧，为什么？)1千米甲L J乙中点A离中点1千米的地方是A点，从图上可以看出，乐乐老师走了两地距离的一半多1千米，牛牛走了两地距离的一半少1千米。从出发到相遇，乐乐老师比牛牛多走了2千米，乐乐老师比牛牛每小时多走5−4=1(千米)，从出发到相遇所用的时间是2÷（5−4）=2（时）。因此，甲、乙两地的距离是（5+4)×2=18(千米）。","answer":"18千米。","answerPage":13,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_c18","lecture":"xes_07_07","type":"challenge","num":18,"method":6,"methodTitle":"复杂的追及问题","methodHint":"理解题目中的路程差、速度差和追及时间","page":30,"text":"牛牛和丁丁分别从图书馆南端和北端两地同时出发，如果两人同向而行，牛牛26分钟赶上丁丁；如果两人相向而行，6分钟可相遇，又已知丁丁每分钟行50米，求图书馆南北两端的距离。","solution":"先画图如下：牛牛追及相遇追及点D B相遇点C A若设两人相遇地点为C，牛牛追及丁丁的地点为D，则由题意可知牛牛从A到C用6分钟，而从A到D则用26分钟，因此，牛牛走C到D之间的路程时，所用时间应为：26−6=20（分），同时，由上图可知，C、D间的路程等于BC加BD，即等于丁丁在6分钟内所走的路程与在26分钟内所走的路程之和，为50×(26+6）=1600（米）。所以，牛牛的速度为1600÷20=80（米/分），由此可求出A、B间的距离：（80+50)×6=130×6=780（米）。","answer":"780米。","answerPage":14,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_07_k19","lecture":"xes_07_07","type":"peak","num":19,"method":6,"methodTitle":"复杂的追及问题","methodHint":"理解题目中的路程差、速度差和追及时间","page":30,"text":"上午，牛牛骑车从甲地出发去乙地。下午1点，丁丁开车也从甲地出发，前往乙地。下午2点时两人之间的距离是15千米。下午3点时，两人之间的距离还是15千米。下午4点时丁丁到达乙地，晚上7点牛牛到达乙地。牛牛是上午出发的。","solution":"根据题意可知：丁丁在14：30时追上牛牛，而相遇点为全程的中点，所以牛牛骑车跑完半程用时19：00−14：30=4：30，即4个半小时，所以牛牛是14：30−4：30=10：00出发的。","answer":"10：00。","answerPage":14,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_07_14_e1","lecture":"xes_07_14","type":"example","num":1,"method":1,"methodTitle":"等积变形（1）","methodHint":"等底等高：面积相等","page":7,"text":"(1)如图，BD长12厘米，DC长4厘米，B、C和D在同一条直线上。求三角形ABD的面积是三角形ADC面积的多少倍。B D(2)如图，E在AD上，AD垂直BC于D，AD=12厘米，DE=3厘米。求三角形ABC的面积是三角形EBC面积的几倍。","solution":"（1)因为三角形ABD，三角形ABC和三角形ADC在分别以BD，BC和DC为底时，它们的高都是从A点向BC边上所作的垂线，也就是说三个三角形的高相等。于是：三角形ABD的面积=12×高÷2=6×高；三角形ADC的面积=4×高÷2=2×高，所以，三角形ABD的面积是三角形ADC面积的3倍。（2)因为AD垂直于BC，所以当BC为三角形ABC和三角形EBC的底时，AD是三角形ABC的高，ED是三角形EBC的高，于是：三角形ABC的面积=BC×12÷2；三角形EBC的面积=BC×3÷2,所以三角形ABC的面积是三角形EBC面积的4倍。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p1","lecture":"xes_07_14","type":"practice","num":1,"method":1,"methodTitle":"等积变形（1）","methodHint":"等底等高：面积相等","page":9,"text":"在三角形ABC中，E、F分别为AB和AC的中点，那么三角形ABC的面积是三角形BEF面积的多少倍？","solution":"因为E是中点，所以S△BEF=S△EFA，所以S△AFB=2S△BEF。因为F是中点，所以S△AFB=S△FBC，所以 S△FBC=2S△BEF，所以S△ABC=S△AFB 十S△FBC=4S△BEF，即三角形ABC的面积是三角形BEF面积的4倍。","answer":"4倍。","answerPage":26,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_14_p2","lecture":"xes_07_14","type":"practice","num":2,"method":1,"methodTitle":"等积变形（1）","methodHint":"等底等高：面积相等","page":9,"text":"如图，已知△ABE的面积为1平方厘米，BC=BE，AD=AB，求△DCB的面积。","solution":"因为BC=BE，AD=AB，所以S△ABE=S△ADE，S△BDE=S△BCD，所以△DCB的面积为1×2=2(平方厘米）。","answer":"2平方厘米。","answerPage":26,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_c3","lecture":"xes_07_14","type":"challenge","num":3,"method":1,"methodTitle":"等积变形（1）","methodHint":"等底等高：面积相等","page":10,"text":"牛牛的叔叔是一名著名的铁匠，周末到了，牛牛带着丁丁和田田一起给叔叔帮忙，刚到铁匠铺，牛牛就接到了一位顾客的工作，需要他按照图纸进行切割。如图，图中的小正方形边长是40厘米，则阴影部分面积是多少平方厘米？","solution":"连接大正方形对角线，阴影面积为小正方形面积的一半，即40×40÷2=800（平方厘米）。","answer":"800平方厘米。","answerPage":26,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_e2","lecture":"xes_07_14","type":"example","num":2,"method":2,"methodTitle":"等积变形（2）","methodHint":"等底等高：面积相等","page":11,"text":"如图，在△CDE中，A是BD中点，B是EC中点，连接AE，AC，那么与ABC面积相等的三角形一共有哪几个？若ABC的面积是3.6平方厘米，求CDE的R面积。","solution":"因为A是BD中点，B是BC中点，则S△ABC=S△ABE=S△ADE=S△ACD，所以与ABC面积相等的三角形一共有3个，所以△CDE的面积为3.6×4=14.4（平方厘米）。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p4","lecture":"xes_07_14","type":"practice","num":4,"method":2,"methodTitle":"等积变形（2）","methodHint":"等底等高：面积相等","page":13,"text":"如图，已知ABC的面积为8平方厘米，BC=BD，AE=AB，求△BDE的面积。","solution":"因为BC=BD,所以S△ABC=S△ABD；因为AE=AB，所以 S△ADE=S△ABD，所以S△BDE=2S△ABD=8×2=16(平方厘米）。","answer":"16平方厘米。","answerPage":26,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p5","lecture":"xes_07_14","type":"practice","num":5,"method":2,"methodTitle":"等积变形（2）","methodHint":"等底等高：面积相等","page":13,"text":"如图，在平行四边形ABCD中，E为BD的中点，BC=3BF，阴影三角形的面积为1平方厘米。平行四边形ABCD的面积是多少平方厘米？E","solution":"连接EC。BC=3BF，且E为中点，故S△DEC=S△BEC=3S△BEF=3（平方厘米），有S△DCB=6（平方厘米），从而平行四边形的面积为12平方厘米。A D","answer":"12平方厘米。","answerPage":26,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_c6","lecture":"xes_07_14","type":"challenge","num":6,"method":2,"methodTitle":"等积变形（2）","methodHint":"等底等高：面积相等","page":14,"text":"这时，另一位顾客也光顾铁匠铺，他画出了图纸，丁丁需要按他的要求制作贴片。如图，图中大三角形ABC被几条线段分割成了面积相同的6个小三角形，已知AC、AB、BC的长度分别为12、14、16，那么AD十BE+CF=","solution":"因为S△ADG=S△BDG，所以AD=14÷2=7。因为S△ABE=S△ACE，所以BE=16÷2=8，因为S△ECF=2S△EAF，所以CF=12÷3×2=8，所以AD+BE+CF=7+8+8=23。","answer":"23。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_e3","lecture":"xes_07_14","type":"example","num":3,"method":3,"methodTitle":"等积变形（3）","methodHint":"等底等高：面积相等","page":15,"text":"如图，在三角形ABC中，E是BC中点，D，F是AB边上的三等分点，已知三角形BEF的面积是2，求三角形ABC的面积是多少。 B","solution":"因为F为DB中点，所以S△DEF=S△BEF，同理，可得S△DEB S△CDE，2S△ACD=S△CDB，所以三角形ABC的面积是12。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p7","lecture":"xes_07_14","type":"practice","num":7,"method":3,"methodTitle":"等积变形（3）","methodHint":"等底等高：面积相等","page":17,"text":"如图，在三角形ABC中,BC=3DC，AC=3EC，三角形DEC的面积是3平方厘米。请问：三角形ABC的面积是多少平方厘米？","solution":"因为AC=3EC，所以S△ADC=3S△EDC=9（平方厘米)；同理，BC=3DC，S△ABC3S△ADc=27（平方厘米）。所以三角形ABC的面积是27平方厘米。","answer":"27平方厘米。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p8","lecture":"xes_07_14","type":"practice","num":8,"method":3,"methodTitle":"等积变形（3）","methodHint":"等底等高：面积相等","page":17,"text":"如图，在三角形ABC中,DF=2AD=2FC，BE=2EC，已知三角形DEF的面积是10，求三角形ABC的面积是多少。API","solution":"由DF=2FC，三角形EFC面积为10÷2=5，故三角形DEC面积为15。而BE=2EC，有三角形BDC面积为15×3=45，得三角形ABC面积为45÷3×4=60。","answer":"60。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_c9","lecture":"xes_07_14","type":"challenge","num":9,"method":3,"methodTitle":"等积变形（3）","methodHint":"等底等高：面积相等","page":18,"text":"田田接待的这位顾客的要求确实有一些难度，他需要剪裁出一块小铁片。如图，正方形的边长是10厘米，图中阴影部分的面积是40平方厘米，四边形ABCD的面积是多少平方厘米？H B","solution":"S△HEF=10×10÷2=50（平方厘米），根据等积变形有S△GEB=S△HEB，所以S△GAB=S△HEA所以SABcD=(50−40)÷2=5(平方厘米）。","answer":"5平方厘米。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_e4","lecture":"xes_07_14","type":"example","num":4,"method":4,"methodTitle":"等积变形（4）","methodHint":"构造等高","page":19,"text":"如图，三角形ABC中，AB=5AD，AC=3AE，三角形ADE的面积等于1，那么三角形ABC的面积是多少？","solution":"连接BE。“AC=3AE，。S△ABC=3S△ABE。又”AB=5AD，S△ABE=5S△ADE，S△ABC=3S△ABE =3×5S△ADE=3×5×1=15。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p10","lecture":"xes_07_14","type":"practice","num":10,"method":4,"methodTitle":"等积变形（4）","methodHint":"构造等高","page":21,"text":"已知△ABC的面积是16平方厘米，延长AC到D，使CD=AC，取BC中点E，连接DE，求CDE的面积。","solution":"连接AE，因为AC=CD，所以S△ACE=S△CDE，CE=BE，S△ACE=S△ABE，所以S△CDE=16÷2=8(平方厘米）。","answer":"8平方厘米。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_14_p11","lecture":"xes_07_14","type":"practice","num":11,"method":4,"methodTitle":"等积变形（4）","methodHint":"构造等高","page":21,"text":"已知AD=CD，AE=EB，四边形BCDE的面积是三角形ADE的几倍？","solution":"连接BD，因为AD=CD，AE=BE，所以 S△ADE =S△BDE，S△ABD =S△BCD，S四边形BCDE=3S△ADE","answer":"3倍。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_14_c12","lecture":"xes_07_14","type":"challenge","num":12,"method":4,"methodTitle":"等积变形（4）","methodHint":"构造等高","page":22,"text":"一个更为棘手的工作来临了，看来只有牛牛的叔叔亲自出马才可以了。客户的图纸如下图，正方形ABCD与正方形EFGH的边长分别是2厘米、6厘米，并且FC=CD=DE，求△ADG和BGA的面积。B","solution":"根据题意和三角形面积公式可知：三角形ADG的面积=2×4÷2=4（平方厘米），三角形ABG的面积=2×（2+6)÷2=8（平方厘米)。","answer":"4平方厘米；8平方厘米。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_e5","lecture":"xes_07_14","type":"example","num":5,"method":5,"methodTitle":"正方形的等积变形（1）","methodHint":"连接同向的对角线","page":23,"text":"如图，正方形ABCD和正方形CEFG中，B，C，E在同一条直线上，且正方形ABCD边长为10厘米，则图中阴影面积为多少平方厘米？","solution":"连接CF,那么CF平行BD，所以S△BDF=S△BCD，所以阴影面积=S△BCD=10×10÷2=50（平方厘米）。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p13","lecture":"xes_07_14","type":"practice","num":13,"method":5,"methodTitle":"正方形的等积变形（1）","methodHint":"连接同向的对角线","page":25,"text":"如图，在一大一小两个正方形拼成的图形中，阴影部分的面积是50平方厘米，则小正方形的边长是多少厘米？","solution":"小正方形的面积是50×2=100（平方厘米)，边长是10厘米。","answer":"10厘米。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_p14","lecture":"xes_07_14","type":"practice","num":14,"method":5,"methodTitle":"正方形的等积变形（1）","methodHint":"连接同向的对角线","page":25,"text":"如图，正方形ABCD和正方形CEFG中，B、C、E在同一条直线上，且阴影三角形面积为8平方厘米，则正方形ABCD边长为多少？D","solution":"连接CF，那么CF平行BD，所以，阴影面积=三角形BCD的面积=8平方厘米。从而正方形ABCD面积为16平方厘米，边长为4厘米。D","answer":"4厘米。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_c15","lecture":"xes_07_14","type":"challenge","num":15,"method":5,"methodTitle":"正方形的等积变形（1）","methodHint":"连接同向的对角线","page":26,"text":"丁丁的客户要求制作三个三角形贴片。下图中，甲的面积比乙的面积大平方厘米。4厘米甲 6厘米8厘米","solution":"根据三角形面积公式和差不变原理可知：面积差=6×8÷2-4×8÷2=8（平方厘米)。","answer":"8。","answerPage":27,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_e6","lecture":"xes_07_14","type":"example","num":6,"method":6,"methodTitle":"正方形的等积变形（2）","methodHint":"连接同向的对角线","page":27,"text":"此图是由大、小两个正方形组成的，小正方形的边长是6厘米，B、O、F在一条直线上，求阴影部分的面积。","solution":"连接CF，DF，CF//BD，所以三角形OBC=三角形DOF面积；DO//EF，所以三角形DOF=三角形DOE面积，所以三角形DOE面积=三角形OBC，阴影面积=三角形BCD面积=6×6÷2=18（平方厘米)。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_14_p16","lecture":"xes_07_14","type":"practice","num":16,"method":6,"methodTitle":"正方形的等积变形（2）","methodHint":"连接同向的对角线","page":29,"text":"此图是由大、小两个正方形组成的，小正方形的边长是4厘米，A、G、C在一条直线上，三角形ABC的面积是多少？B F","solution":"连接AD，可以看出，AD/BC，S△ABc=S△BCD=4×4÷2=8(平方厘米）。A","answer":"8平方厘米。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_07_14_p17","lecture":"xes_07_14","type":"practice","num":17,"method":6,"methodTitle":"正方形的等积变形（2）","methodHint":"连接同向的对角线","page":29,"text":"如图，四边形ABCD是梯形，上底是8，下底是16，点E是BC边上任意一点，如果AED的面积是30，那么梯形ABCD的面积是D","solution":"△AEB与△ECD的面积和是△AED面积的2倍，所以梯形的面积是30×3=90。","answer":"90。","answerPage":28,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_c18","lecture":"xes_07_14","type":"challenge","num":18,"method":6,"methodTitle":"正方形的等积变形（2）","methodHint":"连接同向的对角线","page":30,"text":"一天的工作快要结束了，这时田田又接待了一位需要制作等腰三角形的客户。如图，有三个正方形的顶点D、K、G恰好在同一条直线上，其中正方形BEFG的边长为8，则阴影部分的面积是D","solution":"连接三个正方形的对角线DB、GE、FK，则有DB、GE、FK平行。于是S△DGE=S△BGE，S△KGE=S△FGE，即 S=SBEFG=8×8=64 。D （、","answer":"64。","answerPage":28,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_07_14_k19","lecture":"xes_07_14","type":"peak","num":19,"method":6,"methodTitle":"正方形的等积变形（2）","methodHint":"连接同向的对角线","page":30,"text":"如图，正方形和六边形的边长都相等，已知阴影面积为10，则图中一个正方形的面积是","solution":"连接AE、AF、BD、DE，易知AB与EF平行，所以S=S△AEF；因为AE与DF平行，所以S△AEF=S△AED；因为AD与BC平行，所以S△AED=S△ABD。即经过三次等积变形，S△ABD=S=10，所以S=10×2=20。D B","answer":"20。","answerPage":28,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_08_13_e1","lecture":"xes_08_13","type":"example","num":1,"method":1,"methodTitle":"简单抽屉原理（1）","methodHint":"①苹果数÷抽屉数=商·……·1","page":7,"text":"6只鸽子要飞进5个笼子，一定有一个笼子里至少有2只鸽子。对吗？","solution":"6只鸽子要飞进5个笼子，如果每个笼子装1只，这样还剩下1只鸽子。这只鸽子可以任意飞进其中的一个笼子，这样至少有一个笼子里有2只鸽子。所以这句话是正确的。利用刚刚学习过的抽屉原理来解释这个问题，把鸽笼看作“抽屉”，把鸽子看作“苹果”，6÷5=1（个)1（只），1+1=2（只）；把6个苹果放到5个抽屉中，肯定有一个抽屉中有至少两个苹果，也就是一定有一个笼子里有至少2只鸽子。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p1","lecture":"xes_08_13","type":"practice","num":1,"method":1,"methodTitle":"简单抽屉原理（1）","methodHint":"①苹果数÷抽屉数=商·……·1","page":9,"text":"把9条金鱼任意放在8个鱼缸里面，请你说明至少有一个鱼缸放有两条或两条以上金鱼。","solution":"利用刚刚学习过的抽屉原理来解释这个问题，把鱼缸看作“抽屉”，把金鱼看作“苹果”。在8个鱼缸里面，每个鱼缸放一条，就是8条金鱼；还剩下的一条，可以放在这8个鱼缸中的任意一个。","answer":"见解析。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p2","lecture":"xes_08_13","type":"practice","num":2,"method":1,"methodTitle":"简单抽屉原理（1）","methodHint":"①苹果数÷抽屉数=商·……·1","page":9,"text":"教室里有5名学生正在做作业，现在只有数学、英语、语文、地理四科作业，试说明：这5名学生中，至少有两个人在做同一科作业。","solution":"将5名学生看作5个苹果，将数学、英语、语文、地理作业各看成一个抽屉，共4个抽屉，由抽屉原理，一定存在一个抽屉，在这个抽屉里至少有2个苹果。即至少有两名学生在做同一科的作业。","answer":"见解析。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_c3","lecture":"xes_08_13","type":"challenge","num":3,"method":1,"methodTitle":"简单抽屉原理（1）","methodHint":"①苹果数÷抽屉数=商·……·1","page":10,"text":"5个小朋友在一起玩战棋游戏，输了的人要回答一个问题，答错就要被罚，牛牛第一局就输了，他遇到的问题是：请说明5个小朋友中必有3个小朋友都是男孩或者都是女孩。","solution":"5个小朋友只有2种性别，将2种性别看成2个抽屉，5个小朋友看成5个苹果，这道题就相当于把5个苹果放入2个抽屉中，根据抽屉原理，至少有3个人的性别是相同的，所以必有3个小朋友都是男孩或者都是女孩。","answer":"见解析。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_e2","lecture":"xes_08_13","type":"example","num":2,"method":2,"methodTitle":"简单抽屉原理（2）","methodHint":"①苹果数÷抽屉数=商..···1","page":11,"text":"在任意25个人中，至少有个人的属相相同。","solution":"把12属相看作12个“抽屉”，将25个人看作25个“苹果”。这样，把25个苹果放进12个抽屉里，至少有一个抽屉里不止放一个苹果。25÷12=2…..·1，2+1=3，这就说明，至少有3个人的属相相同。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p4","lecture":"xes_08_13","type":"practice","num":4,"method":2,"methodTitle":"简单抽屉原理（2）","methodHint":"①苹果数÷抽屉数=商..···1","page":13,"text":"光明小学有367名2008年出生的学生，请问是否有生日相同的学生？","solution":"一年最多有366天，把366天看作366个“抽屉”，将367名学生看作367个“苹果”。这样，把367个苹果放进366个抽屉里，至少有一个抽屉里不止放一个苹果。这就说明，至少有2名同学的生日相同。367÷366=1·1，1+1=2。","answer":"有。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p5","lecture":"xes_08_13","type":"practice","num":5,"method":2,"methodTitle":"简单抽屉原理（2）","methodHint":"①苹果数÷抽屉数=商..···1","page":13,"text":"任意40个人中，至少有几个人属于同一生肖？","solution":"把12生肖看作12个“抽屉”，将40个人看作40个“苹果”。这样，把40个苹果放进12个抽展里，40÷12=3………*4，3+1=4（个）。所以至少有4个人属于同一生肖。","answer":"4个。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_c6","lecture":"xes_08_13","type":"challenge","num":6,"method":2,"methodTitle":"简单抽屉原理（2）","methodHint":"①苹果数÷抽屉数=商..···1","page":14,"text":"第二局牛牛又输了，他遇到的问题是：800人中至少有多少个人的生日相同？","solution":"将一年中的366天视为366个抽屉，800个人看作800个苹果，从极端的情况考虑，即每个抽昼都放2个苹果，还有68个苹果必然要放到有2个苹果的抽屉里，所以至少有一个抽屉有至少3个苹果，即至少有三人的生日相同。800÷366=2.….….68，2+1=3（个）。","answer":"3人。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_e3","lecture":"xes_08_13","type":"example","num":3,"method":3,"methodTitle":"构造抽屉（1）","methodHint":"①构造“苹果”和“抽屉”","page":15,"text":"班上有50名小朋友，老师至少拿几本书，随意分给小朋友，才能保证至少有一个小朋友能得到不少于两本书？","solution":"把50名小朋友当作50个“抽屉”，书作为“苹果”。把书放在50个抽屉中，要想保证至少有一个抽屉中有两本书，根据抽屉原理，书的数目必须大于50，而大于50的最小整数是50+1=51（本），所以至少要拿51本书。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p7","lecture":"xes_08_13","type":"practice","num":7,"method":3,"methodTitle":"构造抽屉（1）","methodHint":"①构造“苹果”和“抽屉”","page":17,"text":"班上有28名小朋友，老师至少拿几本书，随意分给小朋友，才能保证至少有一个小朋友能得到不少于两本书？","solution":"把28名小朋友当作28个“抽屉”，书作为物品。把书放在28个抽屉中，要想保证至少有一个抽屉中有两本书，根据抽屉原理，书的数目必须大于28，而大于28的最小整数是28+1=29（本），所以至少要拿29本书。","answer":"29本。","answerPage":27,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p8","lecture":"xes_08_13","type":"practice","num":8,"method":3,"methodTitle":"构造抽屉（1）","methodHint":"①构造“苹果”和“抽屉”","page":17,"text":"有10只鸽笼，为保证至少有1只鸽笼中住有2只或2只以上的鸽子，那么至少需要有几只鸽子？","solution":"有10只鸽笼，每个笼子住1只鸽子，一共就是10只。要保证至少有1只鸽笼中住有2只或2只以上的鸽子，那么至少需要11只鸽子，这多出的1只鸽子可以住在这10个任意一个笼子里，这样就有1个笼子里住着2只鸽子。所以至少需要11只鸽子。","answer":"11只。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_c9","lecture":"xes_08_13","type":"challenge","num":9,"method":3,"methodTitle":"构造抽屉（1）","methodHint":"①构造“苹果”和“抽屉”","page":18,"text":"第三局牛牛终于赢了，他问了战败的丁丁这样一个问题：班上有15名小朋友，老师至少拿几块糖，随意分给小朋友，才能保证至少有一个小朋友能得到不少于两块糖？","solution":"15+1=16，老师至少拿16块糖，随意分给小朋友，才能保证至少有一个小朋友能得到不少于两块糖。","answer":"16块。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_e4","lecture":"xes_08_13","type":"example","num":4,"method":4,"methodTitle":"构造抽屉（2）","methodHint":"①构造“苹果”和“抽屉”","page":19,"text":"幼儿园买来许多牛、马、羊、狗塑料玩具，每个小朋友任意选择两件，但不能是同样的，问：至少有多少个小朋友去拿，才能保证有两人所拿玩具相同？","solution":"从4种玩具中挑选不同的两件，所有的搭配有以下6组：牛、马；牛、羊；牛、狗；马、羊；马、狗；羊、狗。把每一组搭配看作一个“抽屉”，共6个抽屉。根据抽屉原理，至少要有7个小朋友去拿，才能保证有两人所拿玩具相同。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_08_13_p10","lecture":"xes_08_13","type":"practice","num":10,"method":4,"methodTitle":"构造抽屉（2）","methodHint":"①构造“苹果”和“抽屉”","page":21,"text":"光明小学买来许多牛、马、羊塑料玩具，每个小朋友任意选择两件，但不能是同样的，问：至少有多少个小朋友去拿，才能保证有两人所拿玩具相同？","solution":"从三种玩具中挑选不同的两件，所有的搭配有以下3组：牛、马；牛、羊；马、羊。把每一组搭配看作一个“抽屉”，共3个抽屉。根据抽屉原理，至少要有4个小朋友去拿，才能保证有两人所拿玩具相同。","answer":"4个。","answerPage":28,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_08_13_p11","lecture":"xes_08_13","type":"practice","num":11,"method":4,"methodTitle":"构造抽屉（2）","methodHint":"①构造“苹果”和“抽屉”","page":21,"text":"六年级(1)班举行投篮比赛，规定每人投5球，投进一球得一分，投不进不得分，为了保证有3人的得分相同，至少要有几人参加这项比赛？","solution":"每个人的得分可以是：5分，4分，3分，2分，1分，0分，一共有6种得分情况，把这6种得分情况看做6个抽屉，考虑最差情况：每个抽屉都有2人得分情况相同，再多出1人，无论放到哪个抽屉，都会出现有一个抽屉内3人得分相同，所以2×6+1=13（人）。","answer":"13人。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_c12","lecture":"xes_08_13","type":"challenge","num":12,"method":4,"methodTitle":"构造抽屉（2）","methodHint":"①构造“苹果”和“抽屉”","page":22,"text":"第四局田田输了，她遇到的问题是：在一只口袋中有红色、黄色、蓝色球若干个，小聪明和其他6个小朋友一起做游戏，每人可以从口袋中随意取出2个球，不管怎样挑选，总有两个小朋友取出的两个球的颜色完全一样。你能说明这是为什么吗？","solution":"从三种颜色的球中挑选两个球，可能情况只有下面6种：红、红；黄、黄；蓝、蓝；红、黄；红、蓝；黄、蓝，我们把6种搭配方式当作6个“抽屉”，把7个小朋友当作7个“苹果”，根据抽屉原理，至少有两个“苹果”要放进一个“抽屉”中，也就是说，至少有两个人挑选的颜色完全一样。","answer":"见解析。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_e5","lecture":"xes_08_13","type":"example","num":5,"method":5,"methodTitle":"构造抽屉（3）","methodHint":"构造“苹果”和“抽屉”","page":23,"text":"将2行6列的方格纸的每一格染成黑色或白色，请说明：不管怎样染，总有两列的染色方式是一样的。","solution":"每一列的染色方式有2×2=4(种)选择，共有6列，由抽屉原理，必有两列染色方式相同。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_08_13_p13","lecture":"xes_08_13","type":"practice","num":13,"method":5,"methodTitle":"构造抽屉（3）","methodHint":"构造“苹果”和“抽屉”","page":25,"text":"如图，将2行5列的方格纸的每一格染成黑色或白色，请说明：不管怎样染，总有两列的染色方式是一样的。","solution":"每一列的染色方式有2×2=4（种）选择，共有5列，由抽屉原理，必有两列染色方式相同。","answer":"见解析。","answerPage":28,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_08_13_p14","lecture":"xes_08_13","type":"practice","num":14,"method":5,"methodTitle":"构造抽屉（3）","methodHint":"构造“苹果”和“抽屉”","page":25,"text":"将每一个小方格涂上红色、黄色或蓝色。（每一列的三小格涂的颜色不相同），不论如何涂色，其中至少有两列，它们的涂色方式相同，你同意吗？","solution":"通过列举我们发现给这些方格涂色，要使每列的颜色不同，最多有6种不同的涂法，相当于有6个抽屉，涂到第七列以后，就会跟前面的重复。所以不论如何涂色，其中至少有两列，它们的涂色方式相同。红红蓝蓝黄黄蓝黄红黄红蓝黄蓝黄红蓝","answer":"见解析。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_c15","lecture":"xes_08_13","type":"challenge","num":15,"method":5,"methodTitle":"构造抽屉（3）","methodHint":"构造“苹果”和“抽屉”","page":26,"text":"第五局丁丁又输了，他遇到的问题是：把一个长方形画成3行9列共27个小方格，然后用红、蓝铅笔任意将每个小方格涂上红色或蓝色。是否一定有两列小方格涂色的方式相同？","solution":"每一列中三个小格涂色的选择有2×2×2=8（种），相当于8个抽屉，9件物品放入8个抽屉，必有一个抽屉的物品数不少于2件，即一定有两列小方格涂色的方式相同。","answer":"见解析。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_e6","lecture":"xes_08_13","type":"example","num":6,"method":6,"methodTitle":"最不利原则","methodHint":"保证=“最倒霉”+1","page":27,"text":"一个口袋内有100个球，其中有红球28个，绿球20个，黄球12个，蓝球20个，白球10个，黑球10个。从袋中任意取球，如果要求一次取出的球中至少有15个球的颜色相同，那么至少要从袋中取出多少个球？","solution":"最不利条件：前面取的球都没有达到15个球颜色相同的状况。也就是：黄球，白球，黑球全部都取完了（这些同颜色的都在15个球以下，全部取完也不会有15个球颜色相同），一共是12+10+10=32（个)球。然后红球，绿球，蓝球各取14个，一共是14×3=42（个）球，依然没有15个球颜色相同。然后再取任意一个球，就能达到至少有15个球的颜色相同了，因此至少要从袋中取出32+42+1=75（个)球。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p16","lecture":"xes_08_13","type":"practice","num":16,"method":6,"methodTitle":"最不利原则","methodHint":"保证=“最倒霉”+1","page":29,"text":"口袋里有红球3个，黄球7个，黑球8个，白球9个，至少要取几个小球才能保证有6个小球同色？","solution":"把4种不同颜色看作4个抽屉，把不同颜色的球看作元素，从最不利情况考虑，第一个抽屉里需要放完3个红球，另外三个抽屉再各放5个球，共需要5×3+3=18（个），再取出1个不论是什么颜色，总有一个抽屉里的球和它同色，这时才能保证有6个小球同色。所以至少要取出：18+1=19(个)球。","answer":"19个。","answerPage":28,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_p17","lecture":"xes_08_13","type":"practice","num":17,"method":6,"methodTitle":"最不利原则","methodHint":"保证=“最倒霉”+1","page":29,"text":"黑色、白色、黄色的筷子各有8根，混杂在一起，黑暗中想从这些筷子中取出颜色不同的两双筷子。问至少要取多少根才能保证达到要求？","solution":"根据最不利原则，最倒霉的情况是取了8+1+1=10（根）筷子，还不能保证两双颜色不同。但是，再取1根就可以保证了。所以取出11根筷子就得到颜色不同的两双筷子。","answer":"11根。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_c18","lecture":"xes_08_13","type":"challenge","num":18,"method":6,"methodTitle":"最不利原则","methodHint":"保证=“最倒霉”+1","page":30,"text":"第六局阿普输了，他遇到的问题是：一副扑克牌有54张，最少要抽取几张牌，方能保证其中至少有2张牌有相同的点数？（大王、小王算不同的两种点数)","solution":"点数为1（A），2，3，4，5，6，7，8，9，10，11（J），12(Q)，13(K）的牌各取1张，再取大王、小王各1张，一共15张，这15张牌中，没有两张的点数相同。这样，如果任意再取1张的话，它的点数必为1～13中的一个，于是有2张点数相同。所以至少要取出16张牌。","answer":"16张。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_08_13_k19","lecture":"xes_08_13","type":"peak","num":19,"method":6,"methodTitle":"最不利原则","methodHint":"保证=“最倒霉”+1","page":30,"text":"在边长为3的正三角形内，任意放入10个点，求证：必有两个点的距离不大于1。","solution":"将边长为3的正三角形等分为9个小正三角形，根据抽屉原理，10个点中必有两个点落入同一个小正三角形的内部或边上，那么这两个点之间的距离不会超过小正三角形的边长，故必有两个点的距离不大于1。","answer":"见解析。","answerPage":29,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_e1","lecture":"xes_09_09","type":"example","num":1,"method":1,"methodTitle":"最简整数比","methodHint":"比的前项和后项都为整数且互质","page":7,"text":"(1)把12：16化成最简整数比是(2)把 3.6 化成最简整数比是(3)把连比24：36：40化成最简整数比是","solution":"(1)12:16=(12÷4)：(16÷4)=3：4;[×35×35 =21：30=(21÷3)：(30÷3)=7：10;0：6：9=（÷0）：（÷9）：（÷=0：9：（）","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p1","lecture":"xes_09_09","type":"practice","num":1,"method":1,"methodTitle":"最简整数比","methodHint":"比的前项和后项都为整数且互质","page":9,"text":"(1)把48：60化成最简整数比是(2)把 1.4 化成最简整数比是(3)把连比22：33：44化成最简整数比是","solution":"（1)48：60=（48÷12）：（60÷12）=4 34 :5;(2) =3：8；（3）22：2 433：44=（22÷11）：（33÷11）：（44÷11)=2 :3 : 4。","answer":"(1)4：5；(2)3：8；(3)2：3：4","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p2","lecture":"xes_09_09","type":"practice","num":2,"method":1,"methodTitle":"最简整数比","methodHint":"比的前项和后项都为整数且互质","page":9,"text":"化成最简整数比：27(1)99:0.375= 8(3)111:37:148=","solution":"(1) 27 27÷9 3 ；(2) ：0.375=99 99÷9 11 81 =1 :3;(3)111:37:148=3:1:4。","answer":"（1) 3","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_c3","lecture":"xes_09_09","type":"challenge","num":3,"method":1,"methodTitle":"最简整数比","methodHint":"比的前项和后项都为整数且互质","page":10,"text":"牛牛问田田，下面4个数，能写成比例吗？如果能，请写出一个比例：3.5,5,7,10。","solution":"根据比例的性质：内项之积等于外项之5 10(答案不唯一)。","answer":"见解析。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_e2","lecture":"xes_09_09","type":"example","num":2,"method":2,"methodTitle":"比例性质","methodHint":"内项积=外项积","page":11,"text":"把下列比例补充完整。(1)2：5=( ）：30;(2)( ):3:8=6：（ ）：12。","solution":"(1)5×( )=2×30，( )=2×30÷5=12;(2)3:8=( ）：12,( )=3×12÷8=4.5，( )：3=6:4.5,(3×6÷4.5=4。所以(4)：3：8=6：（4.5）：12。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p4","lecture":"xes_09_09","type":"practice","num":4,"method":2,"methodTitle":"比例性质","methodHint":"内项积=外项积","page":13,"text":"解比例方程：7x—10 6(1)3.6:x 4 ;(2) ：3;(3)2 3x+5","solution":"（1）解： x=3.6×4，x=3.6×4×2，x=28.8；5 3 .5×3，x(3）解：(7x-10)×5=6×(3x+5)35x—50=18x+3017x=8017°","answer":"（1)28.8；(2)1.8；(3） 8017 °","answerPage":22,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_09_09_p5","lecture":"xes_09_09","type":"practice","num":5,"method":2,"methodTitle":"比例性质","methodHint":"内项积=外项积","page":13,"text":"解比例方程：(1)48：5=x：x+3","solution":"（1)5x=48× (2)8x=6x+18，6 2x=18，","answer":"（1)；(2)9。 6","answerPage":22,"hasFigure":true,"lowConfidence":true},
    {"id":"xesq_09_09_c6","lecture":"xes_09_09","type":"challenge","num":6,"method":2,"methodTitle":"比例性质","methodHint":"内项积=外项积","page":14,"text":"田田问牛牛，如果 -互为倒数，那么a，b，c，d这四个数组成的比例是（答案不唯一，只写一个即可）。","solution":"因为一与一互为倒数， bd 6 p bd1,即bd=ac，答案不唯一。例如:a：b=d：c。","answer":"见解析。","answerPage":22,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_e3","lecture":"xes_09_09","type":"example","num":3,"method":3,"methodTitle":"解比例方程","methodHint":"内项积=外项积","page":15,"text":"解比例方程：(3x一2）：（2x+3)=4：7。","solution":"解：7(3x-2)=4(2x+3)，21x-14=8x+12,21x-8x=12+14,x=2。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_09_09_p7","lecture":"xes_09_09","type":"practice","num":7,"method":3,"methodTitle":"解比例方程","methodHint":"内项积=外项积","page":17,"text":"解比例方程：4：（5x-1)=12：（10x十7)。","solution":"解：4（10x+7）=12（5x-1)，40x十28=60x-12，20x=40，x=2。","answer":"x=2。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p8","lecture":"xes_09_09","type":"practice","num":8,"method":3,"methodTitle":"解比例方程","methodHint":"内项积=外项积","page":17,"text":"解比例方程：(2x十1）：（x十5)=8：5。","solution":"5（2x十1）=8（x十5)，解方程得=17.5。","answer":"x=17.5。","answerPage":23,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_09_09_c9","lecture":"xes_09_09","type":"challenge","num":9,"method":3,"methodTitle":"解比例方程","methodHint":"内项积=外项积","page":18,"text":"牛牛自己想36的因数有多少个，能否从中选择4个数组成两个比的比值是1 的比例？","solution":"36的因数有：1，2，3，4，6，9，12，18，36，共9个，组成比值是1÷的比为4：3=12：9。","answer":"9个；能，4：3=12：9。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_e4","lecture":"xes_09_09","type":"example","num":4,"method":4,"methodTitle":"比例应用题（1）","methodHint":"按比分配","page":19,"text":"田田、牛牛、丁丁他们的体重比是2：3：4，其中田田的体重是34千克。牛牛、丁丁的体重各是多少千克？","solution":"牛牛体重：34÷2×3=51（千克）；丁丁体重：34÷2×4=68（千克）。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p10","lecture":"xes_09_09","type":"practice","num":10,"method":4,"methodTitle":"比例应用题（1）","methodHint":"按比分配","page":21,"text":"动物园里有老虎、企鹅、驼鸟三种动物比较体重，老虎重360千克，企鹅的体重是舵鸟的，鸟的体重是老虎的,那么企鹅的体重是多少千克？","solution":"根据题意知，舵鸟的体重是360×96（千克），企鹅的体重是96× 5 40（千克）。","answer":"40千克。","answerPage":23,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_09_09_p11","lecture":"xes_09_09","type":"practice","num":11,"method":4,"methodTitle":"比例应用题（1）","methodHint":"按比分配","page":21,"text":"一些苹果平均分给甲、乙两班的学生，甲班比乙班多分到16个，而甲、乙两班的人数比为13：11，求一共有多少个苹果？","solution":"一共有16÷（13−11）×（13+11）=192(个)苹果。","answer":"192个。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_c12","lecture":"xes_09_09","type":"challenge","num":12,"method":4,"methodTitle":"比例应用题（1）","methodHint":"按比分配","page":22,"text":"丁丁看到卷子上常考的题：如果4a=36,那么α：b","solution":"根据比例的基本性质，可知α：b=3 :4。","answer":"3：4。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_e5","lecture":"xes_09_09","type":"example","num":5,"method":5,"methodTitle":"比例应用题（2）","methodHint":"统一单位“1”","page":23,"text":"于甲、乙两数和的 ，求甲：乙：丙是多少？","solution":"甲：（乙+丙)=1：3；乙：（甲+丙)=1：2；丙：（甲+乙)=5：7；甲：（甲+乙+丙)=1：(1+3)=1：4=3：12；乙：（甲+乙+丙)=1：(1+2)=1：3=4：12;丙：（甲+乙+丙)=5：(5+7)=5：12，所以甲：乙：丙=3：4：5。","answer":"","answerPage":null,"hasFigure":true,"lowConfidence":false},
    {"id":"xesq_09_09_p13","lecture":"xes_09_09","type":"practice","num":13,"method":5,"methodTitle":"比例应用题（2）","methodHint":"统一单位“1”","page":25,"text":"甲、乙、丙三个数，已知甲：（乙十丙)=4：3，乙：丙=2：7,问：甲：乙：丙是多少？AP","solution":"由乙：丙=2：7可得到乙：（乙十丙）=2：9，丙：（乙十丙）=7：9，而甲：（乙十丙）=4：3=12：9，所以甲：乙：丙=12：2：7。","answer":"12：2：7。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p14","lecture":"xes_09_09","type":"practice","num":14,"method":5,"methodTitle":"比例应用题（2）","methodHint":"统一单位“1”","page":25,"text":"有429名小学生参加数学冬令营，其中男生和女生的人数比为7：6。后来又有一些女生报名参赛，这时男生和女生的人数比变为11：10。请问：后来报名的女生有多少人？","solution":"方法一：原有男生429× 7+6 231（人），女生429−231=198（人）。设后来报名的女生有x人，则 231 11198+x的女生有12人。方法二：原来男生：女生=7：6，男生有429×7 =231(人)。现在男生：女生=11：10，寻7+6找不变量男生，原来男生：女生=7：6=77：66，现在男生：女生=11：10=77：70，后来报名的女生有231÷77×(70−66)=12(人）。","answer":"12人。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_c15","lecture":"xes_09_09","type":"challenge","num":15,"method":5,"methodTitle":"比例应用题（2）","methodHint":"统一单位“1”","page":26,"text":"牛牛、丁丁还有田田，三个人的体重总和是110千克，他们的体重比是6：7：9，那么，他们三个各重多少千克？","solution":"将三人体重之和看作单位“1”，三人的各自体重占三人总体重的 6+7+9′6+7+9’9 66+7+9 =30（千克），丁丁体重：110× 7 35（千克），6+7+9田田体重：110× 9 =45（千克）。6+7+9","answer":"30千克，35千克，45千克。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_e6","lecture":"xes_09_09","type":"example","num":6,"method":6,"methodTitle":"比例应用题（3）","methodHint":"找不变量，化连比","page":27,"text":"某山区小学要栽253棵松树，分给三个年级。六年级分到的等于五年级分到的 ，又等于四年级分到的三个年级各分到多少棵？","solution":"六年级由图得，三个班级栽松树的比为5：4：2，五年级L1份：253÷(5+4+2)=23(棵)，四年级六年级分到23×5=115（棵)；五年级分到23×4=92(棵)；四年级分到23×2=46(棵)。","answer":"","answerPage":null,"hasFigure":false,"lowConfidence":true},
    {"id":"xesq_09_09_p16","lecture":"xes_09_09","type":"practice","num":16,"method":6,"methodTitle":"比例应用题（3）","methodHint":"找不变量，化连比","page":29,"text":"加工一个零件，甲要2分钟，乙要3分钟，丙要4分钟。现有1170个零件，甲、乙、丙三人各加工几个零件，才能使他们同时完成任务？","solution":"甲、乙、丙每人每分钟分别加工 2’3个零件。因为他们同时完工，所以工作效率6：4：3，所以一份等于3 41170÷（6+4+3）=90（个），甲：90×6=540（个）；乙：90×4=360（个）；丙：90×3=270(个)。","answer":"甲加工了540个；乙加工了360个；丙加工了270个。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_p17","lecture":"xes_09_09","type":"practice","num":17,"method":6,"methodTitle":"比例应用题（3）","methodHint":"找不变量，化连比","page":29,"text":"甲、乙、丙三人合买一台电视机。甲付的钱等于乙付的钱数的2倍，也等于丙付的钱数的3倍。已知甲比丙多付了680元。请问：(1)甲、乙、丙三人所付的钱数之比是多少？(2)这台电视机售价是多少钱？","solution":"（1）甲：乙：丙=1： 6：2 33 : 2。(2)设乙付出的钱数为x，甲付出的钱数是2x，丙付出的钱数是2x÷3。2x-2x÷3=680， =680，x=510。甲付出的钱数：2x=2×510=1020（元）。丙付的钱数：2x÷3=2×510÷3=340（元）。所以这台电视机的售价为：510+340+1020=1870(元)。","answer":"(1)6：3：2；(2)1870元。","answerPage":23,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_c18","lecture":"xes_09_09","type":"challenge","num":18,"method":6,"methodTitle":"比例应用题（3）","methodHint":"找不变量，化连比","page":30,"text":"乐乐老师最后给大家出一题：①某校共有9个毕业班，每班人数相等；②已知一班的男生人数比二、三两个班的女生总数多1人；③四、五、六三个班的女生总数比七、八、九三个班的男生总数多1人。那么，该校毕业生中男、女生人数比是多少？","solution":"如下表所示，由②知，一、二、三班的男生总数比二、三班总人数多1人；由③知，四至九班的男生总数比四、五、六班总人数少1。一班男生比二、三班女生多1人加上二、三班男生二、三班男生、二、三班比二、三班总人数多1人男生七、八、九班比四、五、六班少1人男生女生加上四、五、六班四、五、六班男生男生四、五、六、七、比四、五、六班少1人八、九班男生总人数因此，一至九班的男生总人数等于二、三、四、五、六共五个班的人数之和，由于每班人数均相等，则女生总数等于四个班的人数之和。所以男、女生人数之比是5：4。","answer":"5：4。","answerPage":24,"hasFigure":false,"lowConfidence":false},
    {"id":"xesq_09_09_k19","lecture":"xes_09_09","type":"peak","num":19,"method":6,"methodTitle":"比例应用题（3）","methodHint":"找不变量，化连比","page":30,"text":"将一堆糖果全部分给甲、乙、丙三个小朋友。原计划甲、乙、丙三人所得糖果数的比为5：4：3。实际上，甲、乙、丙三人所得糖果数的比为7：6：5，其中有一位小朋友比原计划多得了15块糖果。那么这位小朋友是（填“甲”“乙”或“丙”），他实际所得的糖果数为块。","solution":"甲乙丙总和原计划 5 4 12实际 7 6 5 18甲乙丙总和原计划 15 12 9 36实际 14 12 10 36丙实际所得糖果：15÷（10−9）×10=150(块)。","answer":"丙；150块。","answerPage":24,"hasFigure":false,"lowConfidence":false}
];
const xesProblemMap = Object.fromEntries(xesProblems.map(p => [p.id, p]));

// 每讲的「知识导引 / 知识点梳理 / 好方法标题」
const xesLectureNotes = {
 "xes_01_16": {
  "intro": "1.让孩子理解如何通过一个物体，找到另外两者之间的数量关系；2.学会简单的等量代换，培养方程思想。",
  "summary": [
   "一、等量代换",
   "1.找基本关系；",
   "2.替换中间量。",
   "二、方法",
   "1.画图尝试；",
   "2.列算式。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "等量代换（1）",
    "hint": "相等的量之间可以相互交换"
   },
   {
    "no": 2,
    "title": "等量代换（2）",
    "hint": "①找到中间量，再进行替换"
   },
   {
    "no": 3,
    "title": "等量代换（3）",
    "hint": "①找到中间量，再进行替换"
   },
   {
    "no": 4,
    "title": "等量代换（4）",
    "hint": "找到中间量，再进行替换"
   },
   {
    "no": 5,
    "title": "等量代换（5）",
    "hint": "找到中间量，再进行替换"
   },
   {
    "no": 6,
    "title": "等量代换（6）",
    "hint": "找到中间量，再进行替换"
   }
  ]
 },
 "xes_02_08": {
  "intro": "1.学会用巧算的方法来进行立体图形的计数；2.灵活掌握有规律图形计数的方法。",
  "summary": [
   "找规律，数图形",
   "方法一：分层数，总数=每层个数相加",
   "方法二：找相同，用乘法；",
   "方法三：填补法，总数一填补数=现有数；",
   "方法四：分割法，将不规则图形分割成规则图形；",
   "方法五：拆数法，注意限制条件。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "数小方块",
    "hint": "①分层数"
   },
   {
    "no": 2,
    "title": "数圆柱体",
    "hint": "①从上向下，分层数"
   },
   {
    "no": 3,
    "title": "数圆点",
    "hint": "①分层数：找规律，列算式"
   },
   {
    "no": 4,
    "title": "数爱心",
    "hint": "分层数"
   },
   {
    "no": 5,
    "title": "数梨",
    "hint": "分层数：找规律，列算式"
   },
   {
    "no": 6,
    "title": "分糖",
    "hint": "拆数法"
   }
  ]
 },
 "xes_03_04": {
  "intro": "1.学会不规则图形的计数方法；2.用所学乘法进行计数，巩固对乘法的实际应用，渗透数形结合思想。",
  "summary": [
   "核心思想一—找相同，用乘法",
   "一、平面图形",
   "1.规则图形：打枪法，公式法；",
   "2.不规则图形：编号法，分层分列，包含法。",
   "二、立体图形",
   "分层计数—本层数=上层数+露头的。",
   "1.结合乘法",
   "（1）有序分类：横向、纵向·….·.",
   "（2）数过的做记号；",
   "（3）找相同，用乘法。",
   "2.神奇的图形数字",
   "（1）三角形数：1，3，6，10，15，21，28，",
   "36,45,55,…,5050,·…·;",
   "由来：1，1+2=3，1+2+3=6，1+2+3+4=",
   "10，.，1+2+3+.….+no",
   "（2）方形数：1，4，9，16，25，36，49，64，",
   "81,100，·…·;",
   "由来：1×1=1，2×2=4，3×3=9，4×4=",
   "16,….,nxno"
  ],
  "methods": [
   {
    "no": 1,
    "title": "汉字计数",
    "hint": "①确定每行汉字的个数"
   },
   {
    "no": 2,
    "title": "平面图形计数",
    "hint": "①每行/列相同"
   },
   {
    "no": 3,
    "title": "小棒计数",
    "hint": "①观察小棒是横放还是竖放"
   },
   {
    "no": 4,
    "title": "分散图形计数",
    "hint": "按部分分类，变成相同图形"
   },
   {
    "no": 5,
    "title": "正方形数",
    "hint": "正方形数特点：nXn"
   },
   {
    "no": 6,
    "title": "三角形数",
    "hint": "三角形数特点：1+2+3+4+5+6··."
   }
  ]
 },
 "xes_03_14": {
  "intro": "1.掌握植树问题涉及的四种基本类型；2.根据具体的情况判断不同的植树问题，灵活解决一些实际问题，为之后的间隔问题做好铺垫。",
  "summary": [
   "一、复习间隔之谜",
   "1.两端有点：点数=段数+1；",
   "2.两端无点：点数=间隔数一1；",
   "3.一端有点一端无点：点数=间隔数；",
   "4.封闭型：点数=间隔数。",
   "二、植树四大类型",
   "1.两端种树：棵数=间隔数+1；",
   "2.两端不种：棵数=间隔数-1；",
   "3.一端种，一端不种：棵数=间隔数；",
   "4.封闭型：棵数=间隔数。",
   "三、四大要素（总长、间隔长、间隔数、棵数）",
   "总长=间隔长×间隔数；",
   "间隔数=总长一间隔长。",
   "四、注意",
   "1.读题圈重点；",
   "2.画图；",
   "3.看图列式。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "植树问题中的间隔",
    "hint": "①种树类型：不封闭型、封闭型"
   },
   {
    "no": 2,
    "title": "两端都种的植树问题求总长",
    "hint": "①段数=棵数—1"
   },
   {
    "no": 3,
    "title": "封闭型植树问题求总长",
    "hint": "①棵数=段数"
   },
   {
    "no": 4,
    "title": "两端都种的植树问题求棵数",
    "hint": "①棵数=段数十1"
   },
   {
    "no": 5,
    "title": "封闭型植树问题求棵数",
    "hint": "①棵数=段数"
   },
   {
    "no": 6,
    "title": "两端都种的植树问题求段数",
    "hint": "①段数=棵数-1"
   }
  ]
 },
 "xes_04_02": {
  "intro": "1.理解有余数除法的意义，明白余数要比除数小的道理；2.会解答有余数除法的应用题，初步将除法用于解决实际问题。",
  "summary": [
   "有余数的除法",
   "1.除法的含义：（1）平均分，（2）包含除。",
   "2.被除数一除数=商.····.余数",
   "↑ ↑ 几",
   "总数=用去的数十剩下不够分的数。",
   "（1）余数<除数；",
   "（2）被除数=除数×商十余数；",
   "（3）除数=（被除数一余数）÷商。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "求被除数",
    "hint": "被除数=除数×商十余数"
   },
   {
    "no": 2,
    "title": "求除数",
    "hint": "除数=（被除数一余数)÷商"
   },
   {
    "no": 3,
    "title": "余数和除数的关系（1）",
    "hint": "①余数<除数"
   },
   {
    "no": 4,
    "title": "求最大被除数和最小被除数",
    "hint": "①除数一定，余数小则被除数小"
   },
   {
    "no": 5,
    "title": "带余除法应用",
    "hint": "①先求每个人分到的玻璃块数和剩下不"
   },
   {
    "no": 6,
    "title": "余数和除数的关系（2）",
    "hint": "①余数<除数"
   }
  ]
 },
 "xes_04_06": {
  "intro": "1.通过简单的鸡兔同笼问题，来引导孩子学习画直观图；2.以数形结合的方式引出假设法，帮助孩子更形象地理解题目。",
  "summary": [
   "一、列表法",
   "二、画图法",
   "三、假设法（核心方法，牢记）",
   "1.假设全是鸡，算总腿数；",
   "2.找总腿差；",
   "3.找每只动物腿差；",
   "4.总腿差一每只腿差=兔的只数（如果先假设",
   "全是兔，除法就得到鸡的只数）。",
   "四、抬腿法",
   "将有较少腿的动物的腿全部抬起来。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "基础鸡兔同笼问题（1）",
    "hint": "数小，列表法"
   },
   {
    "no": 2,
    "title": "基础鸡兔同笼问题（2）",
    "hint": "数大，画图法"
   },
   {
    "no": 3,
    "title": "生活中的鸡兔同笼问题（1）",
    "hint": "数大，画图法"
   },
   {
    "no": 4,
    "title": "基础鸡兔同笼问题（3）",
    "hint": "假设法"
   },
   {
    "no": 5,
    "title": "生活中的鸡兔同笼问题（2）",
    "hint": "假设法"
   },
   {
    "no": 6,
    "title": "基础鸡兔同笼问题（4）",
    "hint": "抬腿法"
   }
  ]
 },
 "xes_04_12": {
  "intro": "1.掌握和差问题的特性，为以后继续学习和倍、差倍问题做准备；2.总结归纳出解决和差问题的方法，并解决一些实际问题。",
  "summary": [
   "一、和差问题：已知和与差，求大数和小数分别为",
   "多少。",
   "二、思想：变同。",
   "三、方法：大数=（和十差）÷2；",
   "小数=（和一差）÷2。",
   "四、技巧：先求小数，再求大数。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "基础和差问题",
    "hint": "大数=（和十差）÷2；小数=（和一差）÷2"
   },
   {
    "no": 2,
    "title": "暗和型和差问题（1）",
    "hint": "①先求暗和"
   },
   {
    "no": 3,
    "title": "长方形中的和差问题",
    "hint": "找到长和宽对应的和差"
   },
   {
    "no": 4,
    "title": "暗和型和差问题（2）",
    "hint": "①先求暗和"
   },
   {
    "no": 5,
    "title": "暗差型和差问题",
    "hint": "增同减同差不变"
   },
   {
    "no": 6,
    "title": "年龄问题中的和差问题",
    "hint": "①寻找和差对应的时间"
   }
  ]
 },
 "xes_04_16": {
  "intro": "1.利用年龄问题中常见的数量关系，解答生活中一些简单的年龄问题；2.为三年级的进一步学习奠定基础。",
  "summary": [
   "一、求某人几岁",
   "方法一：以自己为标准，找出“过几年”；",
   "方法二：以别人为标准，找出“年龄差”。",
   "二、年龄和变化，求年头数",
   "方法：年头数=年龄和变化（增加或减少）÷",
   "人数",
   "若年龄和增加了，则是几年后的事情；",
   "若年龄和减少了，则是几年前的事情。",
   "三、和差问题。",
   "四、倍数题型。",
   "年龄问题核心点：",
   "1.一个人一年长一岁；2.年龄差不变；3.倍数",
   "关系会变。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "认识年龄差",
    "hint": "年龄差永不变"
   },
   {
    "no": 2,
    "title": "计算年龄差",
    "hint": "年龄差永不变"
   },
   {
    "no": 3,
    "title": "两人的年龄和问题",
    "hint": "每人每年长一岁"
   },
   {
    "no": 4,
    "title": "三人的年龄和问题",
    "hint": "每人每年长一岁"
   },
   {
    "no": 5,
    "title": "年龄问题中的和差问题",
    "hint": "大数=（和十差）÷2；小数=（和一差）÷2"
   },
   {
    "no": 6,
    "title": "年龄问题中的暗差问题",
    "hint": "画年龄轴"
   }
  ]
 },
 "xes_05_04": {
  "intro": "1.列竖式：两位数乘一位数，两位数乘两位数等；2.末尾含0和中间带0的乘法。",
  "summary": [
   "一、乘法的意义",
   "几个相同的数相加。",
   "二、乘法竖式",
   "1.第1个乘数写在上方，第2个乘数写在下方。",
   "注：末尾要对齐，数位要对齐。",
   "2.第2个乘数的个位、十位、百位··分别从右向左依",
   "次乘第一个乘数的各个数位,满十进一。",
   "注：个位数乘得的数和乘数的个位对齐；",
   "十位数乘得的数和乘数的十位对齐；",
   "百位数乘得的数和乘数的百位对齐。",
   "3.将得到的所有数对位相加。",
   "三、特殊数",
   "1.×10类，×100类，×1000类：栓气球法。非零数先",
   "计算,在结果后补0。",
   "2.×11类：两边一拉，中间相加，满十进一。",
   "3.特殊数组:2×5=10,4×25=100,8×125=1000。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "两位数乘一位数",
    "hint": "求几个相同加数的和，用乘法"
   },
   {
    "no": 2,
    "title": "两位数乘两位数",
    "hint": "①列竖式"
   },
   {
    "no": 3,
    "title": "走马灯数",
    "hint": "按顺序轮值一次，到第7天，结果是999999"
   },
   {
    "no": 4,
    "title": "乘法应用",
    "hint": "根据题目列算式，再计算"
   },
   {
    "no": 5,
    "title": "乘数末位含零的计算",
    "hint": "①先计算乘数中不含末尾部分的积"
   },
   {
    "no": 6,
    "title": "乘数中间带零的乘法",
    "hint": "①竖式中位数多的乘数放在上面，位数少的乘"
   }
  ]
 },
 "xes_05_10": {
  "intro": "1.简单认识分数；2.比较分数大小；3.分数加减法。",
  "summary": [
   "一、分数初识",
   "把一个整体平均分成若干份，表示其中的一份或几份",
   "的数。",
   "初步学习使用：用分数表示图形，用图形表示分数。",
   "二、分数题目类型",
   "1.分数的简单计算;",
   "2.分数的比较大小；",
   "3.分数在应用题中的应用。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "分数的认识",
    "hint": "了解什么是分数，分数如何构成，分数的写法和"
   },
   {
    "no": 2,
    "title": "看图写出分数加减算式",
    "hint": "①知道每个图形的意义"
   },
   {
    "no": 3,
    "title": "同分母分数加减法（1）",
    "hint": "分母不变，分子相加减"
   },
   {
    "no": 4,
    "title": "同分母分数加减法（2）",
    "hint": "分母不变，分子相加减"
   },
   {
    "no": 5,
    "title": "分数比较大小",
    "hint": "①分子相同，分母越小，分数越大"
   },
   {
    "no": 6,
    "title": "分数应用题",
    "hint": "理解题意，用分数加减法计算应用题"
   }
  ]
 },
 "xes_05_11": {
  "intro": "1.认识倍，简单的和倍处理；2.画线段图。",
  "summary": [
   "一、定义：已知n个数的和与倍数关系，求n个数的应",
   "用题。",
   "二、公式：两数和÷(倍数十1)=小数(一倍数)。",
   "小数×倍数=大数(n倍数)或两数和一小数=大数。",
   "三、题目类型",
   "1.整倍型。对应例题：例题1,例题2,例题5。",
   "2.非整倍型。对应例题：例题3,例题4，例题6。",
   "四、解题技巧",
   "1.找一倍数(小数)与n个数的和。",
   "2.画线段图。",
   "3.求解。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "和倍问题（整倍型）（1）",
    "hint": "画图法：一倍数=两数和÷（倍数十1）"
   },
   {
    "no": 2,
    "title": "和倍问题（整倍型）（2）",
    "hint": "画图法：一倍数=两数和÷（倍数十1）"
   },
   {
    "no": 3,
    "title": "和倍问题（非整倍型）（1）",
    "hint": "画图法：“多去少补”"
   },
   {
    "no": 4,
    "title": "和倍问题（非整倍型）（2）",
    "hint": "画图法：“多去少补”"
   },
   {
    "no": 5,
    "title": "三量和倍问题（1）",
    "hint": "画图法"
   },
   {
    "no": 6,
    "title": "三量和倍问题（2）",
    "hint": "画图法：“多去少补”"
   }
  ]
 },
 "xes_05_12": {
  "intro": "1.简单的差倍处理；2.画线段图。",
  "summary": [
   "一、定义：已知两数之差与两数倍数关系，求两数。",
   "二、公式：两数差÷(倍数一1)=小数(一倍数)。",
   "小数×倍数=大数(n倍数)或小数十差=大数。",
   "三、题目类型",
   "(1)整倍型。对应例题：例题1(基本型），例题3（同增",
   "同减差不变）,例题5(暗差型),例题3(变倍型);",
   "(2)非整倍型。对应例题：例题2(基本型），例题4（暗",
   "差型)。",
   "四、解题技巧",
   "(1)找一倍数与对应差；",
   "(2)画线段图；",
   "(3)求解。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "差倍问题（整倍型）（1）",
    "hint": "画图法：一倍数=两数差÷（倍数一1）"
   },
   {
    "no": 2,
    "title": "差倍问题（非整倍型）",
    "hint": "画图法：“多去少补”"
   },
   {
    "no": 3,
    "title": "差倍问题（整倍型）（2）",
    "hint": "画图法：同增同减差不变"
   },
   {
    "no": 4,
    "title": "差倍问题（暗差型）（1）",
    "hint": "①找到暗差"
   },
   {
    "no": 5,
    "title": "差倍问题（暗差型）（2）",
    "hint": "①找到暗差"
   },
   {
    "no": 6,
    "title": "差倍问题（变倍型）",
    "hint": "找到不变量"
   }
  ]
 },
 "xes_05_13": {
  "intro": "1.乘法运算律；2.提取公因数；3.凑整思想；4.用于凑整计算的一些特殊数。",
  "summary": [
   "一、巧算乘法的基本方法",
   "1.方法一：乘法交换律：a×b=b×α;乘法结合律：",
   "(aXb)Xc=a×(b×c)。",
   "(1)两数的乘积是整十、整百、整千的数要先乘。",
   "(2)牢记这三个特殊的等式：2×5=10,4×25=100，",
   "8×125=1000。",
   "2.方法二:乘法分配律：（α十b）×c=a×c十b×c。",
   "3.方法三：提取公因数:α×b±a×c=a×（b±c），",
   "aXb±a=aXb±a ×1=aX(b",
   "±1)。",
   "二、巧算乘法的特殊类型",
   "椅子数算法：×101,×1001,×10001。",
   "秘诀：相乘时，乘数和椅子宽度要一致，有几把椅子就",
   "重复几次。",
   "拆分时，画椅子，几个重码就画几把椅子。",
   "三、几种特殊数的巧算",
   "1.两位数与11相乘，“两头一拉，中间相加”。",
   "秘诀：两位数与11相乘，只要把这个两位数拉开，个位",
   "数字做积的个位，十位数字做积的百位，个位数字与",
   "十位数字相加做积的十位，如果满十就向百位进一。",
   "如：12×11=132。",
   "2.\"头同尾和十”，十位上的数相同，个位数字之和为十。",
   "秘诀：头×（头十1)得前两位数，尾×尾得后两位数（如",
   "果尾×尾不够两位，要添0占位，例：如果是9就要写成",
   "09)。",
   "3\"尾同头和十”，个位上的数相同，十位数字之和为十。",
   "秘诀：头×头十尾得前两位数，尾×尾得后两位（如果尾×",
   "尾不够两位数，要添0占位，例：如果是9就要写成09)。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "乘法巧算（1）",
    "hint": "乘法交换律、乘法结合律"
   },
   {
    "no": 2,
    "title": "乘法巧算（2）",
    "hint": "拆分，找能凑整的好朋友"
   },
   {
    "no": 3,
    "title": "乘法巧算（3）",
    "hint": "①乘法分配律"
   },
   {
    "no": 4,
    "title": "乘法巧算（4）",
    "hint": "提取公因数"
   },
   {
    "no": 5,
    "title": "乘法巧算（5）",
    "hint": "寻找公因数：先把接近或有倍数关系的数变型，"
   },
   {
    "no": 6,
    "title": "乘法巧算（6）",
    "hint": "①椅子数"
   }
  ]
 },
 "xes_06_13": {
  "intro": "1.等差数列的定义，公式的来源；2.通项公式，项数公式；3.求和公式，中项定理，连续奇数、连续偶数求和。",
  "summary": [
   "等差数列的相关公式",
   "1.三个重要的公式",
   "(1)通项公式：",
   "递增数列：末项首项(项数)公差,a，=a,十(n一1)×d;",
   "递减数列：末项首项(项数)公差,a，=a一(n一1)×d。",
   "(2)项数公式：项数=(末项一首项)÷公差十1。",
   "由通项公式可以得到：n=（α，一a1）÷d十1",
   "(若an>a);",
   "n=(a-an)÷d+1",
   "(若a>an）。",
   "找项数还有一种配组的方法，其中运用的思想我们是常",
   "常用到的。",
   "(3)求和公式：和=（首项十末项)×项数÷2。",
   "(4)公差=（末项一首项)÷（项数一1）。",
   "(5)首项=末项一(项数一1)×公差。",
   "2.中项定理：对于任意一个项数为奇数的等差数列，中间",
   "一项的值等于所有项的平均数，也等于首项与末项和的",
   "一半；或者换句话说，各项和等于中间项乘项数。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "等差数列求末项",
    "hint": "末项=首项十(项数一1)×公差"
   },
   {
    "no": 2,
    "title": "等差数列求项数",
    "hint": "项数=(末项一首项)÷公差十1"
   },
   {
    "no": 3,
    "title": "等差数列求和",
    "hint": "和=（首项十末项）×项数÷2"
   },
   {
    "no": 4,
    "title": "求公差",
    "hint": "公差=（末项一首项）÷（项数一1)"
   },
   {
    "no": 5,
    "title": "等差数列综合",
    "hint": "①求公差"
   },
   {
    "no": 6,
    "title": "中项定理的逆运用",
    "hint": "中间数=和÷项数（奇数个）"
   }
  ]
 },
 "xes_06_19": {
  "intro": "1.文字语言转化为数学语言；2.设单倍量、较小量为未知数；3.用未知数列方程解决实际问题。",
  "summary": [
   "一、列方程突破口",
   "1.找等量关系：谁比谁多几或少几；谁是谁的几倍。",
   "2.设未知数：方程中一般设x,未知数尽量少。",
   "二、步骤",
   "1.审：审题，找出题中已知量和未知量，找出等量关系。",
   "2.设：设未知数，多个未知量时，顺向思维找关键未知",
   "量，设为x。",
   "3.列：列方程。",
   "4.解方程。",
   "5.先检验再写答。",
   "三、题型",
   "1.直接设未知数，参考例1，例2，例3，例4。",
   "2.间接设未知数，参考例5，例6。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "直接设未知数（1）",
    "hint": "①审：审题"
   },
   {
    "no": 2,
    "title": "直接设未知数（2）",
    "hint": "①审：审题"
   },
   {
    "no": 3,
    "title": "直接设未知数（3）",
    "hint": "①审：审题"
   },
   {
    "no": 4,
    "title": "直接设未知数（4）",
    "hint": "①审：审题"
   },
   {
    "no": 5,
    "title": "间接设未知数（1）",
    "hint": "①审"
   },
   {
    "no": 6,
    "title": "间接设未知数（2）",
    "hint": "①审"
   }
  ]
 },
 "xes_07_01": {
  "intro": "检验你的预言是否正确， .简羊加注短理;统观本讲知识点，做到心中有数。有趣故事为主，用漫画的形式呈现。这里，你会看到本讲的重难点以及需要你掌握的各种能力，它会提示你，做好准备，战斗即将打响。1.简单加法原理；2.简单乘法原理；3.简单加乘原理综合问题。",
  "summary": [
   "步步相录",
   "开门见山，助你搭建知识 1.完成一件事分类情况：",
   "图层，快速建立本讲知识 2类类独立（每类都额单验定成值外事）：",
   "3.类类制期。",
   "点脉络图，做到游刃有余。乘法原理服题三部确",
   "1.完成一件事分人个必要步显:",
   "2.步步相关（每少都不能单独完成该件事）：",
   "好方法 3.乡步相康。",
   "注盘：特殊位置.特球元素优先考店。",
   "1.当你看到知识点方法",
   "后，接着扫码获取学而思",
   "一线教师的例题讲解视",
   "频。看了上面的自我介绍，想必你已经很了解我了，若",
   "2.看完视频后，你也可以",
   "重新思考下例题，“思维想将我的“洪荒之力”发挥至最大，就需要认真阅读我",
   "导图”会像智慧锦囊一样的“使用说明”了。",
   "给你提示。如果锦囊也没",
   "有帮到你，那么，勇士，使漫画中的小伙伴成为你亲密的战友。",
   "该安静下来阅读“题目详用思维导图武装你的头脑。",
   "解”了，当你觉得还有某说出内心最深处的想法。",
   "些知识点没理解清楚，也",
   "可重新观看视频。为了留明白名师点拨的锦囊妙计。",
   "存你的收获，本书留有学",
   "习笔记这一栏，可随时记闯关前，先制定一个小目标。首先，一年有五十多周，",
   "下你的学习秘籍。每本书包含近二十讲，一个年级两本共约四十讲，这样，",
   "3.打败例题，掌握妙招后，一周一讲，时间充裕，寒暑假更可以高效地学习，当量",
   "会有对应的练习题帮助你的积累达到一定程度后，便会有质的飞越，你的知识宝",
   "提高经验值。记住，你可藏也会累积成山，那时自信的你已经稳操胜券了。接下来，",
   "以！看清时间，做好记录，我们的挑战即将拉开惟幕！",
   "人物介绍",
   "CHARACTERSINTRODUCTION",
   "牛牛",
   "运动冠军的实力担当，活泼爱动，平时总喜欢犯点小",
   "错，不过能及时改正，偶尔会帮些倒忙，不过一直坚",
   "持乐于助人。",
   "丁丁",
   "同学们眼中的超级学霸。小小年纪，充满智慧，偶",
   "尔好为人师，总能将不同类型的难题分分钟解决。",
   "田田",
   "乐乐老师的得力小助手，时而有身为学霸的聪明机智，",
   "时而有作为女生的可爱乖巧，同学们都很喜欢她哦。",
   "阿普",
   "来自外星的小恐龙机器人，智商在线的时候喜欢以搞",
   "怪捉弄小朋友，智商不在线的时候就只剩下呆萌喽。",
   "乐乐老师",
   "善良与智慧的化身，是小朋友最可爱和最亲密的伙伴，",
   "亦师亦友，善于引导小朋友走进知识的世界，使他们",
   "感受到知识的神秘和有趣。",
   "前言",
   "嗨，大家好，我的名字是《学而思秘籍·小学数学思维培养》。当你看到这里的",
   "时候，说明你已经对我很感兴趣了。封面是不是很漂亮？当然，这只是我帅气的外衣，",
   "如优秀的王子一样，若想更多地了解我，请仔细阅读下面的介绍。",
   "我的出世",
   "我的“爸爸”“妈妈”是学而思非常优秀的教研老师，有着扎实的教学功底，他",
   "们经过反复地推敲和修订才有了我的横空出世。",
   "我的小伙伴们",
   "他们会在每讲的前面和大家见面，有睿智的乐乐老师、聪明的丁丁、机智的田田、",
   "倔强的牛牛以及憨厚的机器人阿普，他们可都是些骄傲的存在呢。",
   "我的优点",
   "提到优点，请多给我些时间，给大家一一道来。",
   "我的优点有：1.知识导引l，2.知识点梳理，3.好方法，4.举一反三，5.挑战自我。",
   "到游刃有余。",
   "好方法一—当你看到知识点方法后，接着扫码获取学而思一线教师的例题讲解视",
   "频。看完视频后，你也可以重新思考下例题，例题都会搭配思维导图；其次，所有题",
   "目都有详细解析；最后，本书留有学习笔记这一栏，可随时记下你的学习秘籍。",
   "一、加法原理解题三部曲",
   "1.完成一件事分k类情况；",
   "2.类类独立(每类都能单独完成该件事)；",
   "3.类类相加。",
   "二、乘法原理解题三部曲",
   "1.完成一件事分k个必要步骤；",
   "2.步步相关(每步都不能单独完成该件事)；",
   "3.步步相乘。",
   "注意：特殊位置，特殊元素优先考虑。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "乘法原理（1）",
    "hint": "乘法分步，步步相乘"
   },
   {
    "no": 2,
    "title": "乘法原理（2）",
    "hint": "乘法分步，步步相乘"
   },
   {
    "no": 3,
    "title": "排队问题",
    "hint": "特殊位置优先考虑"
   },
   {
    "no": 4,
    "title": "组数问题",
    "hint": "①数字能否重复"
   },
   {
    "no": 5,
    "title": "信号问题",
    "hint": "先分类，再分步"
   },
   {
    "no": 6,
    "title": "加乘原理",
    "hint": "先分类，再分步"
   }
  ]
 },
 "xes_07_06": {
  "intro": "1.简单相遇问题；2.画图方法渗透。",
  "summary": [
   "一、方向：相向而行或者背向而行。",
   "二、路程和=甲走的路程十乙走的路程",
   "=甲的速度×相遇时间十乙的速度×相遇时间",
   "三（甲的速度十乙的速度)×相遇时间",
   "=速度和×相遇时间。",
   "三、对于不同时间点出发的行程题，解题基本有两个思路：",
   "1.看一个人，找出此人行走的时间、速度、路程；",
   "2.看相同的一段时间内两人合走的路程，将不同时出",
   "发的问题变成同时出发的问题。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "相遇问题基本公式（1）",
    "hint": "①路程和=速度和×相遇时间"
   },
   {
    "no": 2,
    "title": "相遇问题基本公式（2）",
    "hint": "速度和=路程和÷相遇时间"
   },
   {
    "no": 3,
    "title": "相遇后继续走",
    "hint": "两次“相距”，一次是相遇前，一次是相遇后"
   },
   {
    "no": 4,
    "title": "不同时出发（1）",
    "hint": "注意甲、乙走的时间不同"
   },
   {
    "no": 5,
    "title": "不同时出发（2）",
    "hint": "注意甲、乙走的时间不同"
   },
   {
    "no": 6,
    "title": "多次相遇问题",
    "hint": "①画线段图"
   }
  ]
 },
 "xes_07_07": {
  "intro": "1.简单追及问题；2.画图方法渗透。",
  "summary": [
   "一、追及问题的实质：在相同时间里快的比慢的多走了一",
   "段路程。",
   "路程差：即相同时间多走的路程；",
   "速度差：单位时间内快比慢多走的；",
   "追及时间：即相同时间。",
   "路程差=速度差×追及时间。",
   "二、追及问题中的化归思想",
   "1.将不同时变成同时出发，找“同时间段”；",
   "2.将两个人变成一个人，先看一个人，再看另一人。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "追及问题基本公式（1）",
    "hint": "追及时间=路程差÷速度差"
   },
   {
    "no": 2,
    "title": "追及问题基本公式（2）",
    "hint": "速度差=路程差÷追及时间"
   },
   {
    "no": 3,
    "title": "不同时出发的追及问题（1）",
    "hint": "速度差=路程差÷追及时间"
   },
   {
    "no": 4,
    "title": "不同时出发的追及问题（2）",
    "hint": "注意甲、乙走的时间不同"
   },
   {
    "no": 5,
    "title": "判断相遇位置",
    "hint": "根据速度大小关系判断相遇位置"
   },
   {
    "no": 6,
    "title": "复杂的追及问题",
    "hint": "理解题目中的路程差、速度差和追及时间"
   }
  ]
 },
 "xes_07_14": {
  "intro": "1.平行线间的等积原理；2.等底等高的三角形。",
  "summary": [
   "一、三角形面积=底×高÷2。",
   "二、等高：面积的倍数关系=底的倍数关系；等底：面积的",
   "倍数关系=高的倍数关系；等底等高：面积相等。",
   "因为AD平行于BC，所以S△ABC=S△DBC，S△ADB=",
   "S△ADc（等底等高）,S△AOB=S△DOC（差不变）。",
   "三、几个正方形并排放",
   "作辅助线常用的方法：连接同向的对角线。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "等积变形（1）",
    "hint": "等底等高：面积相等"
   },
   {
    "no": 2,
    "title": "等积变形（2）",
    "hint": "等底等高：面积相等"
   },
   {
    "no": 3,
    "title": "等积变形（3）",
    "hint": "等底等高：面积相等"
   },
   {
    "no": 4,
    "title": "等积变形（4）",
    "hint": "构造等高"
   },
   {
    "no": 5,
    "title": "正方形的等积变形（1）",
    "hint": "连接同向的对角线"
   },
   {
    "no": 6,
    "title": "正方形的等积变形（2）",
    "hint": "连接同向的对角线"
   }
  ]
 },
 "xes_08_13": {
  "intro": "1.简单抽屉原理;2.极端思想；3.构造简单抽屉。",
  "summary": [
   "一、抽屉原理",
   "简单抽屉原理：苹果数÷抽屉数=1....1",
   "复杂抽屉原理：苹果数÷抽屉数=商.···1",
   "结论：至少有1个抽屉中放下了不少于（商十1)个",
   "苹果。",
   "例1、2方法：寻找“苹果\"和“抽屉”。",
   "二、抽屉原理的应用",
   "例3、4、5方法：构造抽屉",
   "苹果数=抽屉数×商十1",
   "三、最不利原则",
   "最倒霉的情况加1即是答案。"
  ],
  "methods": [
   {
    "no": 1,
    "title": "简单抽屉原理（1）",
    "hint": "①苹果数÷抽屉数=商·……·1"
   },
   {
    "no": 2,
    "title": "简单抽屉原理（2）",
    "hint": "①苹果数÷抽屉数=商..···1"
   },
   {
    "no": 3,
    "title": "构造抽屉（1）",
    "hint": "①构造“苹果”和“抽屉”"
   },
   {
    "no": 4,
    "title": "构造抽屉（2）",
    "hint": "①构造“苹果”和“抽屉”"
   },
   {
    "no": 5,
    "title": "构造抽屉（3）",
    "hint": "构造“苹果”和“抽屉”"
   },
   {
    "no": 6,
    "title": "最不利原则",
    "hint": "保证=“最倒霉”+1"
   }
  ]
 },
 "xes_09_09": {
  "intro": "1.比和比例定义；2.正比和反比；3.比例方程；4.其他模块的比例表示。",
  "summary": [
   "一、比的意义：表示两个数的相除关系。",
   "1.3：2=3÷2=",
   "2.比的性质：比的前项和后项同时乘或者除以相同的数(0除外)，",
   "比值不变。",
   "例：20：48=（20÷4）：（48÷4)=5：12。",
   "3.最简整数比：比的前项和后项都为整数且互质，这样的比为最简",
   "整数比。",
   "1.“比例”的意义：表示两个比相等的式子叫做比例。组成比例的四",
   "个数，叫做比例的项。",
   "24:16",
   "内项",
   "外项",
   "2.比例性质：在比例中，内项之积等于外项之积。",
   "3.比与比例的区别：",
   "比 VS 比例",
   "两个数相除的关系两组比相等的关系",
   "正比例 VS 反比例",
   "y÷x=k(一定) x×y=k(一定)",
   "4.组比例",
   "aXb=cXd",
   "a:c=d:b",
   "c:a=b:d",
   "b:c=d:a",
   "c:b=a:d"
  ],
  "methods": [
   {
    "no": 1,
    "title": "最简整数比",
    "hint": "比的前项和后项都为整数且互质"
   },
   {
    "no": 2,
    "title": "比例性质",
    "hint": "内项积=外项积"
   },
   {
    "no": 3,
    "title": "解比例方程",
    "hint": "内项积=外项积"
   },
   {
    "no": 4,
    "title": "比例应用题（1）",
    "hint": "按比分配"
   },
   {
    "no": 5,
    "title": "比例应用题（2）",
    "hint": "统一单位“1”"
   },
   {
    "no": 6,
    "title": "比例应用题（3）",
    "hint": "找不变量，化连比"
   }
  ]
 }
};

const xesOcrMeta = {"generated":"2026-11-04","lectures":["1-16","2-8","3-4","3-14","4-2","4-6","4-12","4-16","5-4","5-10","5-11","5-12","5-13","6-13","6-19","7-1","7-6","7-7","7-14","8-13","9-9"],"problems":525,"withAnswer":394,"byType":{"example":126,"practice":252,"challenge":126,"peak":21}};

function xesProblemsForLecture(lectureId) { return xesProblems.filter(p => p.lecture === lectureId); }
function xesHasProblems(lectureId) { return xesProblems.some(p => p.lecture === lectureId); }
