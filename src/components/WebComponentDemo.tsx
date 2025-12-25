/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createPortal } from 'react-dom';
import { useState, useRef, useEffect } from 'react';

import {
  AuthType,
  ChatType,
  Language,
  Layout,
} from '@coze-studio/open-chat/types';

// @ts-ignore - Path alias resolved by vite.config.ts and tsconfig.json
import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

import { SearchResultList, KnowledgeReferenceList } from './index';

// 内联 SVG 图标组件
const AutoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    version="1.1"
    width="24"
    height="22.362144470214844"
    viewBox="0 0 24 22.362144470214844"
    {...props}
  >
    <defs>
      <clipPath id="master_svg0_914_293841">
        <rect x="0" y="0" width="24" height="22.362144470214844" rx="0" />
      </clipPath>
      <linearGradient
        x1="0.8120714426040649"
        y1="0.152653768658638"
        x2="0.2785446269133802"
        y2="0.8947279352415982"
        id="master_svg1_931_166980"
      >
        <stop offset="0%" stopColor="#6FBEFF" stopOpacity="1" />
        <stop offset="44.38141584396362%" stopColor="#1200FF" stopOpacity="1" />
        <stop offset="100%" stopColor="#9C24F2" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g clipPath="url(#master_svg0_914_293841)">
      <g>
        <path
          d="M16.4345378125,16.749591890625C16.5197058125,16.052959890625,16.4913168125,15.345408890625,16.4214348125,14.677161890625C16.7664748125,14.528665890625,16.9848548125,14.288446890625,17.0634748125,13.947771890625C17.578851812499998,13.956507890625,18.076760812499998,13.923750890625,18.605238812499998,13.755598890625C18.1619258125,14.980710890625,17.4303528125,15.900092890625,16.4956858125,16.699365890625C16.4345378125,16.749591890625,16.4345378125,16.749591890625,16.4345378125,16.749591890625ZM10.5360846125,18.186534890624998C11.9359035125,16.529028890625,13.7462748125,15.236216890625,14.9342638125,14.500276890625C15.1024158125,14.644404890625,15.3426348125,14.777619890625,15.5675678125,14.823478890625C15.6505508125,15.635854890625,15.5915868125,16.463513890625002,15.5020538125,17.387263890625C14.3490058125,18.040221890625,13.2723904125,18.339400890625,11.9555559125,18.339400890625C11.4248919125,18.339400890625,11.0885858125,18.315379890625,10.5906787125,18.204005890624998M6.1335366125,15.314834890625C6.2558298125,14.491538890625,6.5659294125,13.113560890625,7.4481866125,11.593633690625C7.5442741125,11.615471790625,7.7167940125,11.643861790625,7.8194332125,11.643861790625C8.0334453125,11.643861790625,8.2387237125,11.617654790625,8.415611312500001,11.495363190625C9.8787594125,12.576345490625,11.8245277125,13.443315890625,14.3511888125,13.753415890625C12.8050556125,14.500277890625,10.8876762125,15.919748890625,9.5009613125,17.891723890625002C8.1011429125,17.374162890625,7.070387612499999,16.603278890625,6.201233912499999,15.393451890625M5.4696610125,8.333214790625C5.6836734125,8.767791790625001,5.982855112499999,9.272250190625,6.5178869125,9.719929690625001C6.4501891125,9.923023190624999,6.4174318125,10.099911690625,6.4174318125,10.263696690625C6.4174318125,10.571613290624999,6.493865012500001,10.901368590625001,6.703510312500001,11.115380290625C6.0025091125,12.126481090625,5.6334464125,13.264243890625,5.4718451125000005,14.157416890625C5.0460033125,13.279529890625,4.8472772125,12.246590590625,4.8472772125,11.228937190625C4.8472772125,10.211284190625001,5.0656575125,9.243860290625001,5.4543747125,8.368154490624999C5.4521904125,8.370339390625,5.4281685125,8.407464490625,5.4696610125,8.333214790625ZM8.926621412500001,4.810739990625C9.378668812499999,5.053142090625,10.0141554125,5.437491690625,10.7260756125,5.992177490625C10.6518264125,6.1559629906249995,10.6103344125,6.339401990624999,10.6103344125,6.529393190625C10.6103344125,6.636399790625,10.6256208125,6.739038490625,10.6518264125,6.841677190625C9.6953201125,7.507737190625,8.9309893125,8.206554390625,8.2736645125,8.959966190625C8.1382685125,8.911922490624999,7.9198885125,8.861694290625,7.7670221125,8.861694290625C7.5246198125,8.861694290625,7.2734823125000005,8.927208890625,7.0791235125,9.040766690625C6.6292605125,8.604006790625,6.1815805125,7.876800490625,5.961016212500001,7.431303990625C6.6794877125,6.278256190625,7.6905885125,5.395999390625001,8.926621412500001,4.810739990625ZM14.9539208125,4.795453590625C14.2048748125,5.0247530906249995,13.5060577125,5.286809490625,12.8662033125,5.5816230906249995C12.6259851125,5.347955690625,12.3005981125,5.2016410906249995,11.9380875125,5.2016410906249995C11.7218904125,5.2016410906249995,11.5690241125,5.236582290625,11.3877678125,5.328301890625C10.8985972125,4.9417686906250005,10.4640193125,4.629484890625,10.0665665125,4.384898890625C10.6911363125,4.205826990625,11.2742100125,4.125026490625,11.9555569125,4.125026490625C13.0299873125,4.125025790625,14.0432738125,4.369611990625,14.9539208125,4.795453590625ZM9.0358119125,9.508100490625C9.6407251125,8.822387190625001,10.3155208125,8.228392090625,11.186858212499999,7.616927190625C11.4096060125,7.785080390625,11.6389055125,7.857145290625,11.9402704125,7.857145290625C12.1564674125,7.857145290625,12.3158846125,7.820020690625,12.4971409125,7.728301490625C13.5104256125,8.890084790625,14.5389968125,10.366335890624999,15.1067868125,12.294633890625C14.8469118125,12.406007790625,14.6612878125,12.615652990625,14.5761208125,12.868974690625C12.2197971125,12.598182690625,10.4509163125,11.742133090625,9.0773044125,10.752868690625C9.1624727125,10.593451490625,9.186494812500001,10.455872490625,9.186494812500001,10.263696690625C9.186494812500001,10.008192090625,9.1253486125,9.778891990624999,9.0008716125,9.575799490625M19.0682048125,11.231121990625C19.0682048125,11.746498090625,19.0572848125,12.237855890625,18.9175218125,12.696453090625C18.3693848125,12.871157690625,17.7273488125,13.024024890625,17.0765748125,13.024024890625C16.9346278125,12.539218890625,16.4847658125,12.141765590625,16.017430812500002,12.133031890625C15.6068758125,10.036580990625,14.3511888125,8.234943390625,13.1675663125,7.031667190625C13.2396326125,6.867882290624999,13.2680206125,6.7193836906249995,13.2680206125,6.529392290625C13.2680206125,6.476981590625,13.2592850125,6.428937690625,13.2527342125,6.378710490625C14.0782128125,5.996545290625,14.9975948125,5.666790490625,16.0217968125,5.406918090625C17.8605598125,6.693178190625,19.0682048125,8.822387190625001,19.0682048125,11.231121990625ZM11.9577398125,2.980712890625C7.3914070125,2.980712890625,3.6767578125,6.684443190625,3.6767578125,11.235488890625C3.6767578125,15.786536890625,7.3914070125,19.490264890625,11.9577398125,19.490264890625C16.5240738125,19.490264890625,20.2387218125,15.786536890625,20.2387218125,11.235488890625C20.2387218125,6.684443190625,16.524072812500002,2.980712890625,11.9577398125,2.980712890625Z"
          fill="url(#master_svg1_931_166980)"
          fillOpacity="1"
        />
      </g>
    </g>
  </svg>
);

const EnableIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    version="1.1"
    width="24"
    height="22.362144470214844"
    viewBox="0 0 24 22.362144470214844"
    {...props}
  >
    <defs>
      <clipPath id="master_svg0_914_293848">
        <rect x="0" y="0" width="24" height="22.362144470214844" rx="0" />
      </clipPath>
    </defs>
    <g clipPath="url(#master_svg0_914_293848)">
      <g>
        <path
          d="M16.4345378125,16.74983603125C16.5197058125,16.05320403125,16.4913168125,15.34565303125,16.4214348125,14.67740603125C16.7664748125,14.52891003125,16.9848548125,14.28869103125,17.0634748125,13.94801603125C17.578851812499998,13.95675203125,18.076760812499998,13.92399503125,18.605238812499998,13.75584303125C18.1619258125,14.98095503125,17.4303528125,15.90033703125,16.4956858125,16.69961003125C16.4345378125,16.74983603125,16.4345378125,16.74983603125,16.4345378125,16.74983603125ZM10.5360846125,18.186779031249998C11.9359035125,16.52927303125,13.7462748125,15.23646103125,14.9342638125,14.50052103125C15.1024158125,14.64464903125,15.3426348125,14.77786403125,15.5675678125,14.82372303125C15.6505508125,15.63609903125,15.5915868125,16.463758031250002,15.5020538125,17.38750803125C14.3490058125,18.04046603125,13.2723904125,18.33964503125,11.9555559125,18.33964503125C11.4248919125,18.33964503125,11.0885858125,18.31562403125,10.5906787125,18.204250031249998M6.1335366125,15.31507903125C6.2558298125,14.49178303125,6.5659294125,13.11380503125,7.4481866125,11.59387783125C7.5442741125,11.61571593125,7.7167940125,11.64410593125,7.8194332125,11.64410593125C8.0334453125,11.64410593125,8.2387237125,11.61789893125,8.415611312500001,11.49560733125C9.8787594125,12.57658963125,11.8245277125,13.44356003125,14.3511888125,13.75366003125C12.8050556125,14.50052203125,10.8876762125,15.91999303125,9.5009613125,17.891968031250002C8.1011429125,17.37440703125,7.070387612499999,16.60352303125,6.201233912499999,15.39369603125M5.4696610125,8.33345893125C5.6836734125,8.768035931250001,5.982855112499999,9.27249433125,6.5178869125,9.720173831250001C6.4501891125,9.923267331249999,6.4174318125,10.10015583125,6.4174318125,10.26394083125C6.4174318125,10.571857431249999,6.493865012500001,10.901612731250001,6.703510312500001,11.11562443125C6.0025091125,12.12672523125,5.6334464125,13.26448803125,5.4718451125000005,14.15766103125C5.0460033125,13.27977403125,4.8472772125,12.24683473125,4.8472772125,11.22918133125C4.8472772125,10.211528331250001,5.0656575125,9.244104431250001,5.4543747125,8.368398631249999C5.4521904125,8.37058353125,5.4281685125,8.40770863125,5.4696610125,8.33345893125ZM8.926621412500001,4.81098413125C9.378668812499999,5.05338623125,10.0141554125,5.43773583125,10.7260756125,5.99242163125C10.6518264125,6.1562071312499995,10.6103344125,6.339646131249999,10.6103344125,6.52963733125C10.6103344125,6.63664393125,10.6256208125,6.73928263125,10.6518264125,6.84192133125C9.6953201125,7.50798133125,8.9309893125,8.20679853125,8.2736645125,8.96021033125C8.1382685125,8.912166631249999,7.9198885125,8.86193843125,7.7670221125,8.86193843125C7.5246198125,8.86193843125,7.2734823125000005,8.92745303125,7.0791235125,9.04101083125C6.6292605125,8.60425093125,6.1815805125,7.87704463125,5.961016212500001,7.43154813125C6.6794877125,6.27850033125,7.6905885125,5.396243531250001,8.926621412500001,4.81098413125ZM14.9539208125,4.79569773125C14.2048748125,5.0249972312499995,13.5060577125,5.28705363125,12.8662033125,5.5818672312499995C12.6259851125,5.34819983125,12.3005981125,5.2018852312499995,11.9380875125,5.2018852312499995C11.7218904125,5.2018852312499995,11.5690241125,5.23682643125,11.3877678125,5.32854603125C10.8985972125,4.9420128312500005,10.4640193125,4.62972903125,10.0665665125,4.38514303125C10.6911363125,4.20607113125,11.2742100125,4.12527063125,11.9555569125,4.12527063125C13.0299873125,4.12526993125,14.0432738125,4.36985613125,14.9539208125,4.79569773125ZM9.0358119125,9.50834463125C9.6407251125,8.822631331250001,10.3155208125,8.22863623125,11.186858212499999,7.61717133125C11.4096060125,7.78532453125,11.6389055125,7.85738943125,11.9402704125,7.85738943125C12.1564674125,7.85738943125,12.3158846125,7.82026483125,12.4971409125,7.72854563125C13.5104256125,8.89032893125,14.5389968125,10.366580031249999,15.1067868125,12.29487803125C14.8469118125,12.40625193125,14.6612878125,12.61589713125,14.5761208125,12.86921883125C12.2197971125,12.59842683125,10.4509163125,11.74237723125,9.0773044125,10.75311283125C9.1624727125,10.59369563125,9.186494812500001,10.45611663125,9.186494812500001,10.26394083125C9.186494812500001,10.00843623125,9.1253486125,9.779136131249999,9.0008716125,9.57604363125M19.0682048125,11.23136613125C19.0682048125,11.74674223125,19.0572848125,12.23810003125,18.9175218125,12.69669723125C18.3693848125,12.87140183125,17.7273488125,13.02426903125,17.0765748125,13.02426903125C16.9346278125,12.53946303125,16.4847658125,12.14200973125,16.017430812500002,12.13327603125C15.6068758125,10.03682513125,14.3511888125,8.23518753125,13.1675663125,7.03191133125C13.2396326125,6.868126431249999,13.2680206125,6.7196278312499995,13.2680206125,6.52963643125C13.2680206125,6.47722573125,13.2592850125,6.42918183125,13.2527342125,6.37895463125C14.0782128125,5.99678943125,14.9975948125,5.66703463125,16.0217968125,5.40716223125C17.8605598125,6.69342233125,19.0682048125,8.822631331250001,19.0682048125,11.23136613125ZM11.9577398125,2.98095703125C7.3914070125,2.98095703125,3.6767578125,6.68468733125,3.6767578125,11.23573303125C3.6767578125,15.78678103125,7.3914070125,19.49050903125,11.9577398125,19.49050903125C16.5240738125,19.49050903125,20.2387218125,15.78678103125,20.2387218125,11.23573303125C20.2387218125,6.68468733125,16.524072812500002,2.98095703125,11.9577398125,2.98095703125Z"
          fill="#9C24F2"
          fillOpacity="1"
        />
      </g>
    </g>
  </svg>
);

const DisableIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="22.362144"
    viewBox="0 0 24 22.36214447"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <clipPath id="a">
      <path d="m0 0h24v22.362144h-24z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path
        d="m16.43453781 16.74983603c.085168-.696632.056779-1.404183-.013103-2.07243.34504-.148496.56342-.388715.64204-.72939.515377.008736 1.013286-.024021 1.541764-.192173-.443313 1.225112-1.174886 2.144494-2.109553 2.943767-.061148.050226-.061148.050226-.061148.050226zm-5.8984532 1.436943c1.3998189-1.657506 3.2101902-2.950318 4.3981792-3.686258.168152.144128.408371.277343.633304.323202.082983.812376.024019 1.640035-.065514 2.563785-1.153048.652958-2.2296634.952137-3.5464979.952137-.530664 0-.8669701-.024021-1.3648772-.135395m-4.4571421-2.889171c.1222932-.823296.4323928-2.201274 1.31465-3.7212012.0960875.0218381.2686074.0502281.3712466.0502281.2140121 0 .4192905-.026207.5961781-.1484986 1.4631481 1.0809823 3.4089164 1.9479527 5.9355775 2.2580527-1.5461332.746862-3.4635126 2.166333-4.8502275 4.138308-1.3998184-.517561-2.4305737-1.288445-3.2997274-2.498272m-.7315729-7.0602371c.2140124.434577.5131941.9390354 1.0482259 1.3867149-.0676978.2030935-.1004551.379982-.1004551.543767 0 .3079166.0764332.6376719.2860785.8516836-.7010012 1.0111008-1.0700639 2.1488636-1.2316652 3.0420366-.4258418-.877887-.6245679-1.9108263-.6245679-2.9284797 0-1.017653.2183803-1.9850769.6070975-2.8607827-.0021843.0021849-.0262062.03931.0152863-.0349397zm3.4569604-3.5224748c.4520474.2424021 1.087534.6267517 1.7994542 1.1814375-.0742492.1637855-.1157412.3472245-.1157412.5372157 0 .1070066.0152864.2096453.041492.312284-.9565063.66606-1.7208371 1.3648772-2.3781619 2.118289-.135396-.0480437-.353776-.0982719-.5066424-.0982719-.2424023 0-.4935398.0655146-.6878986.1790724-.449863-.4367599-.897543-1.1639662-1.1181073-1.6094627.7184715-1.1530478 1.7295723-2.0353046 2.9656052-2.620564zm6.0272994-.0152864c-.749046.2292995-1.4478631.4913559-2.0877175.7861695-.2402182-.2336674-.5656052-.379982-.9281158-.379982-.2161971 0-.3690634.0349412-.5503197.1266608-.4891706-.3865332-.9237485-.698817-1.3212013-.943403.6245698-.1790719 1.2076435-.2598724 1.8889904-.2598724 1.0744304-.0000007 2.0877169.2445855 2.9983639.6704271zm-5.9181089 4.7126469c.6049132-.6857133 1.2797089-1.2797084 2.1510463-1.8911733.2227478.1681532.4520473.2402181.7534122.2402181.216197 0 .3756142-.0371246.5568705-.1288438 1.0132847 1.1617833 2.0418559 2.6380344 2.6096459 4.5663324-.259875.1113739-.445499.3210191-.530666.5743408-2.3563237-.270792-4.1252045-1.1268416-5.4988164-2.116106.0851683-.1594172.1091904-.2969962.1091904-.489172 0-.2555046-.0611462-.4848047-.1856232-.6878972m10.0673332 1.6553225c0 .5153761-.01092 1.0067339-.150683 1.4653311-.548137.1747046-1.190173.3275718-1.840947.3275718-.141947-.484806-.591809-.8822593-1.059144-.890993-.410555-2.0964509-1.666242-3.8980885-2.8498645-5.1013647.0720663-.1637849.1004543-.3122835.1004543-.5022749 0-.0524107-.0087356-.1004546-.0152864-.1506818.8254786-.3821652 1.7448606-.71192 2.7690626-.9717924 1.838763 1.2862601 3.046408 3.4154691 3.046408 5.8242039zm-7.110465-8.2504091c-4.5663328 0-8.280982 3.7037303-8.280982 8.254776 0 4.551048 3.7146492 8.254776 8.280982 8.254776 4.566334 0 8.280982-3.703728 8.280982-8.254776 0-4.5510457-3.714649-8.254776-8.280982-8.254776z"
        fill="#8c8c8c"
      />
    </g>
  </svg>
);

