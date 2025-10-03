import { Link } from "react-router-dom";
import React from "react";

function Button({
  children,
  type,
  color = "text-secondary",
  onClick,
  onActiveChartDuration,
  onActiveChartStyle,
  to,
}) {
  // Base styles common to most buttons
  const base = `inline-block flex justify-center items-center gap-1 px-2 sm:px-3 text-sm rounded-full ${color} font-semibold transition-colors duration-300 focus:bg-yellow-300 focus:outline-none disabled:cursor-not-allowed`;

  // Styles applied when button is active (used for chart buttons)
  const activeStyle = "bg-yellow-300 outline-none ring ring-yellow-300 ring-offset-2";

  // Style variants for different button types
  const styles = {
    primary: base + " py-2 md:px-5 px-4 md:py-3",
    brand:
      "inline-block flex justify-center items-center gap-1 px-2 py-2 md:px-5 px-4 md:py-3 sm:px-3 text-sm rounded-full font-semibold text-stone-800 transition-colors duration-300 hover:ring-yellow-400 bg-brand outline-none ring ring-yellow-300 ring-offset-2 disabled:cursor-not-allowed",
    emailAlert: base + " py-1 md:px-6 md:py-3 w-full bg-primary-hover-dark",
    small: `${base} text-dark py-2 md:px-5 md:py-2.5 text-xs max-w-max ${onActiveChartDuration || onActiveChartStyle ? activeStyle : ""
      } hover:text-brand`,
    chart: `${base} text-dark py-2 md:px-5 md:py-2.5 text-xs max-w-max ${onActiveChartDuration || onActiveChartStyle ? activeStyle : ""
      } hover:text-dark`,
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed py-2.5 md:px-6 md:py-3.5",
  };

  // If `to` prop is provided, render as a react-router Link
  if (to) {
    return (
      <Link to={to} className={styles[type]} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Render as a regular button otherwise
  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
