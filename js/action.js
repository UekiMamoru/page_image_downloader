(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function n(n){e(1,arguments);var a=Object.prototype.toString.call(n);return n instanceof Date||"object"===t(n)&&"[object Date]"===a?new Date(n.getTime()):"number"==typeof n||"[object Number]"===a?new Date(n):("string"!=typeof n&&"[object String]"!==a||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function a(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function r(t){e(1,arguments);var a=n(t),r=a.getUTCDay(),i=(r<1?7:0)+r-1;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function i(t){e(1,arguments);var a=n(t),i=a.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(i+1,0,4),o.setUTCHours(0,0,0,0);var u=r(o),d=new Date(0);d.setUTCFullYear(i,0,4),d.setUTCHours(0,0,0,0);var s=r(d);return a.getTime()>=u.getTime()?i+1:a.getTime()>=s.getTime()?i:i-1}var o={};function u(){return o}function d(t,r){var i,o,d,s,l,c,m,h;e(1,arguments);var f=u(),g=a(null!==(i=null!==(o=null!==(d=null!==(s=null==r?void 0:r.weekStartsOn)&&void 0!==s?s:null==r||null===(l=r.locale)||void 0===l||null===(c=l.options)||void 0===c?void 0:c.weekStartsOn)&&void 0!==d?d:f.weekStartsOn)&&void 0!==o?o:null===(m=f.locale)||void 0===m||null===(h=m.options)||void 0===h?void 0:h.weekStartsOn)&&void 0!==i?i:0);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var v=n(t),w=v.getUTCDay(),y=(w<g?7:0)+w-g;return v.setUTCDate(v.getUTCDate()-y),v.setUTCHours(0,0,0,0),v}function s(t,r){var i,o,s,l,c,m,h,f;e(1,arguments);var g=n(t),v=g.getUTCFullYear(),w=u(),y=a(null!==(i=null!==(o=null!==(s=null!==(l=null==r?void 0:r.firstWeekContainsDate)&&void 0!==l?l:null==r||null===(c=r.locale)||void 0===c||null===(m=c.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==s?s:w.firstWeekContainsDate)&&void 0!==o?o:null===(h=w.locale)||void 0===h||null===(f=h.options)||void 0===f?void 0:f.firstWeekContainsDate)&&void 0!==i?i:1);if(!(y>=1&&y<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var b=new Date(0);b.setUTCFullYear(v+1,0,y),b.setUTCHours(0,0,0,0);var p=d(b,r),T=new Date(0);T.setUTCFullYear(v,0,y),T.setUTCHours(0,0,0,0);var C=d(T,r);return g.getTime()>=p.getTime()?v+1:g.getTime()>=C.getTime()?v:v-1}function l(t,e){for(var n=t<0?"-":"",a=Math.abs(t).toString();a.length<e;)a="0"+a;return n+a}const c=function(t,e){var n=t.getUTCFullYear(),a=n>0?n:1-n;return l("yy"===e?a%100:a,e.length)},m=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):l(n+1,2)},h=function(t,e){return l(t.getUTCDate(),e.length)},f=function(t,e){return l(t.getUTCHours()%12||12,e.length)},g=function(t,e){return l(t.getUTCHours(),e.length)},v=function(t,e){return l(t.getUTCMinutes(),e.length)},w=function(t,e){return l(t.getUTCSeconds(),e.length)},y=function(t,e){var n=e.length,a=t.getUTCMilliseconds();return l(Math.floor(a*Math.pow(10,n-3)),e.length)};var b={G:function(t,e,n){var a=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var a=t.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return c(t,e)},Y:function(t,e,n,a){var r=s(t,a),i=r>0?r:1-r;return"YY"===e?l(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):l(i,e.length)},R:function(t,e){return l(i(t),e.length)},u:function(t,e){return l(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return l(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return l(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){var a=t.getUTCMonth();switch(e){case"M":case"MM":return m(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){var a=t.getUTCMonth();switch(e){case"L":return String(a+1);case"LL":return l(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,r,i,o){var c=function(t,r){e(1,arguments);var i=n(t),o=d(i,r).getTime()-function(t,n){var r,i,o,l,c,m,h,f;e(1,arguments);var g=u(),v=a(null!==(r=null!==(i=null!==(o=null!==(l=null==n?void 0:n.firstWeekContainsDate)&&void 0!==l?l:null==n||null===(c=n.locale)||void 0===c||null===(m=c.options)||void 0===m?void 0:m.firstWeekContainsDate)&&void 0!==o?o:g.firstWeekContainsDate)&&void 0!==i?i:null===(h=g.locale)||void 0===h||null===(f=h.options)||void 0===f?void 0:f.firstWeekContainsDate)&&void 0!==r?r:1),w=s(t,n),y=new Date(0);return y.setUTCFullYear(w,0,v),y.setUTCHours(0,0,0,0),d(y,n)}(i,r).getTime();return Math.round(o/6048e5)+1}(t,o);return"wo"===r?i.ordinalNumber(c,{unit:"week"}):l(c,r.length)},I:function(t,a,o){var u=function(t){e(1,arguments);var a=n(t),o=r(a).getTime()-function(t){e(1,arguments);var n=i(t),a=new Date(0);return a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0),r(a)}(a).getTime();return Math.round(o/6048e5)+1}(t);return"Io"===a?o.ordinalNumber(u,{unit:"week"}):l(u,a.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):h(t,e)},D:function(t,a,r){var i=function(t){e(1,arguments);var a=n(t),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var i=r-a.getTime();return Math.floor(i/864e5)+1}(t);return"Do"===a?r.ordinalNumber(i,{unit:"dayOfYear"}):l(i,a.length)},E:function(t,e,n){var a=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){var r=t.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return l(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){var r=t.getUTCDay(),i=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return l(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){var a=t.getUTCDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return l(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){var a=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){var a,r=t.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){var a,r=t.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var a=t.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return f(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):g(t,e)},K:function(t,e,n){var a=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):l(a,e.length)},k:function(t,e,n){var a=t.getUTCHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):l(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):v(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):w(t,e)},S:function(t,e){return y(t,e)},X:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return T(r);case"XXXX":case"XX":return C(r);default:return C(r,":")}},x:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"x":return T(r);case"xxxx":case"xx":return C(r);default:return C(r,":")}},O:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+p(r,":");default:return"GMT"+C(r,":")}},z:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+p(r,":");default:return"GMT"+C(r,":")}},t:function(t,e,n,a){var r=a._originalDate||t;return l(Math.floor(r.getTime()/1e3),e.length)},T:function(t,e,n,a){return l((a._originalDate||t).getTime(),e.length)}};function p(t,e){var n=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),i=a%60;if(0===i)return n+String(r);var o=e||"";return n+String(r)+o+l(i,2)}function T(t,e){return t%60==0?(t>0?"-":"+")+l(Math.abs(t)/60,2):C(t,e)}function C(t,e){var n=e||"",a=t>0?"-":"+",r=Math.abs(t);return a+l(Math.floor(r/60),2)+n+l(r%60,2)}const M=b;var k=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},E=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},D={p:E,P:function(t,e){var n,a=t.match(/(P+)(p+)?/)||[],r=a[1],i=a[2];if(!i)return k(t,e);switch(r){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",k(r,e)).replace("{{time}}",E(i,e))}};const x=D;var S=["D","DD"],U=["YY","YYYY"];function P(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var L={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function W(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}var Y,O={date:W({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:W({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:W({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},A={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function N(t){return function(e,n){var a;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var r=t.defaultFormattingWidth||t.defaultWidth,i=null!=n&&n.width?String(n.width):r;a=t.formattingValues[i]||t.formattingValues[r]}else{var o=t.defaultWidth,u=null!=n&&n.width?String(n.width):t.defaultWidth;a=t.values[u]||t.values[o]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function q(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],i=e.match(r);if(!i)return null;var o,u=i[0],d=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(u))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(u))return n}(d);return o=t.valueCallback?t.valueCallback(s):s,{value:o=n.valueCallback?n.valueCallback(o):o,rest:e.slice(u.length)}}}const I={code:"en-US",formatDistance:function(t,e,n){var a,r=L[t];return a="string"==typeof r?r:1===e?r.one:r.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:O,formatRelative:function(t,e,n,a){return A[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:N({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:N({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:N({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:N({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:N({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(Y={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(Y.matchPattern);if(!n)return null;var a=n[0],r=t.match(Y.parsePattern);if(!r)return null;var i=Y.valueCallback?Y.valueCallback(r[0]):r[0];return{value:i=e.valueCallback?e.valueCallback(i):i,rest:t.slice(a.length)}}),era:q({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:q({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:q({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:q({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:q({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var B=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,H=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,z=/^'([^]*?)'?$/,F=/''/g,j=/[a-zA-Z]/;function R(r,i,o){var d,s,l,c,m,h,f,g,v,w,y,b,p,T,C,k,E,D;e(2,arguments);var L=String(i),W=u(),Y=null!==(d=null!==(s=null==o?void 0:o.locale)&&void 0!==s?s:W.locale)&&void 0!==d?d:I,O=a(null!==(l=null!==(c=null!==(m=null!==(h=null==o?void 0:o.firstWeekContainsDate)&&void 0!==h?h:null==o||null===(f=o.locale)||void 0===f||null===(g=f.options)||void 0===g?void 0:g.firstWeekContainsDate)&&void 0!==m?m:W.firstWeekContainsDate)&&void 0!==c?c:null===(v=W.locale)||void 0===v||null===(w=v.options)||void 0===w?void 0:w.firstWeekContainsDate)&&void 0!==l?l:1);if(!(O>=1&&O<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var A=a(null!==(y=null!==(b=null!==(p=null!==(T=null==o?void 0:o.weekStartsOn)&&void 0!==T?T:null==o||null===(C=o.locale)||void 0===C||null===(k=C.options)||void 0===k?void 0:k.weekStartsOn)&&void 0!==p?p:W.weekStartsOn)&&void 0!==b?b:null===(E=W.locale)||void 0===E||null===(D=E.options)||void 0===D?void 0:D.weekStartsOn)&&void 0!==y?y:0);if(!(A>=0&&A<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!Y.localize)throw new RangeError("locale must contain localize property");if(!Y.formatLong)throw new RangeError("locale must contain formatLong property");var N=n(r);if(!function(a){if(e(1,arguments),!function(n){return e(1,arguments),n instanceof Date||"object"===t(n)&&"[object Date]"===Object.prototype.toString.call(n)}(a)&&"number"!=typeof a)return!1;var r=n(a);return!isNaN(Number(r))}(N))throw new RangeError("Invalid time value");var q=function(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}(N),R=function(t,r){return e(2,arguments),function(t,r){e(2,arguments);var i=n(t).getTime(),o=a(r);return new Date(i+o)}(t,-a(r))}(N,q),Q={firstWeekContainsDate:O,weekStartsOn:A,locale:Y,_originalDate:N};return L.match(H).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,x[e])(t,Y.formatLong):t})).join("").match(B).map((function(t){if("''"===t)return"'";var e,n,a=t[0];if("'"===a)return(n=(e=t).match(z))?n[1].replace(F,"'"):e;var u,d=M[a];if(d)return null!=o&&o.useAdditionalWeekYearTokens||(u=t,-1===U.indexOf(u))||P(t,i,String(r)),null!=o&&o.useAdditionalDayOfYearTokens||!function(t){return-1!==S.indexOf(t)}(t)||P(t,i,String(r)),d(R,t,Y.localize,Q);if(a.match(j))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return t})).join("")}class Q{static get DATE_FORMAT(){return[{key:"{{yyyy}}",name:"年4桁",format:"yyyy"},{key:"{{yy}}",name:"年2桁",format:"yy"},{key:"{{MM}}",name:"月",format:"MM"},{key:"{{dd}}",name:"日",format:"dd"},{key:"{{HH}}",name:"時間(24)",format:"HH"},{key:"{{mm}}",name:"分",format:"mm"},{key:"{{ss}}",name:"秒",format:"ss"}]}static get INDEX_FORMAT(){return[{key:"{{index}}",name:"連番",format:"index"}]}constructor(t=new Date){this._date=t}replaceDate(t){let e=t;return Q.DATE_FORMAT.forEach((t=>{let n=R(this._date,t.format);e=e.replaceAll(t.key,n)})),e}replaceIndex(t,e){let n=t;return Q.INDEX_FORMAT.forEach((t=>{n=n.replaceAll(t.key,e)})),n}}(()=>{let t=[],e={};const n="multiple";let a="single";const r=document.querySelectorAll(".mode"),i=document.getElementById("modeParent"),o=document.getElementById("image-count"),u=document.getElementById("nextButton"),d=document.getElementById("height"),s=document.getElementById("width"),l=document.getElementById("changeSize"),c=document.getElementById("folder"),m=document.getElementById("file"),h=document.getElementById("fileNameTemplate");let f=0;const g=document.getElementById("imagesField"),v=document.getElementById("maxButton"),w=document.querySelector(".fixFooter .eventBtnWrap"),y=w.querySelector(".def"),b=w.querySelector(".resize");document.querySelector("#toSetting").addEventListener("click",(t=>{t.preventDefault(),chrome.tabs.create({url:chrome.runtime.getURL("option/index.html")})}));let p=[];function T(t,r){const i=document.createElement("div");i.classList.add("image-group");const o=document.createElement("canvas"),u=document.createElement("div");u.classList.add("image-group_header");const d=document.createElement("div"),s=document.createElement("img");s.setAttribute("data-mode","multiple"),s.src=`${chrome.runtime.getURL("img/check.png")}`,s.classList.add("multipleActiveImg"),d.appendChild(s),d.classList.add("canvas-wrap");const l=document.createElement("a");l.href=t,l.target="_blank",l.textContent="元画像を表示",l.addEventListener("click",(t=>{t.preventDefault(),chrome.tabs.create({url:t.target.href,active:!1})}));const c=document.createElement("div");c.textContent="元画像DL";const m=document.createElement("div");m.textContent="リサイズDL";const h=document.createElement("div");h.appendChild(c),h.appendChild(m),h.classList.add("eventBtnWrap"),h.classList.add("modeBtns"),h.setAttribute("data-mode","single");const f=document.createElement("div");f.textContent="画像クリックで選択";const g=document.createElement("div");g.appendChild(f),g.classList.add("multipleTxt"),g.setAttribute("data-mode","multiple"),g.classList.add("modeBtns");const v=document.createElement("span");v.textContent=`${r+1}.`,u.appendChild(v),u.appendChild(l),i.appendChild(u),d.appendChild(o),i.appendChild(d);const w=document.createElement("div"),y=document.createElement("div");return y.classList.add("informationTableWrapper"),w.classList.add("option-field"),i.appendChild(w),w.appendChild(h),w.appendChild(g),w.appendChild(y),y.innerHTML=E("-","-","-"),function(t){return new Promise(((e,n)=>{const a=new Image;a.src=t,a.onload=()=>e(a),a.onerror=n}))}(t).then((u=>{fetch(t).then((t=>t.blob())).then((t=>y.innerHTML=E(u.height,u.width,t.size))),i.setAttribute("data-img",t),e[t]=u,u.width,u.height;const s=Math.min(120/u.width,90/u.height);o.width=u.width*s,o.height=u.height*s,o.getContext("2d").drawImage(u,0,0,o.width,o.height),m.addEventListener("click",(()=>{C(u,r)})),c.addEventListener("click",(()=>{k(u,r)})),d.addEventListener("click",(t=>{if(a!==n)return;let e=d.closest(".image-group");e.classList.contains("selected")?e.classList.remove("selected"):e.classList.add("selected")}))})),i}function C(t,e){const n=document.createElement("canvas"),a=parseInt(d.value,10),r=parseInt(s.value,10),i=Math.min(r/t.width,a/t.height);n.width=t.width*i,n.height=t.height*i,n.getContext("2d").drawImage(t,0,0,n.width,n.height);const o=n.toDataURL("image/png");try{let t=M(m.value?m.value:"image",e+1);D(o,`${c.value?c.value+"/":""}${t}.png`)}catch(t){alert(t.message)}}function M(t,e){let n=new Q;return n.replaceIndex(n.replaceDate(t),e)}function k(t,e){const n=document.createElement("canvas");n.width=t.width,n.height=t.height,n.getContext("2d").drawImage(t,0,0,n.width,n.height);const a=n.toDataURL("image/png");let r=M(m.value?m.value:"image",e+1);D(a,`${c.value?c.value+"/":""}${r}.png`)}function E(t,e,n){return`<table class="informationTable">\n\t\t\t\t\t<thead></thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr><th>縦</th><td>${t}px</td><th>横</th><td>${e}px</td></tr>\n\t\t\t\t\t\t<tr><th colspan="2">容量</th><td colspan="2">${n}Byte</td></tr>\t\n\t\t\t\t\t</tbody></table>`}function D(t,e){chrome.downloads.download({url:t,filename:e},(function(t){chrome.runtime.lastError?console.error(chrome.runtime.lastError):console.log("Download started with ID: ",t)}))}function x(e,n){const a=Math.min(e+n,t.length);for(let n=e;n<a;n++){const e=T(t[n],n);g.appendChild(e)}f=a,u.textContent=`次の${Math.min(10,t.length-a)}件を表示`,f>=t.length&&(u.style.display="none",v.style.display="none")}(async function(t="get",e=[]){return await chrome.runtime.sendMessage({fileFormats:!0,type:t,data:e})})().then((t=>{p=t,h.innerHTML=function(t=[{name:"",format:"",active:!1}]){let e="";return t.forEach((t=>{e+=`\n\t\t\t<option value="${t.format}" ${t.active?"selected":""}>${t.name}</option>\n\t\t\t`})),e}(p);let e=p.find((t=>t.active));e||(e=p[0]),e&&(m.value=e.format)})),h.addEventListener("change",(()=>{let t=h.value;m.value=t})),y.addEventListener("click",(()=>{confirm("選択画像を[ 元サイズ ]で一括ダウンロードしてよろしいですか？")&&g.querySelectorAll(".image-group").forEach(((t,n)=>{t.classList.contains("selected")&&k(e[t.getAttribute("data-img")],n)}))})),b.addEventListener("click",(()=>{confirm("選択画像を[ 指定サイズ ]でリサイズして一括ダウンロードしてよろしいですか？")&&g.querySelectorAll(".image-group").forEach(((t,n)=>{t.classList.contains("selected")&&C(e[t.getAttribute("data-img")],n)}))})),o.textContent="現在取得中...",v.addEventListener("click",(()=>{x(f,t.length-1)})),l.addEventListener("click",(()=>{g.innerHTML="",f=0,x(f,10)})),r.forEach((t=>{t.addEventListener("click",(t=>{t.target.getAttribute("data-mode")!==i.getAttribute("data-mode")&&(a=t.target.getAttribute("data-mode"),i.setAttribute("data-mode",a))}))})),chrome.runtime.sendMessage({resizeSize:!0,type:"get"}).then((t=>{let e=t.width,n=t.height;s.value=parseInt(e),d.value=parseInt(n),d.addEventListener("change",(()=>{let e=parseInt(d.value);e&&e>0&&(t.height=e,chrome.runtime.sendMessage({resizeSize:!0,type:"set",size:t}))})),s.addEventListener("change",(()=>{let e=parseInt(s.value);e&&e>0&&(t.width=e,chrome.runtime.sendMessage({resizeSize:!0,type:"set",size:t}))}))})),chrome.runtime.sendMessage({captureImg:!0}).then((e=>{t=e,g.innerHTML="",o.textContent=`開いているページで取得できた画像は${t.length}件です。`,x(f,10)})).catch((t=>{o.textContent="取得中に失敗しました"})),u.addEventListener("click",(()=>{x(f,10)}))})()})();