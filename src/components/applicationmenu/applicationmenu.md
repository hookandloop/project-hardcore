---
title: Application Menu
description: This page describes Application Menu.
demo:
  pages:
  - name: Default About Example
    slug: example-index
  - name: Different Header Types Event Demo
    slug: example-different-header-types
  - name: As Shown on the Soho Site
    slug: example-soho-site
  - name: Showing Top Level Buttons
    slug: example-top-level-buttons
  - name: Showing Menubutton as a role switcher
    slug: example-menubutton
tests:
  pages:
  - name: No Errors on an Empty Menu
    slug: test-empty
  - name: Six Levels Deep (Bad Idea) Event Demo
    slug: test-six-levels
  - name: Six Levels Deep with Icons (Equally Bad Idea)
    slug: test-six-levels-icons
---

## Behavior Guidelines

Users can display the Application Menu using the hamburger icon in the application shell. The menu should respond responsively as follows:

-   When there is sufficient screen real estate (desktop/laptop devices) the menu is docked on the left side of the content area, with the current screen content displayed in the remaining space.
-   On mobile displays, or any time the screen real estate is restricted, the menu must be manually opened and then overlays the current content. Once the user makes a selection from the menu, the system closes the menu.

Within the menu itself:

-   Users can open and close individual categories.
-   Categories can contain multiple levels of hierarchy (although teams are encouraged to limit to 3 levels).
-   Multiple categories can be open at one time.
-   Scrolling within the menu is supported when necessary.

## Keyboard Shortcuts

In SoHo Xi Controls, the following keyboard shortcuts are implemented in the Application Menu

-   When pressing <kbd>Enter</kbd> while focused on an Application Menu Trigger, the Application Menu will be toggled open/closed.
-   When pressing <kbd>Escape</kbd> while the Application Menu is opened, the Application Menu will close and (if applicable) the Trigger Button that originally caused the Application Menu to open will be re-focused.

In all other cases, the Application Menu uses a SoHo Xi [Accordion Control](./accordion) internally, and will utilize its keyboard shortcuts when focus lies inside of the menu.

## States and Variations

Different components of the menu have different requirements.

-   The menu "box" should behave like other overlays or panels.
-   The hierarchical structure should support the same states as a standard tree (specifically, open and closed).
-   The individual objects (links) in the menu should support the same states (hover, focus, selected) as the context menu.