// ============================================================================
// 定义 Web Components
// ============================================================================

// 自定义 JsonItem Web Component
class CustomJsonItem extends HTMLElement {
  /**
   * 自定义消息渲染索引计算函数
   * @param message - 消息对象
   * @returns 渲染索引，负数表示延迟渲染（在 chat complete 后渲染），0 或正数表示正常顺序渲染
   */
  static getJSONOutputMessageRenderIndex(message: any) {
    if (!message) {
      return 0;
    }
    console.log('getJSONOutputMessageRenderIndex message', message);

    // 检查是否是 Mix 类型消息
    if (message.content_type === 'mix' && message.content_obj) {
      const mixContent = message.content_obj as {
        item_list?: Array<{ type?: string; schema_version?: string }>;
      };

      if (mixContent.item_list) {
        const isRefrence = mixContent.item_list.some(
          (item: any) =>
            item.type === 'json' &&
            item.schema_version === 'cvforce.knowledge.refrence.v1',
        );

        if (isRefrence) {
          return 9; // 负数表示在 chat complete 后渲染
        }
        // 查找是否有 schema_version 为 cvforce.search.result.v1 的 JsonMixItem
        const hasSearchResult = mixContent.item_list.some(
          (item: any) =>
            item.type === 'json' &&
            item.schema_version === 'cvforce.search.result.v1',
        );

        if (hasSearchResult) {
          return -1; // 负数表示在 chat complete 后渲染
        }
      }
    }

    return 0; // 0 表示正常顺序渲染
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[CustomJsonItem] connected');
    this.loadMarkedIfNeeded();
    this.readPropsFromDOM();
    this.render();
  }

  readPropsFromDOM() {
    if (!(this as any).schemaVersion && this.hasAttribute('schemaversion')) {
      (this as any).schemaVersion =
        this.getAttribute('schemaversion') || undefined;
    }
  }

  updateProps(props: any) {
    console.log('[CustomJsonItem] updateProps:', props);
    (this as any).data = props.data;
    (this as any).schemaVersion = props.schemaVersion;
    (this as any).message = props.message;
    this.render();
  }

