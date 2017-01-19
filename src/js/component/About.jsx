import React from 'react';
import Domain from '../core/Domain';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let _url = new Domain().staticUrl();
        return (
            <div className="about">
                <div className="banner">
                    <div className="font">
                        <p>ReactEasyUI由易车前端 "动感实验室"倾力打造</p>
                        <p className="small">用心做好用户体验，相信代码是优雅的舞者</p>
                    </div>
                </div>
                <div className="team">
                    <div className="des"><h3>团队成员</h3> <span>动感实验室的小伙伴们</span></div>
                    <div className="info">
                        <dl>
                            <dt><img src={_url+"images/photo1.png"} alt=""/></dt>
                            <dd><b>北北 North</b>
                                <p>一个游离在产品经理与前端工程师之间的人，努力去做前沿技术的布道者与送奶工。</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src={_url+"images/photo2.png"} alt=""/></dt>
                            <dd><b>艳艳 Katherine</b>
                                <p>前端不归路上的一名小学生。</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src={_url+"images/photo3.png"} alt=""/></dt>
                            <dd><b>流尘 Aries</b>
                                <p>一个在安逸与奋进中挣扎的菜鸟，努力去做更优秀的程序猿。</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src={_url+"images/photo4.png"} alt=""/></dt>
                            <dd><b>蕾蕾 Cathy</b>
                                <p>前端路上不断前行的蜗牛。</p>
                            </dd>
                        </dl>
                        <dl>
                            <dt><img src={_url+"images/photo5.png"} alt=""/></dt>
                            <dd><b>南小北 Lee</b>
                                <p>一个高尚的人，一个纯粹的人，一个有道德的人，一个脱离了低级趣味的人，一个有益于人民的人。</p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}