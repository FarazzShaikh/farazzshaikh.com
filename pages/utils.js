export function isDebug() {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const d = url.searchParams.get("d");

  return !!d;
}

export function brightnessByColor(color) {
  var color = "" + color,
    isHEX = color.indexOf("#") == 0,
    isRGB = color.indexOf("rgb") == 0;
  if (isHEX) {
    const hasFullSpec = color.length == 7;
    var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m)
      var r = parseInt(m[0] + (hasFullSpec ? "" : m[0]), 16),
        g = parseInt(m[1] + (hasFullSpec ? "" : m[1]), 16),
        b = parseInt(m[2] + (hasFullSpec ? "" : m[2]), 16);
  }
  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m)
      var r = m[0],
        g = m[1],
        b = m[2];
  }
  if (typeof r != "undefined") return (r * 299 + g * 587 + b * 114) / 1000;
}

export function createLangTags(langs, colors, large, rand) {
  return langs.map((l, i) => {
    if (rand) {
      l = Object.keys(colors)[Math.floor(Math.random() * 100) % Object.keys(colors).length];
      while (colors[l].color === null) {
        l = Object.keys(colors)[Math.floor(Math.random() * 100) % Object.keys(colors).length];
      }
    }

    const color = colors[l] ? colors[l].color : null;
    const textColor = brightnessByColor(color) < 150 && color ? "white" : "black";
    return `
                                    <div class="tag ${large ? "" : "is-small"}"
                                        style="
                                            background-color: ${color || "#cccccc"}; 
                                            color: ${textColor};
                                            ${large ? "margin: 5px 0px;" : ""}
                                        "
                                    >${rand ? langs[i] : l}</div>
                                    `;
  });
}

/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
 * @param  {Date|Number|String} [nowDate] A Date object, timestamp or string parsable with Date.parse()
 * @param  {Intl.RelativeTimeFormat} [trf] A Intl formater
 * @return {string} Human readable elapsed or remaining time
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 */
export function getTimeSince(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  const intervals = [
    { ge: YEAR, divisor: YEAR, unit: "year" },
    { ge: MONTH, divisor: MONTH, unit: "month" },
    { ge: WEEK, divisor: WEEK, unit: "week" },
    { ge: DAY, divisor: DAY, unit: "day" },
    { ge: HOUR, divisor: HOUR, unit: "hour" },
    { ge: MINUTE, divisor: MINUTE, unit: "minute" },
    { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
    { ge: 0, divisor: 1, text: "just now" },
  ];
  const now = typeof nowDate === "object" ? nowDate.getTime() : new Date(nowDate).getTime();
  const diff = now - (typeof date === "object" ? date : new Date(date)).getTime();
  const diffAbs = Math.abs(diff);
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      const isFuture = diff < 0;
      return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
    }
  }
}
