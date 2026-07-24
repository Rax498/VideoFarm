// The API returns titles with HTML entities (&#39; &amp; &quot;) — decode
// them via a detached textarea, which never executes markup
const textarea = document.createElement("textarea");

const decodeHtml = (text) => {
  if (!text) return text;
  textarea.innerHTML = text;
  return textarea.value;
};

export default decodeHtml;
