import React, { MouseEventHandler, ReactElement, useEffect } from "react";

// Use this hook for any menu to apply common 'expected' UX features such as closing outside click or escape key press. Takes ID of the element to apply these events to, and the function that closes/dismissed the element
const useMenuCloseEvents = (
  elementId: string,
  buttonId: string,
  closeElement: () => void
) => {
  // Effect to apply event listeners once on initial component mount

  useEffect(() => {
    // Ensure the element closes when the user clicks any element outside the target element
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id !== elementId && target.id !== buttonId) {
        closeElement();
      }
    };

    // Ensure the element closes when the user presses the Escape key
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeElement();
      }
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleEscPress);

    // Clean up event listeners on component dismount
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [closeElement, elementId]);
};

export default useMenuCloseEvents;
