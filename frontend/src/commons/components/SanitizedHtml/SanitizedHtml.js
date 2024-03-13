import React from "react";
import T from "prop-types";
import DOMPurify from "dompurify";

function SanitizedHtml({ className, children }) {
  const clean = DOMPurify.sanitize(children);
  return <span className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}

SanitizedHtml.propTypes = {
  className: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
};

export default SanitizedHtml;
