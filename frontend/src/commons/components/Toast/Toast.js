import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Icon from "commons/components/Icon";
import Flexbox from "commons/components/Flexbox";

const Box = styled(Flexbox)`
  padding: 16px 16px 16px 12px;
  color: var(--neutral-200);
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  align-items: flex-start;
  max-width: 560px;
  background-color: ${({ variant }) => {
    if (variant === "success") return "var(--neutral-40)";
    if (variant === "error") return "var(--primary-70)";
    if (variant === "info") return "var(--neutral-40)";
  }};
`;

const ToastIcon = styled(Icon)`
  border-radius: 50%;
  background-color: ${({ variant }) => {
    if (variant === "success") return "var(--green-100)";
    if (variant === "error") return "var(--red-100)";
    if (variant === "info") return "var(--blue-100)";
  }};
`;

const iconVariants = {
  success: "check",
  error: "priority_high",
  info: "info_i",
};

function Toast({ id, variant = "success", label, hideToast, autoHide }) {
  return (
    <Box gap={16} variant={variant}>
      <ToastIcon size={20} name={iconVariants[variant]} variant={variant} />
      {label}
      {(!autoHide || variant === "error") && <Icon name="close" size={20} onClick={() => hideToast(id)} />}
    </Box>
  );
}

Toast.propTypes = {
  id: T.number,
  variant: T.oneOf(["success", "error", "info"]),
  label: T.string,
  hideToast: T.func,
  autoHide: T.bool,
};

export default Toast;
