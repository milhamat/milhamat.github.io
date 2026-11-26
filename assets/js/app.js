/* =====================================================================
   milhamat.github.io — rendering, i18n, navigation, project viewer and
   PDF viewer for student-guidance documents.
   Content lives in assets/js/data.js and assets/guidance/guidance.js;
   you normally don't need to edit this file.
   ===================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  var DOCS = normalizeDocs(Array.isArray(window.GUIDANCE) ? window.GUIDANCE : []);
  var PDFJS_BASE = new URL("assets/vendor/pdfjs/", document.baseURI).href;
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }

  /* Inline SVG icons (Bootstrap Icons, MIT) — no icon font needed */
  var ICONS = {"github":["M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"],"linkedin":["M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"],"envelope":["M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"],"download":["M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5","M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"],"file-earmark-pdf":["M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z","M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"],"list":["M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5|evenodd"],"x-lg":["M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"],"arrow-down":["M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1|evenodd"],"arrow-up":["M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5|evenodd"],"geo-alt":["M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10","M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"],"chevron-right":["M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708|evenodd"],"chevron-left":["M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0|evenodd"],"chevron-down":["M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708|evenodd"],"chevron-up":["M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z|evenodd"],"easel":["M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"],"lightning-charge":["M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z"],"mortarboard":["M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z","M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"],"phone":["M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z","M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"],"award":["M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z","M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"],"box-arrow-up-right":["M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5|evenodd","M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z|evenodd"],"journal-richtext":["M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208M5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5","M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2","M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"],"apple":["M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282","M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"],"zoom-in":["M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0|evenodd","M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z","M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5|evenodd"],"zoom-out":["M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0|evenodd","M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z","M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5|evenodd"],"people":["M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"],"book":["M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"],"cpu":["M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"],"medium":["M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8m4.95 0c0 2.34-1.01 4.236-2.256 4.236S9.463 10.339 9.463 8c0-2.34 1.01-4.236 2.256-4.236S13.975 5.661 13.975 8M16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795"],"file-earmark-text":["M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5","M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"]};
  function icon(name, cls) {
    var n = String(name || "").replace(/^bi-/, "");
    var paths = ICONS[n] || ICONS["box-arrow-up-right"];
    return '<svg class="i' + (cls ? " " + cls : "") + '" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">' +
      paths.map(function (d) { var p = d.split("|"); return '<path d="' + p[0] + '"' + (p[1] ? ' fill-rule="' + p[1] + '"' : "") + "/>"; }).join("") + "</svg>";
  }

  var lang = initialLang();
  var instantReveal = false;

  function L(v) {
    if (v == null) return "";
    if (typeof v === "object" && !Array.isArray(v)) return v[lang] != null ? v[lang] : (v.en != null ? v.en : "");
    return v;
  }
  function t(path) {
    return L(path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, S.ui));
  }
  function initialLang() {
    try { var saved = localStorage.getItem("lang"); if (saved === "en" || saved === "id") return saved; } catch (e) {}
    var langs = navigator.languages || [navigator.language || "en"];
    return langs.some(function (l) { return /^id\b|^in\b/i.test(l); }) ? "id" : "en";
  }
  function rvClass(extra, i) {
    return 'class="' + extra + " reveal" + (instantReveal ? " is-visible" : "") + '" style="--d:' + Math.min(i || 0, 6) * 0.07 + 's"';
  }
  function navSections() {
    var s = ["about", "skills", "experience", "projects"];
    if (DOCS.length) s.push("guidance");
    s.push("contact");
    return s;
  }

  /* =====================================================================
     RENDER
     ===================================================================== */
  function renderAll() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$(".lang button").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    var P = S.profile;
    $("#heroName").textContent = P.name;
    $("#photoName").textContent = P.name;
    $("#photoLoc").textContent = P.location;
    $("#contactName").textContent = P.short;
    $("#footerName").textContent = P.name.toUpperCase();
    $("#footerLoc").textContent = P.location;
    $("#year").textContent = new Date().getFullYear();
    $("#contactMailText").innerHTML = esc(P.email).replace("@", "@<wbr>");
    $("#contactMail").href = "mailto:" + P.email;
    ["#navCv", "#heroCv", "#contactCv", "#mobileCv"].forEach(function (id) { $(id).href = P.cv; });

    renderNav();
    renderSocials($("#heroSocials"), "hero");
    renderSocials($("#contactSocials"), "all");
    renderSocials($("#navSocials"), "nav");
    renderAbout();
    renderSkills();
    renderTimeline();
    renderEducation();
    renderProjectFilters();
    renderProjects();
    renderGuidance();
    observeReveals();

    if (projectDialog.open && currentProject) fillProject(currentProject);
    if (docDialog.open && currentDoc) { fillDocHeader(currentDoc); updatePageLabel(); }
    setDialogLabels();
  }

  function renderNav() {
    var items = navSections().map(function (id) {
      return '<li><a class="nav__link" href="#' + id + '" data-sec="' + id + '">' + esc(t("nav." + id)) + "</a></li>";
    }).join("");
    $("#navLinks").innerHTML = items;
    $("#mobileLinks").innerHTML = items;
    $("#footerLinks").innerHTML = items;
    setActiveLink(activeSection);
  }

  function renderSocials(el, mode) {
    var P = S.profile;
    var list = mode === "all" ? P.socials : P.socials.slice(0, 2);
    var cls = mode === "nav" ? "nav__social" : "social";
    var html = list.map(function (s) {
      var inner = s.icon ? icon(s.icon) : '<span class="social__txt" aria-hidden="true">' + esc(s.text) + "</span>";
      return '<a class="' + cls + '" href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' + inner + "</a>";
    }).join("");
    el.innerHTML = html;
  }

  function renderAbout() {
    var A = S.ui.about;
    $("#aboutCards").innerHTML = A.cards.map(function (c, i) {
      return '<div ' + rvClass("card", i) + ">" + icon(c.icon, "card__icon") + "<h3>" + esc(L(c.title)) + "</h3><p>" + esc(L(c.desc)) + "</p></div>";
    }).join("");
  }

  function renderSkills() {
    $("#skillsGrid").innerHTML = S.skills.map(function (c, i) {
      return '<div ' + rvClass("skill", i) + '><div class="skill__head"><h3>' + esc(L(c.name)) + '</h3><span class="skill__count">' +
        String(c.items.length).padStart(2, "0") + '</span></div><div class="tags">' +
        c.items.map(function (x) { return '<span class="tag">' + esc(L(x.name || x)) + "</span>"; }).join("") + "</div></div>";
    }).join("");
    var soft = L(S.softSkills) || [];
    $("#skillsExtra").innerHTML =
      '<div class="extra"><span class="extra__label">' + esc(t("skills.soft")) + '</span><div class="tags">' +
      soft.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div></div>" +
      '<div class="extra"><span class="extra__label">' + esc(t("skills.languages")) + '</span><div class="langs">' +
      S.languages.map(function (l) { return '<span class="lang-item"><b>' + esc(L(l.name)) + "</b> · " + esc(L(l.level)) + "</span>"; }).join("") + "</div></div>";
  }

  function renderTimeline() {
    $("#timeline").innerHTML = S.experience.map(function (e) {
      var ic = e.icon || (e.type === "industry" ? "bi-phone" : "bi-mortarboard");
      return '<li ' + rvClass("tl", 0) + '><div class="tl__dot">' + icon(ic) + "</div>" +
        '<p class="tl__period">' + esc(L(e.period)) + "</p>" +
        '<h3 class="tl__role">' + esc(L(e.role)) + "</h3>" +
        '<p class="tl__org">' + esc(e.org) + "<span>/</span><em>" + esc(L(e.place)) + "</em></p>" +
        '<ul class="bullets">' + (L(e.points) || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></li>";
    }).join("");
  }

  function renderEducation() {
    $("#education").innerHTML = S.education.map(function (e, i) {
      var honors = L(e.honors) || [];
      var h = '<article ' + rvClass("edu__card", i) + '><div class="edu__top"><span class="edu__period">' + esc(e.period) +
        '</span>' + icon("mortarboard", "edu__icon") + "</div>" +
        '<h4 class="edu__degree">' + esc(L(e.degree)) + "</h4>" +
        '<p class="edu__org">' + esc(e.org) + " · " + esc(e.place) + "</p>";
      if (e.score) h += '<span class="edu__score">' + esc(L(e.score)) + "</span>";
      if (honors.length) {
        h += '<ul class="edu__honors">' + honors.map(function (x) { return "<li>" + icon("award") + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>";
      }
      if (e.coursework && e.coursework.length) {
        h += "<details><summary>" + esc(t("experience.coursework")) + '</summary><div class="tags">' +
          e.coursework.map(function (c) { return '<span class="tag">' + esc(c) + "</span>"; }).join("") + "</div></details>";
      }
      return h + "</article>";
    }).join("");
  }

  /* ---------- my projects ---------- */
  var projectFilter = "all";
  var projectsExpanded = false;

  function projectCats() {
    var order = ["ai", "research", "data", "mobile", "embedded"];
    var used = {};
    S.projects.forEach(function (p) { (p.cats || []).forEach(function (c) { used[c] = true; }); });
    return ["all"].concat(order.filter(function (c) { return used[c]; }));
  }
  function renderProjectFilters() {
    $("#projectFilters").innerHTML = projectCats().map(function (c) {
      var on = c === projectFilter;
      return '<button type="button" role="tab" class="filter' + (on ? " is-active" : "") + '" data-filter="' + c + '" aria-selected="' + on + '">' + esc(t("projects.filters." + c)) + "</button>";
    }).join("");
  }
  function filteredProjects() {
    return S.projects.filter(function (p) { return projectFilter === "all" || (p.cats || []).indexOf(projectFilter) > -1; });
  }
  function projectMedia(p, card) {
    if (p.images && p.images.length) {
      var src = card ? p.images[0].replace(/-1\.(jpg|webp)$/, "-card.$1") : p.images[0];
      return '<img src="' + esc(src) + '" alt="' + esc(L(p.title)) + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + esc(p.images[0]) + '\'">';
    }
    return '<div class="project__ph">' + icon(p.icon || "cpu") + "</div>";
  }
  function renderProjects() {
    $("#countMine").textContent = S.projects.length;
    var list = filteredProjects();
    var limit = S.initialProjects || 6;
    var shown = projectsExpanded ? list : list.slice(0, limit);
    $("#projectGrid").innerHTML = shown.map(function (p, i) {
      var badges = (p.cats || []).slice(0, 2).map(function (c, j) {
        return '<span class="badge' + (j === 0 ? " badge--accent" : "") + '">' + esc(t("projects.filters." + c)) + "</span>";
      }).join("");
      var tech = p.tech || [];
      var chips = tech.slice(0, 4).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") +
        (tech.length > 4 ? '<span class="chip">+' + (tech.length - 4) + "</span>" : "");
      return '<a ' + rvClass("project", i % 3) + ' href="#project/' + esc(p.slug) + '" data-modal-link>' +
        '<div class="project__media"><div class="project__badges">' + badges + "</div>" + projectMedia(p, true) + "</div>" +
        '<div class="project__body"><p class="project__date">' + esc(L(p.date)) + "</p>" +
        '<h3 class="project__title">' + esc(L(p.title)) + "</h3>" +
        '<p class="project__summary">' + esc(L(p.summary)) + "</p>" +
        '<div class="chips">' + chips + "</div>" +
        '<span class="project__more">' + esc(t("projects.details")) + " " + icon("chevron-right") + "</span></div></a>";
    }).join("");
    var more = $("#moreProjects");
    more.hidden = list.length <= limit;
    more.innerHTML = esc(projectsExpanded ? t("projects.less") : t("projects.more")) +
      " " + icon(projectsExpanded ? "chevron-up" : "chevron-down");
  }

  /* ---------- student guidance (by cohort) ---------- */
  var cohortFilter = "all";

  function normalizeDocs(arr) {
    return arr.filter(function (d) { return d && d.file && d.cohort; }).map(function (d, i) {
      var slug = d.slug || String(d.file).split("/").pop().replace(/\.pdf$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return Object.assign({}, d, { slug: slug || "doc-" + i, cohort: String(d.cohort), _i: i });
    }).sort(function (a, b) { return Number(b.cohort) - Number(a.cohort) || a._i - b._i; });
  }
  function names(d) { return Array.isArray(d.students) ? d.students.join(", ") : (d.students || ""); }
  function cohorts() {
    var c = [];
    DOCS.forEach(function (d) { if (c.indexOf(d.cohort) < 0) c.push(d.cohort); });
    return c;
  }
  function pagesLabel(n) { return n + " " + (n === 1 ? t("guidance.pageOne") : t("guidance.pages")); }
  function countLabel(n) { return n + " " + (n === 1 ? t("guidance.projectCount") : t("guidance.projectsCount")); }

  function renderGuidance() {
    var sec = $("#guidance");
    $("#jumpGuidance").hidden = !DOCS.length;
    if (!DOCS.length) { sec.hidden = true; return; }
    sec.hidden = false;
    $("#countGuidance").textContent = DOCS.length;

    var all = cohorts();
    var filters = $("#cohortFilters");
    if (all.length > 1) {
      filters.hidden = false;
      filters.innerHTML = ["all"].concat(all).map(function (c) {
        return '<button type="button" class="filter' + (c === cohortFilter ? " is-active" : "") + '" data-cohort="' + esc(c) + '">' +
          esc(c === "all" ? t("guidance.all") : t("guidance.cohort") + " " + c) + "</button>";
      }).join("");
    } else {
      filters.hidden = true;
    }

    var shownCohorts = cohortFilter === "all" ? all : [cohortFilter];
    $("#guidanceGroups").innerHTML = shownCohorts.map(function (c) {
      var list = DOCS.filter(function (d) { return d.cohort === c; });
      // portrait documents first (paired side by side), then slide decks (two per row)
      var isWide = function (d) { return !!(d.landscape || landscape[d.slug]); };
      list = list.filter(function (d) { return !isWide(d); }).concat(list.filter(isWide));
      var portraits = list.filter(function (d) { return !isWide(d); }).length;
      return '<div class="cohort"><div ' + rvClass("cohort__head", 0) + '><span class="cohort__badge"><small>' + esc(t("guidance.cohort")) + "</small>" + esc(c) +
        '</span><span class="cohort__line"></span><span class="cohort__count">' + esc(countLabel(list.length)) + "</span></div>" +
        '<div class="docs">' + list.map(function (d, i) { return docCard(d, i, portraits % 2 === 1 && i === portraits - 1); }).join("") + "</div></div>";
    }).join("");
    queueThumbs();
  }

  function docCard(d, i, wide) {
    var thumb = d.thumb || thumbCache[d.slug];
    var media = thumb
      ? '<img src="' + esc(thumb) + '" alt="' + esc(L(d.title)) + '" loading="lazy" decoding="async" onload="if(this.naturalWidth>this.naturalHeight*1.05){var c=this.closest(\'.doc\');if(c)c.classList.add(\'doc--landscape\')}">'
      : '<div class="doc__ph is-loading" data-thumb="' + esc(d.slug) + '">' + icon("file-earmark-pdf") + "</div>";
    var meta = [L(d.course), L(d.date)].filter(Boolean).join(" · ");
    var tags = (d.tags || []).slice(0, 3).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("");
    var pages = pageCount[d.slug] || d.pages;
    var cls = "doc" + (d.landscape || landscape[d.slug] ? " doc--landscape" : (wide ? " doc--wide" : ""));
    return '<a ' + rvClass(cls, i % 2) + ' href="#doc/' + esc(d.slug) + '" data-modal-link>' +
      '<div class="doc__media' + (landscape[d.slug] ? " is-landscape" : "") + '">' +
      (L(d.type) ? '<span class="badge badge--accent doc__type">' + esc(L(d.type)) + "</span>" : "") + media + "</div>" +
      '<div class="doc__body">' + (meta ? '<p class="doc__meta">' + esc(meta) + "</p>" : "") +
      '<h4 class="doc__title">' + esc(L(d.title)) + "</h4>" +
      (d.team ? '<p class="doc__team">' + icon("people") + esc(d.team) + "</p>" : "") +
      (names(d) ? '<p class="doc__students">' + esc(names(d)) + "</p>" : "") +
      (L(d.summary) ? '<p class="doc__summary">' + esc(L(d.summary)) + "</p>" : "") +
      (tags ? '<div class="chips">' + tags + "</div>" : "") +
      '<span class="doc__cta">' + icon("book") + esc(t("guidance.view")) + " " + icon("chevron-right") +
      '<span data-pages="' + esc(d.slug) + '">' + (pages ? esc(pagesLabel(pages)) : "PDF") + "</span></span>" +
      "</div></a>";
  }

  /* =====================================================================
     REVEAL + NAV STATE
     ===================================================================== */
  var revealIO = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); revealIO.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
  function observeReveals() {
    $$(".reveal:not(.is-visible)").forEach(function (el) {
      if (revealIO) revealIO.observe(el); else el.classList.add("is-visible");
    });
  }

  var activeSection = "";
  function setActiveLink(id) {
    activeSection = id;
    $$(".nav__link").forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-sec") === id); });
  }
  if ("IntersectionObserver" in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActiveLink(en.target.id === "home" ? "" : en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "about", "skills", "experience", "projects", "guidance", "contact"].forEach(function (id) {
      var el = document.getElementById(id); if (el) secIO.observe(el);
    });
  }

  var nav = $("#nav"), progress = $("#progress"), toTop = $("#toTop"), ticking = false;
  var mobileMenu = $("#mobileMenu"), navToggle = $("#navToggle");
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      nav.classList.toggle("is-scrolled", y > 50 || !mobileMenu.hidden);
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      toTop.classList.toggle("is-visible", y > 900);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    mobileMenu.hidden = !open;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.innerHTML = icon(open ? "x-lg" : "list");
    onScroll();
  }
  navToggle.addEventListener("click", function () { setMenu(mobileMenu.hidden); });
  mobileMenu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1200 && !mobileMenu.hidden) setMenu(false); });

  $$(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-lang");
      if (l === lang) return;
      lang = l;
      try { localStorage.setItem("lang", l); } catch (e) {}
      instantReveal = true;
      renderAll();
    });
  });

  $("#projectFilters").addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    projectFilter = b.getAttribute("data-filter");
    projectsExpanded = false;
    instantReveal = false;
    renderProjectFilters();
    renderProjects();
    observeReveals();
  });
  $("#moreProjects").addEventListener("click", function () {
    var wasExpanded = projectsExpanded;
    projectsExpanded = !projectsExpanded;
    instantReveal = false;
    renderProjects();
    observeReveals();
    if (wasExpanded) document.getElementById("projects-mine").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
  });
  $("#cohortFilters").addEventListener("click", function (e) {
    var b = e.target.closest("[data-cohort]");
    if (!b) return;
    cohortFilter = b.getAttribute("data-cohort");
    instantReveal = false;
    renderGuidance();
    observeReveals();
  });

  /* =====================================================================
     DIALOGS + HASH ROUTING  (#project/<slug>, #doc/<slug>)
     ===================================================================== */
  var projectDialog = $("#projectDialog"), docDialog = $("#docDialog");
  var currentProject = null, currentDoc = null, imgIndex = 0;
  var pushedByClick = false, lastFocus = null;

  function setDialogLabels() {
    $$("[data-close]").forEach(function (b) { b.setAttribute("aria-label", t("modal.close")); b.title = t("modal.close"); });
    [["#dvZoomIn", "modal.zoomIn"], ["#dvZoomOut", "modal.zoomOut"], ["#dvOpen", "guidance.open"], ["#dvDownload", "guidance.download"]].forEach(function (x) {
      $(x[0]).setAttribute("aria-label", t(x[1])); $(x[0]).title = t(x[1]);
    });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-modal-link]");
    if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey) { pushedByClick = true; lastFocus = a; }
  });

  function showDialog(d) {
    if (!d.open) { if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", ""); }
    document.body.classList.add("has-modal");
  }
  function closeDialog(d) {
    if (d.open) { if (typeof d.close === "function") d.close(); else { d.removeAttribute("open"); onDialogClosed(); } }
  }
  function onDialogClosed() {
    if (projectDialog.open || docDialog.open) return;
    document.body.classList.remove("has-modal");
    currentProject = null;
    if (currentDoc) closeViewer();
    if (/^#(project|doc)\//.test(location.hash)) {
      if (pushedByClick) { pushedByClick = false; history.back(); }
      else history.replaceState(null, "", location.pathname + location.search);
    }
    if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }
  [projectDialog, docDialog].forEach(function (d) {
    d.addEventListener("close", onDialogClosed);
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.closest("[data-close]")) closeDialog(d);
    });
  });

  function route() {
    var m = location.hash.match(/^#(project|doc)\/([\w-]+)/);
    if (!m) { closeDialog(projectDialog); closeDialog(docDialog); return; }
    if (m[1] === "project") {
      var p = S.projects.filter(function (x) { return x.slug === m[2]; })[0];
      if (p) openProject(p);
    } else {
      var d = DOCS.filter(function (x) { return x.slug === m[2]; })[0];
      if (d) openDoc(d);
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------- project dialog ---------- */
  function openProject(p) {
    closeDialog(docDialog);
    currentProject = p; imgIndex = 0;
    fillProject(p);
    showDialog(projectDialog);
    $(".modal__close", projectDialog).focus();
  }
  function fillProject(p) {
    $("#pdBadges").innerHTML = (p.cats || []).map(function (c) { return '<span class="badge">' + esc(t("projects.filters." + c)) + "</span>"; }).join("");
    $("#pdTitle").textContent = L(p.title);
    $("#pdMeta").innerHTML =
      (p.org ? "<dt>" + esc(t("modal.org")) + "</dt><dd>" + esc(L(p.org)) + "</dd>" : "") +
      (p.date ? "<dt>" + esc(t("modal.date")) + "</dt><dd>" + esc(L(p.date)) + "</dd>" : "");
    var pts = L(p.points) || [];
    if (!pts.length && p.summary) pts = [L(p.summary)];
    $("#pdPoints").innerHTML = pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    $("#pdTech").innerHTML = (p.tech && p.tech.length) ? '<div class="tags">' + p.tech.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div>" : "";
    $("#pdLinks").innerHTML = (p.links || []).map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + icon(l.icon || "box-arrow-up-right") + esc(L(l.label)) + "</a>";
    }).join("");
    renderProjectMedia();
  }
  function renderProjectMedia() {
    var p = currentProject, imgs = p.images || [], box = $("#pdMedia");
    if (!imgs.length) { box.innerHTML = '<div class="pd__main">' + projectMedia(p, false) + "</div>"; return; }
    var h = '<div class="pd__main"><img src="' + esc(imgs[imgIndex]) + '" alt="' + esc(L(p.title)) + " — " + (imgIndex + 1) + "/" + imgs.length + '">';
    if (imgs.length > 1) {
      h += '<button type="button" class="pd__nav pd__nav--prev" data-step="-1" aria-label="Previous image">' + icon("chevron-left") + "</button>" +
           '<button type="button" class="pd__nav pd__nav--next" data-step="1" aria-label="Next image">' + icon("chevron-right") + "</button>";
    }
    h += "</div>";
    if (imgs.length > 1) {
      h += '<div class="pd__thumbs">' + imgs.map(function (src, i) {
        return '<button type="button" data-idx="' + i + '" class="' + (i === imgIndex ? "is-active" : "") + '" aria-label="Image ' + (i + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></button>';
      }).join("") + "</div>";
    }
    box.innerHTML = h;
  }
  function stepImage(d) {
    var n = (currentProject.images || []).length;
    if (n < 2) return;
    imgIndex = (imgIndex + d + n) % n;
    renderProjectMedia();
  }
  $("#pdMedia").addEventListener("click", function (e) {
    var s = e.target.closest("[data-step]"), th = e.target.closest("[data-idx]");
    if (s) stepImage(Number(s.getAttribute("data-step")));
    else if (th) { imgIndex = Number(th.getAttribute("data-idx")); renderProjectMedia(); }
  });
  var touchX = null;
  $("#pdMedia").addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  $("#pdMedia").addEventListener("touchend", function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 45) stepImage(dx < 0 ? 1 : -1);
  });
  document.addEventListener("keydown", function (e) {
    if (projectDialog.open && currentProject) {
      if (e.key === "ArrowRight") stepImage(1);
      if (e.key === "ArrowLeft") stepImage(-1);
    }
    if (docDialog.open) {
      if (e.key === "+" || e.key === "=") setZoom(zoom * 1.25);
      if (e.key === "-") setZoom(zoom / 1.25);
    }
  });

  /* =====================================================================
     PDF (pdf.js, vendored in assets/vendor/pdfjs)
     ===================================================================== */
  var pdfjsPromise = null, docCache = {}, thumbCache = {}, landscape = {}, pageCount = {};

  function loadPdfjs() {
    if (!pdfjsPromise) {
      pdfjsPromise = import(PDFJS_BASE + "pdf.min.js").then(function (lib) {
        lib.GlobalWorkerOptions.workerSrc = PDFJS_BASE + "pdf.worker.min.js";
        return lib;
      });
      pdfjsPromise.catch(function () { pdfjsPromise = null; });
    }
    return pdfjsPromise;
  }
  function getDoc(url) {
    var abs = new URL(url, document.baseURI).href;
    if (!docCache[abs]) {
      docCache[abs] = loadPdfjs().then(function (lib) {
        return lib.getDocument({
          url: abs,
          standardFontDataUrl: PDFJS_BASE + "standard_fonts/",
          wasmUrl: PDFJS_BASE + "wasm/",
          iccUrl: PDFJS_BASE + "iccs/",
          disableAutoFetch: true,   // load pages on demand (range requests)
          isEvalSupported: false,
          enableXfa: false
        }).promise;
      });
      docCache[abs].catch(function () { delete docCache[abs]; });
    }
    return docCache[abs];
  }
  function setPageCount(slug, n) {
    pageCount[slug] = n;
    $$('[data-pages="' + slug + '"]').forEach(function (el) { el.textContent = pagesLabel(n); });
  }

  /* covers rendered lazily for documents without a `thumb` */
  var thumbQueue = [], thumbBusy = 0;
  var thumbIO = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      thumbIO.unobserve(en.target);
      var slug = en.target.getAttribute("data-thumb");
      if (thumbQueue.indexOf(slug) < 0) thumbQueue.push(slug);
      pumpThumbs();
    });
  }, { rootMargin: "300px 0px" }) : null;
  function queueThumbs() {
    $$("[data-thumb]").forEach(function (el) {
      if (thumbIO) thumbIO.observe(el);
      else { thumbQueue.push(el.getAttribute("data-thumb")); pumpThumbs(); }
    });
  }
  function pumpThumbs() {
    while (thumbBusy < 2 && thumbQueue.length) {
      var slug = thumbQueue.shift();
      var d = DOCS.filter(function (x) { return x.slug === slug; })[0];
      if (!d || thumbCache[slug]) { applyThumb(slug); continue; }
      thumbBusy++;
      makeThumb(d).then(function (s) { thumbBusy--; applyThumb(s); pumpThumbs(); },
                        function (s) { thumbBusy--; failThumb(s); pumpThumbs(); });
    }
  }
  function makeThumb(d) {
    return getDoc(d.file).then(function (doc) { setPageCount(d.slug, doc.numPages); return doc.getPage(1); }).then(function (page) {
      var base = page.getViewport({ scale: 1 });
      landscape[d.slug] = base.width > base.height * 0.95;
      var vp = page.getViewport({ scale: Math.min(3, 640 / base.width) });
      var canvas = document.createElement("canvas");
      canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
      return page.render({ canvas: canvas, viewport: vp }).promise.then(function () {
        return new Promise(function (res) {
          canvas.toBlob(function (b) {
            thumbCache[d.slug] = b ? URL.createObjectURL(b) : canvas.toDataURL("image/jpeg", 0.85);
            res(d.slug);
          }, "image/jpeg", 0.85);
        });
      });
    }).catch(function (err) {
      if (window.console) console.warn("[guidance] cover failed for", d.file, err);
      throw d.slug;
    });
  }
  function applyThumb(slug) {
    var src = thumbCache[slug];
    if (!src) return;
    $$('[data-thumb="' + slug + '"]').forEach(function (ph) {
      var img = new Image();
      img.alt = ""; img.decoding = "async"; img.src = src;
      var card = ph.closest(".doc");
      if (card && landscape[slug]) card.classList.add("doc--landscape");
      ph.replaceWith(img);
    });
  }
  function failThumb(slug) {
    $$('[data-thumb="' + slug + '"]').forEach(function (ph) { ph.classList.remove("is-loading"); ph.removeAttribute("data-thumb"); });
  }

  /* ---------- document viewer: lazy, page-by-page rendering ---------- */
  var zoom = 1, fitScale = 1, viewer = null, zoomTimer = null;
  var stage = $("#dvStage");

  function fillDocHeader(d) {
    $("#dvTitle").textContent = L(d.title);
    var bits = [];
    if (d.team) bits.push(d.team);
    if (names(d)) bits.push(names(d));
    bits.push(t("guidance.cohort") + " " + d.cohort);
    if (L(d.course)) bits.push(L(d.course));
    $("#dvSub").textContent = bits.join(" · ");
    $("#dvOpen").href = d.file;
    $("#dvDownload").href = d.file;
    $("#dvDownload").setAttribute("download", d.file.split("/").pop());
  }

  function openDoc(d) {
    closeDialog(projectDialog);
    if (currentDoc === d && viewer) { showDialog(docDialog); return; }
    if (currentDoc) closeViewer();
    currentDoc = d; zoom = 1;
    fillDocHeader(d);
    $("#dvPage").textContent = "";
    stage.innerHTML = '<div class="dv__msg"><div class="spinner"></div><p>' + esc(t("guidance.loading")) + "</p></div>";
    showDialog(docDialog);
    $("[data-close]", docDialog).focus();
    updateZoomLabel();

    getDoc(d.file).then(function (doc) {
      if (currentDoc !== d) return;
      setPageCount(d.slug, doc.numPages);
      var jobs = [];
      for (var n = 1; n <= doc.numPages; n++) jobs.push(doc.getPage(n));
      return Promise.all(jobs).then(function (pages) {
        if (currentDoc !== d) return;
        buildViewer(d, doc, pages);
      });
    }).catch(function (err) {
      if (window.console) console.warn("[guidance] viewer failed for", d.file, err);
      if (currentDoc !== d) return;
      stage.innerHTML = '<div class="dv__msg">' + icon("file-earmark-pdf", "i--xl") + "<p>" +
        esc(t("guidance.failed")) + '</p><a href="' + esc(d.file) + '" target="_blank" rel="noopener">' + esc(t("guidance.open")) + "</a></div>";
    });
  }

  function buildViewer(d, doc, pages) {
    var cs = getComputedStyle(stage);
    var padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    var padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    var base = pages[0].getViewport({ scale: 1 });
    var fitW = (stage.clientWidth - padX) / base.width;
    var fitH = (stage.clientHeight - padY) / base.height;
    fitScale = pages.length === 1 && window.innerWidth > 600 ? Math.min(fitW, fitH) : Math.min(fitW, 960 / base.width);

    viewer = { doc: doc, pages: pages, items: [], visible: {}, current: 1 };
    stage.innerHTML = "";
    pages.forEach(function (page, i) {
      var el = document.createElement("div");
      el.className = "dv__pg";
      el.setAttribute("data-n", i + 1);
      el.setAttribute("data-i", i);
      stage.appendChild(el);
      viewer.items.push({ page: page, el: el, canvas: null, task: null, scale: 0 });
    });
    sizePages();
    viewer.io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var i = Number(en.target.getAttribute("data-i"));
        if (en.isIntersecting) { viewer.visible[i] = true; renderPage(i); }
        else { delete viewer.visible[i]; releasePage(i); }
      });
    }, { root: stage, rootMargin: "120% 0px" });
    viewer.items.forEach(function (it) { viewer.io.observe(it.el); });
    stage.scrollTop = 0;
    updatePageLabel();
  }

  function sizePages() {
    var scale = fitScale * zoom;
    viewer.items.forEach(function (it) {
      var vp = it.page.getViewport({ scale: scale });
      it.el.style.width = Math.floor(vp.width) + "px";
      it.el.style.height = Math.floor(vp.height) + "px";
    });
  }

  function renderPage(i) {
    var it = viewer && viewer.items[i];
    if (!it) return;
    var scale = fitScale * zoom;
    if (it.scale === scale && (it.canvas || it.task)) return;
    if (it.task) { try { it.task.cancel(); } catch (e) {} it.task = null; }
    var vp = it.page.getViewport({ scale: scale });
    var px = Math.min(window.devicePixelRatio || 1, 2);
    var maxPixels = 16e6; // stay under mobile canvas limits
    if (vp.width * vp.height * px * px > maxPixels) px = Math.sqrt(maxPixels / (vp.width * vp.height));
    var rvp = it.page.getViewport({ scale: scale * px });
    var canvas = document.createElement("canvas");
    canvas.width = Math.floor(rvp.width); canvas.height = Math.floor(rvp.height);
    var v = viewer;
    it.scale = scale;
    it.task = it.page.render({ canvas: canvas, viewport: rvp });
    it.task.promise.then(function () {
      if (viewer !== v || it.scale !== scale) return;
      if (it.canvas) it.canvas.remove();
      it.canvas = canvas; it.task = null;
      it.el.appendChild(canvas);
    }, function () { if (it.scale === scale) it.task = null; });
  }

  function releasePage(i) {
    var it = viewer && viewer.items[i];
    if (!it) return;
    if (it.task) { try { it.task.cancel(); } catch (e) {} it.task = null; }
    if (it.canvas) { it.canvas.width = 0; it.canvas.height = 0; it.canvas.remove(); it.canvas = null; }
    it.scale = 0;
  }

  function closeViewer() {
    if (viewer) {
      if (viewer.io) viewer.io.disconnect();
      viewer.items.forEach(function (_, i) { releasePage(i); });
    }
    viewer = null; currentDoc = null;
    stage.innerHTML = "";
  }

  function updatePageLabel() {
    if (!viewer) return;
    var mid = stage.scrollTop + stage.clientHeight / 3, cur = 1;
    viewer.items.forEach(function (it, i) { if (it.el.offsetTop <= mid) cur = i + 1; });
    viewer.current = cur;
    $("#dvPage").textContent = t("guidance.page") + " " + cur + " / " + viewer.items.length;
  }
  stage.addEventListener("scroll", function () { requestAnimationFrame(updatePageLabel); }, { passive: true });

  function updateZoomLabel() { $("#dvZoom").textContent = Math.round(zoom * 100) + "%"; }
  function setZoom(z) {
    if (!viewer) return;
    var rx = stage.scrollWidth > stage.clientWidth ? (stage.scrollLeft + stage.clientWidth / 2) / stage.scrollWidth : 0.5;
    var ry = (stage.scrollTop + stage.clientHeight / 2) / stage.scrollHeight;
    zoom = Math.max(0.5, Math.min(5, z));
    updateZoomLabel();
    sizePages();
    stage.scrollLeft = rx * stage.scrollWidth - stage.clientWidth / 2;
    stage.scrollTop = ry * stage.scrollHeight - stage.clientHeight / 2;
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(function () {
      if (!viewer) return;
      Object.keys(viewer.visible).forEach(function (i) { renderPage(Number(i)); });
    }, 140);
  }
  $("#dvZoomIn").addEventListener("click", function () { setZoom(zoom * 1.25); });
  $("#dvZoomOut").addEventListener("click", function () { setZoom(zoom / 1.25); });

  /* =====================================================================
     INIT
     ===================================================================== */
  renderAll();
  onScroll();
  route();
})();