  loadMarkedIfNeeded() {
    if (typeof (window as any).marked !== 'undefined') {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => {
      console.log('[CustomJsonItem] marked.js loaded');
      this.render();
    };
    document.head.appendChild(script);
  }

  renderMarkdown(text: string): string {
    if (!text) {
      return '';
    }

    const { marked } = window as any;
    if (typeof marked !== 'undefined' && marked.parse) {
      try {
        return marked.parse(text, { breaks: true, gfm: true });
      } catch (e) {
        console.error('Markdown parse error:', e);
        return this.escapeHtml(text).replace(/\n/g, '<br>');
      }
    }
    return this.escapeHtml(text).replace(/\n/g, '<br>');
  }

  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  render() {
    let { data } = this as any;
    let { schemaVersion } = this as any;

    if (schemaVersion === undefined && this.hasAttribute('schemaversion')) {
      schemaVersion = this.getAttribute('schemaversion') || undefined;
      (this as any).schemaVersion = schemaVersion;
    }

    if (data === undefined) {
      const dataProperty = (this as any).data;
      if (dataProperty !== undefined) {
        data = dataProperty;
      }
    }

    console.info('data', data);
    console.info('schemaVersion', schemaVersion);

    if (!this.shadowRoot) {
      return;
    }

    if (data === undefined && schemaVersion === undefined) {
      console.log('[CustomJsonItem] Waiting for props...');
      return;
    }
    if (schemaVersion === 'cvforce.search.result.v1') {
      this.shadowRoot.innerHTML = '<search-result-list></search-result-list>';
      const searchResultList = this.shadowRoot.querySelector(
        'search-result-list',
      ) as any;
      if (searchResultList) {
        searchResultList.setData(data);
      }
    } else if (schemaVersion === 'cvforce.knowledge.refrence.v1') {
      this.shadowRoot.innerHTML =
        '<knowledge-reference-list></knowledge-reference-list>';
      const knowledgeReferenceList = this.shadowRoot.querySelector(
        'knowledge-reference-list',
      ) as any;
      if (knowledgeReferenceList) {
        knowledgeReferenceList.setData(data);
      }
    } else {
      this.shadowRoot.innerHTML = `
        <style>
          .default-json {
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
            margin: 8px 0;
            border: 1px solid #e0e0e0;
          }
          .schema-version {
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
            font-size: 13px;
            padding: 6px 10px;
            background: white;
            border-radius: 4px;
            display: inline-block;
          }
          pre {
            margin: 8px 0 0 0;
            font-size: 12px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: #666;
            background: white;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
        <div class="default-json">
          <div class="schema-version">📋 ${schemaVersion || '未知类型'}</div>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  }
}

// 自定义 ContentBox Web Component
class CustomContentBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[CustomContentBox] connected');
    this.render();
  }

  updateProps(props: any) {
    console.log(
      '╔═══════════════════════════════════════════════════════════════╗',
    );
    console.log('║ [CustomContentBox] 接收到的完整 Props 数据');
    console.log(
      '╚═══════════════════════════════════════════════════════════════╝',
    );
    console.log(props);

    console.log('\n📝 [Message 对象详情]');
    console.log('- message:', props.message);
    console.log('  - id:', props.message?.id);
    console.log('  - role:', props.message?.role);
    console.log('  - type:', props.message?.type);
    console.log('  - content_type:', props.message?.content_type);
    console.log('  - content:', props.message?.content);
    console.log('  - content_obj:', props.message?.content_obj);

    console.log('\n⚙️ [其他配置]');
    console.log('- layout:', props.layout);
    console.log('- readonly:', props.readonly);
    console.log('- showBackground:', props.showBackground);
    console.log('- isCardDisabled:', props.isCardDisabled);
    console.log('- isContentLoading:', props.isContentLoading);

    console.log('\n🔧 [回调函数]');
    console.log('- eventCallbacks:', props.eventCallbacks);

    console.log(`\n${'═'.repeat(65)}`);

    (this as any).propsData = props;
    this.render();
  }

  render() {
    const props = (this as any).propsData;

    if (!this.shadowRoot) {
      return;
    }

    if (!props) {
      this.shadowRoot.innerHTML = `
        <style>
          .content-box {
            padding: 24px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin: 16px;
          }
          h2 {
            margin: 0 0 12px 0;
            font-size: 24px;
          }
          p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
            line-height: 1.6;
          }
          .badge {
            margin-top: 16px;
            padding: 12px;
            background: rgba(255,255,255,0.1);
            border-radius: 6px;
          }
        </style>
        <div class="content-box">
          <h2>✨ 自定义内容容器</h2>
          <p>
            这是使用 <strong>Web Component</strong> 实现的自定义内容<br>
            完全不依赖 React 技术栈 🚀
          </p>
          <div class="badge">
            <small>等待消息数据...</small>
          </div>
        </div>
      `;
      return;
    }

    const message = props.message || {};
    const messageText = message.content || '无内容';
    const role = message.role || 'unknown';
    const contentType = message.content_type || 'unknown';

    this.shadowRoot.innerHTML = `
      <style>
        .content-box {
          padding: 16px;
          background: ${
            role === 'user'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
          };
          color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          margin: 8px 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .title {
          font-weight: bold;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .badge {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
        }
        .content-text {
          background: rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 8px;
          margin: 12px 0;
          line-height: 1.6;
          font-size: 14px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .meta-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 12px;
        }
        .meta-item {
          background: rgba(255,255,255,0.1);
          padding: 8px;
          border-radius: 6px;
          font-size: 12px;
        }
        .meta-label {
          font-weight: bold;
          opacity: 0.8;
        }
        .meta-value {
          margin-top: 4px;
        }
        .json-preview {
          background: rgba(0,0,0,0.2);
          padding: 12px;
          border-radius: 6px;
          margin-top: 12px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          max-height: 200px;
          overflow: auto;
          text-align: left;
        }
      </style>
      <div class="content-box">
        <div class="header">
          <div class="title">
            ${role === 'user' ? '👤' : '🤖'}
            ${role === 'user' ? '用户消息' : 'AI 回复'}
          </div>
          <span class="badge">${contentType}</span>
        </div>

        <div class="content-text">
          ${messageText}
        </div>

        <div class="meta-info">
          <div class="meta-item">
            <div class="meta-label">🆔 Message ID</div>
            <div class="meta-value">${message.id || 'N/A'}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">📋 Type</div>
            <div class="meta-value">${message.type || 'N/A'}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">📱 Layout</div>
            <div class="meta-value">${props.layout || 'N/A'}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">🔒 Readonly</div>
            <div class="meta-value">${props.readonly ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <details style="margin-top: 12px;">
          <summary style="cursor: pointer; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 6px; font-size: 12px;">
            📊 查看完整 Props 数据 (JSON)
          </summary>
          <div class="json-preview">
            <pre>${JSON.stringify(props, null, 2)}</pre>
          </div>
        </details>

        <div style="margin-top: 12px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 6px; text-align: center; font-size: 11px;">
          💡 提示：打开浏览器控制台查看详细的 console.log 输出
        </div>
      </div>
    `;
  }
}

// 注册 Web Components
if (!customElements.get('search-result-list')) {
  customElements.define('search-result-list', SearchResultList);
  console.log('✅ Registered: search-result-list');
}

if (!customElements.get('knowledge-reference-list')) {
  customElements.define('knowledge-reference-list', KnowledgeReferenceList);
  console.log('✅ Registered: knowledge-reference-list');
}

if (!customElements.get('demo-json-item')) {
  customElements.define('demo-json-item', CustomJsonItem);
  console.log('✅ Registered: demo-json-item');
}

if (!customElements.get('demo-content-box')) {
  customElements.define('demo-content-box', CustomContentBox);
  console.log('✅ Registered: demo-content-box');
}

// ============================================================================
// React 组件 - 用于演示
// ============================================================================

const NetworkSwitch = ({
  mode,
  onChange,
}: {
  mode: NetworkSearchMode;
  onChange: (mode: NetworkSearchMode) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !(event.target as Element)?.closest('[data-network-dropdown]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const getModeText = (m: NetworkSearchMode) => {
    switch (m) {
      case 0:
        return '关闭联网搜索';
      case 1:
        return '自动联网搜索';
      case 2:
        return '必须联网搜索';
      default:
        return '联网搜索';
    }
  };

  const getModeIcon = (m: NetworkSearchMode) => {
    const iconStyle = { width: '16px', height: '16px', flexShrink: 0 };
    switch (m) {
      case 0:
        return <DisableIcon style={iconStyle} />;
      case 1:
        return <AutoIcon style={iconStyle} />;
      case 2:
        return <EnableIcon style={iconStyle} />;
      default:
        return <DisableIcon style={iconStyle} />;
    }
  };

  const options: Array<{ value: NetworkSearchMode; label: string }> = [
    { value: 0, label: '关闭联网搜索' },
    { value: 1, label: '自动联网搜索' },
    { value: 2, label: '必须联网搜索' },
  ];

  const dropdownContent =
    isOpen && dropdownPosition ? (
      <div
        data-network-dropdown
        ref={containerRef}
        style={{
          position: 'absolute',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          padding: '4px',
          minWidth: '160px',
          zIndex: 10000,
          transform: 'translateY(calc(-100% - 4px))',
        }}
      >
        {options.map(option => {
          const isSelected = mode === option.value;
          return (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#333',
                backgroundColor: isSelected
                  ? 'rgba(102, 126, 234, 0.1)'
                  : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {getModeIcon(option.value)}
              <span>{option.label}</span>
            </div>
          );
        })}
      </div>
    ) : null;

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title={getModeText(mode)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '4px',
            borderRadius: '4px',
            border: 'none',
            background: 'transparent',
            color: '#333',
            transition: 'background-color 0.2s',
            width: '24px',
            height: '24px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {getModeIcon(mode)}
        </button>
      </div>
      {dropdownContent ? createPortal(dropdownContent, document.body) : null}
    </>
  );
};

type NetworkSearchMode = 0 | 1 | 2;

const NetworkSwitchWrapper = ({
  connectNetworkRef,
  setConnectNetwork,
  clientRef,
  chatType,
}: {
  connectNetworkRef: React.MutableRefObject<number>;
  setConnectNetwork: (value: number) => void;
  clientRef: React.MutableRefObject<WebChatClient | null>;
  chatType: 'bot' | 'app';
}) => {
  const numberToMode = (value: number): NetworkSearchMode => {
    if (value === 1) {
      return 1;
    }
    if (value === 2) {
      return 2;
    }
    return 0;
  };

  const modeToNumber = (mode: NetworkSearchMode): number => mode;

  const [mode, setMode] = useState<NetworkSearchMode>(() =>
    numberToMode(connectNetworkRef.current),
  );

  useEffect(() => {
    setMode(numberToMode(connectNetworkRef.current));

    const syncInterval = setInterval(() => {
      const currentMode = numberToMode(connectNetworkRef.current);
      if (currentMode !== mode) {
        console.log('同步 ref 到 state:', currentMode);
        setMode(currentMode);
      }
    }, 100);
    return () => clearInterval(syncInterval);
  }, [mode, connectNetworkRef]);

  const handleChange = (newMode: NetworkSearchMode) => {
    console.log('NetworkSwitchWrapper onChange:', newMode);
    setMode(newMode);
    const newValue = modeToNumber(newMode);
    setConnectNetwork(newValue);
    connectNetworkRef.current = newValue;

    if (clientRef.current && chatType === 'app') {
      const currentConfig = clientRef.current.options?.config;
      if (currentConfig?.appInfo) {
        if (!currentConfig.appInfo.parameters) {
          currentConfig.appInfo.parameters = {};
        }
        if (!currentConfig.appInfo.parameters.SETTING) {
          currentConfig.appInfo.parameters.SETTING = {};
        }
        (
          currentConfig.appInfo.parameters.SETTING as Record<string, unknown>
        ).ENABLE_NETWORK = newValue;

        console.log(
          '✅ 联网搜索模式已更新:',
          newMode,
          '参数: SETTING.ENABLE_NETWORK =',
          newValue,
          '(0: 不联网；1: 自动联网；2: 必须联网)',
          '完整 parameters:',
          JSON.stringify(currentConfig.appInfo.parameters, null, 2),
        );
      }
    }
  };

  return <NetworkSwitch mode={mode} onChange={handleChange} />;
};

export const WebComponentDemo = () => {
  const [token, setToken] = useState(
    import.meta.env.VITE_CHAT_APP_COZE_TOKEN || '',
  );
  const [chatType, setChatType] = useState<'bot' | 'app'>('app');
  const [botId, setBotId] = useState(
    import.meta.env.VITE_CHAT_APP_INDEX_COZE_BOT_ID || '7445716267154833442',
  );
  const [appId, setAppId] = useState(
    import.meta.env.VITE_CHAT_APP_CHATFLOW_COZE_APP_ID || '',
  );
  const [workflowId, setWorkflowId] = useState(
    import.meta.env.VITE_CHAT_APP_CHATFLOW_COZE_WORKFLOW_ID || '',
  );
  const [draftMode, setDraftMode] = useState<string>(
    import.meta.env.VITE_CHAT_APP_DRAFT_MODE || '',
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState('');
  const [connectNetwork, setConnectNetwork] = useState<number>(0);
  const connectNetworkRef = useRef<number>(0);
  const clientRef = useRef<WebChatClient | null>(null);

  const initializeClient = () => {
    if (!window.customElements) {
      alert(
        '当前浏览器不支持 Web Components，请使用现代浏览器（Chrome 54+, Firefox 63+, Safari 10.1+）',
      );
      return;
    }

    if (!token.trim()) {
      setError('请输入访问令牌（Token）');
      return;
    }

    if (chatType === 'bot' && !botId.trim()) {
      setError('请输入 Bot ID');
      return;
    }

    if (chatType === 'app') {
      if (!appId.trim()) {
        setError('请输入 App ID');
        return;
      }
      if (!workflowId.trim()) {
        setError('请输入 Workflow ID');
        return;
      }
    }

    setError('');
    console.log('🚀 Initializing WebChatClient with Web Components...');

    try {
      const config: any = {
        type: chatType === 'app' ? ChatType.APP : undefined,
      };

      if (chatType === 'bot') {
        config.botId = botId.trim();
      } else {
        const draftModeValue =
          draftMode === 'true'
            ? true
            : draftMode === 'false'
              ? false
              : undefined;
        connectNetworkRef.current = connectNetwork;
        config.appInfo = {
          appId: appId.trim(),
          workflowId: workflowId.trim(),
          ...(draftModeValue !== undefined && { draft_mode: draftModeValue }),
          parameters: {
            SETTING: {
              ENABLE_NETWORK: connectNetwork,
            },
          },
        };
      }

      const client = new WebChatClient({
        env: 'test',
        apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
        config,
        auth: {
          type: AuthType.TOKEN,
          token: token.trim(),
          onRefreshToken: () => token.trim(),
        },
        extra: {
          webChat: {
            test: 'webcomponent-demo',
          },
        },
        ui: {
          base: {
            lang: Language.ZH_CN,
            layout: Layout.PC,
            zIndex: 1000,
          },
          asstBtn: {
            isNeed: true,
          },
          chatBot: {
            uploadable: true,
            isNeedClearContext: false,
            isNeedClearMessage: false,
            isNeedAddNewConversation: false,
            isNeedFunctionCallMessage: true,
            width: 1000,
          },
          uiKitCustomWebComponents: {
            JsonItem: 'demo-json-item',
          },
          getMessageRenderIndex: CustomJsonItem.getJSONOutputMessageRenderIndex,
          header: {
            isShow: true,
            isNeedClose: true,
          },
          conversations: {
            isNeed: true,
          },
          input: {
            renderChatInputRightActions: () => {
              if (
                connectNetworkRef.current === null ||
                connectNetworkRef.current === undefined
              ) {
                connectNetworkRef.current = connectNetwork;
              }
              console.log(
                'renderChatInputRightActions 被调用，当前 connectNetwork:',
                connectNetworkRef.current,
                '(0: 不联网；1: 自动联网；2: 必须联网)',
              );
              return (
                <NetworkSwitchWrapper
                  connectNetworkRef={connectNetworkRef}
                  setConnectNetwork={value => {
                    console.log('setConnectNetwork 被调用，新值:', value);
                    setConnectNetwork(value);
                    connectNetworkRef.current = value;
                  }}
                  clientRef={clientRef}
                  chatType={chatType}
                />
              );
            },
          },
        },
      });

      clientRef.current = client;

      setIsInitialized(true);
      console.log('✅ WebChatClient initialized with Web Components!');
    } catch (err) {
      console.error('❌ Initialization error:', err);
      setError(
        `初始化失败: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <h1 style={{ margin: '0 0 10px 0' }}>🎨 Web Components 示例</h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
          本示例展示如何使用 Web Components 自定义 chat-app-sdk 的 UIKit
          组件，完全脱离 React 技术栈
        </p>
      </div>

      {!isInitialized && (
        <div
          style={{
            background: 'white',
            border: '2px solid #667eea',
            borderRadius: '12px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ margin: '0 0 20px 0', color: '#667eea' }}>
            🔧 配置信息
          </h2>
          <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
            请输入以下信息以初始化聊天客户端
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              聊天类型<span style={{ color: 'red' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="bot"
                  checked={chatType === 'bot'}
                  onChange={e => setChatType(e.target.value as 'bot' | 'app')}
                  style={{ marginRight: '6px' }}
                />
                Bot 模式
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  value="app"
                  checked={chatType === 'app'}
                  onChange={e => setChatType(e.target.value as 'bot' | 'app')}
                  style={{ marginRight: '6px' }}
                />
                App 模式（推荐）
              </label>
            </div>
            <small
              style={{
                color: '#999',
                fontSize: '12px',
                display: 'block',
                marginTop: '6px',
              }}
            >
              Bot 模式：只需 Bot ID；App 模式：需要 App ID 和 Workflow ID
            </small>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="token-input"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              访问令牌（Token）<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="token-input"
              type="text"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="请输入您的访问令牌"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
              }}
            />
            <small style={{ color: '#999', fontSize: '12px' }}>
              从环境变量 VITE_CHAT_APP_COZE_TOKEN 读取，或手动输入
            </small>
          </div>

          {chatType === 'bot' && (
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="botid-input"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Bot ID<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="botid-input"
                type="text"
                value={botId}
                onChange={e => setBotId(e.target.value)}
                placeholder="请输入 Bot ID"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
              <small style={{ color: '#999', fontSize: '12px' }}>
                从环境变量 VITE_CHAT_APP_INDEX_COZE_BOT_ID 读取，或使用默认值
              </small>
            </div>
          )}

          {chatType === 'app' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="appid-input"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  App ID<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id="appid-input"
                  type="text"
                  value={appId}
                  onChange={e => setAppId(e.target.value)}
                  placeholder="请输入 App ID"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    boxSizing: 'border-box',
                  }}
                />
                <small style={{ color: '#999', fontSize: '12px' }}>
                  从环境变量 VITE_CHAT_APP_CHATFLOW_COZE_APP_ID 读取
                </small>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="workflowid-input"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Workflow ID<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  id="workflowid-input"
                  type="text"
                  value={workflowId}
                  onChange={e => setWorkflowId(e.target.value)}
                  placeholder="请输入 Workflow ID"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    boxSizing: 'border-box',
                  }}
                />
                <small style={{ color: '#999', fontSize: '12px' }}>
                  从环境变量 VITE_CHAT_APP_CHATFLOW_COZE_WORKFLOW_ID 读取
                </small>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="draftmode-select"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Draft Mode（草稿模式）
                </label>
                <select
                  id="draftmode-select"
                  value={draftMode}
                  onChange={e => setDraftMode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">请选择草稿模式（可选）</option>
                  <option value="true">true - 草稿（Draft）</option>
                  <option value="false">false - 发布（Online）</option>
                </select>
                <small style={{ color: '#999', fontSize: '12px' }}>
                  从环境变量 VITE_CHAT_APP_DRAFT_MODE
                  读取（可选），true=草稿，false=发布
                </small>
              </div>
            </>
          )}

          {error ? (
            <div
              style={{
                padding: '12px',
                background: '#ffe6e6',
                border: '1px solid #ff4d4f',
                borderRadius: '6px',
                color: '#d32f2f',
                marginBottom: '20px',
                fontSize: '14px',
              }}
            >
              ⚠️ {error}
            </div>
          ) : null}

          <button
            onClick={initializeClient}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🚀 初始化聊天客户端
          </button>

          <div
            style={{
              marginTop: '20px',
              padding: '12px',
              background: '#e3f2fd',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#1976d2',
            }}
          >
            💡 <strong>提示：</strong>
            如果您没有访问令牌，请到平台上获取，或者联系开发团队
          </div>
        </div>
      )}

      {isInitialized ? (
        <div
          style={{
            background: '#d4edda',
            border: '1px solid #28a745',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px',
            color: '#155724',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0' }}>✅ 初始化成功！</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            聊天客户端已成功初始化，请点击右下角的悬浮按钮打开聊天窗口。
          </p>
        </div>
      ) : null}

      {isInitialized ? (
        <div
          style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', color: '#856404' }}>
            💡 使用说明
          </h3>
          <ol
            style={{
              margin: 0,
              paddingLeft: '20px',
              color: '#856404',
              lineHeight: '1.8',
            }}
          >
            <li>点击右下角的悬浮按钮打开聊天窗口</li>
            <li>发送消息触发 Bot 响应</li>
            <li>
              如果 Bot 返回特定的 schema 数据（如搜索结果、知识库参考），将使用
              Web Components 渲染
            </li>
            <li>打开浏览器控制台查看 Web Components 的生命周期日志</li>
          </ol>
        </div>
      ) : null}

      <div
        style={{
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0' }}>📋 已注册的 Web Components</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: '2px solid #f5222d',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#f5222d',
              }}
            >
              knowledge-reference-list
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              知识库引用列表组件
              <br />
              展示知识库引用信息
            </div>
          </div>
          <div
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: '2px solid #52c41a',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#52c41a',
              }}
            >
              search-result-list
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              搜索结果列表组件
              <br />
              独立可复用的搜索结果展示
            </div>
          </div>
          <div
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: '2px solid #667eea',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#667eea',
              }}
            >
              demo-json-item
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              自定义 JsonItem 组件
              <br />
              支持多种 schema 渲染
            </div>
          </div>
          <div
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: '2px solid #764ba2',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#764ba2',
              }}
            >
              demo-content-box
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              自定义 ContentBox 组件
              <br />
              用于替换默认内容容器
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#d1ecf1',
          border: '1px solid #17a2b8',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', color: '#0c5460' }}>
          🌐 浏览器兼容性
        </h3>
        <div style={{ color: '#0c5460', fontSize: '14px', lineHeight: '1.8' }}>
          <strong>原生支持：</strong>
          <br />
          • Chrome 54+ / Edge 79+
          <br />
          • Firefox 63+
          <br />
          • Safari 10.1+
          <br />
          <br />
          <strong>当前浏览器：</strong>
          <br />
          {window.customElements ? (
            <span style={{ color: '#28a745' }}>✅ 支持 Web Components</span>
          ) : (
            <span style={{ color: '#dc3545' }}>❌ 不支持 Web Components</span>
          )}
        </div>
      </div>
    </div>
  );
};

