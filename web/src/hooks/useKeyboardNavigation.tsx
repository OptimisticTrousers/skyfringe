import { useEffect } from "react";

// Trap focus within a dropdown menu and handle arrow navigation (still allow user to tab out of menu)
// ! The menu must have accessible menuitem roles
export const useKeyboardNavigation = (elementId: string) => {
  useEffect(() => {
    const menu = document.querySelector(`#${elementId}`) as HTMLElement;
    const menuItems = menu.querySelectorAll('[role="menuitem"]') as any;
    const container = menu.parentNode as HTMLElement;
    let currentFocus: number = 0;

    // Focus the first menu item when the menu is first opened
    menuItems[0].focus();

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (currentFocus < menuItems.length - 1) {
            // user is not at last item, move down menu
            currentFocus++;
          } else {
            // user is at last item, move to top item
            currentFocus = 0;
          }
          menuItems[currentFocus].focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (currentFocus === 0) {
            // user is at top item, return to bottom item
            currentFocus = menuItems.length - 1;
          } else {
            // user is not at top item, move up list
            currentFocus--;
          }
          menuItems[currentFocus].focus();
          break;
        default:
          break;
      }
    };

    container.addEventListener("keydown", handleKeyPress);

    return () => {
      container.removeEventListener("keydown", handleKeyPress);
    };
  }, [elementId]);
};
