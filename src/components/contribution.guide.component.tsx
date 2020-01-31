import React from "react";
import { showdownConvert } from "../util";

const mdText = `
# 贡献规则
我们非常欢迎各位贡献者，一个社区的繁荣离不开每一个贡献者，为了让社区更加规范严谨，我们希望鸡汤文的贡献者在贡献鸡汤之前认真阅读以下内容。

我们遵循极简主义设计原则 Minimalist design 或者 Simplify,同样在鸡汤文的贡献中，我们再次强调Simplify这个原则，我们希望该简化的部分必须简化，不要为了一些花里胡哨的样式而做过度的装饰，在最纯粹的样式中，还原其最基本的东西，是我们优先考虑的。我们本着让用户快速的去关注焦点，例如在一张卡片中尽可能多的将一篇汤文的所有信息都包含在其中，而不是通过增加链接跳转到详情页面去阅读更多内容。

#### 网站色彩的定义
在鸡汤文贡献里面为什么要提网站设计的颜色呢？有一个原因是希望鸡汤文贡献者在贡献鸡汤的时候不要在正文中使用乱七八糟的颜色而导致与网站整体颜色风格不一致，当然这个是可选项。
+ 所有链接，按钮都使用**天空蓝**\`#007bff\`
+ 其他地方，比如背景，边框，文本，组件的背景，例如Card的背景，多以白色，黑色，灰色为主

#### 鸡汤文的贡献
+ 鸡汤文的录入使用[markdown](http://www.appinn.com/markdown/)语法录入，确保你会使用Markdown，Markdown是一种非常简单的标记语言，如果你之前没有使用过，相信学习它花费不了你三分钟的时间，不过你会喜欢上它
+ 为了版权方面的原因，在贡献鸡汤文的时候必须填入参考，原创可以注明本人原创，引用借鉴其他地方的必须填写引用来源
+ 用户不得利用网站服务制作、上载、复制、发布、传播或者转载如下内容：
    - 反对宪法所确定的基本原则的；
    - 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
    - 损害国家荣誉和利益的；
    - 煽动民族仇恨、民族歧视，破坏民族团结的；
    - 破坏国家宗教政策，宣扬邪教和封建迷信的；
    - 散布谣言，扰乱社会秩序，破坏社会稳定的；
    - 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
    - 侮辱或者诽谤他人，侵害他人合法权益的；
    - 含有法律、行政法规禁止的其他内容的信息。

#### 用户头像

我们默认调用你电子邮件对应的[全球统一头像](http://cn.gravatar.com/)，还没有全球统一头像（｀へ´）？点击链接赶紧去注册一个吧。

`;

const ContributionGuideComponent: React.FC = () => {
  return (
    <div className="contribution-guide container mt-1">
      <div className="card">
        <div
          className="card-body"
          dangerouslySetInnerHTML={{ __html: showdownConvert.makeHtml(mdText) }}
        />
      </div>
    </div>
  );
};

export default ContributionGuideComponent;