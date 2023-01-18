exports.getAbbrev = (name) => {
  const splits = name.split(" ");
  const abbrev = splits.map((x) => x.charAt(0)).join("");
  return abbrev;
};
